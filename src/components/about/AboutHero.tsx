import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function AboutHero() {
  return (
    <section className="relative isolate overflow-hidden bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_srgb,var(--primary)_9%,transparent),transparent_58%)]"
      />
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
          <Wrench className="size-3.5" aria-hidden="true" />
          How FixMate Works
        </span>
        <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight tracking-[-0.045em] text-foreground sm:text-4xl lg:text-5xl">
          Your Repair Journey, Made Simple.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          From finding the right technician to paying after the job is done,
          every step is clear, trackable and transparent.
        </p>
        <div className="mt-7 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/services"
            className={buttonVariants({
              size: "lg",
              className: "h-11 gap-2 rounded-xl bg-primary px-5 text-primary-foreground hover:bg-[#4338A8]",
            })}
          >
            Browse Services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/sign-up"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "h-11 rounded-xl border-border bg-card px-5 text-foreground hover:border-primary/30 hover:text-primary",
            })}
          >
            Join as a Technician
          </Link>
        </div>
      </div>
    </section>
  );
}
