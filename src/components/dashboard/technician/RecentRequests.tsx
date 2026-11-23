import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3, Phone } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { ServiceThumbnail } from "@/components/dashboard/ServiceThumbnail";
import { StatusBadge, PaymentBadge } from "@/components/ui/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/dashboard/format";
import type { TechnicianRecentRequest } from "@/lib/dashboard/technician";

export function RecentRequests({ requests }: { requests: TechnicianRecentRequest[] }) {
  return (
    <Card className="h-full rounded-2xl border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <div><CardTitle className="text-base font-semibold">Recent Repair Requests</CardTitle><CardDescription className="mt-1 text-xs">Your latest customer repair requests.</CardDescription></div>
        <Link href="/dashboard/technician/requests" className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Manage All <ArrowUpRight className="size-3.5" aria-hidden="true" /></Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {requests.length === 0 ? (
          <EmptyState title="No repair requests yet." description="When customers request one of your services, you’ll see it here." href="/dashboard/technician/my-services" action="Explore My Services" />
        ) : requests.map((request) => (
          <article key={request._id} className="flex min-w-0 flex-col gap-3 rounded-xl border border-border/70 bg-muted/20 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <div className="flex min-w-0 items-start gap-3">
              <ServiceThumbnail src={request.serviceImage} alt={request.serviceTitle} className="size-11 rounded-xl" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2"><h3 className="max-w-full truncate text-sm font-semibold text-foreground" title={request.serviceTitle}>{request.serviceTitle}</h3><StatusBadge status={request.status} /></div>
                <p className="mt-1 truncate text-xs text-muted-foreground">{request.customerName || "Customer"}{request.category ? ` · ${request.category}` : ""}</p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" aria-hidden="true" /> Preferred: {formatDate(request.preferredDate)}</span>
                  <span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" aria-hidden="true" /> Requested: {formatDate(request.createdAt)}</span>
                  {request.customerPhone && <span className="inline-flex items-center gap-1"><Phone className="size-3.5" aria-hidden="true" /> {request.customerPhone}</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 sm:justify-end">
              {request.status === "completed" && <PaymentBadge status={request.paymentStatus} />}
              <Link href="/dashboard/technician/requests" className="inline-flex min-h-10 items-center justify-center rounded-lg border border-border bg-card px-3 text-xs font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Manage Request</Link>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
