import { SectionHeading } from "@/components/about/SectionHeading";
import { WhyChooseCards } from "@/components/about/WhyChooseCards";

export function WhyChooseUs() {
  return (
    <section className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why FixMate"
          title="Why Choose FixMate"
          description="Clear service details, repair progress you can follow, and payment after the job is complete."
        />
        <div className="mt-9 lg:mt-12">
          <WhyChooseCards />
        </div>
      </div>
    </section>
  );
}
