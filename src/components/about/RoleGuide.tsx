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
import type { IconName } from "@/constants/about-content";
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

export type GuideItem = {
  title: string;
  description: string;
  icon: IconName;
};

export function RoleGuide({
  id,
  eyebrow,
  title,
  items,
}: {
  id: string;
  eyebrow: string;
  title: string;
  items: readonly GuideItem[];
}) {
  return (
    <section id={id} className="bg-background px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = icons[item.icon];
            return (
              <article key={item.title} className="h-full rounded-2xl border border-border bg-card p-5 shadow-sm shadow-[#211A4D]/[0.035] sm:p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-semibold leading-6 tracking-[-0.02em] text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
