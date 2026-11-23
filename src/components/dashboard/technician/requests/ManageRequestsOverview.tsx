"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Eye, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookingWorkflowActions } from "@/components/dashboard/technician/requests/BookingWorkflowActions";
import { RequestDetailsDialog } from "@/components/dashboard/technician/requests/RequestDetailsDialog";
import { RequestFilters } from "@/components/dashboard/technician/requests/RequestFilters";
import { RequestsHeader } from "@/components/dashboard/technician/requests/RequestsHeader";
import { RequestStats } from "@/components/dashboard/technician/requests/RequestStats";
import { RequestStatusTabs } from "@/components/dashboard/technician/requests/RequestStatusTabs";
import { StatusBadge, PaymentBadge } from "@/components/ui/status-badge";
import { ServiceThumbnail } from "@/components/dashboard/ServiceThumbnail";
import { formatCurrency, formatDate } from "@/lib/dashboard/format";
import type { Booking, BookingStatus } from "@/lib/dashboard/types";
import type { RequestSort, TechnicianBookingCounts } from "@/app/dashboard/technician/requests/page";

export function ManageRequestsOverview({ bookings, counts, selectedStatus, search, sort }: {
  bookings: Booking[];
  counts: TechnicianBookingCounts;
  selectedStatus: "all" | BookingStatus;
  search: string;
  sort: RequestSort;
}) {
  return <main className="mx-auto w-full max-w-[1480px] space-y-5 px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
    <RequestsHeader />
    <RequestStats counts={counts} />
    <RequestStatusTabs counts={counts} selected={selectedStatus} search={search} sort={sort} />
    <RequestFilters status={selectedStatus} search={search} sort={sort} />

    {bookings.length === 0 ? <EmptyResults selectedStatus={selectedStatus} search={search} /> : <>
      <section className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:block" aria-label="Repair requests table">
        <div className="overflow-x-auto"><Table className="min-w-[1220px] table-fixed">
          <TableHeader><TableRow className="bg-[#F8F4FF] hover:bg-[#F8F4FF] dark:bg-[#3B3355] dark:hover:bg-[#3B3355]"><TableHead scope="col" className="w-[23%] px-4">Service Details</TableHead><TableHead scope="col" className="w-[21%] px-3">Customer</TableHead><TableHead scope="col" className="w-[13%] px-3">Preferred Date</TableHead><TableHead scope="col" className="w-[13%] px-3">Price</TableHead><TableHead scope="col" className="w-[11%] px-3">Booking Status</TableHead><TableHead scope="col" className="w-[9%] px-3">Payment</TableHead><TableHead scope="col" className="w-[10%] px-3 text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>{bookings.map((booking) => <DesktopBookingRow key={booking._id} booking={booking} />)}</TableBody>
        </Table></div>
        <p className="border-t border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground">Showing {bookings.length} {bookings.length === 1 ? "request" : "requests"}</p>
      </section>
      <div className="grid gap-3 lg:hidden">{bookings.map((booking) => <MobileBookingCard key={booking._id} booking={booking} />)}<p className="px-1 text-xs text-muted-foreground">Showing {bookings.length} {bookings.length === 1 ? "request" : "requests"}</p></div>
    </>}
  </main>;
}

function DesktopBookingRow({ booking }: { booking: Booking }) {
  const title = booking.serviceTitle || "Repair service";
  return <TableRow className="align-middle hover:bg-primary/[.035]">
    <TableCell className="px-4 py-4"><div className="flex min-w-0 items-center gap-3"><ServiceThumbnail src={booking.serviceImage} alt="" className="size-11 rounded-xl" /><div className="min-w-0"><p className="truncate text-sm font-semibold text-foreground" title={title}>{title}</p><p className="mt-1 truncate text-xs text-muted-foreground">{booking.category || "Repair service"}{booking.serviceMode ? ` · ${booking.serviceMode}` : ""}</p></div></div></TableCell>
    <TableCell className="px-3 py-4"><CustomerSummary booking={booking} /></TableCell>
    <TableCell className="px-3 py-4"><span className="flex items-center gap-1.5 text-sm text-foreground"><CalendarDays className="size-3.5 shrink-0 text-primary" aria-hidden="true" />{formatDate(booking.preferredDate)}</span></TableCell>
    <TableCell className="px-3 py-4"><PriceSummary booking={booking} /></TableCell>
    <TableCell className="px-3 py-4"><StatusBadge status={booking.status} /></TableCell>
    <TableCell className="px-3 py-4"><PaymentBadge status={booking.paymentStatus} /></TableCell>
    <TableCell className="px-3 py-4"><div className="flex flex-col items-end gap-2"><DetailsButton booking={booking} /><BookingWorkflowActions booking={booking} /></div></TableCell>
  </TableRow>;
}

