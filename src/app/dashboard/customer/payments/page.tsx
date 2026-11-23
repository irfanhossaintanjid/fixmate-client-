import { CreditCard, Wallet } from "lucide-react";
import { CopyTransactionButton } from "@/components/dashboard/CopyTransactionButton";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent } from "@/components/ui/card";
import { PaymentBadge } from "@/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dashboardFetch, getDashboardSession } from "@/lib/dashboard/server-api";
import { formatCurrency, formatDate } from "@/lib/dashboard/format";
import type { PaymentRecord } from "@/lib/dashboard/types";

export const metadata = { title: "Payment History | FixMate" };

export default async function CustomerPaymentsPage() {
  const session = await getDashboardSession();
  if (!session) return null;
  const data = await dashboardFetch<{ payments: PaymentRecord[]; totalPaid: number; count: number }>("payments/my", session.session.token);
  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Customer workspace</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Payment History</h1><p className="mt-1 text-sm text-muted-foreground">Your completed online payments.</p></header>
      <div className="grid gap-4 sm:grid-cols-2"><StatCard title="Total Paid" value={formatCurrency(data.totalPaid)} detail="Total value of your payments" icon={Wallet} tone="green" /><StatCard title="Paid Jobs" value={data.count} detail="Completed payment transactions" icon={CreditCard} tone="indigo" /></div>
      {data.payments.length === 0 ? <EmptyState title="No payments yet" description="Payments will appear here after a completed repair is paid online." href="/dashboard/customer/bookings" action="View My Bookings" /> : <>
        <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:block"><Table><TableHeader><TableRow className="bg-muted/40"><TableHead>Service</TableHead><TableHead>Technician</TableHead><TableHead>Amount</TableHead><TableHead>Transaction ID</TableHead><TableHead>Payment Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{data.payments.map((payment) => <PaymentRow key={payment.id} payment={payment} />)}</TableBody></Table></div>
        <div className="grid gap-3 lg:hidden">{data.payments.map((payment) => <PaymentCard key={payment.id} payment={payment} />)}</div>
      </>}
    </section>
  );
}

function Transaction({ value }: { value: string }) {
  return <span className="inline-flex max-w-full items-center gap-1 rounded-lg border border-border bg-muted/30 pl-2"><code className="max-w-40 truncate font-mono text-xs text-muted-foreground">{value}</code><CopyTransactionButton value={value} /></span>;
}

function PaymentRow({ payment }: { payment: PaymentRecord }) {
  return <TableRow><TableCell className="font-medium text-foreground">{payment.serviceTitle || "Repair service"}</TableCell><TableCell>{payment.technicianName || "—"}</TableCell><TableCell className="font-semibold">{formatCurrency(payment.amount)}</TableCell><TableCell><Transaction value={payment.transactionId} /></TableCell><TableCell>{formatDate(payment.paidAt)}</TableCell><TableCell><PaymentBadge status="paid" /></TableCell></TableRow>;
}

function PaymentCard({ payment }: { payment: PaymentRecord }) {
  return <Card className="rounded-2xl border-border bg-card shadow-sm"><CardContent className="space-y-3 p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-semibold text-foreground">{payment.serviceTitle || "Repair service"}</p><p className="mt-1 text-sm text-muted-foreground">{payment.technicianName || "Technician"}</p></div><p className="shrink-0 font-bold text-foreground">{formatCurrency(payment.amount)}</p></div><div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3"><div><p className="text-xs text-muted-foreground">Transaction ID</p><Transaction value={payment.transactionId} /></div><div className="text-right"><p className="mb-1 text-xs text-muted-foreground">{formatDate(payment.paidAt)}</p><PaymentBadge status="paid" /></div></div></CardContent></Card>;
}
