import { BookingCard } from "@/components/dashboard/customer/BookingCard";
import { BookingHighlights } from "@/components/dashboard/customer/BookingHighlights";
import { BookingsHeader } from "@/components/dashboard/customer/BookingsHeader";
import { BookingsTable } from "@/components/dashboard/customer/BookingsTable";
import { BookingStatusTabs } from "@/components/dashboard/customer/BookingStatusTabs";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { dashboardFetch, getDashboardSession } from "@/lib/dashboard/server-api";
import type { Booking, BookingCounts, BookingHighlights as BookingHighlightsData } from "@/lib/dashboard/types";

export const metadata = { title: "My Bookings | FixMate" };

const allowedStatuses = ["requested", "accepted", "in-progress", "completed"] as const;
const statusLabels: Record<(typeof allowedStatuses)[number], string> = {
  requested: "Requested",
  accepted: "Accepted",
  "in-progress": "In Progress",
  completed: "Completed",
};

type BookingsResponse = {
  bookings: Booking[];
  counts: BookingCounts;
  highlights: BookingHighlightsData;
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function CustomerBookingsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const queryStatus = Array.isArray(params.status) ? params.status[0] : params.status;
  const status = allowedStatuses.includes(queryStatus as (typeof allowedStatuses)[number]) ? queryStatus as (typeof allowedStatuses)[number] : "all";
  const session = await getDashboardSession();
  if (!session) return null;

  const query = status === "all" ? "" : `?status=${encodeURIComponent(status)}`;
  const data = await dashboardFetch<BookingsResponse>(`bookings/my${query}`, session.session.token);

  return (
    <section className="mx-auto w-full max-w-7xl space-y-5 px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
      <BookingsHeader count={data.counts.all} />
      <BookingHighlights highlights={data.highlights} />
      <BookingStatusTabs counts={data.counts} selected={status} />
      {data.bookings.length > 0 ? (
        <>
          <BookingsTable bookings={data.bookings} />
          <div className="grid gap-3 lg:hidden">
            {data.bookings.map((booking) => <BookingCard key={booking._id} booking={booking} />)}
            <p className="px-1 py-2 text-xs text-muted-foreground">Showing {data.bookings.length} {data.bookings.length === 1 ? "booking" : "bookings"}</p>
          </div>
        </>
      ) : (
        <EmptyState
          title={status === "all" ? "No bookings yet" : `No ${statusLabels[status]} bookings`}
          description={status === "all" ? "Browse approved services and send your first repair request." : "There are no bookings in this status yet."}
          href={status === "all" ? "/services" : "/dashboard/customer/bookings"}
          action={status === "all" ? "Browse Services" : "View all bookings"}
        />
      )}
    </section>
  );
}
