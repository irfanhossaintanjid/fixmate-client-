export default function MyServicesLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-7" aria-label="Loading your services">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div className="space-y-2"><div className="h-4 w-48 animate-pulse rounded bg-muted" /><div className="h-9 w-56 animate-pulse rounded-lg bg-muted" /><div className="h-4 w-full max-w-xl animate-pulse rounded bg-muted" /></div><div className="h-11 w-40 animate-pulse rounded-xl bg-muted" /></div>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">{[0, 1, 2, 3].map((i) => <div key={i} className="h-32 animate-pulse rounded-2xl bg-card ring-1 ring-border" />)}</div>
      <div className="h-14 animate-pulse rounded-2xl bg-card ring-1 ring-border" />
      <div className="space-y-2 rounded-2xl bg-card p-4 ring-1 ring-border">{[0, 1, 2, 3, 4].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-muted/50" />)}</div>
    </main>
  );
}
