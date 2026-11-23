import { redirect } from "next/navigation";
import { getDashboardSession } from "@/lib/dashboard/server-api";
import { getDashboardPath, type UserRole } from "@/lib/roles";

export async function RoleGuard({ role, children }: { role: UserRole; children: React.ReactNode }) {
  const session = await getDashboardSession();
  if (!session) redirect("/sign-in?redirect=%2Fdashboard%2Fcustomer");
  const currentRole = (session.user.role || "customer") as UserRole;
  if (currentRole !== role) redirect(getDashboardPath(currentRole));
  return children;
}
