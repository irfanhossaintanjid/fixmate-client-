import { CalendarDays } from "lucide-react";
import { BookingActions } from "@/components/dashboard/BookingActions";
import { ServiceThumbnail } from "@/components/dashboard/ServiceThumbnail";
import { PaymentState, Price, TechnicianName } from "@/components/dashboard/customer/BookingCard";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/dashboard/format";
import type { Booking } from "@/lib/dashboard/types";

export function BookingsTable({ bookings }: { bookings: Booking[] }) {
  return (
    <section className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:block" aria-label="My bookings table">
      <div className="overflow-x-auto">
        <Table className="min-w-[1080px] table-fixed">
          <TableHeader><TableRow className="bg-[#F8F4FF] hover:bg-[#F8F4FF] dark:bg-[#3B3355] dark:hover:bg-[#3B3355]">
            <TableHead scope="col" className="w-[30%] px-4">Service</TableHead><TableHead scope="col" className="w-[15%] px-3">Technician</TableHead><TableHead scope="col" className="w-[14%] px-3">Preferred Date</TableHead><TableHead scope="col" className="w-[12%] px-3">Price</TableHead><TableHead scope="col" className="w-[11%] px-3">Status</TableHead><TableHead scope="col" className="w-[9%] px-3">Payment</TableHead><TableHead scope="col" className="w-[9%] px-3 text-right">Action</TableHead>
          </TableRow></TableHeader>
          <TableBody>{bookings.map((booking) => <BookingRow key={booking._id} booking={booking} />)}</TableBody>
        </Table>
      </div>
      <p className="border-t border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground">Showing {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}</p>
    </section>
  );
}

function BookingRow({ booking }: { booking: Booking }) {
  const title = booking.serviceTitle || "Repair service";
  const categoryLine = `${booking.category || "Category unavailable"} • #${booking._id.slice(-6).toUpperCase()}`;
  return (
    <TableRow className="hover:bg-[#FAF8FE] dark:hover:bg-[#3B3355]">
      <TableCell className="px-4"><div className="flex min-w-0 items-center gap-3"><ServiceThumbnail src={booking.serviceImage} alt={title} className="size-10 rounded-xl" /><div className="min-w-0"><p className="truncate text-sm font-semibold text-foreground" title={title}>{title}</p><p className="mt-0.5 truncate text-xs text-muted-foreground">{categoryLine}</p></div></div></TableCell>
      <TableCell className="px-3"><TechnicianName name={booking.technicianName} /></TableCell>
      <TableCell className="px-3"><span className="flex items-center gap-1.5 whitespace-normal text-sm text-foreground"><CalendarDays className="size-3.5 shrink-0 text-primary" aria-hidden="true" />{formatDate(booking.preferredDate)}</span></TableCell>
      <TableCell className="px-3"><Price booking={booking} /></TableCell>
      <TableCell className="px-3"><StatusBadge status={booking.status} /></TableCell>
      <TableCell className="px-3"><PaymentState booking={booking} /></TableCell>
      <TableCell className="px-3 text-right">{booking.status === "requested" || (booking.status === "completed" && (booking.paymentStatus === "unpaid" || booking.paymentStatus === "paid")) ? <BookingActions booking={booking} /> : null}</TableCell>
    </TableRow>
  );
}
