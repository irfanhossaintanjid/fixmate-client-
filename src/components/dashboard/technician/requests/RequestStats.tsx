import { BadgeCheck, BriefcaseBusiness, ClipboardList, Inbox } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { TechnicianBookingCounts } from "@/app/dashboard/technician/requests/page";

const items = [
  { label: "Total Requests", key: "all", help: "All requests assigned to you.", Icon: Inbox, style: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300" },
  { label: "Awaiting Response", key: "requested", help: "Requests waiting for your decision.", Icon: ClipboardList, style: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300" },
  { label: "Active Jobs", key: "active", help: "Accepted or currently in progress.", Icon: BriefcaseBusiness, style: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300" },
  { label: "Completed Jobs", key: "completed", help: "Repair jobs completed by you.", Icon: BadgeCheck, style: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" },
] as const;

export function RequestStats({ counts }: { counts: TechnicianBookingCounts }) {
  const values: Record<(typeof items)[number]["key"], number> = {
    all: counts.all,
    requested: counts.requested,
    active: counts.accepted + counts["in-progress"],
    completed: counts.completed,
  };
  return <section aria-label="Request statistics" className="grid grid-cols-2 gap-3 xl:grid-cols-4">{items.map(({ label, key, help, Icon, style }) => <Card key={key} className="rounded-2xl border-border bg-card shadow-sm"><CardContent className="flex min-h-32 flex-col justify-between gap-4 p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-medium text-muted-foreground">{label}</p><p className="mt-2 text-3xl font-bold tabular-nums text-foreground">{values[key]}</p></div><span className={`flex size-10 items-center justify-center rounded-xl ${style}`}><Icon className="size-5" aria-hidden="true" /></span></div><p className="text-xs leading-5 text-muted-foreground">{help}</p></CardContent></Card>)}</section>;
}
