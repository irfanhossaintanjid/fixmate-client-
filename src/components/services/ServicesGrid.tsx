import { ServiceCard } from "@/components/ui/service-card";
import type { Service } from "@/types/service";

const categoryKind: Record<string, string> = {
  Smartphone: "phone",
  "Laptop & PC": "laptop",
  AC: "ac",
  Refrigerator: "fridge",
  TV: "tv",
  "Washing Machine": "washer",
  Electrical: "electrical",
};

export function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          title={service.title}
          category={service.category}
          kind={categoryKind[service.category] ?? "electrical"}
          mode={service.serviceMode}
          price={`$${service.basePrice.toLocaleString("en-US", { maximumFractionDigits: 2 })}`}
          technician={service.technicianName}
          location={service.serviceArea}
          image={service.image}
          serviceId={service.id}
          isSample={false}
        />
      ))}
    </div>
  );
}
