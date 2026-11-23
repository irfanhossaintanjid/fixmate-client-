import { Suspense } from "react";
import { RoleGuard } from "@/app/dashboard/layouts/RoleGuard";

export default function CustomerDashboardLayout({ children }: LayoutProps<"/dashboard/customer">) {
  return <Suspense fallback={<div className="p-8 text-sm text-muted-foreground">Loading customer workspace…</div>}><RoleGuard role="customer">{children}</RoleGuard></Suspense>;
}
