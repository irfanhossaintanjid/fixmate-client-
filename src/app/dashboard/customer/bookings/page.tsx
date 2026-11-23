import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { BookingActions } from "@/components/dashboard/BookingActions";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { ServiceThumbnail } from "@/components/dashboard/ServiceThumbnail";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge, PaymentBadge } from "@/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dashboardFetch, getDashboardSession } from "@/lib/dashboard/server-api";
import { formatCurrency, formatDate } from "@/lib/dashboard/format";
import type { Booking } from "@/lib/dashboard/types";

export const metadata = { title: "My Bookings | FixMate" };

const filters: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Requested", value: "requested" },
  { label: "Accepted", value: "accepted" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function CustomerBookingsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requestedStatus = Array.isArray(params.status) ? params.status[0] : params.status;
  const status = filters.some((item) => item.value === requestedStatus) ? requestedStatus! : "all";
  const session = await getDashboardSession();
  if (!session) return null;
  const query = status === "all" ? "" : `?status=${encodeURIComponent(status)}`;
  const { bookings } = await dashboardFetch<{ bookings: Booking[] }>(`bookings/my${query}`, session.session.token);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Customer workspace</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">My Bookings</h1><p className="mt-1 text-sm text-muted-foreground">Track every request and manage the next step.</p></header>
      <nav aria-label="Filter bookings" className="flex gap-2 overflow-x-auto rounded-xl border border-border bg-card p-2">
        {filters.map((item) => <Link key={item.value} href={item.value === "all" ? "/dashboard/customer/bookings" : `?status=${item.value}`} aria-current={status === item.value ? "page" : undefined} className={`min-h-10 shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${status === item.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>{item.label}</Link>)}
      </nav>
      {bookings.length === 0 ? (
        <EmptyState title={status === "all" ? "No bookings yet" : "No bookings in this status"} description={status === "all" ? "Once you request a repair, its progress will appear here." : "Try another status filter or browse approved services."} />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:block">
            <Table>
              <TableHeader><TableRow className="bg-muted/40"><TableHead>Service</TableHead><TableHead>Technician</TableHead><TableHead>Preferred Date</TableHead><TableHead>Price</TableHead><TableHead>Status</TableHead><TableHead>Payment</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader>
              <TableBody>{bookings.map((booking) => <BookingTableRow key={booking.id} booking={booking} />)}</TableBody>
            </Table>
          </div>
          <div className="grid gap-3 lg:hidden">{bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)}</div>
        </>
      )}
    </section>
  );
}

function BookingTableRow({ booking }: { booking: Booking }) {
  const title = booking.serviceTitle || booking.title || "Repair service";
  return <TableRow>
    <TableCell><div className="flex min-w-48 items-center gap-3"><ServiceThumbnail src={booking.serviceImage || booking.image} alt={title} /><span className="max-w-48 truncate font-medium text-foreground">{title}</span></div></TableCell>
    <TableCell>{booking.technicianName || "—"}</TableCell>
    <TableCell>{formatDate(booking.preferredDate)}</TableCell>
    <TableCell className="font-medium">{priceLabel(booking)}</TableCell>
    <TableCell><StatusBadge status={booking.status} /></TableCell>
    <TableCell><PaymentBadge status={booking.paymentStatus} /></TableCell>
    <TableCell className="text-right"><BookingActions booking={booking} /></TableCell>
  </TableRow>;
}

function BookingCard({ booking }: { booking: Booking }) {
  const title = booking.serviceTitle || booking.title || "Repair service";
  return <Card className="rounded-2xl border-border bg-card shadow-sm"><CardContent className="space-y-4 p-4">
    <div className="flex items-start gap-3"><ServiceThumbnail src={booking.serviceImage || booking.image} alt={title} className="size-14" /><div className="min-w-0 flex-1"><h2 className="line-clamp-2 font-semibold text-foreground">{title}</h2><p className="mt-1 truncate text-sm text-muted-foreground">{booking.technicianName || "Technician"}</p></div></div>
    <div className="grid grid-cols-2 gap-3 text-sm"><Info label="Preferred date" value={formatDate(booking.preferredDate)} icon /><Info label="Price" value={priceLabel(booking)} /><div><p className="mb-1 text-xs text-muted-foreground">Status</p><StatusBadge status={booking.status} /></div><div><p className="mb-1 text-xs text-muted-foreground">Payment</p><PaymentBadge status={booking.paymentStatus} /></div></div>
    {booking.status === "requested" || (booking.status === "completed" && booking.paymentStatus === "unpaid") ? <div className="border-t border-border pt-3"><BookingActions booking={booking} /></div> : null}
  </CardContent></Card>;
}

function priceLabel(booking: Booking) {
  if (booking.status === "completed" && typeof booking.finalAmount === "number") return `Final ${formatCurrency(booking.finalAmount)}`;
  return `Base ${formatCurrency(booking.basePrice)}`;
}

function Info({ label, value, icon = false }: { label: string; value: string; icon?: boolean }) {
  return <div><p className="mb-1 text-xs text-muted-foreground">{label}</p><p className="flex items-center gap-1.5 font-medium text-foreground">{icon ? <CalendarDays className="size-3.5 text-primary" aria-hidden="true" /> : null}{value}</p></div>;
}
