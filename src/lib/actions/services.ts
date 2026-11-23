"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { ServiceCategory, ServiceMode } from "@/types/service";

export type NewServiceFields = {
  title: string;
  category: ServiceCategory;
  description: string;
  basePrice: number;
  estimatedDuration: string;
  serviceMode: ServiceMode;
  serviceArea: string;
  image: string;
};
export type UpdateServiceFields = Omit<NewServiceFields, "image"> & { image?: string };

type ActionResult = { ok: true } | { ok: false; message: string };

export async function createTechnicianService(fields: NewServiceFields): Promise<ActionResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { ok: false, message: "Please sign in to continue." };
  if (session.user.role !== "technician") return { ok: false, message: "Only technicians can create services." };

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "");
  if (!baseUrl) return { ok: false, message: "Service submission is temporarily unavailable." };

  try {
    const response = await fetch(`${baseUrl}/api/services`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.session.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
      cache: "no-store",
    });
    if (!response.ok) {
      let message = "Unable to submit this service. Please try again.";
      try {
        const result = await response.json() as { message?: unknown };
        if (typeof result.message === "string") message = result.message;
      } catch {
        // Keep a safe generic message for non-JSON API responses.
      }
      return { ok: false, message };
    }

    revalidatePath("/dashboard/technician");
    revalidatePath("/dashboard/technician/my-services");
    return { ok: true };
  } catch {
    return { ok: false, message: "Unable to submit this service. Please try again." };
  }
}

async function technicianApiRequest(id: string, method: "PATCH" | "DELETE", body?: unknown): Promise<ActionResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { ok: false, message: "Please sign in to continue." };
  if (session.user.role !== "technician") return { ok: false, message: "Only technicians can manage services." };

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "");
  if (!baseUrl) return { ok: false, message: "Service management is temporarily unavailable." };
  if (!/^[a-f\d]{24}$/i.test(id)) return { ok: false, message: "Service not found." };

  try {
    const response = await fetch(`${baseUrl}/api/services/${id}`, {
      method,
      headers: {
        Authorization: `Bearer ${session.session.token}`,
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      cache: "no-store",
    });
    if (!response.ok) {
      let message = "Unable to update this service. Please try again.";
      try {
        const result = await response.json() as { message?: unknown };
        if (typeof result.message === "string") message = result.message;
      } catch {
        // Keep the safe fallback if the API did not return JSON.
      }
      return { ok: false, message };
    }
    revalidatePath("/dashboard/technician");
    revalidatePath("/dashboard/technician/my-services");
    revalidatePath("/services");
    return { ok: true };
  } catch {
    return { ok: false, message: "Unable to update this service. Please try again." };
  }
}

export async function updateTechnicianService(id: string, fields: UpdateServiceFields): Promise<ActionResult> {
  return technicianApiRequest(id, "PATCH", fields);
}

export async function setTechnicianServiceAvailability(id: string, isAvailable: boolean): Promise<ActionResult> {
  return technicianApiRequest(id, "PATCH", { isAvailable });
}

export async function deleteTechnicianService(id: string): Promise<ActionResult> {
  return technicianApiRequest(id, "DELETE");
}
