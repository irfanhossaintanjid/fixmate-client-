import { redirect } from "next/navigation";
import { ManageRequestsOverview } from "@/components/dashboard/technician/requests/ManageRequestsOverview";
import { dashboardFetch, getDashboardSession } from "@/lib/dashboard/server-api";
import { getDashboardPath } from "@/lib/roles";
import type { Booking, BookingStatus } from "@/lib/dashboard/types";

export const metadata = { title: "Manage Requests | FixMate" };

const statuses: BookingStatus[] = ["requested", "accepted", "in-progress", "completed", "rejected", "cancelled"];
const sortValues = ["newest", "oldest", "preferred_earliest", "preferred_latest"] as const;
export type RequestSort = (typeof sortValues)[number];
export type TechnicianBookingCounts = Record<BookingStatus, number> & { all: number };

export default async function TechnicianRequestsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const session = await getDashboardSession();
  if (!session) return null;
  if (session.user.role !== "technician") redirect(getDashboardPath(session.user.role || "customer"));

  const query = await searchParams;
  const statusParam = typeof query.status === "string" ? query.status : "all";
  const status = statuses.includes(statusParam as BookingStatus) ? statusParam as BookingStatus : "all";
  const search = typeof query.search === "string" ? query.search.trim().slice(0, 100) : "";
  const sortParam = typeof query.sort === "string" ? query.sort : "newest";
  const sort = sortValues.includes(sortParam as RequestSort) ? sortParam as RequestSort : "newest";
  const params = new URLSearchParams();
  if (status !== "all") params.set("status", status);
  if (search) params.set("search", search);
  if (sort !== "newest") params.set("sort", sort);
  const suffix = params.size ? `?${params.toString()}` : "";

  const data = await dashboardFetch<{ bookings: Booking[]; counts: TechnicianBookingCounts }>(`bookings/technician${suffix}`, session.session.token);
  return <ManageRequestsOverview bookings={data.bookings} counts={data.counts} selectedStatus={status} search={search} sort={sort} />;
}
