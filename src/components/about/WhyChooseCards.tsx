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
import { whyChooseFixMate, type IconName } from "@/constants/about-content";

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

export function WhyChooseCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {whyChooseFixMate.map((benefit) => {
        const Icon = icons[benefit.icon];
        return (
          <article
            key={benefit.title}
            className="h-full min-h-[205px] rounded-2xl border border-border bg-card p-5 shadow-sm shadow-[#211A4D]/[0.035] sm:p-6"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-foreground">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {benefit.description}
            </p>
          </article>
        );
      })}
    </div>
  );
}
