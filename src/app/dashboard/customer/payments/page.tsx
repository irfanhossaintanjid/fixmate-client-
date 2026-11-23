import { PaymentsHeader } from "@/components/dashboard/customer/PaymentsHeader";
import { PaymentSummaryCards } from "@/components/dashboard/customer/PaymentSummaryCards";
import { PaymentsTable } from "@/components/dashboard/customer/PaymentsTable";
import { StripeNote } from "@/components/dashboard/customer/StripeNote";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { dashboardFetch, getDashboardSession } from "@/lib/dashboard/server-api";
import type { PaymentHistorySummary, PaymentRecord } from "@/lib/dashboard/types";

export const metadata = { title: "Payment History | FixMate" };

type PaymentHistoryResponse = {
  payments: PaymentRecord[];
  summary: PaymentHistorySummary;
};

export default async function CustomerPaymentsPage() {
  const session = await getDashboardSession();
  if (!session) return null;

  const data = await dashboardFetch<PaymentHistoryResponse>("payments/my", session.session.token);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
      <PaymentsHeader />
      <PaymentSummaryCards summary={data.summary} />
      {data.payments.length ? (
        <PaymentsTable payments={data.payments} />
      ) : (
        <EmptyState
          title="No payments yet"
          description="Payments appear here after you pay for a completed repair."
          href="/dashboard/customer/bookings"
          action="View My Bookings"
        />
      )}
      <StripeNote />
    </section>
  );
}
