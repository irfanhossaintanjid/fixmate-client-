import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ title, value, detail, badge = "Summary", icon: Icon, captionIcon, tone = "indigo" }: {
  title: string;
  value: number | string;
  detail: string;
  badge?: string;
  icon: LucideIcon;
  captionIcon?: LucideIcon;
  tone?: "indigo" | "amber" | "green";
}) {
  const tones = {
    indigo: { tile: "bg-[#F0ECFF] text-[#5145CD] dark:bg-[#3C345E] dark:text-[#A5B4FC]", pill: "bg-[#F2F0FA] text-[#5145CD] dark:bg-[#403953] dark:text-[#C4BFFF]", caption: "text-[#5145CD] dark:text-[#A5B4FC]" },
    amber: { tile: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300", pill: "bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300", caption: "text-amber-700 dark:text-amber-300" },
    green: { tile: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", pill: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300", caption: "text-emerald-700 dark:text-emerald-300" },
  };
  const color = tones[tone];
  const CaptionIcon = captionIcon ?? Icon;
  return (
    <Card className="h-full min-h-[140px] rounded-2xl border border-border bg-card shadow-sm">
      <CardContent className="flex h-full flex-col justify-between gap-4 p-5 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0"><p className="text-sm font-medium text-muted-foreground">{title}</p><div className="mt-1.5 flex items-center gap-2"><p className="text-3xl font-bold tracking-tight text-foreground tabular-nums">{value}</p><span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${color.pill}`}>{badge}</span></div></div>
          <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${color.tile}`}><Icon className="size-5" aria-hidden="true" /></span>
        </div>
        <p className="flex items-center gap-2 text-xs leading-5 text-muted-foreground"><CaptionIcon className={`size-3.5 shrink-0 ${color.caption}`} aria-hidden="true" />{detail}</p>
      </CardContent>
    </Card>
  );
}
