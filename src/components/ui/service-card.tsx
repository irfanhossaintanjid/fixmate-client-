import Link from "next/link";
import {
  ArrowRight,
  Fan,
  Laptop,
  Refrigerator,
  Smartphone,
  Tv,
  WashingMachine,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";

const iconByKind: Record<string, LucideIcon> = {
  phone: Smartphone,
  laptop: Laptop,
  ac: Fan,
  fridge: Refrigerator,
  tv: Tv,
  washer: WashingMachine,
  electrical: Zap,
};

const toneByKind: Record<string, string> = {
  phone: "from-violet-100 via-indigo-50 to-slate-100 text-indigo-700 dark:from-indigo-950 dark:via-slate-900 dark:to-slate-800 dark:text-indigo-200",
  laptop: "from-sky-100 via-blue-50 to-slate-100 text-blue-700 dark:from-sky-950 dark:via-slate-900 dark:to-slate-800 dark:text-sky-200",
  ac: "from-cyan-100 via-slate-50 to-blue-100 text-cyan-700 dark:from-cyan-950 dark:via-slate-900 dark:to-blue-950 dark:text-cyan-200",
  fridge: "from-emerald-100 via-teal-50 to-slate-100 text-emerald-700 dark:from-emerald-950 dark:via-slate-900 dark:to-slate-800 dark:text-emerald-200",
  tv: "from-purple-100 via-violet-50 to-slate-100 text-violet-700 dark:from-purple-950 dark:via-slate-900 dark:to-slate-800 dark:text-violet-200",
  washer: "from-blue-100 via-indigo-50 to-slate-100 text-blue-700 dark:from-blue-950 dark:via-slate-900 dark:to-slate-800 dark:text-blue-200",
  electrical: "from-amber-100 via-orange-50 to-slate-100 text-amber-700 dark:from-amber-950 dark:via-slate-900 dark:to-slate-800 dark:text-amber-200",
};

export type ServiceCardProps = {
  title: string;
  category: string;
  kind: string;
  mode: string;
  price: string;
  technician: string;
  location: string;
};

export function ServiceCard({
  title,
  category,
  kind,
  mode,
  price,
  technician,
  location,
}: ServiceCardProps) {
  const Icon = iconByKind[kind] ?? Zap;

  return (
    <Card className="group overflow-hidden rounded-2xl border-border/80 bg-card p-0 shadow-sm shadow-[#211A4D]/[0.035] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/[0.07]">
      <div
        role="img"
        aria-label={`Illustrative ${category.toLowerCase()} repair graphic`}
        className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${toneByKind[kind] ?? toneByKind.electrical}`}
      >
        <div className="absolute -left-10 -top-20 size-52 rounded-full border border-current/10" />
        <div className="absolute -bottom-28 -right-8 size-64 rounded-full border border-current/10" />
        <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/85 px-2.5 py-1 text-[10px] font-medium text-foreground shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#18112b]/75 dark:text-foreground">
          {category}
        </span>
        <span className="absolute right-3 top-3 rounded-full border border-white/70 bg-white/85 px-2.5 py-1 text-[10px] font-medium text-muted-foreground shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#18112b]/75 dark:text-muted-foreground">
          Sample listing
        </span>
        <div className="relative grid size-24 place-items-center rounded-[1.7rem] border border-white/70 bg-white/55 shadow-xl shadow-slate-900/5 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 dark:border-white/10 dark:bg-white/[0.06]">
          <Icon className="size-12 stroke-[1.25]" aria-hidden="true" />
        </div>
      </div>

      <div className="flex min-h-[215px] flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-[15px] font-semibold leading-5 tracking-[-0.02em] text-card-foreground">
              {title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{category} repair</p>
          </div>
          <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium text-secondary-foreground">
            {mode}
          </span>
        </div>

        <div className="mt-4 space-y-2 border-t border-border/70 pt-3 text-xs text-muted-foreground">
          <p className="truncate">{technician}</p>
          <p className="truncate">{location}</p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-border/70 pt-3">
          <div>
            <span className="block text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Starting price
            </span>
            <span className="mt-0.5 block text-sm font-semibold text-foreground">{price}</span>
          </div>
          <Link
            href="/services"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-secondary px-3 text-xs font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            View details
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
