import { CreditCard, LayoutDashboard, UserRound, Wrench } from "lucide-react";
import type { UserRole } from "@/lib/roles";

export const dashboardNav = {
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    { label: "My Bookings", href: "/dashboard/customer/bookings", icon: Wrench },
    { label: "Payment History", href: "/dashboard/customer/payments", icon: CreditCard },
    { label: "Update Profile", href: "/dashboard/profile", icon: UserRound },
  ],
  technician: [],
  admin: [],
} satisfies Record<UserRole, { label: string; href: string; icon: typeof LayoutDashboard }[]>;
