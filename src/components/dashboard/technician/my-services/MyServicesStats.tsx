import { AlertCircle, CheckCircle2, Hourglass, Layers3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { TechnicianService } from "@/types/service";

export function MyServicesStats({ services }: { services: TechnicianService[] }) {
  const stats = [
    { label: "Total Offerings", value: services.length, detail: "Your registered repair services.", icon: Layers3, tone: "indigo" },
    { label: "Active on Market", value: services.filter((service) => service.approvalStatus === "approved" && service.isAvailable).length, detail: "Approved and available to customers.", icon: CheckCircle2, tone: "green" },
    { label: "Pending Review", value: services.filter((service) => service.approvalStatus === "pending").length, detail: "Waiting for admin approval.", icon: Hourglass, tone: "amber" },
    { label: "Needs Revision", value: services.filter((service) => service.approvalStatus === "rejected").length, detail: "Review the admin feedback and update your service.", icon: AlertCircle, tone: "red" },
  ] as const;
  const styles = {
    indigo: "bg-[#F0ECFF] text-[#5145CD] dark:bg-[#3C345E] dark:text-[#A5B4FC]",
    green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    red: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  };

  return <section aria-label="Service listing statistics" className="grid grid-cols-2 gap-3 xl:grid-cols-4">{stats.map(({ label, value, detail, icon: Icon, tone }) => <Card key={label} className="h-full rounded-2xl border-border bg-card shadow-sm"><CardContent className="flex min-h-[132px] flex-col justify-between gap-3 p-4 sm:p-5"><div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-bold tabular-nums text-foreground">{value}</p></div><span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${styles[tone]}`}><Icon className="size-4.5" aria-hidden="true" /></span></div><p className="text-[11px] leading-4 text-muted-foreground">{detail}</p></CardContent></Card>)}</section>;
}
