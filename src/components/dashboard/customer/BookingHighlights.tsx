import { CalendarClock, CircleDollarSign, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/dashboard/format";
import type { BookingHighlights as BookingHighlightsData } from "@/lib/dashboard/types";

export function BookingHighlights({ highlights }: { highlights: BookingHighlightsData }) {
  const pending = highlights.pendingRequests;
  const progress = highlights.inProgress;
  const due = highlights.paymentDue;

  return (
    <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
      <HighlightCard label="Awaiting Dispatch" icon={CalendarClock} tone="blue">
        <p className="text-base font-semibold text-foreground">{pending.count ? `${pending.count} Request${pending.count === 1 ? "" : "s"} Pending` : "No pending requests"}</p>
        {pending.count > 0 && <p className="mt-1 line-clamp-1 text-xs text-[#2563EB] dark:text-blue-300" title={pending.latestTitle || undefined}>{pending.latestTitle || "Repair request"}</p>}
      </HighlightCard>

      <HighlightCard label="Under Repair" icon={Wrench} tone="orange">
        <p className="line-clamp-1 text-base font-semibold text-foreground" title={progress.latestTitle || undefined}>{progress.count ? progress.latestTitle || "Repair in progress" : "No jobs in progress"}</p>
        {progress.count > 0 && <p className="mt-1 text-xs text-[#C2410C] dark:text-orange-300">{progress.count > 1 ? `${progress.count} Jobs In Progress` : "Your technician is working on it"}</p>}
      </HighlightCard>

      <HighlightCard label="Action Required" icon={CircleDollarSign} tone="orange">
        <div className="flex flex-wrap items-baseline justify-between gap-2"><p className="text-base font-semibold text-foreground">{due.count ? `${due.count} Payment${due.count === 1 ? "" : "s"} Due` : "No payments due"}</p>{due.count > 0 && <p className="text-sm font-bold tabular-nums text-[#C2410C] dark:text-orange-300">{formatCurrency(due.totalAmount)}</p>}</div>
        {due.count > 0 && <p className="mt-1 line-clamp-1 text-xs text-[#C2410C] dark:text-orange-300" title={due.latestTitle || undefined}>{due.latestTitle ? `${due.latestTitle} completed` : "Completed repair"}</p>}
      </HighlightCard>
    </div>
  );
}

function HighlightCard({ label, icon: Icon, tone, children }: {
  label: string;
  icon: typeof CalendarClock;
  tone: "blue" | "orange";
  children: React.ReactNode;
}) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    orange: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  };
  return (
    <Card className="h-full rounded-2xl border-border bg-card shadow-sm">
      <CardContent className="flex min-h-[112px] items-center justify-between gap-3 p-4 sm:p-5">
        <div className="min-w-0 flex-1"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</p><div className="mt-1.5">{children}</div></div>
        <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}><Icon className="size-5" aria-hidden="true" /></span>
      </CardContent>
    </Card>
  );
}
