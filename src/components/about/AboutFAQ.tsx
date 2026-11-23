"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { aboutFAQs } from "@/constants/about-content";
import { SectionHeading } from "@/components/about/SectionHeading";

export function AboutFAQ() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <section className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card px-4 sm:mt-10 sm:px-6">
          {aboutFAQs.map((faq, index) => {
            const isOpen = openQuestion === faq.question;
            const answerId = `about-faq-answer-${index + 1}`;
            return (
              <div key={faq.question} className="py-1">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenQuestion(isOpen ? null : faq.question)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-sm font-semibold text-foreground outline-none transition-colors hover:text-primary focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring sm:text-base"
                  >
                    {faq.question}
                    <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                </h3>
                <div id={answerId} hidden={!isOpen} className="pb-4 pr-8 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
