export function OverviewHeader({ firstName }: { firstName: string }) {
  return (
    <header className="space-y-1">
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Overview</h1>
      <p className="text-sm leading-6 text-muted-foreground">Welcome back, {firstName} — here is a summary of your repair requests and active bookings.</p>
    </header>
  );
}
