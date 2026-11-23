import Link from "next/link";
import { ArrowUpRight, BadgeCheck, EyeOff, Hourglass, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { TechnicianServiceStats } from "@/lib/dashboard/technician";

export function ServicePerformance({ stats }: { stats: TechnicianServiceStats }) {
  const rows = [
    { label: "Total Services", value: stats.total, icon: Wrench },
    { label: "Approved", value: stats.approved, icon: BadgeCheck },
    { label: "Pending Approval", value: stats.pendingApproval, icon: Hourglass },
    { label: "Unavailable", value: stats.unavailable, icon: EyeOff },
  ];
  return (
    <Card className="h-full rounded-2xl border-border bg-card shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-3"><div><CardTitle className="text-base font-semibold">Service Performance</CardTitle><CardDescription className="mt-1 text-xs">Your listings by approval and availability.</CardDescription></div><Link href="/dashboard/technician/my-services" aria-label="Manage my services" className="flex size-9 items-center justify-center rounded-lg text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ArrowUpRight className="size-4" aria-hidden="true" /></Link></CardHeader>
      <CardContent className="space-y-1">
        {rows.map(({ label, value, icon: Icon }) => <div key={label} className="flex min-h-12 items-center justify-between gap-3 border-b border-border/70 last:border-0"><span className="flex items-center gap-2 text-xs text-muted-foreground"><Icon className="size-4 text-primary" aria-hidden="true" />{label}</span><span className="text-sm font-semibold tabular-nums text-foreground">{value}</span></div>)}
        <Link href="/dashboard/technician/my-services" className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-xl border border-border text-xs font-semibold text-primary transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Manage My Services</Link>
      </CardContent>
    </Card>
  );
}
