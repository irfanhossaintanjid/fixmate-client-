import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

type CategoryCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  className?: string;
};

export function CategoryCard({
  title,
  description,
  icon: Icon,
  href = "/services",
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      aria-label={`Browse ${title} repair services`}
      className={`group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className ?? ""}`}
    >
      <Card className="flex h-full min-h-[194px] flex-col rounded-2xl border-border/80 bg-card p-5 shadow-none transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/25 group-hover:shadow-lg group-hover:shadow-primary/[0.06] sm:p-5">
        <span className="mb-4 grid size-11 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-[19px] stroke-[1.8]" aria-hidden="true" />
        </span>
        <h3 className="text-base font-semibold tracking-[-0.02em] text-card-foreground">
          {title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-muted-foreground">
          {description}
        </p>
        <span className="mt-auto flex items-center justify-between pt-5 text-xs font-medium text-primary">
          Explore category
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </Card>
    </Link>
  );
}
