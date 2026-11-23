import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import { AddServiceForm } from "@/components/dashboard/technician/AddServiceForm";
import { ApprovalNotice } from "@/components/dashboard/technician/ApprovalNotice";
import { SubmissionGuidelines } from "@/components/dashboard/technician/SubmissionGuidelines";
import { TechnicianInfoCard } from "@/components/dashboard/technician/TechnicianInfoCard";
import { Button } from "@/components/ui/button";
import { getDashboardSession } from "@/lib/dashboard/server-api";

export const metadata = { title: "Add a Service | FixMate" };

export default async function AddTechnicianServicePage() {
  const session = await getDashboardSession();
  if (!session) return null;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
      <header className="space-y-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/dashboard/technician" className="inline-flex min-h-8 items-center gap-1 rounded-md hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Home className="size-3.5" aria-hidden="true" /> Dashboard</Link>
          <span aria-hidden="true">/</span><span aria-current="page" className="font-medium text-foreground">Add a Service</span>
        </nav>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1"><h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Add New Service</h1><p className="max-w-2xl text-sm leading-6 text-muted-foreground">Showcase your repair expertise and help customers find the right service for their devices.</p></div>
          <Button render={<Link href="/dashboard/technician/my-services" />} variant="outline" className="min-h-11 w-fit rounded-xl px-4"><ChevronLeft className="size-4" aria-hidden="true" /> Back to My Services</Button>
        </div>
      </header>
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
        <AddServiceForm />
        <aside className="space-y-5 xl:sticky xl:top-20">
          <TechnicianInfoCard name={session.user.name || "FixMate technician"} email={session.user.email} />
          <SubmissionGuidelines />
          <ApprovalNotice />
        </aside>
      </div>
    </main>
  );
}
