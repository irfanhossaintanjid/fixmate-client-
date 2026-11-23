export default function ProfileLoading() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-5 px-4 py-6 sm:px-6 lg:px-8 lg:py-7" aria-label="Loading profile">
      <div className="space-y-2"><div className="h-8 w-52 animate-pulse rounded-lg bg-muted" /><div className="h-4 w-80 max-w-full animate-pulse rounded bg-muted" /></div>
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.75fr)]">
        <div className="h-[390px] animate-pulse rounded-2xl bg-card ring-1 ring-border" />
        <div className="h-[520px] animate-pulse rounded-2xl bg-card ring-1 ring-border" />
      </div>
    </section>
  );
}
