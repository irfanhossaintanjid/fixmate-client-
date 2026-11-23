"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function ServicesError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="grid min-h-[60vh] place-items-center bg-background px-5 py-16">
      <div className="max-w-md text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><AlertTriangle className="size-6" aria-hidden="true" /></span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">Services couldn’t load</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Please try again. If the problem continues, come back in a little while.</p>
        <div className="mt-5 flex justify-center gap-3">
          <button type="button" onClick={reset} className="h-10 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-[#4338A8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Try Again</button>
          <Link href="/" className="inline-flex h-10 items-center rounded-xl border border-border bg-card px-4 text-sm font-medium text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Home</Link>
        </div>
      </div>
    </section>
  );
}
