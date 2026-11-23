"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ChevronDown, Plus, Search, Store, Wrench, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MyServicesStats } from "@/components/dashboard/technician/my-services/MyServicesStats";
import { ServiceStatusTabs, type ServiceStatusFilter } from "@/components/dashboard/technician/my-services/ServiceStatusTabs";
import { ServiceApprovalBadge } from "@/components/dashboard/technician/my-services/ServiceApprovalBadge";
import { ServiceAvailabilitySwitch } from "@/components/dashboard/technician/my-services/ServiceAvailabilitySwitch";
import { EditServiceDialog } from "@/components/dashboard/technician/my-services/EditServiceDialog";
import { DeleteServiceDialog } from "@/components/dashboard/technician/my-services/DeleteServiceDialog";
import { MyServicesEmptyState } from "@/components/dashboard/technician/my-services/MyServicesEmptyState";
import { serviceCategories, type TechnicianService } from "@/types/service";

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function MyServicesOverview({ services }: { services: TechnicianService[] }) {
  const [status, setStatus] = useState<ServiceStatusFilter>("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const router = useRouter();
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return services.filter((service) =>
      (status === "all" || service.approvalStatus === status) &&
      (category === "all" || service.category === category) &&
      (!term || service.title.toLocaleLowerCase().includes(term) || service.category.toLocaleLowerCase().includes(term)),
    );
  }, [services, status, category, query]);
  const resetFilters = () => { setStatus("all"); setCategory("all"); setQuery(""); };

  return <div className="mx-auto w-full max-w-[1480px] space-y-5">
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[.12em] text-primary">Catalog Management <span className="px-1 text-accent">•</span><span className="normal-case tracking-normal text-muted-foreground">Live Inventory</span></p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">My Services</h1>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">Manage your active repair offerings, review administrative approvals, and control marketplace availability.</p>
      </div>
      <Button render={<Link href="/dashboard/technician/add-service" />} className="min-h-11 shrink-0 rounded-xl bg-primary px-4 text-primary-foreground shadow-sm hover:bg-[#4338A8]"><Plus className="size-4" aria-hidden="true" /> Add New Service</Button>
    </header>

    <MyServicesStats services={services} />

    <Card className="rounded-2xl border-border bg-card shadow-sm">
      <CardContent className="flex flex-col gap-3 p-3 sm:p-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-full overflow-x-auto pb-1 xl:pb-0"><ServiceStatusTabs services={services} value={status} onChange={setStatus} /></div>
        <div className="flex flex-col gap-2 sm:flex-row xl:w-[min(100%,510px)]">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search services or categories</span><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search services or categories..." className="min-h-10 rounded-xl border-border bg-background pl-9 pr-9" />
            {query && <button type="button" onClick={() => setQuery("")} className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Clear search"><X className="size-4" /></button>}
          </label>
          <label className="relative min-w-0 sm:w-48">
            <span className="sr-only">Filter by category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 w-full appearance-none rounded-xl border border-border bg-background px-3 pr-9 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"><option value="all">All Categories</option>{serviceCategories.map((item) => <option key={item} value={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          </label>
        </div>
      </CardContent>
    </Card>

    {services.length === 0 ? <MyServicesEmptyState noServices onClear={resetFilters} /> : filtered.length === 0 ? <MyServicesEmptyState noServices={false} onClear={resetFilters} /> : <>
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] table-fixed text-left">
            <thead className="bg-[#F7F4FF] text-[10px] font-bold uppercase tracking-wide text-muted-foreground dark:bg-[#27223A]"><tr><th scope="col" className="w-[31%] px-5 py-3.5">Service Details</th><th scope="col" className="w-[12%] px-3 py-3.5">Category</th><th scope="col" className="w-[13%] px-3 py-3.5">Base Price</th><th scope="col" className="w-[14%] px-3 py-3.5">Admin Status</th><th scope="col" className="w-[18%] px-3 py-3.5">Marketplace</th><th scope="col" className="w-[12%] px-3 py-3.5 text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-border">
              {filtered.map((service) => <tr key={service.id} className="transition-colors hover:bg-primary/[.035]">
                <td className="px-5 py-4"><div className="flex min-w-0 items-center gap-3"><ServiceThumbnail service={service} /><div className="min-w-0"><p className="truncate text-sm font-semibold text-foreground">{service.title}</p><p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{service.description}</p><p className="mt-1 flex flex-wrap items-center gap-x-2 text-[10px] text-muted-foreground"><span>{service.serviceMode}</span>{service.estimatedDuration && <><span aria-hidden="true">·</span><span>{service.estimatedDuration}</span></>}</p></div></div></td>
                <td className="px-3 py-4"><span className="inline-flex max-w-full rounded-full bg-[#F0ECFF] px-2.5 py-1 text-[11px] font-medium text-[#5145CD] dark:bg-[#40365F] dark:text-[#C4BFFF]">{service.category}</span></td>
                <td className="px-3 py-4"><p className="text-sm font-bold tabular-nums text-foreground">{money.format(service.basePrice)}</p><p className="mt-0.5 text-[10px] text-muted-foreground">Starting price</p></td>
                <td className="px-3 py-4"><div className="space-y-1.5"><ServiceApprovalBadge status={service.approvalStatus} />{service.approvalStatus === "rejected" && service.rejectionReason && <p title={service.rejectionReason} className="max-w-32 truncate text-[10px] text-red-600 dark:text-red-300">{service.rejectionReason}</p>}</div></td>
                <td className="px-3 py-4"><ServiceAvailabilitySwitch service={service} /></td>
                <td className="px-3 py-4"><div className="flex justify-end gap-1"><EditServiceDialog service={service} /><DeleteServiceDialog service={service} /></div></td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-1 border-t border-border px-5 py-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>Showing {filtered.length} of {services.length} services</span><span>Marketplace visibility requires approval and availability</span></div>
      </div>

      <div className="grid gap-3 md:hidden">
        {filtered.map((service) => <MobileServiceCard key={service.id} service={service} />)}
        <div className="px-1 text-xs text-muted-foreground">Showing {filtered.length} of {services.length} services</div>
      </div>
    </>}

    {services.length > 0 && <div className="flex flex-col gap-3 rounded-2xl border border-primary/10 bg-primary/[.045] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"><div className="flex items-start gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Store className="size-4" aria-hidden="true" /></span><div><p className="text-sm font-semibold text-foreground">Marketplace Availability</p><p className="mt-0.5 max-w-3xl text-xs leading-5 text-muted-foreground">Only services marked available and approved by an admin appear to customers. Pending and rejected services remain hidden until approval.</p></div></div><Button type="button" variant="outline" onClick={() => router.refresh()} className="min-h-10 shrink-0 rounded-xl bg-card">Refresh listings <ArrowUpRight className="size-4" aria-hidden="true" /></Button></div>}
  </div>;
}

function ServiceThumbnail({ service }: { service: TechnicianService }) {
  return <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F1EBFF] text-primary dark:bg-[#40365F]">{service.image ? <Image src={service.image} alt="" fill sizes="48px" className="object-cover" /> : <Wrench className="size-5" aria-hidden="true" />}</div>;
}

function MobileServiceCard({ service }: { service: TechnicianService }) {
  return <Card className="overflow-hidden rounded-2xl border-border bg-card shadow-sm"><CardContent className="space-y-4 p-4">
    <div className="flex items-start gap-3"><ServiceThumbnail service={service} /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><h2 className="line-clamp-2 text-sm font-semibold text-foreground">{service.title}</h2><span className="shrink-0 text-sm font-bold tabular-nums text-foreground">{money.format(service.basePrice)}</span></div><p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{service.description}</p><div className="mt-2 flex flex-wrap gap-1.5"><span className="rounded-full bg-[#F0ECFF] px-2 py-1 text-[10px] text-[#5145CD] dark:bg-[#40365F] dark:text-[#C4BFFF]">{service.category}</span><span className="rounded-full bg-muted px-2 py-1 text-[10px] text-muted-foreground">{service.serviceMode}</span></div></div></div>
    <div className="grid grid-cols-2 gap-3 border-t border-border pt-3"><div><p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Admin Status</p><div className="mt-1"><ServiceApprovalBadge status={service.approvalStatus} /></div>{service.approvalStatus === "rejected" && service.rejectionReason && <p className="mt-1 line-clamp-2 text-[10px] text-red-600 dark:text-red-300">{service.rejectionReason}</p>}</div><div><p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Price & Duration</p><p className="mt-1 text-xs font-medium text-foreground">{service.estimatedDuration || "Duration not set"}</p></div></div>
    <div className="flex items-center justify-between gap-2 rounded-xl bg-muted/60 p-3"><div><p className="text-xs font-semibold text-foreground">Marketplace Availability</p><p className="mt-0.5 text-[10px] text-muted-foreground">{service.approvalStatus === "approved" && service.isAvailable ? "Visible to customers" : service.approvalStatus === "pending" && service.isAvailable ? "Queued for approval" : service.approvalStatus === "rejected" && service.isAvailable ? "Hidden until approved" : "Hidden from customers"}</p></div><ServiceAvailabilitySwitch service={service} /></div>
    <div className="flex justify-end gap-2 border-t border-border pt-2"><EditServiceDialog service={service} /><DeleteServiceDialog service={service} /></div>
  </CardContent></Card>;
}
