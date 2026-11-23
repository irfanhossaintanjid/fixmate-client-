import type { UserRole } from "@/lib/roles";

export function ProfileHeader({ role }: { role: UserRole }) {
  const audience = role === "customer" ? "technicians" : "customers";

  return (
    <header className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Update Profile</h1>
      <p className="text-sm leading-6 text-muted-foreground">Keep your details up to date so {audience} can reach you.</p>
    </header>
  );
}
