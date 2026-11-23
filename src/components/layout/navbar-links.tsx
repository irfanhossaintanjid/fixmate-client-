import Link from "next/link";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/#about" },
  { label: "How It Works", href: "/about#how-it-works" },
];

export function NavbarLinks({
  mobile = false,
  isActive,
  onNavigate,
}: {
  mobile?: boolean;
  isActive: (href: string) => boolean;
  onNavigate?: () => void;
}) {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          onClick={onNavigate}
          aria-current={isActive(item.href) ? "page" : undefined}
          className={[
            "inline-flex items-center rounded-xl text-sm font-medium transition-colors",
            mobile ? "min-h-12 w-full px-4" : "min-h-10 px-3.5",
            isActive(item.href)
              ? "bg-secondary text-primary"
              : "text-muted-foreground hover:bg-secondary/70 hover:text-accent",
          ].join(" ")}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
