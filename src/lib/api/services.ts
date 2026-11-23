import type { ServicesResponse } from "@/types/service";

export type ServicesQuery = {
  search?: string;
  category?: string;
  mode?: string;
  sort?: string;
  page?: string;
};

export async function getServices(query: ServicesQuery): Promise<ServicesResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "");
  if (!baseUrl) throw new Error("The services API URL is not configured.");

  const params = new URLSearchParams();
  for (const key of ["search", "category", "mode", "sort", "page"] as const) {
    const value = query[key];
    if (value) params.set(key, value);
  }

  const response = await fetch(`${baseUrl}/api/services?${params.toString()}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Unable to fetch services.");
  return response.json() as Promise<ServicesResponse>;
}
