import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Clock3, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { OverviewCharts } from "@/components/dashboard/OverviewCharts";
import { ServiceThumbnail } from "@/components/dashboard/ServiceThumbnail";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/ui/status-badge";
import { BookingActions } from "@/components/dashboard/BookingActions";
import { dashboardFetch, getDashboardSession } from "@/lib/dashboard/server-api";
import { formatDate, formatCurrency } from "@/lib/dashboard/format";
import type { Booking, BookingSummary } from "@/lib/dashboard/types";

export const metadata = { title: "Customer Dashboard | FixMate" };

export default async function CustomerOverviewPage() {
  const session = await getDashboardSession();
  if (!session) return null;
  const token = session.session.token;
  const [summary, bookings] = await Promise.all([
    dashboardFetch<BookingSummary>("bookings/my/summary", token),
    dashboardFetch<{ bookings: Booking[] }>("bookings/my", token),
  ]);
  const recent = bookings.bookings.slice(0, 4);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-7 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Customer workspace</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Your repair overview</h1><p className="mt-1 text-sm text-muted-foreground">See the status of your requests and payments in one place.</p></div>
        <Button render={<Link href="/services" />} className="min-h-11 w-full rounded-xl bg-primary px-5 text-primary-foreground hover:bg-[#4338A8] sm:w-auto">Browse Services <ArrowRight aria-hidden="true" /></Button>
      </header>

      {summary.total === 0 ? (
        <EmptyState title="No repair requests yet" description="Browse approved services to find a technician for your device or home appliance." />
      ) : (
        <>
          {summary.readyToPay && <ReadyToPayCard booking={summary.readyToPay} />}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard title="Total Requests" value={summary.total} detail="All your repair requests" icon={BriefcaseBusiness} tone="indigo" />
            <StatCard title="Active Jobs" value={summary.active} detail="Requested, accepted or in progress" icon={Clock3} tone="blue" />
            <StatCard title="Completed Jobs" value={summary.completed} detail="Repairs marked completed" icon={CheckCircle2} tone="green" />
          </div>
          <OverviewCharts summary={summary} />
          <Card className="rounded-2xl border-border bg-card shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-3">
              <div><CardTitle className="text-base">Recent bookings</CardTitle><p className="mt-1 text-sm text-muted-foreground">Your latest repair activity</p></div>
              <Button variant="outline" render={<Link href="/dashboard/customer/bookings" />} className="min-h-10 shrink-0 rounded-lg">View all bookings</Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {recent.map((booking) => <RecentBooking key={booking.id} booking={booking} />)}
            </CardContent>
          </Card>
        </>
      )}
    </section>
  );
}

function ReadyToPayCard({ booking }: { booking: Booking }) {
  return (
    <Card className="overflow-hidden rounded-2xl border-primary/20 bg-gradient-to-r from-primary/10 via-card to-card shadow-sm">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-center gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><CreditCard className="size-5" /></span><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-wide text-primary">Ready to Pay</p><h2 className="mt-1 truncate font-semibold text-foreground">{booking.serviceTitle || booking.title || "Completed repair"}</h2><p className="mt-1 text-sm text-muted-foreground">Final amount {formatCurrency(booking.finalAmount)}</p></div></div>
        <div className="flex shrink-0 flex-wrap gap-2"><BookingActions booking={booking} /><Button variant="outline" render={<Link href="/dashboard/customer/bookings" />} className="min-h-10 rounded-lg">My Bookings</Button></div>
      </CardContent>
    </Card>
  );
}

function RecentBooking({ booking }: { booking: Booking }) {
  const title = booking.serviceTitle || booking.title || "Repair service";
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-3 sm:flex-nowrap">
      <ServiceThumbnail src={booking.serviceImage || booking.image} alt={title} className="size-12" />
      <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-foreground">{title}</p><p className="mt-1 truncate text-xs text-muted-foreground">{booking.technicianName || "Technician"} · Preferred {formatDate(booking.preferredDate)}</p></div>
      <StatusBadge status={booking.status} />
    </div>
  );
}
