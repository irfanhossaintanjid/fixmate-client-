"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CircleDollarSign,
  Play,
  Search,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HeroSectionProps = {
  /** Supply the approved local or external technician repair photo. */
  imageSrc?: string;
  /** Supply a real How It Works route or anchor when one is available. */
  howItWorksHref?: string;
};

export function HeroSection({ imageSrc, howItWorksHref }: HeroSectionProps) {
  const router = useRouter();

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/services");
  }

  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_17%_30%,color-mix(in_srgb,var(--primary)_8%,transparent),transparent_55%)]"
      />
      <div className="mx-auto grid min-h-[590px] max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[650px] lg:grid-cols-[1.12fr_.88fr] lg:gap-12 lg:px-10 lg:py-20">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-2 text-xs font-medium text-primary shadow-sm shadow-primary/5 sm:mb-7">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/50" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Trusted Repair Service Platform
          </div>

          <h1 className="max-w-[700px] text-[2.55rem] font-bold leading-[1.08] tracking-[-0.045em] text-foreground sm:text-5xl sm:leading-[1.08] lg:text-[3.55rem]">
            Broken Device? <span className="text-accent">Get It Fixed</span> by
            <br className="hidden xl:block" /> Verified Technicians.
          </h1>

          <p className="mt-5 max-w-[590px] text-base leading-7 text-muted-foreground sm:mt-6 sm:text-[1.05rem] sm:leading-8">
            From smartphones and laptops to home appliances, find trusted repair
            professionals near you. Book a service with confidence and pay only
            after the job is completed.
          </p>

          <form
            onSubmit={handleSearch}
            role="search"
            className="mt-7 flex max-w-[650px] flex-col gap-2 rounded-2xl border border-border bg-card p-2 shadow-lg shadow-[#211A4D]/[0.07] sm:mt-8 sm:flex-row sm:items-center sm:rounded-[1.1rem]"
          >
            <label className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:pl-3">
              <Search className="size-[18px] shrink-0 text-primary" aria-hidden="true" />
              <span className="sr-only">What needs to be repaired?</span>
              <Input
                type="search"
                aria-label="What needs to be repaired?"
                placeholder="What needs to be repaired?"
                className="h-11 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:border-transparent focus-visible:ring-0"
              />
            </label>
            <Button
              type="submit"
              className="h-11 w-full gap-2 rounded-xl bg-primary px-5 text-primary-foreground shadow-sm transition-colors hover:bg-[#4338A8] sm:w-auto sm:px-5"
            >
              Explore Services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-6">
            {howItWorksHref ? (
              <Link
                href={howItWorksHref}
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "h-9 gap-2 rounded-full px-2 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary",
                })}
              >
                <span className="grid size-6 place-items-center rounded-full bg-primary/10 text-primary">
                  <Play className="size-3 fill-current" aria-hidden="true" />
                </span>
                How FixMate Works
              </Link>
            ) : (
              <span className="inline-flex h-9 items-center gap-2 px-2 text-sm font-medium text-foreground">
                <span className="grid size-6 place-items-center rounded-full bg-primary/10 text-primary">
                  <Play className="size-3 fill-current" aria-hidden="true" />
                </span>
                How FixMate Works
              </span>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground sm:gap-x-5">
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                Verified Technicians
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CircleDollarSign className="size-4 text-primary" aria-hidden="true" />
                Transparent Pricing
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-orange-500" aria-hidden="true" />
                Pay After Service
              </span>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px] lg:ml-auto">
          <div className="absolute -inset-3 rounded-[2rem] bg-primary/[0.07] blur-2xl" aria-hidden="true" />
          <div className="relative aspect-[4/4.25] overflow-hidden rounded-[1.55rem] border-[7px] border-card bg-secondary shadow-[0_24px_65px_-28px_rgba(33,26,77,0.35)] sm:aspect-[1/1.03] sm:rounded-[1.8rem] sm:border-[9px]">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="Technician carefully repairing an electronic device in a workshop"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div
                role="img"
                aria-label="Technician repair photo will be added when an approved image is provided"
                className="absolute inset-0 grid place-items-center overflow-hidden bg-[linear-gradient(145deg,#e5e3fa_0%,#f5f3ff_48%,#d9dcfa_100%)] dark:bg-[linear-gradient(145deg,#312e45_0%,#29243b_50%,#403953_100%)]"
              >
                <div className="absolute -left-20 -top-20 size-64 rounded-full border border-primary/10" />
                <div className="absolute -bottom-24 -right-16 size-72 rounded-full border border-primary/10" />
                <div className="relative flex flex-col items-center gap-4 text-primary/80">
                  <div className="relative grid size-36 place-items-center rounded-[2rem] border border-white/70 bg-white/60 shadow-xl shadow-primary/10 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:size-44">
                    <Smartphone className="size-20 stroke-[1.15] sm:size-24" aria-hidden="true" />
                    <span className="absolute -bottom-3 -right-3 grid size-14 place-items-center rounded-2xl border border-border bg-card text-primary shadow-lg">
                      <Wrench className="size-7" aria-hidden="true" />
                    </span>
                  </div>
                  <span className="rounded-full border border-primary/10 bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    Technician photo pending approval
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
