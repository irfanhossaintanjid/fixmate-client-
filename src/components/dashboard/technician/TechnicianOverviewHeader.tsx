import Link from "next/link";
import { CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TechnicianOverviewHeader() {
  const today = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date());

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Overview</h1>
        <p className="text-sm leading-6 text-muted-foreground">Monitor your repair services, booking requests, and daily performance.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-medium text-muted-foreground">
          <CalendarDays className="size-4 text-primary" aria-hidden="true" /> Today, {today}
        </span>
        <Button render={<Link href="/dashboard/technician/add-service" />} className="min-h-10 rounded-xl bg-primary px-4 text-primary-foreground hover:bg-[#4338A8]">
          <Plus className="size-4" aria-hidden="true" /> New Service
        </Button>
      </div>
    </header>
  );
}
