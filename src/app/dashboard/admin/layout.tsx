import { Suspense } from "react";
import { RoleGuard } from "@/app/dashboard/layouts/RoleGuard";

export default function AdminDashboardLayout({ children }: LayoutProps<"/dashboard/admin">) {
  return <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Loading workspace…</div>}><RoleGuard role="admin">{children}</RoleGuard></Suspense>;
}
