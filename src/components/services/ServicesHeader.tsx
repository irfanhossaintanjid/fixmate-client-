import { SectionHeading } from "@/components/about/SectionHeading";

export function ServicesHeader() {
  return (
    <div className="mb-8 text-left sm:mb-9">
      <SectionHeading
        align="left"
        eyebrow="Browse Services"
        title="Find the Right Repair Service"
        description="Explore approved services from technicians and pay only after the job is completed."
      />
    </div>
  );
}
