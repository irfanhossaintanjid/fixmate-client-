import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard, type ServiceCardProps } from "@/components/ui/service-card";

const sampleServices: ServiceCardProps[] = [
  {
    title: "Phone Screen & Battery Repair",
    category: "Smartphone",
    kind: "phone",
    mode: "Repair options vary",
    price: "Price on request",
    technician: "Technician details shown with listing",
    location: "Service area varies by provider",
  },
  {
    title: "Laptop Hardware & Diagnostics",
    category: "Laptop & PC",
    kind: "laptop",
    mode: "Repair options vary",
    price: "Price on request",
    technician: "Technician details shown with listing",
    location: "Service area varies by provider",
  },
  {
    title: "Air Conditioner Service & Repair",
    category: "Air Conditioner",
    kind: "ac",
    mode: "Repair options vary",
    price: "Price on request",
    technician: "Technician details shown with listing",
    location: "Service area varies by provider",
  },
  {
    title: "Refrigerator Repair & Diagnostics",
    category: "Refrigerator",
    kind: "fridge",
    mode: "Repair options vary",
    price: "Price on request",
    technician: "Technician details shown with listing",
    location: "Service area varies by provider",
  },
  {
    title: "Television Display & Audio Repair",
    category: "Television",
    kind: "tv",
    mode: "Repair options vary",
    price: "Price on request",
    technician: "Technician details shown with listing",
    location: "Service area varies by provider",
  },
  {
    title: "Washing Machine Repair & Servicing",
    category: "Washing Machine",
    kind: "washer",
    mode: "Repair options vary",
    price: "Price on request",
    technician: "Technician details shown with listing",
    location: "Service area varies by provider",
  },
];

export function FeaturedServices() {
  return (
    <section id="featured-services" className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-xl text-center sm:mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">
            Featured Solutions
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-foreground sm:text-3xl lg:text-[2.1rem]">
            Popular Repair Services
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-[0.95rem]">
            Explore repair options for the devices and appliances you rely on.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {sampleServices.map((service) => (
            <ServiceCard key={service.kind} {...service} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/services"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-xs font-medium text-foreground shadow-sm transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Browse all repair services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
