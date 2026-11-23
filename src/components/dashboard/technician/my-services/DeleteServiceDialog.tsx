"use client";

import { useState } from "react";
import { LoaderCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { deleteTechnicianService } from "@/lib/actions/services";
import type { TechnicianService } from "@/types/service";

export function DeleteServiceDialog({ service }: { service: TechnicianService }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (busy) return;
    setBusy(true);
    const result = await deleteTechnicianService(service.id);
    if (!result.ok) {
      toast.add({ title: "Service deletion failed", description: result.message, type: "error" });
    } else {
      toast.add({ title: "Service deleted successfully.", type: "success" });
      setOpen(false);
      router.refresh();
    }
    setBusy(false);
  }

  return <AlertDialog open={open} onOpenChange={(next) => { if (!busy) setOpen(next); }}>
    <Button type="button" variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label={`Delete ${service.title}`} title="Delete service" className="size-10 rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-300"><Trash2 className="size-4" aria-hidden="true" /></Button>
    <AlertDialogContent className="rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-6">
      <AlertDialogHeader><AlertDialogTitle>Delete Service?</AlertDialogTitle><AlertDialogDescription>Are you sure you want to delete this service? This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
      <AlertDialogFooter className="mt-2"><AlertDialogCancel disabled={busy} className="min-h-11 rounded-xl">Cancel</AlertDialogCancel><AlertDialogAction onClick={(event) => { event.preventDefault(); void remove(); }} disabled={busy} className="min-h-11 rounded-xl bg-red-600 text-white hover:bg-red-700">{busy ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <Trash2 className="size-4" aria-hidden="true" />} Delete Service</AlertDialogAction></AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>;
}
