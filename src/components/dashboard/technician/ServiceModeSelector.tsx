"use client";

import { Home, Store } from "lucide-react";
import type { ServiceMode } from "@/types/service";

const options: { value: ServiceMode; title: string; description: string; icon: typeof Home }[] = [
  { value: "Home Visit", title: "Home Visit", description: "Travel to the customer’s location.", icon: Home },
  { value: "Shop Drop-off", title: "Shop Drop-off", description: "Customers bring devices to your shop.", icon: Store },
];

export function ServiceModeSelector({ value, onChange, error }: {
  value: ServiceMode | "";
  onChange: (value: ServiceMode) => void;
  error?: string;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-foreground">Service Mode <span className="text-destructive" aria-hidden="true">*</span></legend>
      <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Service mode" aria-describedby={error ? "service-mode-error" : undefined}>
        {options.map(({ value: option, title, description, icon: Icon }) => (
          <label key={option} className={`flex min-h-[86px] cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition focus-within:ring-2 focus-within:ring-ring ${value === option ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border bg-background hover:border-primary/40"}`}>
            <input type="radio" name="serviceMode" value={option} checked={value === option} onChange={() => onChange(option)} aria-describedby={error ? "service-mode-error" : undefined} className="mt-1 size-4 accent-[#5145CD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" aria-hidden="true" /></span>
            <span className="min-w-0"><span className="block text-sm font-semibold text-foreground">{title}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{description}</span></span>
          </label>
        ))}
      </div>
      {error && <p id="service-mode-error" className="text-xs text-destructive" role="alert">{error}</p>}
    </fieldset>
  );
}
