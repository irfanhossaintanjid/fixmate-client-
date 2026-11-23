"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ClipboardCheck, CreditCard, Search, type LucideIcon } from "lucide-react";
import { BrandMark } from "@/components/layout/brand-mark";
import { ThemeToggle } from "@/components/layout/theme-toggle";

type Benefit = { icon: LucideIcon; text: string; detail?: string };

const signUpBenefits: Benefit[] = [
  { icon: Search, text: "Browse approved repair services" },
  { icon: ClipboardCheck, text: "Track every job step by step" },
  { icon: CreditCard, text: "Pay online only after completion" },
];

const signInBenefits: Benefit[] = [
  { icon: ClipboardCheck, text: "Follow your repair status", detail: "See status updates and technician progress in one dashboard." },
  { icon: Search, text: "Manage bookings in one place", detail: "Review your requests and keep track of scheduled repairs." },
  { icon: CreditCard, text: "Secure online payments", detail: "Pay online after the technician marks the job completed." },
];

export function AuthSplitLayout({ children, mode = "sign-up" }: { children: ReactNode; mode?: "sign-up" | "sign-in" }) {
  const isSignIn = mode === "sign-in";
  const benefits = isSignIn ? signInBenefits : signUpBenefits;
  return (
    <div className="min-h-screen overflow-y-auto bg-background text-foreground">
      <div className="mx-auto flex min-h-full w-full max-w-[1440px] p-0 sm:p-5 lg:p-8">
        <div className={`grid min-h-screen w-full overflow-hidden bg-card sm:min-h-[calc(100vh-2.5rem)] sm:rounded-[2rem] sm:border sm:border-border sm:shadow-[0_24px_80px_rgba(24,17,43,0.14)] lg:min-h-[calc(100vh-4rem)] ${isSignIn ? "lg:grid-cols-[0.78fr_1.22fr]" : "lg:grid-cols-[0.92fr_1.08fr]"}`}>
          <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#18112B] via-[#312E81] to-[#5145CD] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-14">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border border-white/10" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-28 size-[28rem] rounded-full border border-white/10" />
            <Link href="/" className="relative inline-flex w-fit items-center gap-3" aria-label="FixMate home">
              <BrandMark className="size-10 rounded-xl bg-white/10 p-1.5" />
              <span className="text-xl font-bold tracking-tight">FixMate</span>
            </Link>

            <div className="relative max-w-xl py-12">
              <span className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-100">
                {isSignIn ? "YOUR REPAIRS, ALL IN ONE PLACE" : "REPAIR, WITHOUT THE GUESSWORK"}
              </span>
              <h1 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-tight xl:text-5xl">{isSignIn ? "Welcome Back" : "Join FixMate Today"}</h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-indigo-100/90">
                {isSignIn ? "Sign in to track your repairs, manage requests and keep your jobs moving." : "Book trusted repair technicians or offer your own repair services. Pay only after the job is completed."}
              </p>
              <div className="mt-9 space-y-3">
                {benefits.map(({ icon: Icon, text, detail }) => (
                  <div key={text} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-indigo-100">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 text-sm font-medium text-white/95">
                      {text}
                      {detail && <span className="mt-1 block text-xs font-normal leading-5 text-indigo-100/80">{detail}</span>}
                    </span>
                    {!isSignIn && <CheckCircle2 className="ml-auto size-4 shrink-0 text-indigo-200" aria-hidden="true" />}
                  </div>
                ))}
              </div>
            </div>

            <p className="relative text-xs text-indigo-100/70">{isSignIn ? "Your repair details stay easy to find, from request to payment." : "A clearer way to get devices and appliances repaired."}</p>
          </aside>

          <section className="flex min-h-full flex-col bg-card px-5 py-6 sm:px-10 sm:py-10 lg:px-12 xl:px-20">
            <div className="mb-10 flex items-center justify-between lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2.5" aria-label="FixMate home">
                <BrandMark className="size-9 rounded-lg" />
                <span className="font-bold tracking-tight">FixMate</span>
              </Link>
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <Link href="/" className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-muted-foreground hover:text-primary">
                  <ArrowLeft className="size-3.5" aria-hidden="true" /> Home
                </Link>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-[520px] flex-1 flex-col justify-center py-2">
              {children}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
