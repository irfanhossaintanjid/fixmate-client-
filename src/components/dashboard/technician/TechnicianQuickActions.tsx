import Link from "next/link";
import { ArrowRight, ClipboardList, Plus, Wrench } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  { label: "Add New Service", href: "/dashboard/technician/add-service", icon: Plus },
  { label: "Manage My Services", href: "/dashboard/technician/my-services", icon: Wrench },
  { label: "Manage Repair Requests", href: "/dashboard/technician/requests", icon: ClipboardList },
];

export function TechnicianQuickActions() {
  return (
    <Card className="rounded-2xl border-border bg-card shadow-sm">
      <CardHeader className="pb-3"><CardTitle className="text-base font-semibold">Quick Actions</CardTitle><CardDescription className="mt-1 text-xs">Shortcuts to your technician workspace.</CardDescription></CardHeader>
      <CardContent className="space-y-2">
        {actions.map(({ label, href, icon: Icon }) => <Link key={href} href={href} className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-border/70 bg-muted/20 px-3 text-sm font-medium text-foreground transition hover:border-primary/30 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" aria-hidden="true" /></span>{label}</span><ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" /></Link>)}
      </CardContent>
    </Card>
  );
}
