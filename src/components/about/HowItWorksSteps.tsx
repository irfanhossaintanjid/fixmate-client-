import {
  Activity,
  BadgeCheck,
  CalendarCheck,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  ListChecks,
  Search,
  Settings2,
  ShieldCheck,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { howItWorksSteps, type IconName } from "@/constants/about-content";
import { SectionHeading } from "@/components/about/SectionHeading";

const icons: Record<IconName, LucideIcon> = {
  Search,
  ClipboardList,
  Wrench,
  CreditCard,
  BadgeCheck,
  CircleDollarSign,
  Activity,
  ShieldCheck,
  UserRound,
  Settings2,
  CalendarCheck,
  ListChecks,
};

export function HowItWorksSteps({
  id,
  eyebrow,
  title,
  description,
  variant = "about",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  variant?: "about" | "home";
}) {
  const isHomeVariant = variant === "home";

  return (
    <section id={id} className="bg-primary-foreground px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className={`mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 ${isHomeVariant ? "lg:gap-8" : "lg:gap-5"}`}>
          {howItWorksSteps.map((step) => {
            const Icon = icons[step.icon];
            return (
              <article
                key={step.number}
                className={isHomeVariant
                  ? "flex h-full min-h-[220px] flex-col px-1 py-2 sm:px-2"
                  : "flex h-full min-h-[245px] flex-col rounded-2xl border border-border bg-card p-5 shadow-sm shadow-[#211A4D]/[0.035] sm:p-6"}
              >
                <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-5 text-[10px] font-bold tracking-[0.13em] text-primary">
                  STEP {step.number}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-6 tracking-[-0.02em] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
