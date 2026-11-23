import { Badge } from "@/components/ui/badge";
import type { ServiceApprovalStatus } from "@/types/service";

const statusStyles: Record<ServiceApprovalStatus, string> = {
  approved: "border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  pending: "border-amber-200 bg-amber-100 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200",
  rejected: "border-red-200 bg-red-100 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200",
};
const labels: Record<ServiceApprovalStatus, string> = { approved: "Approved", pending: "Pending", rejected: "Rejected" };

export function ServiceApprovalBadge({ status }: { status: ServiceApprovalStatus }) {
  return <Badge variant="outline" className={`${statusStyles[status]} gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold`}><span className="size-1.5 rounded-full bg-current" aria-hidden="true" />{labels[status]}</Badge>;
}
