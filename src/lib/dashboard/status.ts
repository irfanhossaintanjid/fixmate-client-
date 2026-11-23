import type { BookingStatus } from "@/lib/dashboard/types";

export const BOOKING_STATUS_CONFIG: {
  key: BookingStatus;
  label: string;
  color: string;
  caption: string;
  badgeClass: string;
}[] = [
  { key: "requested", label: "Requested", color: "#3B82F6", caption: "Awaiting technician", badgeClass: "border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200" },
  { key: "accepted", label: "Accepted", color: "#6366F1", caption: "Technician assigned", badgeClass: "border-indigo-200 bg-indigo-100 text-indigo-800 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-200" },
  { key: "in-progress", label: "In Progress", color: "#D97706", caption: "Under active repair", badgeClass: "border-amber-200 bg-amber-100 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200" },
  { key: "completed", label: "Completed", color: "#16A34A", caption: "Finished by technician", badgeClass: "border-green-200 bg-green-100 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200" },
  { key: "rejected", label: "Rejected", color: "#DC2626", caption: "Declined by technician", badgeClass: "border-red-200 bg-red-100 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200" },
  { key: "cancelled", label: "Cancelled", color: "#64748B", caption: "Withdrawn by you", badgeClass: "border-slate-200 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200" },
];

export function getStatusLabel(status: BookingStatus) {
  return BOOKING_STATUS_CONFIG.find((item) => item.key === status)?.label ?? status;
}
