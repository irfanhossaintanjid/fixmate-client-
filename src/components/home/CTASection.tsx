import Link from "next/link";
import { ArrowRight, BadgeCheck, ListChecks } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-background px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-2xl bg-[#18112B] px-6 py-9 text-white shadow-[0_22px_50px_-24px_rgba(24,17,43,0.55)] sm:rounded-3xl sm:px-10 sm:py-11 lg:px-12 lg:py-12">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-36 -z-10 size-[25rem] rounded-full bg-[#5145CD]/35 blur-[90px]" />
          <div className="max-w-2xl">
            <span className="inline-flex rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#C4BFFF]">
              Get started today
            </span>
            <h2 className="mt-4 max-w-xl text-3xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-4xl lg:text-[2.35rem]">
              Your Device Deserves Expert Care.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#C5C1D6] sm:text-base sm:leading-7">
              Find a trusted technician, follow your repair progress, and pay online only after the job is completed.
            </p>
            <Link
              href="/services"
              className={buttonVariants({
                size: "lg",
                className: "mt-5 h-11 gap-2 rounded-xl bg-[#5145CD] px-5 text-white shadow-md shadow-black/20 hover:bg-[#4338A8] focus-visible:ring-[#A5B4FC]",
              })}
            >
              Find a Technician
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/[0.08] pt-5 text-[11px] font-medium text-[#D8D5E6] sm:mt-7 sm:pt-6">
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="size-4 text-[#818CF8]" aria-hidden="true" />
              No payment before completion
            </span>
            <span className="inline-flex items-center gap-2">
              <ListChecks className="size-4 text-[#818CF8]" aria-hidden="true" />
              Follow every repair status
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
