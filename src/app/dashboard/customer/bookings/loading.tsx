export default function CustomerBookingsLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 px-4 py-6 sm:px-6 lg:px-8" aria-label="Loading bookings">
      <div className="flex items-end justify-between gap-4"><div className="space-y-2"><div className="h-8 w-56 animate-pulse rounded-lg bg-muted" /><div className="h-4 w-72 animate-pulse rounded bg-muted" /></div><div className="h-11 w-48 animate-pulse rounded-xl bg-muted" /></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{[0, 1, 2].map((item) => <div key={item} className="h-28 animate-pulse rounded-2xl bg-card ring-1 ring-border" />)}</div>
      <div className="h-14 animate-pulse rounded-xl bg-card ring-1 ring-border" />
      <div className="h-[480px] animate-pulse rounded-2xl bg-card ring-1 ring-border" />
    </div>
  );
}
