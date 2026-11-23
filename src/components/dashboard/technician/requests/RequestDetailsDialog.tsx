"use client";

import { CalendarDays, Clock3, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaymentBadge, StatusBadge } from "@/components/ui/status-badge";
import { ServiceThumbnail } from "@/components/dashboard/ServiceThumbnail";
import { JobProgressStepper } from "@/components/dashboard/technician/requests/JobProgressStepper";
import { formatCurrency, formatDate } from "@/lib/dashboard/format";
import type { Booking } from "@/lib/dashboard/types";

export function RequestDetailsDialog({ booking, open, onOpenChange }: { booking: Booking; open: boolean; onOpenChange: (open: boolean) => void }) {
  const title = booking.serviceTitle || "Repair request";
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[90svh] max-w-[calc(100%-2rem)] overflow-y-auto rounded-2xl border border-border bg-card p-0 shadow-2xl sm:max-w-2xl">
      <DialogHeader className="sticky top-0 z-10 border-b border-border bg-card px-5 py-4 text-left sm:px-6"><DialogTitle className="text-lg font-semibold">Request Details</DialogTitle><DialogDescription>Booking #{booking._id.slice(-8).toUpperCase()}</DialogDescription></DialogHeader>
      <div className="space-y-5 p-5 sm:p-6">
        <section className="flex items-start gap-3"><ServiceThumbnail src={booking.serviceImage} alt="" className="size-14 rounded-xl" /><div className="min-w-0 flex-1"><h3 className="text-base font-semibold text-foreground">{title}</h3><p className="mt-1 text-xs text-muted-foreground">{booking.category || "Repair service"}</p><div className="mt-2 flex flex-wrap gap-2"><StatusBadge status={booking.status} /><PaymentBadge status={booking.paymentStatus} /></div></div></section>
        <section className="rounded-xl border border-border bg-muted/20 p-4"><h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Job Progress</h3><div className="mt-4"><JobProgressStepper status={booking.status} /></div></section>
        <div className="grid gap-5 sm:grid-cols-2">
          <section className="space-y-3"><h3 className="text-sm font-semibold text-foreground">Service Information</h3><Info label="Base price" value={formatCurrency(booking.basePrice)} /><Info label="Final amount" value={booking.finalAmount != null ? formatCurrency(booking.finalAmount) : "Not set"} /><Info label="Service mode" value={booking.serviceMode || "Not available"} /><Info label="Service area" value={booking.serviceArea || "Not available"} /></section>
          <section className="space-y-3"><h3 className="text-sm font-semibold text-foreground">Customer Information</h3><Info icon={<UserRound />} label="Name" value={booking.customerName || "Customer"} /><Info icon={<Mail />} label="Email" value={booking.customerEmail || "Not available"} /><Info icon={<Phone />} label="Phone" value={booking.customerPhone || "Not provided"} /></section>
        </div>
        <section className="space-y-3 border-t border-border pt-4"><h3 className="text-sm font-semibold text-foreground">Repair Request</h3><Info icon={<MapPin />} label="Address" value={booking.address || "Not provided"} /><Info icon={<CalendarDays />} label="Preferred date" value={formatDate(booking.preferredDate)} /><div><p className="text-[11px] text-muted-foreground">Problem description</p><p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-foreground">{booking.problemDescription || "No description provided."}</p></div></section>
        <section className="grid gap-3 border-t border-border pt-4 sm:grid-cols-2"><Info icon={<Clock3 />} label="Booking created" value={formatDate(booking.createdAt)} /><Info label="Booking status" value={<StatusBadge status={booking.status} />} /><Info label="Payment status" value={<PaymentBadge status={booking.paymentStatus} />} /></section>
      </div>
    </DialogContent>
  </Dialog>;
}

function Info({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) {
  return <div className="min-w-0"><p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">{icon && <span className="[&>svg]:size-3.5" aria-hidden="true">{icon}</span>}{label}</p><div className="mt-1 break-words text-sm font-medium text-foreground">{value}</div></div>;
}
