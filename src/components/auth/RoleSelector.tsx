"use client";

import { useRef } from "react";
import { BriefcaseBusiness, Check, UserRound } from "lucide-react";

export type SignUpRole = "customer" | "technician";

const options: { value: SignUpRole; title: string; description: string; icon: typeof UserRound }[] = [
  { value: "customer", title: "Customer", description: "Request repairs and pay after completion", icon: UserRound },
  { value: "technician", title: "Technician", description: "List services and manage repair jobs", icon: BriefcaseBusiness },
];

export function RoleSelector({ value, onChange }: { value: SignUpRole; onChange: (role: SignUpRole) => void }) {
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % options.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index + options.length - 1) % options.length;
    if (nextIndex !== null) {
      event.preventDefault();
      onChange(options[nextIndex].value);
      buttons.current[nextIndex]?.focus();
    }
  }

  return (
    <div role="radiogroup" aria-label="Select your role" className="grid grid-cols-2 gap-3">
      {options.map(({ value: role, title, description, icon: Icon }, index) => {
        const selected = value === role;
        return (
          <button
            key={role}
            ref={(element) => { buttons.current[index] = element; }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(role)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`relative flex min-h-[104px] flex-col items-start rounded-2xl border p-3.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card ${selected ? "border-primary bg-primary/5 shadow-sm" : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"}`}
          >
            <span className={`mb-2.5 grid size-8 place-items-center rounded-lg ${selected ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold">{title}</span>
            <span className="mt-1 text-[11px] leading-4 text-muted-foreground">{description}</span>
            <span className={`absolute right-3 top-3 grid size-4 place-items-center rounded-full border ${selected ? "border-primary bg-primary text-primary-foreground" : "border-border text-transparent"}`}>
              {selected && <Check className="size-3" aria-hidden="true" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
