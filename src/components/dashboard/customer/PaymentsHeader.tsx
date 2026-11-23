import Link from "next/link";
import { ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PaymentsHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEE9FF] px-3 py-1 text-[11px] font-semibold text-[#5145CD] dark:bg-[#403953] dark:text-[#C4BFFF]"><CreditCard className="size-3.5" aria-hidden="true" />Payments</span>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Payment History</h1>
        <p className="mt-1 text-sm text-muted-foreground">Every payment you have made, in one place.</p>
      </div>
      <Button render={<Link href="/dashboard/customer/bookings" />} variant="outline" className="min-h-11 w-full rounded-xl border-border bg-card px-4 sm:w-auto">
        View My Bookings <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </header>
  );
}
