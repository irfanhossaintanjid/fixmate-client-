import Link from "next/link";
import { SearchX, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MyServicesEmptyState({ noServices, onClear }: { noServices: boolean; onClear: () => void }) {
  const Icon = noServices ? Wrench : SearchX;
  return <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-5 py-10 text-center"><span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-6" aria-hidden="true" /></span><h2 className="mt-4 text-lg font-semibold text-foreground">{noServices ? "No Services Yet" : "No Matching Services"}</h2><p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">{noServices ? "Start showcasing your repair expertise by adding your first service." : "Try changing your search term or category filter."}</p>{noServices ? <Button render={<Link href="/dashboard/technician/add-service" />} className="mt-5 min-h-11 rounded-xl bg-primary px-5 text-primary-foreground hover:bg-[#4338A8]">Add Your First Service</Button> : <Button type="button" variant="outline" onClick={onClear} className="mt-5 min-h-11 rounded-xl px-5">Clear filters</Button>}</div>;
}
