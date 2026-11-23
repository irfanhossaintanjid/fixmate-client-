import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StripeNote() {
  return (
    <aside className="flex flex-col gap-5 rounded-2xl bg-gradient-to-r from-[#18112B] to-[#312E81] p-5 text-white shadow-lg shadow-[#18112B]/15 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex min-w-0 items-start gap-3.5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#A5B4FC]"><ShieldCheck className="size-5" aria-hidden="true" /></span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold">Pay only after the work is done</h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-white/75">FixMate charges you only after a technician marks your job as completed. Payments are processed securely by Stripe, and your card details are never stored on FixMate servers.</p>
        </div>
      </div>
      <Button render={<Link href="/dashboard/customer/bookings" />} className="min-h-11 shrink-0 rounded-xl bg-[#5145CD] px-4 text-white hover:bg-[#6366F1] focus-visible:ring-2 focus-visible:ring-[#A5B4FC]">Go to My Bookings <ArrowRight className="size-4" aria-hidden="true" /></Button>
    </aside>
  );
}
