"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, CircleX, LoaderCircle, Play, Wrench } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { formatCurrency } from "@/lib/dashboard/format";
import { updateTechnicianBookingStatus, type TechnicianBookingStatus } from "@/lib/actions/bookings";
import type { Booking } from "@/lib/dashboard/types";

export function BookingWorkflowActions({ booking, fullWidth = false }: { booking: Booking; fullWidth?: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [amount, setAmount] = useState(booking.basePrice ? String(booking.basePrice) : "");
  const [amountError, setAmountError] = useState("");
  const lock = useRef(false);

  async function transition(status: TechnicianBookingStatus, finalAmount?: number) {
    if (lock.current) return false;
    lock.current = true;
    setBusy(true);
    try {
      const result = await updateTechnicianBookingStatus(booking._id, status, finalAmount);
      if (!result.ok) {
        toast.add({ title: "Request update failed", description: result.message, type: "error" });
        return false;
      }
      const success = {
        accepted: "Repair request accepted successfully.",
        rejected: "Repair request rejected.",
        "in-progress": "Repair work started successfully.",
        completed: "Repair job completed successfully.",
      } satisfies Record<TechnicianBookingStatus, string>;
      toast.add({ title: success[status], type: "success" });
      setRejectOpen(false);
      setCompleteOpen(false);
      router.refresh();
      return true;
    } catch {
      toast.add({ title: "Request update failed", description: "Please try again.", type: "error" });
      return false;
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  async function complete(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = Number(amount);
    if (!amount.trim() || !Number.isFinite(parsed) || parsed <= 0) {
      setAmountError("Enter a final amount greater than zero.");
      return;
    }
    setAmountError("");
    await transition("completed", Math.round(parsed * 100) / 100);
  }

  if (booking.status === "requested") return <div className={`flex gap-2 ${fullWidth ? "w-full" : "flex-col"}`}>
    <Button type="button" onClick={() => void transition("accepted")} disabled={busy} className={`min-h-10 rounded-lg bg-primary text-primary-foreground hover:bg-[#4338A8] ${fullWidth ? "flex-1" : ""}`}>{busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <CheckCircle2 className="size-4" aria-hidden="true" />} Accept</Button>
    <Button type="button" variant="outline" onClick={() => setRejectOpen(true)} disabled={busy} className={`min-h-10 rounded-lg border-red-200 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40 ${fullWidth ? "flex-1" : ""}`}><CircleX className="size-4" aria-hidden="true" /> Reject</Button>
    <AlertDialog open={rejectOpen} onOpenChange={(open) => { if (!busy) setRejectOpen(open); }}><AlertDialogContent className="max-w-[calc(100%-2rem)] rounded-2xl border border-border bg-card p-5 shadow-2xl sm:max-w-md sm:p-6"><AlertDialogHeader><AlertDialogTitle>Reject Repair Request?</AlertDialogTitle><AlertDialogDescription>Are you sure you want to reject this repair request? This action cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel disabled={busy} className="min-h-11 rounded-xl">Cancel</AlertDialogCancel><AlertDialogAction onClick={(event) => { event.preventDefault(); void transition("rejected"); }} disabled={busy} className="min-h-11 rounded-xl bg-red-600 text-white hover:bg-red-700">{busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <CircleX className="size-4" aria-hidden="true" />} Reject Request</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </div>;

  if (booking.status === "accepted") return <Button type="button" onClick={() => void transition("in-progress")} disabled={busy} className={`min-h-10 rounded-lg bg-primary text-primary-foreground hover:bg-[#4338A8] ${fullWidth ? "w-full" : ""}`}>{busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />} Start Repair</Button>;

  if (booking.status === "in-progress") return <>
    <Button type="button" onClick={() => setCompleteOpen(true)} disabled={busy} className={`min-h-10 rounded-lg bg-primary text-primary-foreground hover:bg-[#4338A8] ${fullWidth ? "w-full" : ""}`}><CheckCircle2 className="size-4" aria-hidden="true" /> Complete Job</Button>
    <Dialog open={completeOpen} onOpenChange={(open) => { if (!busy) setCompleteOpen(open); }}><DialogContent className="max-w-[calc(100%-2rem)] rounded-2xl border border-border bg-card p-5 shadow-2xl sm:max-w-md sm:p-6"><DialogHeader className="text-left"><DialogTitle>Complete Repair Job</DialogTitle><DialogDescription>Enter the final repair cost before marking this job as completed.</DialogDescription></DialogHeader><form onSubmit={complete} noValidate className="space-y-4"><div className="space-y-2"><Label htmlFor={`final-amount-${booking._id}`}>Final Amount</Label><div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span><Input id={`final-amount-${booking._id}`} type="number" min="0.01" step="0.01" inputMode="decimal" value={amount} onChange={(event) => { setAmount(event.target.value); if (amountError) setAmountError(""); }} aria-invalid={Boolean(amountError)} aria-describedby={amountError ? `final-amount-error-${booking._id}` : undefined} className="min-h-11 rounded-xl bg-background pl-8" placeholder={formatCurrency(booking.basePrice)} /></div>{amountError && <p id={`final-amount-error-${booking._id}`} role="alert" className="text-xs text-destructive">{amountError}</p>}</div><DialogFooter className="flex-col-reverse gap-2 sm:flex-row"><Button type="button" variant="outline" onClick={() => setCompleteOpen(false)} disabled={busy} className="min-h-11 rounded-xl">Cancel</Button><Button type="submit" disabled={busy} className="min-h-11 rounded-xl bg-primary text-primary-foreground hover:bg-[#4338A8]">{busy ? <><LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Saving...</> : <><Wrench className="size-4" aria-hidden="true" /> Confirm Completion</>}</Button></DialogFooter></form></DialogContent></Dialog>
  </>;

  return null;
}
