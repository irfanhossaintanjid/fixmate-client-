import Link from "next/link";
import type { BookingCounts } from "@/lib/dashboard/types";

const tabs = [
  { label: "All", value: "all" },
  { label: "Requested", value: "requested" },
  { label: "Accepted", value: "accepted" },
  { label: "In Progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
] as const;

export function BookingStatusTabs({ counts, selected }: { counts: BookingCounts; selected: string }) {
  return (
    <nav aria-label="Filter bookings by status" className="flex gap-1.5 overflow-x-auto rounded-xl border border-border bg-card p-2">
      {tabs.map((tab) => {
        const count = tab.value === "all" ? counts.all : counts[tab.value];
        const href = tab.value === "all" ? "/dashboard/customer/bookings" : `/dashboard/customer/bookings?status=${encodeURIComponent(tab.value)}`;
        return (
          <Link key={tab.value} href={href} aria-current={selected === tab.value ? "page" : undefined} className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-4 sm:text-sm ${selected === tab.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}>
            {tab.label}<span className={`text-[10px] tabular-nums ${selected === tab.value ? "text-primary-foreground/80" : "text-muted-foreground"}`}>({count})</span>
          </Link>
        );
      })}
    </nav>
  );
}
