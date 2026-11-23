import Link from "next/link";
import { SearchX, Wrench } from "lucide-react";

export function ServicesEmptyState({ hasAnyServices }: { hasAnyServices: boolean }) {
  const Icon = hasAnyServices ? SearchX : Wrench;
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><Icon className="size-6" aria-hidden="true" /></span>
      <h2 className="mt-4 text-lg font-semibold text-foreground">{hasAnyServices ? "No services found" : "Services are being prepared"}</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{hasAnyServices ? "Try a different keyword or clear your filters." : "There are no available services to browse right now. Please check back soon."}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {hasAnyServices ? <Link href="/services" className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-[#4338A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Clear filters</Link> : null}
        <Link href="/" className="inline-flex h-10 items-center rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Back to Home</Link>
      </div>
    </div>
  );
}
