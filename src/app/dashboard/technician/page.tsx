import { RequestsByStatus } from "@/components/dashboard/technician/RequestsByStatus";
import { RecentRequests } from "@/components/dashboard/technician/RecentRequests";
import { ServicePerformance } from "@/components/dashboard/technician/ServicePerformance";
import { TechnicianOverviewHeader } from "@/components/dashboard/technician/TechnicianOverviewHeader";
import { TechnicianQuickActions } from "@/components/dashboard/technician/TechnicianQuickActions";
import { TechnicianStats } from "@/components/dashboard/technician/TechnicianStats";
import { dashboardFetch, getDashboardSession } from "@/lib/dashboard/server-api";
import type { TechnicianOverviewData } from "@/lib/dashboard/technician";

export const metadata = { title: "Technician Dashboard | FixMate" };

export default async function TechnicianOverviewPage() {
  const session = await getDashboardSession();
  if (!session) return null;

  const data = await dashboardFetch<TechnicianOverviewData>("technician/dashboard/overview", session.session.token);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
      <TechnicianOverviewHeader />
      <TechnicianStats data={data} />
      <RequestsByStatus data={data} />
      <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
        <RecentRequests requests={data.recentRequests} />
        <div className="grid content-start gap-5 sm:grid-cols-2 xl:grid-cols-1"><ServicePerformance stats={data.services} /><TechnicianQuickActions /></div>
      </div>
    </main>
  );
}
