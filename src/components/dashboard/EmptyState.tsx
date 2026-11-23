import Link from "next/link";
import { ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ title, description, href = "/services", action = "Browse Services" }: {
  title: string;
  description: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-5 py-10 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><ClipboardList className="size-6" aria-hidden="true" /></span>
      <h2 className="mt-4 text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      <Button render={<Link href={href} />} className="mt-5 min-h-11 rounded-xl bg-primary px-5 text-primary-foreground hover:bg-[#4338A8]">{action}</Button>
    </div>
  );
}
