import { StatusDonutChart } from "@/components/dashboard/customer/StatusDonutChart";
import type { BookingSummary } from "@/lib/dashboard/types";

export function OverviewCharts({ summary }: { summary: BookingSummary }) {
  return <StatusDonutChart summary={summary} />;
}
