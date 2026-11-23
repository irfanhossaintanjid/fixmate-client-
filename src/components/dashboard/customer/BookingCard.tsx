import { CalendarDays } from "lucide-react";
import { BookingActions } from "@/components/dashboard/BookingActions";
import { ServiceThumbnail } from "@/components/dashboard/ServiceThumbnail";
import { PaymentBadge, StatusBadge } from "@/components/ui/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/dashboard/format";
import type { Booking } from "@/lib/dashboard/types";

export function BookingCard({ booking }: { booking: Booking }) {
  const title = booking.serviceTitle || "Repair service";
  const categoryLine = `${booking.category || "Category unavailable"} • #${booking._id.slice(-6).toUpperCase()}`;
  return (
    <Card className="rounded-2xl border-border bg-card shadow-sm">
      <CardContent className="space-y-4 p-4">
        <div className="flex items-start gap-3">
          <ServiceThumbnail src={booking.serviceImage} alt={title} className="size-12 rounded-xl" />
          <div className="min-w-0 flex-1"><h2 className="line-clamp-2 text-sm font-semibold text-foreground">{title}</h2><p className="mt-1 truncate text-xs text-muted-foreground">{categoryLine}</p></div>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-border pt-3">
          <Field label="Technician"><TechnicianName name={booking.technicianName} /></Field>
          <Field label="Preferred Date"><span className="flex items-center gap-1.5 text-sm font-medium text-foreground"><CalendarDays className="size-3.5 text-primary" aria-hidden="true" />{formatDate(booking.preferredDate)}</span></Field>
          <Field label="Price"><Price booking={booking} /></Field>
          <Field label="Status"><StatusBadge status={booking.status} /></Field>
          <Field label="Payment"><PaymentState booking={booking} /></Field>
        </div>
        <BookingActions booking={booking} fullWidth />
      </CardContent>
    </Card>
  );
}

export function TechnicianName({ name }: { name?: string }) {
  const displayName = name || "Technician";
  const initials = displayName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "T";
  return <span className="flex min-w-0 items-center gap-2"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#EEE9FF] text-[10px] font-semibold text-[#5145CD] dark:bg-[#403953] dark:text-[#C4BFFF]" aria-hidden="true">{initials}</span><span className="truncate text-sm text-foreground" title={displayName}>{displayName}</span></span>;
}

export function Price({ booking }: { booking: Booking }) {
  if (booking.status === "completed" && typeof booking.finalAmount === "number") return <span className="text-sm font-semibold tabular-nums text-foreground">Final {formatCurrency(booking.finalAmount)}</span>;
  return <span className="text-sm font-medium tabular-nums text-muted-foreground">Base {formatCurrency(booking.basePrice)}</span>;
}

export function PaymentState({ booking }: { booking: Booking }) {
  if (["rejected", "cancelled"].includes(booking.status)) return null;
  return <PaymentBadge status={booking.paymentStatus} />;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="min-w-0"><p className="mb-1 text-[11px] text-muted-foreground">{label}</p>{children}</div>;
}
