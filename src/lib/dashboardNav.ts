import { BriefcaseBusiness, ClipboardList, CreditCard, LayoutDashboard, Plus, UserRound, Wrench } from "lucide-react";
import type { UserRole } from "@/lib/roles";

export const dashboardNav = {
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    { label: "My Bookings", href: "/dashboard/customer/bookings", icon: Wrench },
    { label: "Payment History", href: "/dashboard/customer/payments", icon: CreditCard },
    { label: "Update Profile", href: "/dashboard/profile", icon: UserRound },
  ],
  technician: [
    { label: "Overview", href: "/dashboard/technician", icon: LayoutDashboard },
    { label: "Add a Service", href: "/dashboard/technician/add-service", icon: Plus },
    { label: "My Services", href: "/dashboard/technician/my-services", icon: BriefcaseBusiness },
    { label: "Manage Requests", href: "/dashboard/technician/requests", icon: ClipboardList },
    { label: "Update Profile", href: "/dashboard/profile", icon: UserRound },
  ],
  admin: [],
} satisfies Record<UserRole, { label: string; href: string; icon: typeof LayoutDashboard }[]>;
