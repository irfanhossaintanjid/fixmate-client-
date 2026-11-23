import { Suspense } from "react";
import { RoleGuard } from "@/app/dashboard/layouts/RoleGuard";

export default function TechnicianDashboardLayout({ children }: LayoutProps<"/dashboard/technician">) {
  return <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Loading workspace…</div>}><RoleGuard role="technician">{children}</RoleGuard></Suspense>;
}
