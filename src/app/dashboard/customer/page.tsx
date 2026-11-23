import { BriefcaseBusiness, CheckCircle2, ClipboardList, Clock3, History } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { OverviewHeader } from "@/components/dashboard/customer/OverviewHeader";
import { StatusDonutChart } from "@/components/dashboard/customer/StatusDonutChart";
import { StatCard } from "@/components/dashboard/StatCard";
import { dashboardFetch, getDashboardSession } from "@/lib/dashboard/server-api";
import type { BookingSummary } from "@/lib/dashboard/types";

export const metadata = { title: "Customer Dashboard | FixMate" };

export default async function CustomerOverviewPage() {
  const session = await getDashboardSession();
  if (!session) return null;

  const summary = await dashboardFetch<BookingSummary>("bookings/my/summary", session.session.token);
  const firstName = session.user.name?.trim().split(/\s+/)[0] || "there";

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
      <OverviewHeader firstName={firstName} />

      <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Total Requests" value={summary.total} badge="Lifetime" detail="All bookings you have submitted" icon={ClipboardList} captionIcon={History} tone="indigo" />
        <StatCard title="Active Jobs" value={summary.active} badge="In Action" detail="Requested, accepted or in progress" icon={BriefcaseBusiness} captionIcon={Clock3} tone="amber" />
        <StatCard title="Completed Jobs" value={summary.completed} badge="Completed" detail="Jobs finished by technicians" icon={CheckCircle2} captionIcon={CheckCircle2} tone="green" />
      </div>

      {summary.total === 0 ? (
        <EmptyState title="No bookings yet" description="Browse approved services and send your first repair request." href="/services" action="Browse Services" />
      ) : <StatusDonutChart summary={summary} />}
    </section>
  );
}
