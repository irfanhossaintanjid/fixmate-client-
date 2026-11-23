import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function AboutCTA() {
  return (
    <section className="bg-background px-5 pb-16 pt-4 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card px-6 py-8 shadow-sm sm:flex-row sm:items-center sm:px-9 sm:py-10 lg:px-12">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">FixMate</p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-foreground sm:text-3xl">
            Your Device Deserves Expert Care.
          </h2>
        </div>
        <Link
          href="/services"
          className={buttonVariants({
            size: "lg",
            className: "h-11 shrink-0 gap-2 rounded-xl bg-primary px-5 text-primary-foreground hover:bg-[#4338A8]",
          })}
        >
          Find a Technician
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
