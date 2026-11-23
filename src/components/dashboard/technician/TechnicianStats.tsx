import Link from "next/link";
import { ArrowUpRight, BadgeCheck, ClipboardList, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { TechnicianOverviewData } from "@/lib/dashboard/technician";

const statStyles = {
  indigo: { icon: "bg-[#F0ECFF] text-[#5145CD] dark:bg-[#3C345E] dark:text-[#A5B4FC]", chip: "bg-[#F2F0FA] text-[#5145CD] dark:bg-[#403953] dark:text-[#C4BFFF]" },
  green: { icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", chip: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300" },
  amber: { icon: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300", chip: "bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300" },
} as const;

function TechnicianStatCard({ title, value, description, label, href, icon: Icon, tone }: {
  title: string;
  value: number;
  description: string;
  label: string;
  href: string;
  icon: LucideIcon;
  tone: keyof typeof statStyles;
}) {
  const style = statStyles[tone];
  return (
    <Card className="h-full rounded-2xl border-border bg-card shadow-sm">
      <CardContent className="flex min-h-[160px] flex-col justify-between gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground tabular-nums">{value}</p>
          </div>
          <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${style.icon}`}><Icon className="size-5" aria-hidden="true" /></span>
        </div>
        <div>
          <p className="text-xs leading-5 text-muted-foreground">{description}</p>
          <Link href={href} className="mt-3 inline-flex min-h-8 items-center gap-1 rounded-md text-xs font-semibold text-primary transition hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className={`rounded-full px-2 py-0.5 ${style.chip}`}>{label}</span><ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export function TechnicianStats({ data }: { data: TechnicianOverviewData }) {
  return (
    <section aria-label="Technician statistics" className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <TechnicianStatCard title="Total Services" value={data.services.total} description="All your registered repair services." label="View Services" href="/dashboard/technician/my-services" icon={Wrench} tone="indigo" />
      <TechnicianStatCard title="Approved Services" value={data.services.approved} description="Services approved and available for customers." label="View Approved Services" href="/dashboard/technician/my-services" icon={BadgeCheck} tone="green" />
      <TechnicianStatCard title="Pending Requests" value={data.bookings.byStatus.requested} description="Customer requests awaiting your response." label="Manage Requests" href="/dashboard/technician/requests" icon={ClipboardList} tone="amber" />
    </section>
  );
}
