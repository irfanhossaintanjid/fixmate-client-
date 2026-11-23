"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import type { Booking } from "@/lib/dashboard/types";
import { PaymentBadge } from "@/components/ui/status-badge";
import { cancelCustomerBooking, createCustomerCheckoutSession } from "@/lib/actions/bookings";

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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this request?</AlertDialogTitle>
            <AlertDialogDescription>This will cancel your {booking.serviceTitle || "repair service"} request. You can only cancel while it is still in the Requested stage.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy}>Keep Request</AlertDialogCancel>
            <AlertDialogAction onClick={(event) => { event.preventDefault(); void cancel(); }} disabled={busy} className="bg-destructive text-white hover:bg-destructive/90">
              {busy ? <><LoaderCircle className="animate-spin" /> Cancelling…</> : "Yes, Cancel"}
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
