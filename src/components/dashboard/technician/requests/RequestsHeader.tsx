import Link from "next/link";
import { Plus, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RequestsHeader() {
  return <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[.12em] text-primary">Booking Management</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Manage Requests</h1><p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">Review incoming repair requests, manage your jobs, and keep customers updated throughout the repair process.</p></div><div className="flex flex-wrap items-center gap-2"><span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-medium text-muted-foreground"><Radio className="size-3.5 text-emerald-600" aria-hidden="true" /> Booking data</span><Button render={<Link href="/dashboard/technician/add-service" />} className="min-h-10 rounded-xl bg-primary px-4 text-primary-foreground hover:bg-[#4338A8]"><Plus className="size-4" aria-hidden="true" /> Add Service</Button></div></header>;
}
