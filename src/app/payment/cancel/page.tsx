import Link from "next/link";
import { Suspense } from "react";
import { CircleSlash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getDashboardSession } from "@/lib/dashboard/server-api";
import { getDashboardPath } from "@/lib/roles";

export const metadata = { title: "Payment Cancelled | FixMate" };

export default function PaymentCancelPage() {
  return <Suspense fallback={<div className="min-h-[75vh] animate-pulse bg-background" aria-label="Loading payment status" />}><PaymentCancelContent /></Suspense>;
}

async function PaymentCancelContent() {
  const session = await getDashboardSession();
  if (!session) redirect("/sign-in?redirect=%2Fpayment%2Fcancel");
  if (session.user.role && session.user.role !== "customer") redirect(getDashboardPath(session.user.role));
  return <main className="flex min-h-[75vh] items-center justify-center bg-background px-4 py-10"><Card className="w-full max-w-lg rounded-3xl border-border bg-card shadow-xl"><CardContent className="flex flex-col items-center px-6 py-10 text-center sm:px-10"><span className="flex size-16 items-center justify-center rounded-2xl bg-secondary text-primary"><CircleSlash2 className="size-8" /></span><p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">Checkout</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">Payment cancelled</h1><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">No payment was recorded. Your completed booking is still available when you’re ready.</p><Button render={<Link href="/dashboard/customer/bookings" />} className="mt-6 min-h-11 w-full rounded-xl bg-primary text-primary-foreground hover:bg-[#4338A8]">Try Again</Button></CardContent></Card></main>;
}
