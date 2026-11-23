import { Badge } from "@/components/ui/badge";
import type { BookingStatus, PaymentStatus } from "@/lib/dashboard/types";
import { BOOKING_STATUS_CONFIG } from "@/lib/dashboard/status";

export function StatusBadge({ status }: { status: BookingStatus }) {
  const config = BOOKING_STATUS_CONFIG.find((item) => item.key === status);
  return <Badge variant="outline" className={config?.badgeClass}>{config?.label ?? status}</Badge>;
}

export function PaymentBadge({ status }: { status?: PaymentStatus }) {
  const paid = status === "paid";
  return <Badge variant="outline" className={paid
    ? "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
    : "border-orange-200 bg-orange-100 text-orange-800 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-200"}>
    {paid ? "Paid" : "Unpaid"}
  </Badge>;
}
