import { LockKeyhole } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ReadOnlyField({ id, label, value, helper }: { id: string; label: string; value: string; helper: string }) {
  return (
    <div className="min-w-0 space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input id={id} value={value} readOnly disabled title={value} className="h-11 truncate bg-muted/70 pr-10 text-sm disabled:opacity-100" />
        <LockKeyhole className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      </div>
      <p className="text-xs text-muted-foreground">{helper}</p>
    </div>
  );
}
