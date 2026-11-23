export default function CustomerPaymentsLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-7" aria-label="Loading payment history">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div className="space-y-2"><div className="h-6 w-28 animate-pulse rounded-full bg-muted" /><div className="h-9 w-60 animate-pulse rounded-lg bg-muted" /><div className="h-4 w-72 animate-pulse rounded bg-muted" /></div><div className="h-11 w-44 animate-pulse rounded-xl bg-muted" /></div>
      <div className="grid gap-0 overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-3">{[0, 1, 2].map((item) => <div key={item} className="h-28 animate-pulse border-b border-border bg-muted/30 p-5 last:border-b-0 md:border-b-0 md:border-r" />)}</div>
      <div className="h-[360px] animate-pulse rounded-2xl bg-card ring-1 ring-border" />
      <div className="h-36 animate-pulse rounded-2xl bg-card ring-1 ring-border" />
    </div>
  );
}
