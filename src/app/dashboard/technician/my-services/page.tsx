import { MyServicesOverview } from "@/components/dashboard/technician/my-services/MyServicesOverview";
import { dashboardFetch, getDashboardSession } from "@/lib/dashboard/server-api";
import type { TechnicianService } from "@/types/service";

export const metadata = { title: "My Services | FixMate" };

export default async function TechnicianServicesPage() {
  const session = await getDashboardSession();
  if (!session) return null;
  const result = await dashboardFetch<{ services: TechnicianService[] }>("services/technician", session.session.token);
  return <MyServicesOverview services={result.services} />;
}
