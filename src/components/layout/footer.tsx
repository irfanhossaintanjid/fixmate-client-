import Link from "next/link";
import { Camera, Mail, MapPin, Phone, Wrench } from "lucide-react";
import { BrandMark } from "@/components/layout/brand-mark";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Browse services", href: "/services" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "About FixMate", href: "/#about" },
];

const categories = ["Smartphone", "Laptop & PC", "Air conditioner", "Electrical"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.35fr_.8fr_.8fr_1fr] lg:gap-12 lg:px-10 lg:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="FixMate home">
            <BrandMark />
            <span className="text-xl font-bold tracking-tight text-foreground">FixMate</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">A clearer way to find trusted help for your devices and home appliances.</p>
          <div className="mt-5 flex gap-2">
            <a href="https://facebook.com" aria-label="Facebook" className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary/30 hover:text-primary"><span className="text-base font-bold" aria-hidden="true">f</span></a>
            <a href="https://instagram.com" aria-label="Instagram" className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary/30 hover:text-primary"><Camera className="size-4" aria-hidden="true" /></a>
            <a href="https://x.com" aria-label="X" className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary/30 hover:text-primary"><span className="text-sm font-semibold" aria-hidden="true">𝕏</span></a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Quick links</h2>
          <ul className="mt-4 space-y-3">
            {quickLinks.map((link) => <li key={link.label}><Link href={link.href} className="text-sm text-muted-foreground transition hover:text-primary">{link.label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Popular categories</h2>
          <ul className="mt-4 space-y-3">
            {categories.map((category) => <li key={category}><Link href="/services" className="text-sm text-muted-foreground transition hover:text-primary">{category}</Link></li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5"><Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span>Support contact coming soon</span></li>
            <li className="flex items-start gap-2.5"><Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span>Contact number coming soon</span></li>
            <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" /><span>Serving Bangladesh</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© {new Date().getFullYear()} FixMate. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5"><Wrench className="size-3.5 text-primary" aria-hidden="true" /> Repair support, made clearer.</p>
        </div>
      </div>
    </footer>
  );
}
