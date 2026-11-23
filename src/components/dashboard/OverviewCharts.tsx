"use client";

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BookingSummary } from "@/lib/dashboard/types";
import { monthLabel } from "@/lib/dashboard/format";

const statuses = [
  { key: "requested", label: "Requested", color: "#3B82F6" },
  { key: "accepted", label: "Accepted", color: "#6366F1" },
  { key: "in-progress", label: "In Progress", color: "#D97706" },
  { key: "completed", label: "Completed", color: "#16A34A" },
  { key: "rejected", label: "Rejected", color: "#DC2626" },
  { key: "cancelled", label: "Cancelled", color: "#64748B" },
] as const;

export function OverviewCharts({ summary }: { summary: BookingSummary }) {
  const statusData = statuses.map((status) => ({ name: status.label, value: summary.byStatus[status.key], color: status.color })).filter((item) => item.value > 0);
  const monthly = summary.perMonth.map((item) => ({ month: monthLabel(item.month), requests: item.count }));
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <Card className="rounded-2xl border-border bg-card shadow-sm">
        <CardHeader><CardTitle className="text-base">Bookings by status</CardTitle></CardHeader>
        <CardContent>
          {summary.total === 0 ? <ChartEmpty /> : <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_160px]">
            <div className="h-56 min-w-0">
              <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={statusData} dataKey="value" nameKey="name" innerRadius={56} outerRadius={82} paddingAngle={3} stroke="none">{statusData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
            </div>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs sm:grid-cols-1">{statuses.map((status) => <li key={status.key} className="flex items-center justify-between gap-2 text-muted-foreground"><span className="flex items-center gap-2"><span className="size-2.5 rounded-full" style={{ backgroundColor: status.color }} />{status.label}</span><span className="font-semibold tabular-nums text-foreground">{summary.byStatus[status.key]}</span></li>)}</ul>
          </div>}
        </CardContent>
      </Card>
      <Card className="rounded-2xl border-border bg-card shadow-sm">
        <CardHeader><CardTitle className="text-base">Requests per month</CardTitle></CardHeader>
        <CardContent>
          {summary.total === 0 ? <ChartEmpty /> : <div className="h-56 min-w-0">
            <ResponsiveContainer width="100%" height="100%"><BarChart data={monthly} margin={{ left: -18, right: 8, top: 8 }}><CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" /><XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} /><YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "var(--muted-foreground)", fontSize: 12 }} /><Tooltip /><Bar dataKey="requests" fill="#5145CD" radius={[6, 6, 0, 0]} maxBarSize={42} /></BarChart></ResponsiveContainer>
          </div>}
        </CardContent>
      </Card>
    </div>
  );
}

function ChartEmpty() {
  return <div className="flex h-56 items-center justify-center rounded-xl bg-muted/40 px-5 text-center text-sm text-muted-foreground">Your booking activity will appear here.</div>;
}
