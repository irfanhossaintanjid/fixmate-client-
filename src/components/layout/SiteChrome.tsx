"use client";

import { usePathname } from "next/navigation";
import Navber from "@/components/Navber";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toast";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <>
      {isAuthPage ? (
        <main>{children}</main>
      ) : (
        <>
          <Navber />
          <main>{children}</main>
          <Footer />
        </>
      )}
      <Toaster />
    </>
  );
}
