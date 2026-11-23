import type { ReactNode } from "react";

export function MobileMenu({
  open,
  children,
}: {
  open: boolean;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div id="fixmate-mobile-navigation" className="border-t border-border bg-background px-4 pb-5 pt-3 shadow-lg lg:hidden sm:px-6">
      <nav aria-label="Mobile navigation" className="mx-auto grid max-w-7xl gap-1">
        {children}
      </nav>
    </div>
  );
}
