"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/toast";
import { setTechnicianServiceAvailability } from "@/lib/actions/services";
import type { TechnicianService } from "@/types/service";

export function ServiceAvailabilitySwitch({ service }: { service: TechnicianService }) {
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const available = service.isAvailable;

  async function toggle(nextValue: boolean) {
    if (saving || nextValue === available) return;
    setSaving(true);
    const result = await setTechnicianServiceAvailability(service.id, nextValue);
    if (!result.ok) {
      toast.add({ title: "Availability not updated", description: result.message, type: "error" });
    } else {
      toast.add({ title: nextValue ? "Service marked available" : "Service marked unavailable", type: "success" });
      router.refresh();
    }
    setSaving(false);
  }

  const marketplaceVisible = service.approvalStatus === "approved" && available;
  const note = !available ? "Hidden from the marketplace" : service.approvalStatus === "approved" ? "Visible on the marketplace" : service.approvalStatus === "pending" ? "Queued until admin approval" : "Still hidden until approved";

  return <div className="flex min-w-[112px] items-center gap-2"><div className="flex flex-col items-start gap-1"><span className={`text-xs font-medium ${marketplaceVisible ? "text-emerald-700 dark:text-emerald-300" : "text-muted-foreground"}`}>{available ? "On" : "Off"}{available && service.approvalStatus !== "approved" ? " · queued" : ""}</span><span className="max-w-28 text-[10px] leading-3 text-muted-foreground">{note}</span></div><Switch checked={available} onCheckedChange={(value) => void toggle(value)} disabled={saving} aria-label={`${available ? "Mark unavailable" : "Mark available"}: ${service.title}`} title={note} className="data-checked:bg-primary" />{saving && <LoaderCircle className="size-3.5 animate-spin text-primary" aria-label="Saving availability" />}</div>;
}
