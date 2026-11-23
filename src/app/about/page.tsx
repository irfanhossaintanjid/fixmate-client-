import type { Metadata } from "next";
import { AboutCTA } from "@/components/about/AboutCTA";
import { AboutFAQ } from "@/components/about/AboutFAQ";
import { AboutHero } from "@/components/about/AboutHero";
import { HowItWorksSteps } from "@/components/about/HowItWorksSteps";
import { RoleGuide } from "@/components/about/RoleGuide";
import { StatusTimeline } from "@/components/about/StatusTimeline";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import {
  customerGuidance,
  technicianGuidance,
} from "@/constants/about-content";

export const metadata: Metadata = {
  title: "How FixMate Works | FixMate",
  description:
    "See how to request a repair, follow its progress, and pay after the work is complete.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <HowItWorksSteps
        id="how-it-works"
        eyebrow="Transparent Process"
        title="Repairing Made Simple"
      />
      <StatusTimeline />
      <RoleGuide
        id="customers"
        eyebrow="For Customers"
        title="Built for Customers"
        items={customerGuidance}
      />
      <RoleGuide
        id="technicians"
        eyebrow="For Technicians"
        title="Built for Technicians"
        items={technicianGuidance}
      />
      <WhyChooseUs />
      <AboutFAQ />
      <AboutCTA />
    </>
  );
}
