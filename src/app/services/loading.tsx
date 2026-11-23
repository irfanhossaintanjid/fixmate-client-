export default function ServicesLoading() {
  return (
    <section aria-label="Loading services" className="min-h-[70vh] bg-background px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 space-y-3"><div className="h-5 w-32 animate-pulse rounded-full bg-secondary" /><div className="h-9 w-80 max-w-full animate-pulse rounded-lg bg-secondary" /><div className="h-5 w-[28rem] max-w-full animate-pulse rounded-lg bg-secondary" /></div>
        <div className="mb-5 h-28 animate-pulse rounded-2xl border border-border bg-card" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
          {Array.from({ length: 8 }, (_, index) => <div key={index} className="overflow-hidden rounded-2xl border border-border bg-card"><div className="aspect-[16/10] animate-pulse bg-secondary" /><div className="space-y-4 p-4 sm:p-5"><div className="h-5 w-4/5 animate-pulse rounded bg-secondary" /><div className="h-4 w-2/3 animate-pulse rounded bg-secondary" /><div className="h-20 animate-pulse rounded bg-secondary/60" /><div className="h-10 animate-pulse rounded bg-secondary" /></div></div>)}
        </div>
      </div>
    </section>
  );
}
