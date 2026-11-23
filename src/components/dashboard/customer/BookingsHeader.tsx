import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BookingsHeader({ count }: { count: number }) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">My Bookings</h1>
          <span className="rounded-full bg-[#EEE9FF] px-2.5 py-1 text-[11px] font-semibold text-[#5145CD] dark:bg-[#403953] dark:text-[#C4BFFF]">{count} {count === 1 ? "Record" : "Records"}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Follow every repair request from start to payment.</p>
      </div>
      <Button render={<Link href="/services" />} className="min-h-11 w-full rounded-xl bg-primary px-4 text-primary-foreground hover:bg-[#4338A8] sm:w-auto"><Plus className="size-4" aria-hidden="true" />New Repair Request <ArrowRight className="size-4" aria-hidden="true" /></Button>
    </header>
  );
}
