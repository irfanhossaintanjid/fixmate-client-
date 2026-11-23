"use client";

import { BOOKING_STATUS_CONFIG } from "@/lib/dashboard/status";
import type { BookingSummary, BookingStatus } from "@/lib/dashboard/types";

export function StatusLegend({ summary, activeStatus, onHighlight }: {
  summary: BookingSummary;
  activeStatus: BookingStatus | null;
  onHighlight: (status: BookingStatus | null) => void;
}) {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Booking status breakdown">
      {BOOKING_STATUS_CONFIG.map((status) => {
        const count = summary.byStatus[status.key];
        const percentage = summary.total ? (count / summary.total) * 100 : 0;
        const active = activeStatus === status.key;
        return (
          <li key={status.key}>
            <button
              type="button"
              onMouseEnter={() => onHighlight(status.key)}
              onMouseLeave={() => onHighlight(null)}
              onFocus={() => onHighlight(status.key)}
              onBlur={() => onHighlight(null)}
              aria-pressed={active}
              className={`flex min-h-[66px] w-full items-center gap-3 rounded-xl border border-transparent bg-[#F7F3FF] px-3 py-2.5 text-left transition hover:border-[#E5E1F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:bg-[#3B3355] dark:hover:border-[#625A77] ${active ? "ring-1 ring-primary/30" : ""}`}
            >
              <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: status.color }} aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold text-foreground">{status.label}</span>
                <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">{status.caption}</span>
              </span>
              <span className="text-right">
                <span className="block rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-foreground dark:bg-[#312E45]">{count}</span>
                <span className="mt-1 block text-[10px] tabular-nums text-muted-foreground">{percentage.toFixed(1)}%</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
