"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BookingStatus } from "@/lib/dashboard/types";
import type { RequestSort } from "@/app/dashboard/technician/requests/page";

export function RequestFilters({ status, search, sort }: { status: "all" | BookingStatus; search: string; sort: RequestSort }) {
  const hasFilters = status !== "all" || search !== "" || sort !== "newest";
  return <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
    <form method="get" action="/dashboard/technician/requests" className="flex min-w-0 flex-1 gap-2">
      {status !== "all" && <input type="hidden" name="status" value={status} />}
      {sort !== "newest" && <input type="hidden" name="sort" value={sort} />}
      <label className="relative min-w-0 flex-1"><span className="sr-only">Search by service or customer name</span><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><Input name="search" defaultValue={search} maxLength={100} placeholder="Search by service or customer name..." className="min-h-11 rounded-xl border-border bg-card pl-9" /></label>
      <Button type="submit" variant="outline" className="min-h-11 shrink-0 rounded-xl px-4">Search</Button>
    </form>
    <form method="get" action="/dashboard/technician/requests" className="flex items-center gap-2">
      {status !== "all" && <input type="hidden" name="status" value={status} />}
      {search && <input type="hidden" name="search" value={search} />}
      <label htmlFor="request-sort" className="shrink-0 text-xs font-medium text-muted-foreground">Sort by</label>
      <select id="request-sort" name="sort" value={sort} onChange={(event) => event.currentTarget.form?.requestSubmit()} className="h-11 min-w-44 rounded-xl border border-border bg-card px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <option value="newest">Newest First</option><option value="oldest">Oldest First</option><option value="preferred_earliest">Preferred Date: Earliest</option><option value="preferred_latest">Preferred Date: Latest</option>
      </select>
    </form>
    {hasFilters && <Link href="/dashboard/technician/requests" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1 rounded-xl px-3 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><X className="size-3.5" aria-hidden="true" /> Clear</Link>}
  </div>;
}
