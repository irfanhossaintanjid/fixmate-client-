import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/dashboard/profile/ProfileForm";
import { ProfileHeader } from "@/components/dashboard/profile/ProfileHeader";
import { getDashboardSession } from "@/lib/dashboard/server-api";
import type { SavedProfile } from "@/lib/actions/profile";
import type { UserRole } from "@/lib/roles";

export const metadata = { title: "Update Profile | FixMate" };

export default async function ProfilePage() {
  const session = await getDashboardSession();
  if (!session) redirect("/sign-in?redirect=%2Fdashboard%2Fprofile");

  const role = (session.user.role || "customer") as UserRole;
  const profile: SavedProfile = {
    name: session.user.name || "",
    email: session.user.email,
    role,
    image: session.user.image || null,
    phone: session.user.phone || "",
    area: session.user.area || "",
    bio: session.user.bio || "",
  };

  return (
    <section className="mx-auto w-full max-w-6xl space-y-5 px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
      <ProfileHeader role={role} />
      <ProfileForm profile={profile} role={role} />
    </section>
  );
}
