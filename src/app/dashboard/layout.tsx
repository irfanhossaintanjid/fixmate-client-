import { Suspense } from "react";
import { redirect } from "next/navigation";
import { DashboardShell, type DashboardUser } from "@/components/dashboard/DashboardShell";
import { getDashboardSession } from "@/lib/dashboard/server-api";
import type { UserRole } from "@/lib/roles";

export default function DashboardLayout({ children }: LayoutProps<"/dashboard">) {
  return <Suspense fallback={<DashboardShellLoading />}><DashboardGate>{children}</DashboardGate></Suspense>;
}

async function DashboardGate({ children }: { children: React.ReactNode }) {
  const session = await getDashboardSession();
  if (!session) redirect("/sign-in?redirect=%2Fdashboard%2Fcustomer");
  const role = (session.user.role || "customer") as UserRole;
  const user: DashboardUser = {
    name: session.user.name || "FixMate member",
    email: session.user.email,
    image: session.user.image,
    role,
  };
  return <DashboardShell user={user}>{children}</DashboardShell>;
}

function DashboardShellLoading() {
  return <div className="min-h-svh bg-background" aria-label="Checking your session"><div className="h-16 animate-pulse border-b border-border bg-card" /><div className="mx-auto max-w-7xl space-y-4 px-5 py-8"><div className="h-8 w-64 animate-pulse rounded-lg bg-muted" /><div className="grid gap-4 sm:grid-cols-3">{[0, 1, 2].map((index) => <div key={index} className="h-32 animate-pulse rounded-2xl bg-card ring-1 ring-border" />)}</div></div></div>;
}
