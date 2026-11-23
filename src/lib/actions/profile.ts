"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export type ProfileFields = {
  name: string;
  phone: string;
  area: string;
  bio: string;
  image?: string;
};

export type SavedProfile = {
  name: string;
  email: string;
  role: string;
  image: string | null;
  phone: string;
  area: string;
  bio: string;
};

type UpdateProfileResult = { ok: true; profile: SavedProfile } | { ok: false; message: string };

export async function updateProfile(fields: ProfileFields): Promise<UpdateProfileResult> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return { ok: false, message: "Please sign in to update your profile." };

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, "");
  if (!baseUrl) return { ok: false, message: "Profile updates are temporarily unavailable." };

  const body: ProfileFields = {
    name: fields.name,
    phone: fields.phone,
    area: fields.area,
    bio: fields.bio,
  };
  if (fields.image !== undefined) body.image = fields.image;

  try {
    const response = await fetch(`${baseUrl}/api/users/profile`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.session.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      let message = "Unable to update your profile. Please try again.";
      try {
        const error = await response.json() as { message?: unknown };
        if (typeof error.message === "string") message = error.message;
      } catch {
        // Keep the user-facing fallback when the API does not return JSON.
      }
      return { ok: false, message };
    }

    const profile = await response.json() as SavedProfile;
    revalidatePath("/dashboard/profile");
    revalidatePath("/dashboard");
    return { ok: true, profile };
  } catch {
    return { ok: false, message: "Unable to update your profile. Please try again." };
  }
}
