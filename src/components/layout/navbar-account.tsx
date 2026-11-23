import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  UserRoundPen,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export type NavbarUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
};

function roleFor(user: NavbarUser) {
  return user.role === "admin" || user.role === "technician" ? user.role : "customer";
}

function RoleBadge({ role }: { role: string }) {
  return <Badge variant="secondary" className="mt-1 border-0 bg-primary/10 text-primary">{role.charAt(0).toUpperCase() + role.slice(1)}</Badge>;
}

function UserAvatar({ user, large = false }: { user: NavbarUser; large?: boolean }) {
  const initials = user.name?.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "FM";

  return (
    <Avatar className={`${large ? "size-10" : "size-9"} ring-1 ring-border`}>
      {user.image ? <AvatarImage src={user.image} alt="" /> : null}
      <AvatarFallback className="bg-secondary text-xs font-semibold text-primary">{initials}</AvatarFallback>
    </Avatar>
  );
}

function ProfileDropdown({ user, onSignOut }: { user: NavbarUser; onSignOut: () => void }) {
  const role = roleFor(user);
  const dashboardHref = `/dashboard/${role}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group inline-flex min-h-11 items-center gap-2 rounded-xl px-2 py-1.5 text-left outline-none transition hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring">
        <UserAvatar user={user} />
        <span className="hidden max-w-32 truncate text-sm font-medium text-foreground xl:block">{user.name || "My account"}</span>
        <ChevronDown className="size-4 text-muted-foreground transition group-aria-expanded:rotate-180" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-2xl border-border bg-popover p-2 shadow-xl">
        <DropdownMenuLabel className="flex items-center gap-3 px-2 py-2.5">
          <UserAvatar user={user} large />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-foreground">{user.name || "FixMate member"}</span>
            <RoleBadge role={role} />
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 bg-border" />
        <DropdownMenuItem render={<Link href={dashboardHref} />} className="min-h-10 gap-2.5 rounded-lg px-2.5 text-foreground">
          <LayoutDashboard className="size-4 text-muted-foreground" aria-hidden="true" />Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/dashboard/profile" />} className="min-h-10 gap-2.5 rounded-lg px-2.5 text-foreground">
          <UserRoundPen className="size-4 text-muted-foreground" aria-hidden="true" />Update Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 bg-border" />
        <DropdownMenuItem onClick={onSignOut} className="min-h-10 gap-2.5 rounded-lg px-2.5 text-destructive focus:text-destructive">
          <LogOut className="size-4" aria-hidden="true" />Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function NavbarAccount({
  user,
  pending,
  mobile = false,
  onNavigate,
}: {
  user?: NavbarUser | null;
  pending: boolean;
  mobile?: boolean;
  onNavigate: () => void;
}) {
  const router = useRouter();
  const handleSignOut = async () => {
    onNavigate();
    await authClient.signOut();
    router.replace("/");
  };

  if (pending) {
    return <div className={mobile ? "h-24" : "h-10 w-36 animate-pulse rounded-xl bg-muted"} aria-hidden="true" />;
  }

  if (!user) {
    return mobile ? (
      <div className="grid gap-2 border-t border-border pt-4">
        <Link href="/sign-in" onClick={onNavigate} className={buttonVariants({ variant: "outline", className: "h-11 rounded-xl border-border text-foreground" })}>Sign In</Link>
        <Link href="/sign-up" onClick={onNavigate} className={buttonVariants({ className: "h-11 rounded-xl bg-primary text-primary-foreground hover:bg-[#4338A8]" })}>Sign Up</Link>
      </div>
    ) : (
      <div className="flex items-center gap-3">
        <Link href="/sign-in" className="rounded-lg px-2 py-2 text-sm font-medium text-foreground transition hover:text-accent">Sign In</Link>
        <Link href="/sign-up" className={buttonVariants({ className: "h-10 rounded-xl bg-primary px-5 text-primary-foreground shadow-sm shadow-primary/15 hover:bg-[#4338A8]" })}>Sign Up</Link>
      </div>
    );
  }

  if (!mobile) return <ProfileDropdown user={user} onSignOut={handleSignOut} />;

  const role = roleFor(user);
  return (
    <div className="border-t border-border pt-4">
      <div className="flex items-center gap-3 px-2 pb-3">
        <UserAvatar user={user} large />
        <span className="min-w-0"><span className="block truncate text-sm font-semibold text-foreground">{user.name || "FixMate member"}</span><RoleBadge role={role} /></span>
      </div>
      <div className="grid gap-1">
        <Link href={`/dashboard/${role}`} onClick={onNavigate} className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm text-foreground hover:bg-secondary"><LayoutDashboard className="size-4 text-primary" aria-hidden="true" />Dashboard</Link>
        <Link href="/dashboard/profile" onClick={onNavigate} className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm text-foreground hover:bg-secondary"><UserRoundPen className="size-4 text-primary" aria-hidden="true" />Update Profile</Link>
        <button type="button" onClick={handleSignOut} className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-left text-sm text-destructive hover:bg-destructive/5"><LogOut className="size-4" aria-hidden="true" />Sign Out</button>
      </div>
    </div>
  );
}
