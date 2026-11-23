"use client";

import { useState } from "react";
import type { BookingSummary, BookingStatus } from "@/lib/dashboard/types";
import { BOOKING_STATUS_CONFIG } from "@/lib/dashboard/status";
import { StatusLegend } from "@/components/dashboard/customer/StatusLegend";

const radius = 68;
const circumference = 2 * Math.PI * radius;

export function StatusDonutChart({ summary }: { summary: BookingSummary }) {
  const [activeStatus, setActiveStatus] = useState<BookingStatus | null>(null);
  let elapsed = 0;
  const textAlternative = BOOKING_STATUS_CONFIG.map(({ key, label }) => `${label}: ${summary.byStatus[key]}`).join(", ");

  return (
    <section aria-label={`Bookings by status. ${textAlternative}`} className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Bookings by status</h2>
          <p className="mt-1 text-xs text-muted-foreground">Distribution across your repair lifecycle</p>
        </div>
        <span className="inline-flex w-fit items-center rounded-lg bg-[#F5EEFF] px-3 py-1.5 text-[11px] font-medium text-[#5145CD] dark:bg-[#403953] dark:text-[#C4BFFF]">{summary.total} Total Entries Recorded</span>
      </div>

      <div className="mt-5 grid items-center gap-6 lg:grid-cols-[minmax(220px,0.85fr)_minmax(0,1.4fr)]">
        <div className="flex flex-col items-center">
          <div className="relative size-[210px] max-w-full" role="group" aria-label={`Status chart: ${textAlternative}`}>
            <svg viewBox="0 0 180 180" className="size-full overflow-visible">
              <circle cx="90" cy="90" r={radius} fill="none" stroke="currentColor" strokeWidth="25" className="text-[#F0ECF8] dark:text-[#403953]" />
              {summary.total > 0 && BOOKING_STATUS_CONFIG.map((status) => {
                const count = summary.byStatus[status.key];
                if (!count) return null;
                const segment = (count / summary.total) * circumference;
                const offset = elapsed;
                elapsed += segment;
                const highlighted = activeStatus === null || activeStatus === status.key;
                return (
                  <circle
                    key={status.key}
                    cx="90" cy="90" r={radius} fill="none" stroke={status.color} strokeWidth={activeStatus === status.key ? 29 : 25}
                    strokeDasharray={`${segment} ${circumference - segment}`} strokeDashoffset={-offset}
                    transform="rotate(-90 90 90)" opacity={highlighted ? 1 : 0.3}
                    tabIndex={0} role="button" aria-label={`${status.label}: ${count} (${((count / summary.total) * 100).toFixed(1)}%)`}
                    onMouseEnter={() => setActiveStatus(status.key)} onMouseLeave={() => setActiveStatus(null)}
                    onFocus={() => setActiveStatus(status.key)} onBlur={() => setActiveStatus(null)}
                    onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveStatus(status.key); } }}
                    className="cursor-pointer outline-none transition-[opacity,stroke-width] focus-visible:drop-shadow-[0_0_3px_rgba(81,69,205,0.8)]"
                  />
                );
              })}
            </svg>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold leading-none tabular-nums text-foreground">{summary.total}</span>
              <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Total</span>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">Hover segments to highlight categories</p>
        </div>
        <StatusLegend summary={summary} activeStatus={activeStatus} onHighlight={setActiveStatus} />
      </div>
    </section>
  );
}
