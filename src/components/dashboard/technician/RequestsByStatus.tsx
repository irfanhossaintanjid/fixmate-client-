import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RequestStatusChart } from "@/components/dashboard/technician/RequestStatusChart";
import { BOOKING_STATUS_CONFIG } from "@/lib/dashboard/status";
import type { TechnicianOverviewData } from "@/lib/dashboard/technician";

export function RequestsByStatus({ data }: { data: TechnicianOverviewData }) {
  const captions = {
    requested: "Awaiting your response",
    accepted: "Technician assigned",
    "in-progress": "Repair underway",
    completed: "Job completed",
    rejected: "Request declined",
    cancelled: "Cancelled by customer",
  };
  return (
    <Card className="rounded-2xl border-border bg-card shadow-sm">
      <CardHeader className="flex flex-col gap-3 pb-2 sm:flex-row sm:items-start sm:justify-between">
        <div><CardTitle className="text-base font-semibold">Requests by Status</CardTitle><CardDescription className="mt-1 text-xs">Overview of your incoming customer repair requests.</CardDescription></div>
        <Link href="/dashboard/technician/requests" className="inline-flex min-h-9 w-fit items-center gap-1 rounded-lg px-2 text-xs font-semibold text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">View All Requests <ArrowUpRight className="size-3.5" aria-hidden="true" /></Link>
      </CardHeader>
      <CardContent className="grid items-center gap-5 pt-2 lg:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.3fr)]">
        <RequestStatusChart total={data.bookings.total} byStatus={data.bookings.byStatus} />
        <ul className="grid gap-2 sm:grid-cols-2" aria-label="Request status counts">
          {BOOKING_STATUS_CONFIG.map((status) => {
            const count = data.bookings.byStatus[status.key];
            const percent = data.bookings.total ? (count / data.bookings.total) * 100 : 0;
            return (
              <li key={status.key} className="flex min-h-[68px] items-center gap-3 rounded-xl border border-border/70 bg-muted/25 px-3 py-2.5">
                <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: status.color }} aria-hidden="true" />
                <span className="min-w-0 flex-1"><span className="block text-xs font-semibold text-foreground">{status.label}</span><span className="text-[11px] text-muted-foreground">{captions[status.key]}</span></span>
                <span className="text-right"><span className="block text-sm font-semibold tabular-nums text-foreground">{count}</span><span className="text-[10px] tabular-nums text-muted-foreground">{percent.toFixed(1)}%</span></span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
