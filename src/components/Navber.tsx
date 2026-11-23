"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/layout/brand-mark";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavbarAccount } from "@/components/layout/navbar-account";
import { NavbarLinks } from "@/components/layout/navbar-links";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

export default function Navber() {
  const pathname = usePathname();
  const activeHash = useSyncExternalStore(subscribeToHash, () => window.location.hash, () => "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const authUser = session?.user;
  const user = authUser
    ? {
        name: authUser.name,
        email: authUser.email,
        image: authUser.image,
        role: (authUser as typeof authUser & { role?: string }).role,
      }
    : null;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && !activeHash;
    if (href === "/services") return pathname.startsWith("/services");
    if (href === "/#about") return pathname === "/" && activeHash === "#about";
    if (href === "/about#how-it-works") {
      return pathname === "/about" && activeHash === "#how-it-works";
    }
    if (href === "/about") {
      return pathname === "/about" && activeHash !== "#how-it-works";
    }
    return false;
  };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 shadow-[0_2px_10px_rgba(24,17,43,0.035)] backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <Link href="/" className="inline-flex shrink-0 items-center gap-2.5" aria-label="FixMate home">
          <BrandMark />
          <span className="text-xl font-bold tracking-tight text-foreground">FixMate</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center justify-center gap-1 lg:flex">
          <NavbarLinks isActive={isActive} />
        </nav>

        <div className="hidden items-center justify-end gap-2 lg:flex">
          <ThemeToggle />
          <NavbarAccount user={user} pending={isPending} onNavigate={closeMobileMenu} />
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="fixmate-mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
            className="size-10 rounded-xl text-foreground hover:bg-secondary"
          >
            {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </Button>
        </div>
      </div>
      <MobileMenu open={mobileOpen}>
        <NavbarLinks mobile isActive={isActive} onNavigate={closeMobileMenu} />
        <NavbarAccount user={user} pending={isPending} mobile onNavigate={closeMobileMenu} />
      </MobileMenu>
    </header>
  );
}
