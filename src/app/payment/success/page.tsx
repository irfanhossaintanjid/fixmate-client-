import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { CheckCircle2, CircleAlert, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardSession, dashboardFetch } from "@/lib/dashboard/server-api";
import { getDashboardPath } from "@/lib/roles";
import { formatCurrency } from "@/lib/dashboard/format";

type SearchParams = Promise<{ session_id?: string | string[] }>;

export const metadata = { title: "Payment Confirmation | FixMate" };

export default function PaymentSuccessPage({ searchParams }: { searchParams: SearchParams }) {
  return <Suspense fallback={<PaymentLoading />}><PaymentSuccessContent searchParams={searchParams} /></Suspense>;
}

async function PaymentSuccessContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const sessionId = Array.isArray(params.session_id) ? params.session_id[0] : params.session_id;
  const session = await getDashboardSession();
  if (!session) redirect(`/sign-in?redirect=${encodeURIComponent(`/payment/success${sessionId ? `?session_id=${sessionId}` : ""}`)}`);
  if (session.user.role && session.user.role !== "customer") redirect(getDashboardPath(session.user.role));

  let payment: { amount: number; transactionId: string } | null = null;
  if (sessionId && sessionId.startsWith("cs_")) {
    try {
      payment = await dashboardFetch<{ amount: number; transactionId: string }>(`payments/verify?session_id=${encodeURIComponent(sessionId)}`, session.session.token);
    } catch {
      payment = null;
    }
  }

  return <main className="flex min-h-[75vh] items-center justify-center bg-background px-4 py-10">
    <Card className="w-full max-w-lg rounded-3xl border-border bg-card shadow-xl">
      <CardContent className="flex flex-col items-center px-6 py-10 text-center sm:px-10">
        <span className={`flex size-16 items-center justify-center rounded-2xl ${payment ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200"}`}>
          {payment ? <CheckCircle2 className="size-8" /> : <CircleAlert className="size-8" />}
        </span>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">FixMate payment</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">{payment ? "Payment confirmed" : "Payment not confirmed"}</h1>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{payment ? "Your repair payment has been recorded. You can see it in your payment history." : "We couldn’t verify this payment session. Your booking will remain available in My Bookings."}</p>
        {payment && <div className="mt-6 w-full rounded-2xl border border-border bg-muted/30 p-4 text-left"><p className="flex items-center gap-2 text-sm font-semibold text-foreground"><ReceiptText className="size-4 text-primary" />Payment details</p><div className="mt-3 flex justify-between gap-3 text-sm"><span className="text-muted-foreground">Amount</span><span className="font-semibold text-foreground">{formatCurrency(payment.amount)}</span></div><div className="mt-2 flex flex-col gap-1 text-sm"><span className="text-muted-foreground">Transaction ID</span><code className="break-all font-mono text-xs text-foreground">{payment.transactionId}</code></div></div>}
        <Button render={<Link href="/dashboard/customer/bookings" />} className="mt-6 min-h-11 w-full rounded-xl bg-primary text-primary-foreground hover:bg-[#4338A8]">Back to My Bookings</Button>
      </CardContent>
    </Card>
  </main>;
}

function PaymentLoading() {
  return <main className="flex min-h-[75vh] items-center justify-center bg-background px-4"><div className="h-72 w-full max-w-lg animate-pulse rounded-3xl bg-card ring-1 ring-border" aria-label="Verifying payment" /></main>;
}
