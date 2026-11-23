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
} from "lucide-react";
import { CategoryCard } from "@/components/ui/category-card";

const categories = [
  {
    title: "Smartphone",
    description: "Screen, battery, charging, and software repairs.",
    icon: Smartphone,
  },
  {
    title: "Laptop & PC",
    description: "Hardware, performance, display, and setup support.",
    icon: Laptop,
  },
  {
    title: "Air Conditioner",
    description: "Cooling, cleaning, installation, and maintenance.",
    icon: Fan,
  },
  {
    title: "Refrigerator",
    description: "Cooling, leaks, unusual noise, and appliance care.",
    icon: Refrigerator,
  },
  {
    title: "Television",
    description: "Screen, picture, sound, and connectivity repairs.",
    icon: Tv,
  },
  {
    title: "Washing Machine",
    description: "Drainage, spin cycle, vibration, and other repairs.",
    icon: WashingMachine,
  },
];

export function CategoriesSection() {
  return (
    <section id="categories" className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
              Categories
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-foreground sm:text-3xl lg:text-[2.1rem]">
              Find the Right Repair Service
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground sm:text-[0.95rem]">
              Explore professional repair solutions for your essential devices
              and home appliances.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex w-fit items-center gap-2 rounded-md text-sm font-medium text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
          >
            Explore all services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
          <CategoryCard
            title="Electrical Systems"
            description="Home wiring, lighting, outlets, and electrical troubleshooting."
            icon={Zap}
            className="lg:col-span-2"
          />
        </div>
      </div>
    </section>
  );
}
