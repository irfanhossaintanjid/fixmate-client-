import "server-only";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getDashboardSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function dashboardFetch<T>(path: string, token: string): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "");
  if (!baseUrl) throw new Error("The API URL is not configured.");

  try {
    const response = await fetch(`${baseUrl}/api/${path.replace(/^\//, "")}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Unable to load dashboard data.");
    return await response.json() as T;
  } catch {
    // Keep low-level network errors out of the rendered error UI and route logs.
    throw new Error("Unable to load dashboard data.");
  }
}
