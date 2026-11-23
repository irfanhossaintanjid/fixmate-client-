import type { ServiceApprovalStatus, TechnicianService } from "@/types/service";

export type ServiceStatusFilter = "all" | ServiceApprovalStatus;
const tabs: { value: ServiceStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
];

export function ServiceStatusTabs({ services, value, onChange }: { services: TechnicianService[]; value: ServiceStatusFilter; onChange: (value: ServiceStatusFilter) => void }) {
  return <div className="flex min-w-max items-center gap-1" role="tablist" aria-label="Filter services by approval status">{tabs.map((tab) => {
    const count = tab.value === "all" ? services.length : services.filter((service) => service.approvalStatus === tab.value).length;
    const active = value === tab.value;
    return <button key={tab.value} type="button" role="tab" aria-selected={active} onClick={() => onChange(tab.value)} className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><span>{tab.label}</span><span className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${active ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}>{count}</span></button>;
  })}</div>;
}
