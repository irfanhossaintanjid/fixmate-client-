import { CreditCard } from "lucide-react";
import { CopyTransactionButton } from "@/components/dashboard/CopyTransactionButton";
import { PaymentBadge } from "@/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/dashboard/format";
import type { PaymentRecord } from "@/lib/dashboard/types";

export function PaymentsTable({ payments }: { payments: PaymentRecord[] }) {
  return (
    <section aria-label="Payments list" className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="hidden md:block">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead scope="col" className="w-[22%] px-4">Service</TableHead>
              <TableHead scope="col" className="w-[19%] px-3">Technician</TableHead>
              <TableHead scope="col" className="w-[15%] px-3">Amount</TableHead>
              <TableHead scope="col" className="w-[25%] px-3">Transaction ID</TableHead>
              <TableHead scope="col" className="w-[19%] px-3">Payment Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{payments.map((payment) => <PaymentRow key={payment.id} payment={payment} />)}</TableBody>
        </Table>
      </div>

      <div className="grid gap-3 p-3 md:hidden">
        {payments.map((payment) => <PaymentCard key={payment.id} payment={payment} />)}
      </div>

      <p className="border-t border-border bg-muted/20 px-4 py-3 text-xs text-muted-foreground">Showing {payments.length} {payments.length === 1 ? "payment" : "payments"}</p>
    </section>
  );
}

function PaymentRow({ payment }: { payment: PaymentRecord }) {
  return (
    <TableRow className="hover:bg-[#F8F6FD] dark:hover:bg-[#3B3355]">
      <TableCell className="px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F0ECFF] text-[#5145CD] dark:bg-[#403953] dark:text-[#C4BFFF]"><CreditCard className="size-4" aria-hidden="true" /></span>
          <span className="truncate text-sm font-medium text-foreground" title={payment.serviceTitle || "Repair service"}>{payment.serviceTitle || "Repair service"}</span>
        </div>
      </TableCell>
      <TableCell className="px-3"><TechnicianName name={payment.technicianName} /></TableCell>
      <TableCell className="px-3"><div className="space-y-1"><p className="font-semibold tabular-nums text-foreground">{formatCurrency(payment.amount)}</p><PaymentBadge status="paid" /></div></TableCell>
      <TableCell className="px-3"><TransactionId value={payment.transactionId} /></TableCell>
      <TableCell className="px-3"><PaymentDate value={payment.paidAt} /></TableCell>
    </TableRow>
  );
}

function PaymentCard({ payment }: { payment: PaymentRecord }) {
  return (
    <article className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F0ECFF] text-[#5145CD] dark:bg-[#403953] dark:text-[#C4BFFF]"><CreditCard className="size-4" aria-hidden="true" /></span>
          <p className="truncate text-sm font-semibold text-foreground" title={payment.serviceTitle || "Repair service"}>{payment.serviceTitle || "Repair service"}</p>
        </div>
        <p className="shrink-0 text-sm font-bold tabular-nums text-foreground">{formatCurrency(payment.amount)}</p>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <TechnicianName name={payment.technicianName} />
        <PaymentBadge status="paid" />
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 border-t border-border pt-3 sm:grid-cols-2">
        <div className="min-w-0"><p className="mb-1 text-[11px] font-medium text-muted-foreground">Transaction ID</p><TransactionId value={payment.transactionId} /></div>
        <div className="sm:text-right"><p className="mb-1 text-[11px] font-medium text-muted-foreground">Payment Date</p><PaymentDate value={payment.paidAt} /></div>
      </div>
    </article>
  );
}

function TechnicianName({ name }: { name?: string }) {
  const displayName = name || "Technician";
  const initials = displayName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "T";
  return <div className="flex min-w-0 items-center gap-2"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#EEE9FF] text-[10px] font-semibold text-[#5145CD] dark:bg-[#403953] dark:text-[#C4BFFF]" aria-hidden="true">{initials}</span><span className="truncate text-sm text-foreground" title={displayName}>{displayName}</span></div>;
}

function TransactionId({ value }: { value: string }) {
  return <span className="inline-flex min-w-0 max-w-full items-center gap-1 rounded-lg border border-border bg-muted/30 pl-2"><code className="max-w-[100px] truncate font-mono text-[11px] text-muted-foreground lg:max-w-[150px] xl:max-w-[190px]" title={value}>{value}</code><CopyTransactionButton value={value} /></span>;
}

function PaymentDate({ value }: { value: string }) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return <span className="text-sm text-muted-foreground">Date unavailable</span>;
  const dateText = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(date);
  const timeText = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(date);
  return <span className="block"><span className="block text-sm text-foreground">{dateText}</span><span className="mt-0.5 block text-xs text-muted-foreground">{timeText}</span></span>;
}
