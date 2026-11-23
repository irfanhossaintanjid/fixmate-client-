import Link from "next/link";
import { BOOKING_STATUS_CONFIG } from "@/lib/dashboard/status";
import type { BookingStatus } from "@/lib/dashboard/types";
import type { TechnicianBookingCounts, RequestSort } from "@/app/dashboard/technician/requests/page";

const tabs: { key: "all" | BookingStatus; label: string }[] = [
  { key: "all", label: "All Requests" },
  ...BOOKING_STATUS_CONFIG.map(({ key, label }) => ({ key, label })),
];

export function RequestStatusTabs({ counts, selected, search, sort }: { counts: TechnicianBookingCounts; selected: "all" | BookingStatus; search: string; sort: RequestSort }) {
  return <nav aria-label="Filter repair requests by status" className="flex w-full gap-1.5 overflow-x-auto rounded-xl border border-border bg-card p-2">
    {tabs.map(({ key, label }) => {
      const active = selected === key;
      const params = new URLSearchParams();
      if (key !== "all") params.set("status", key);
      if (search) params.set("search", search);
      if (sort !== "newest") params.set("sort", sort);
      const href = `/dashboard/technician/requests${params.size ? `?${params.toString()}` : ""}`;
      return <Link key={key} href={href} aria-current={active ? "page" : undefined} className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
        {label}<span className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>{key === "all" ? counts.all : counts[key]}</span>
      </Link>;
    })}
  </nav>;
}
