import { Check } from "lucide-react";
import { otherRepairOutcomes, repairStatuses } from "@/constants/about-content";
import { SectionHeading } from "@/components/about/SectionHeading";

export function StatusTimeline() {
  return (
    <section className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Repair Updates" title="Follow Every Step of Your Repair" />

        <ol className="relative mt-9 grid gap-5 before:absolute before:bottom-7 before:left-[15px] before:top-7 before:w-px before:bg-border sm:mt-12 md:grid-cols-5 md:gap-4 md:before:bottom-auto md:before:left-[8%] md:before:right-[8%] md:before:top-[17px] md:before:h-px md:before:w-auto">
          {repairStatuses.map((status, index) => (
            <li key={status.title} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
              <span
                className="relative z-10 mt-1 grid size-8 shrink-0 place-items-center rounded-full border-[3px] border-background text-white shadow-sm md:mt-0"
                style={{ backgroundColor: status.color }}
                aria-label={`Step ${index + 1}`}
              >
                {index === 0 ? (
                  <span className="size-2 rounded-full bg-white" />
                ) : (
                  <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0 pb-2 md:pt-3">
                <span
                  className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{ backgroundColor: status.tint, color: status.textColor }}
                >
                  {status.title}
                </span>
                <p className="mt-2 max-w-[230px] text-sm leading-5 text-muted-foreground md:mx-auto">
                  {status.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-2xl border border-border bg-card p-4 sm:mt-10 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Other outcomes
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {otherRepairOutcomes.map((outcome) => (
              <div key={outcome.title} className="flex items-start gap-3 rounded-xl bg-muted/60 p-3.5">
                <span
                  className="mt-0.5 inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{ backgroundColor: outcome.tint, color: outcome.textColor }}
                >
                  {outcome.title}
                </span>
                <p className="text-sm leading-5 text-muted-foreground">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
