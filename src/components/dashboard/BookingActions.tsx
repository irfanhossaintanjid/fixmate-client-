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

export function BookingActions({ booking, onChanged }: { booking: Booking; onChanged?: () => void }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const cancel = async () => {
    setBusy(true);
    try {
      const response = await fetch(`/api/dashboard/bookings/${encodeURIComponent(booking.id)}/cancel`, { method: "PATCH" });
      if (!response.ok) throw new Error("Unable to cancel this request. Please try again.");
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
      const response = await fetch("/api/dashboard/payments/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: booking.id }),
      });
      const result = await response.json();
      if (!response.ok || typeof result.url !== "string") throw new Error("Unable to start payment. Please try again.");
      window.location.assign(result.url);
    } catch {
      toast.add({ title: "Payment could not start", description: "Please try again in a moment.", type: "error" });
      setBusy(false);
    }
  };

  if (booking.status === "requested") return (
    <>
      <Button type="button" variant="outline" className="min-h-10 rounded-lg text-destructive hover:bg-destructive/5" onClick={() => setOpen(true)} disabled={busy}>
        <XCircle aria-hidden="true" /> Cancel
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this request?</AlertDialogTitle>
            <AlertDialogDescription>This repair request will be marked as cancelled. You can browse services to make another request.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy}>Keep Request</AlertDialogCancel>
            <AlertDialogAction onClick={(event) => { event.preventDefault(); void cancel(); }} disabled={busy} className="bg-destructive text-white hover:bg-destructive/90">
              {busy ? <><LoaderCircle className="animate-spin" /> Cancelling…</> : "Cancel Request"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );

  if (booking.status === "completed" && booking.paymentStatus === "unpaid") return (
    <Button type="button" onClick={() => void payNow()} disabled={busy} className="min-h-10 rounded-lg bg-primary px-4 text-primary-foreground hover:bg-[#4338A8]">
      {busy ? <><LoaderCircle className="animate-spin" /> Starting…</> : "Pay Now"}
    </Button>
  );
  return null;
}
