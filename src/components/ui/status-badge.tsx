import { Badge } from "@/components/ui/badge";
import type { BookingStatus, PaymentStatus } from "@/lib/dashboard/types";

const statusStyles: Record<BookingStatus, string> = {
  requested: "border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200",
  accepted: "border-indigo-200 bg-indigo-100 text-indigo-800 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-200",
  "in-progress": "border-amber-200 bg-amber-100 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200",
  completed: "border-green-200 bg-green-100 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200",
  rejected: "border-red-200 bg-red-100 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200",
  cancelled: "border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const label = status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1);
  return <Badge variant="outline" className={`capitalize ${statusStyles[status]}`}>{label}</Badge>;
}

export function PaymentBadge({ status }: { status?: PaymentStatus }) {
  const paid = status === "paid";
  return <Badge variant="outline" className={paid
    ? "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
    : "border-orange-200 bg-orange-100 text-orange-800 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-200"}>
    {paid ? "Paid" : "Unpaid"}
  </Badge>;
}
