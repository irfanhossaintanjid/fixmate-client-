"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { BOOKING_STATUS_CONFIG } from "@/lib/dashboard/status";
import type { BookingStatus } from "@/lib/dashboard/types";

export function RequestStatusChart({ total, byStatus }: { total: number; byStatus: Record<BookingStatus, number> }) {
  const rows = BOOKING_STATUS_CONFIG.map(({ key, label, color }) => ({ name: label, value: byStatus[key], color })).filter((item) => item.value > 0);
  const description = BOOKING_STATUS_CONFIG.map(({ key, label }) => `${label} ${byStatus[key]}`).join(", ");

  if (!total) {
    return <div className="flex min-h-[230px] items-center justify-center rounded-2xl bg-muted/30 px-5 text-center text-sm text-muted-foreground">No repair requests yet.</div>;
  }

  return (
    <div className="relative mx-auto h-[230px] w-full max-w-[300px]" role="img" aria-label={`Requests by status. ${description}. Total requests: ${total}`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={rows} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius="61%" outerRadius="82%" paddingAngle={2} stroke="none" isAnimationActive={false}>
            {rows.map((row) => <Cell key={row.name} fill={row.color} />)}
          </Pie>
          <Tooltip formatter={(value) => [`${value} requests`, ""]} contentStyle={{ borderRadius: 12, borderColor: "var(--border)", background: "var(--card)", color: "var(--foreground)" }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold tabular-nums text-foreground">{total}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Total Requests</span>
      </div>
    </div>
  );
}
