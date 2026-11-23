"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

type ActionResult = { ok: true } | { ok: false; message: string };
type CheckoutResult = { ok: true; url: string } | { ok: false; message: string };
type CustomerRequest = { ok: true; token: string; baseUrl: string } | { ok: false; error: string };
type TechnicianRequest = { ok: true; token: string; baseUrl: string } | { ok: false; error: string };
export type TechnicianBookingStatus = "accepted" | "rejected" | "in-progress" | "completed";

const bookingIdPattern = /^[a-f\d]{24}$/i;

async function getCustomerRequest(): Promise<CustomerRequest> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { ok: false, error: "Please sign in to continue." };
  if (session.user.role !== "customer") return { ok: false, error: "This action is available to customers only." };

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "");
  if (!baseUrl) return { ok: false, error: "The service is temporarily unavailable." };

  return { ok: true, token: session.session.token, baseUrl };
}

async function getTechnicianRequest(): Promise<TechnicianRequest> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { ok: false, error: "Please sign in to continue." };
  if (session.user.role !== "technician") return { ok: false, error: "This action is available to technicians only." };

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "");
  if (!baseUrl) return { ok: false, error: "The service is temporarily unavailable." };
  return { ok: true, token: session.session.token, baseUrl };
}

async function readMessage(response: Response) {
  try {
    const body = (await response.json()) as { message?: unknown };
    return typeof body.message === "string" ? body.message : "";
  } catch {
    return "";
  }
}

export async function cancelCustomerBooking(bookingId: string): Promise<ActionResult> {
  if (!bookingIdPattern.test(bookingId)) {
    return { ok: false, message: "This booking could not be found." };
  }

  const request = await getCustomerRequest();
  if (!request.ok) return { ok: false, message: request.error };

  try {
    const response = await fetch(`${request.baseUrl}/api/bookings/${bookingId}/cancel`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${request.token}` },
      cache: "no-store",
    });

    if (!response.ok) {
      const serverMessage = await readMessage(response);
      return {
        ok: false,
        message: response.status === 409
          ? "Only requested bookings can be cancelled."
          : response.status === 404
            ? "This booking could not be found."
            : serverMessage || "Unable to cancel this request. Please try again.",
      };
    }

    revalidatePath("/dashboard/customer/bookings");
    return { ok: true };
  } catch {
    return { ok: false, message: "Unable to cancel this request. Please try again." };
  }
}

export async function createCustomerCheckoutSession(bookingId: string): Promise<CheckoutResult> {
  if (!bookingIdPattern.test(bookingId)) {
    return { ok: false, message: "This booking could not be found." };
  }

  const request = await getCustomerRequest();
  if (!request.ok) return { ok: false, message: request.error };

  try {
    const response = await fetch(`${request.baseUrl}/api/payments/create-checkout-session`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${request.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingId }),
      cache: "no-store",
    });

    if (!response.ok) {
      return { ok: false, message: "Unable to start payment. Please try again." };
    }

    const result = (await response.json()) as { url?: unknown };
    if (typeof result.url !== "string") {
      return { ok: false, message: "Unable to start payment. Please try again." };
    }

    const checkoutUrl = new URL(result.url);
    if (checkoutUrl.protocol !== "https:" || checkoutUrl.hostname !== "checkout.stripe.com") {
      return { ok: false, message: "Unable to start payment. Please try again." };
    }

    return { ok: true, url: checkoutUrl.toString() };
  } catch {
    return { ok: false, message: "Unable to start payment. Please try again." };
  }
}

export async function updateTechnicianBookingStatus(
  bookingId: string,
  status: TechnicianBookingStatus,
  finalAmount?: number,
): Promise<ActionResult> {
  if (!bookingIdPattern.test(bookingId)) return { ok: false, message: "This repair request could not be found." };
  if (!["accepted", "rejected", "in-progress", "completed"].includes(status)) {
    return { ok: false, message: "Invalid repair request status." };
  }
  if (status === "completed" && (typeof finalAmount !== "number" || !Number.isFinite(finalAmount) || finalAmount <= 0)) {
    return { ok: false, message: "Enter a final amount greater than zero." };
  }
  if (status !== "completed" && finalAmount !== undefined) {
    return { ok: false, message: "A final amount is only required when completing a job." };
  }

  const request = await getTechnicianRequest();
  if (!request.ok) return { ok: false, message: request.error };
  try {
    const response = await fetch(`${request.baseUrl}/api/bookings/${bookingId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${request.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, ...(status === "completed" ? { finalAmount } : {}) }),
      cache: "no-store",
    });
    if (!response.ok) {
      let message = "Unable to update this repair request. Please try again.";
      try {
        const result = await response.json() as { message?: unknown };
        if (typeof result.message === "string") message = result.message;
      } catch {
        // Use the safe fallback for non-JSON errors.
      }
      return { ok: false, message };
    }

    revalidatePath("/dashboard/technician");
    revalidatePath("/dashboard/technician/requests");
    revalidatePath("/dashboard/customer");
    revalidatePath("/dashboard/customer/bookings");
    return { ok: true };
  } catch {
    return { ok: false, message: "Unable to update this repair request. Please try again." };
  }
}
