"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Home, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel,
  SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarProvider, SidebarRail, SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { dashboardNav } from "@/lib/dashboardNav";
import type { UserRole } from "@/lib/roles";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { BrandMark } from "@/components/layout/brand-mark";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export type DashboardUser = { name: string; email: string; image?: string | null; role: UserRole };

export function DashboardShell({ user, children }: { user: DashboardUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = dashboardNav[user.role] || dashboardNav.customer;

  const signOut = async () => {
    await authClient.signOut();
    toast.add({ title: "Signed out", type: "success" });
    router.replace("/");
  };

  const initials = user.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "FM";

  return (
    <SidebarProvider className="min-h-svh bg-background">
      <CloseMobileSidebarOnNavigation />
      <Sidebar collapsible="icon" className="border-sidebar-border bg-[#18112B] text-white [--sidebar:#18112B] [--sidebar-foreground:#F8FAFC] [--sidebar-accent:#312E81] [--sidebar-accent-foreground:#FFFFFF] [--sidebar-border:#403953] [--sidebar-ring:#A5B4FC]">
        <SidebarHeader className="border-b border-white/10 p-4">
          <Link href="/" className="flex min-h-10 items-center gap-3 overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B4FC]">
            <BrandMark className="size-8 shrink-0 rounded-lg" />
            <span className="text-lg font-bold tracking-tight text-white group-data-[collapsible=icon]:hidden">FixMate</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 text-[11px] uppercase tracking-[0.16em] text-white/50">Workspace</SidebarGroupLabel>
            <SidebarMenu className="gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isDashboardHome = /^\/dashboard\/(customer|technician|admin)$/.test(item.href);
                const active = pathname === item.href || (!isDashboardHome && pathname.startsWith(`${item.href}/`));
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton render={<Link href={item.href} />} isActive={active} tooltip={item.label} className={active ? "min-h-11 bg-[#5145CD] text-white hover:bg-[#5145CD] hover:text-white data-active:bg-[#5145CD] data-active:text-white" : "min-h-11 text-white/75 hover:text-white"}>
                      <Icon aria-hidden="true" /><span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-white/10 p-3">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href="/" />} tooltip="Back to Home" className="min-h-11 text-white/75 hover:text-white"><Home /><span>Back to Home</span></SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={signOut} tooltip="Sign Out" className="min-h-11 text-white/75 hover:bg-red-500/15 hover:text-red-200"><LogOut /><span>Sign Out</span></SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="min-h-svh bg-background">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
          <SidebarTrigger className="size-10 rounded-lg text-foreground" />
          <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm">
              <Link href="/" className="font-medium text-muted-foreground transition hover:text-primary">Home</Link>
              <span aria-hidden="true" className="text-muted-foreground/60">/</span>
              <span aria-current="page" className="truncate font-medium text-foreground">{pathname.startsWith("/dashboard/customer") ? "Customer Portal" : pathname.startsWith("/dashboard/technician") ? "Technician Portal" : pathname.startsWith("/dashboard/admin") ? "Admin Portal" : "Dashboard"}</span>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {user.role === "customer" ? (
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar className="size-11 shrink-0 ring-[3px] ring-[#E5E1F0] dark:ring-[#403953]">
                    {user.image ? <AvatarImage src={user.image} alt={`${user.name}'s profile photo`} /> : null}
                    <AvatarFallback className="bg-[#F0ECFF] text-xs font-semibold text-[#5145CD] dark:bg-[#403953] dark:text-[#C4BFFF]">{initials}</AvatarFallback>
                  </Avatar>
                  <span className="min-w-0">
                    <span className="block max-w-36 truncate text-sm font-semibold leading-5 text-foreground sm:max-w-48">{user.name}</span>
                    <Badge variant="secondary" className="mt-0.5 h-5 rounded-full border-0 bg-[#EAE3FF] px-2.5 text-[11px] font-medium leading-none text-[#5145CD] hover:bg-[#EAE3FF] dark:bg-[#403953] dark:text-[#C4BFFF] dark:hover:bg-[#403953]">Customer</Badge>
                  </span>
                </div>
              ) : (
                <>
                  <span className="hidden max-w-40 truncate text-sm font-medium text-foreground sm:inline">{user.name}</span>
                  <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                  <Avatar className="size-9 ring-1 ring-border">{user.image ? <AvatarImage src={user.image} alt="" /> : null}<AvatarFallback className="bg-secondary text-xs text-primary">{initials}</AvatarFallback></Avatar>
                </>
              )}
            </div>
          </div>
        </header>
        <div className="min-w-0 flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function CloseMobileSidebarOnNavigation() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  useEffect(() => { setOpenMobile(false); }, [pathname, setOpenMobile]);
  return null;
}
