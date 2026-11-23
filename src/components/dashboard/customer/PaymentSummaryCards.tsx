import { CalendarDays, CreditCard, Wallet } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/dashboard/format";
import type { PaymentHistorySummary } from "@/lib/dashboard/types";

export function PaymentSummaryCards({ summary }: { summary: PaymentHistorySummary }) {
  const latestDate = summary.lastPaymentDate ? formatDate(summary.lastPaymentDate) : "No payments yet";
  const latestTitle = summary.latest?.serviceTitle || "No payments yet";
  const jobCaption = summary.count === 1 ? "Across 1 completed job" : `Across ${summary.count} completed jobs`;

  return (
    <section aria-label="Payment summary" className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:grid-cols-3">
      <SummaryItem icon={Wallet} label="Total Paid" value={formatCurrency(summary.totalPaid)} detail={summary.count ? jobCaption : "No payments yet"} suffix="USD" />
      <SummaryItem icon={CalendarDays} label="Last Payment" value={latestDate} detail={latestTitle} />
      <SummaryItem icon={CreditCard} label="Latest Amount" value={formatCurrency(summary.latest?.amount ?? 0)} detail={summary.count ? "Most recent payment" : "No payments yet"} />
    </section>
  );
}

function SummaryItem({ icon: Icon, label, value, detail, suffix }: {
  icon: typeof Wallet;
  label: string;
  value: string;
  detail: string;
  suffix?: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-b border-border p-4 last:border-b-0 md:border-b-0 md:border-r md:p-5 md:last:border-r-0">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#F0ECFF] text-[#5145CD] dark:bg-[#403953] dark:text-[#C4BFFF]"><Icon className="size-5" aria-hidden="true" /></span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
        <p className="mt-0.5 flex flex-wrap items-baseline gap-1.5 text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">{value}{suffix && <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{suffix}</span>}</p>
        <p className="mt-1 truncate text-xs text-muted-foreground" title={detail}>{detail}</p>
      </div>
    </div>
  );
}