function MobileBookingCard({ booking }: { booking: Booking }) {
  const title = booking.serviceTitle || "Repair service";
  return <Card className="rounded-2xl border-border bg-card shadow-sm"><CardContent className="space-y-4 p-4">
    <div className="flex items-start gap-3"><ServiceThumbnail src={booking.serviceImage} alt="" className="size-12 rounded-xl" /><div className="min-w-0 flex-1"><h2 className="line-clamp-2 text-sm font-semibold text-foreground">{title}</h2><p className="mt-1 truncate text-xs text-muted-foreground">{booking.category || "Repair service"}{booking.serviceMode ? ` · ${booking.serviceMode}` : ""}</p></div><StatusBadge status={booking.status} /></div>
    <div className="grid grid-cols-2 gap-x-3 gap-y-4 border-t border-border pt-3"><Info label="Customer"><CustomerSummary booking={booking} /></Info><Info label="Preferred Date"><span className="inline-flex items-center gap-1.5"><CalendarDays className="size-3.5 text-primary" aria-hidden="true" />{formatDate(booking.preferredDate)}</span></Info><Info label="Price"><PriceSummary booking={booking} /></Info><Info label="Payment"><PaymentBadge status={booking.paymentStatus} /></Info></div>
    <div className="flex flex-col gap-2 border-t border-border pt-3"><DetailsButton booking={booking} fullWidth /><BookingWorkflowActions booking={booking} fullWidth /></div>
  </CardContent></Card>;
}

function CustomerSummary({ booking }: { booking: Booking }) {
  const name = booking.customerName || "Customer";
  return <div className="min-w-0"><p className="flex items-center gap-1.5 truncate text-xs font-semibold text-foreground" title={name}><UserRound className="size-3.5 shrink-0 text-primary" aria-hidden="true" />{name}</p>{booking.customerEmail && <p className="mt-1 flex min-w-0 items-center gap-1.5 truncate text-[11px] text-muted-foreground" title={booking.customerEmail}><Mail className="size-3 shrink-0" aria-hidden="true" />{booking.customerEmail}</p>}{booking.customerPhone && <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground"><Phone className="size-3 shrink-0" aria-hidden="true" />{booking.customerPhone}</p>}</div>;
}

function PriceSummary({ booking }: { booking: Booking }) {
  return <div><p className="text-sm font-semibold tabular-nums text-foreground">{booking.status === "completed" && typeof booking.finalAmount === "number" ? formatCurrency(booking.finalAmount) : formatCurrency(booking.basePrice)}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{booking.status === "completed" && typeof booking.finalAmount === "number" ? "Final amount" : "Base price"}</p></div>;
}

function DetailsButton({ booking, fullWidth = false }: { booking: Booking; fullWidth?: boolean }) {
  const [open, setOpen] = useState(false);
  return <><Button type="button" variant="outline" onClick={() => setOpen(true)} className={`min-h-10 rounded-lg px-3 text-xs ${fullWidth ? "w-full" : ""}`}><Eye className="size-3.5" aria-hidden="true" /> View Details</Button><RequestDetailsDialog booking={booking} open={open} onOpenChange={setOpen} /></>;
}

function EmptyResults({ selectedStatus, search }: { selectedStatus: "all" | BookingStatus; search: string }) {
  const noData = selectedStatus === "all" && !search;
  return <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-5 py-10 text-center"><span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><MapPin className="size-6" aria-hidden="true" /></span><h2 className="mt-4 text-lg font-semibold text-foreground">{noData ? "No Repair Requests Yet" : "No Matching Requests"}</h2><p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">{noData ? "Customer repair requests assigned to your services will appear here." : "Try changing your search term or status filter."}</p>{noData ? <Button render={<Link href="/dashboard/technician/my-services" />} className="mt-5 min-h-11 rounded-xl bg-primary px-5 text-primary-foreground hover:bg-[#4338A8]">View My Services</Button> : <Button render={<Link href="/dashboard/technician/requests" />} variant="outline" className="mt-5 min-h-11 rounded-xl px-5">Clear filters</Button>}</div>;
}

function Info({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="min-w-0"><p className="mb-1 text-[11px] text-muted-foreground">{label}</p><div className="min-w-0 text-sm text-foreground">{children}</div></div>;
}
