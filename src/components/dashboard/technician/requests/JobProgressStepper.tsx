import { Check } from "lucide-react";
import type { BookingStatus } from "@/lib/dashboard/types";

const stages: { key: BookingStatus; label: string }[] = [
  { key: "requested", label: "Requested" },
  { key: "accepted", label: "Accepted" },
  { key: "in-progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
];

export function JobProgressStepper({ status }: { status: BookingStatus }) {
  if (status === "rejected" || status === "cancelled") return <div className={`rounded-xl px-3 py-2 text-sm font-semibold ${status === "rejected" ? "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}>Request {status}</div>;
  const activeIndex = stages.findIndex((stage) => stage.key === status);
  return <ol aria-label={`Job progress: ${status}`} className="grid grid-cols-4 gap-1.5">
    {stages.map((stage, index) => {
      const complete = index < activeIndex;
      const active = index === activeIndex;
      return <li key={stage.key} className="min-w-0 text-center"><span className={`mx-auto flex size-6 items-center justify-center rounded-full border text-[10px] font-semibold ${complete ? "border-primary bg-primary text-primary-foreground" : active ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted text-muted-foreground"}`}>{complete ? <Check className="size-3.5" aria-hidden="true" /> : index + 1}</span><span className={`mt-1 block truncate text-[9px] leading-3 sm:text-[10px] ${active ? "font-semibold text-primary" : "text-muted-foreground"}`}>{stage.label}</span></li>;
    })}
  </ol>;
}
