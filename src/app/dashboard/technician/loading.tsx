export default function TechnicianDashboardLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-7" aria-label="Loading technician dashboard">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div className="space-y-2"><div className="h-9 w-48 animate-pulse rounded-lg bg-muted" /><div className="h-4 w-full max-w-xl animate-pulse rounded bg-muted" /></div><div className="h-10 w-36 animate-pulse rounded-xl bg-muted" /></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="h-40 animate-pulse rounded-2xl bg-card ring-1 ring-border" />)}</div>
      <div className="h-[420px] animate-pulse rounded-2xl bg-card ring-1 ring-border" />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]"><div className="h-[390px] animate-pulse rounded-2xl bg-card ring-1 ring-border" /><div className="grid gap-5"><div className="h-56 animate-pulse rounded-2xl bg-card ring-1 ring-border" /><div className="h-56 animate-pulse rounded-2xl bg-card ring-1 ring-border" /></div></div>
    </main>
  );
}
