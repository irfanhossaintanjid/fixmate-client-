"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, CalendarX2, LoaderCircle, ShieldCheck, X, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import type { Booking } from "@/lib/dashboard/types";
import { PaymentBadge, StatusBadge } from "@/components/ui/status-badge";
import { cancelCustomerBooking, createCustomerCheckoutSession } from "@/lib/actions/bookings";
import { ServiceThumbnail } from "@/components/dashboard/ServiceThumbnail";
import { formatCurrency, formatDate } from "@/lib/dashboard/format";

export function BookingActions({ booking, onChanged, fullWidth = false }: { booking: Booking; onChanged?: () => void; fullWidth?: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const cancel = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const result = await cancelCustomerBooking(booking._id);
      if (!result.ok) throw new Error(result.message);
      toast.add({ title: "Request cancelled", type: "success" });
      setOpen(false);
      if (onChanged) onChanged();
      else router.refresh();
    } catch (error) {
      toast.add({ title: "Cancellation failed", description: error instanceof Error ? error.message : "Please try again.", type: "error" });
    } finally {
      setBusy(false);
    }
  };

  const payNow = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const result = await createCustomerCheckoutSession(booking._id);
      if (!result.ok) throw new Error(result.message);
      window.location.assign(result.url);
    } catch (error) {
      toast.add({ title: "Payment could not start", description: error instanceof Error ? error.message : "Please try again in a moment.", type: "error" });
      setBusy(false);
    }
  };

  if (booking.status === "requested") return (
    <>
      <Button type="button" variant="outline" className={`min-h-11 rounded-lg text-destructive hover:bg-destructive/5 ${fullWidth ? "w-full" : ""}`} onClick={() => setOpen(true)} disabled={busy}>
        <XCircle aria-hidden="true" /> Cancel
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-[calc(100%-2rem)] rounded-2xl border border-border bg-card p-5 shadow-2xl sm:max-w-md sm:p-6">
          <AlertDialogCancel aria-label="Close cancellation dialog" disabled={busy} className="absolute right-4 top-4 z-10 size-9 min-h-9 rounded-full border-0 bg-transparent p-0 text-muted-foreground hover:bg-secondary hover:text-foreground sm:right-5 sm:top-5">
            <X className="size-4" aria-hidden="true" />
          </AlertDialogCancel>
          <AlertDialogHeader className="block space-y-4 pr-8 text-left">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300">
                <CalendarX2 className="size-5" aria-hidden="true" />
              </span>
              <div className="space-y-1">
                <AlertDialogTitle className="text-base font-semibold tracking-tight text-foreground sm:text-lg">Cancel Booking Request?</AlertDialogTitle>
                <AlertDialogDescription className="text-sm leading-5 text-muted-foreground">Are you sure you want to cancel this repair request? This action cannot be undone.</AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>
          <div className="rounded-xl border border-border bg-secondary/70 p-3.5 dark:bg-[#403953]/50">
            <div className="flex items-center gap-3">
              <ServiceThumbnail src={booking.serviceImage} alt="" className="size-10 rounded-lg" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{booking.serviceTitle || "Repair service"}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{booking.category || "Repair service"}</p>
              </div>
              <StatusBadge status={booking.status} />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-3">
              <div>
                <p className="text-[11px] text-muted-foreground">Preferred date</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-foreground"><CalendarDays className="size-3.5 text-primary" aria-hidden="true" />{formatDate(booking.preferredDate)}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-muted-foreground">Base price</p>
                <p className="mt-1 text-xs font-semibold tabular-nums text-foreground">{formatCurrency(booking.basePrice)}</p>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-[11px] leading-4 text-muted-foreground">
              <ShieldCheck className="size-3.5 shrink-0 text-emerald-600" aria-hidden="true" />
              This request can be cancelled only while its status is Requested.
            </p>
          </div>
          <AlertDialogFooter className="mx-0 mb-0 flex-row justify-end gap-2 border-0 bg-transparent p-0 pt-1">
            <AlertDialogCancel disabled={busy} className="min-h-11 flex-1 rounded-lg sm:flex-none">Keep Request</AlertDialogCancel>
            <AlertDialogAction onClick={(event) => { event.preventDefault(); void cancel(); }} disabled={busy} className="min-h-11 flex-1 rounded-lg bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 sm:flex-none">
              {busy ? <><LoaderCircle className="animate-spin" /> Cancelling…</> : <><XCircle aria-hidden="true" /> Confirm Cancellation</>}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );

  if (booking.status === "completed" && booking.paymentStatus === "unpaid") return (
    <Button type="button" onClick={() => void payNow()} disabled={busy} className={`min-h-11 rounded-lg bg-primary px-4 text-primary-foreground hover:bg-[#4338A8] ${fullWidth ? "w-full" : ""}`}>
      {busy ? <><LoaderCircle className="animate-spin" /> Starting…</> : "Pay Now"}
    </Button>
  );
  if (booking.status === "completed" && booking.paymentStatus === "paid") return <PaymentBadge status="paid" />;
  return null;
}
