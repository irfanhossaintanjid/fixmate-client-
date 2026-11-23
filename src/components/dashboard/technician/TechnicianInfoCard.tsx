import { Mail, UserRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function TechnicianInfoCard({ name, email }: { name: string; email: string }) {
  return (
    <Card className="rounded-2xl border-border bg-card shadow-sm">
      <CardHeader className="pb-3"><CardTitle className="text-base font-semibold">Technician Information</CardTitle><CardDescription className="text-xs">This information is taken from your account.</CardDescription></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5"><p className="text-xs font-medium text-muted-foreground">Technician Name</p><div className="flex min-h-11 items-center gap-2 rounded-xl border border-border bg-muted/35 px-3 text-sm text-foreground"><UserRound className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" /><span className="truncate" title={name}>{name}</span></div></div>
        <div className="space-y-1.5"><p className="text-xs font-medium text-muted-foreground">Technician Email</p><div className="flex min-h-11 items-center gap-2 rounded-xl border border-border bg-muted/35 px-3 text-sm text-foreground"><Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" /><span className="truncate" title={email}>{email}</span></div></div>
      </CardContent>
    </Card>
  );
}
