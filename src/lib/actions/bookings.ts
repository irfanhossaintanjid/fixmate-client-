"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

type ActionResult = { ok: true } | { ok: false; message: string };
type CheckoutResult = ActionResult | { ok: true; url: string };

const bookingIdPattern = /^[a-f\d]{24}$/i;

async function getCustomerRequest() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { error: "Please sign in to continue." } as const;
  if (session.user.role !== "customer") return { error: "This action is available to customers only." } as const;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "");
  if (!baseUrl) return { error: "The service is temporarily unavailable." } as const;

  return { token: session.session.token, baseUrl } as const;
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
  if ("error" in request) return { ok: false, message: request.error };

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
  if ("error" in request) return { ok: false, message: request.error };

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
