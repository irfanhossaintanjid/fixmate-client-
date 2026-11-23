import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ title, value, detail, icon: Icon, tone = "indigo" }: {
  title: string;
  value: number | string;
  detail: string;
  icon: LucideIcon;
  tone?: "indigo" | "blue" | "green";
}) {
  const tones = {
    indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    green: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  };
  return (
    <Card className="h-full rounded-2xl border border-border bg-card shadow-sm">
      <CardContent className="flex items-start justify-between gap-4 p-5 sm:p-6">
        <div><p className="text-sm font-medium text-muted-foreground">{title}</p><p className="mt-2 text-3xl font-bold tracking-tight text-foreground">{value}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div>
        <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}><Icon className="size-5" aria-hidden="true" /></span>
      </CardContent>
    </Card>
  );
}
