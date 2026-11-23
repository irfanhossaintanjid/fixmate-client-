"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { serviceCategories, serviceModes } from "@/types/service";

function FilterControls({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";
  const [search, setSearch] = useState(currentSearch);
  const queryString = searchParams.toString();

  function replaceParam(key: string, value: string) {
    const params = new URLSearchParams(queryString);
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }

  useEffect(() => {
    const normalizedSearch = search.trim();
    if (normalizedSearch === currentSearch) return;
    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams(queryString);
      if (normalizedSearch) params.set("search", normalizedSearch);
      else params.delete("search");
      params.delete("page");
      const next = params.toString();
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    }, 400);
    return () => window.clearTimeout(timeout);
  }, [search, currentSearch, pathname, queryString, router]);

  const activeFilters = [
    ["search", "Search", searchParams.get("search")],
    ["category", "Category", searchParams.get("category")],
    ["mode", "Mode", searchParams.get("mode")],
    ["sort", "Sort", searchParams.get("sort") === "price_asc" ? "Price: Low to High" : searchParams.get("sort") === "price_desc" ? "Price: High to Low" : null],
  ] as const;
  const hasFilters = activeFilters.some(([, , value]) => Boolean(value));

  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-sm sm:p-4">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(220px,1.6fr)_repeat(3,minmax(130px,1fr))_auto]">
        <label className="relative block min-w-0 sm:col-span-2 lg:col-span-1">
          <span className="sr-only">Search by title or category</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or category"
            aria-label="Search by title or category"
            className="h-11 rounded-xl border-border bg-background pl-9 text-sm focus-visible:ring-primary"
          />
        </label>
        <label className="block">
          <span className="sr-only">Category</span>
          <select aria-label="Category" value={searchParams.get("category") ?? "all"} onChange={(event) => replaceParam("category", event.target.value === "all" ? "" : event.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <option value="all">All Categories</option>
            {serviceCategories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="sr-only">Service mode</span>
          <select aria-label="Service Mode" value={searchParams.get("mode") ?? "all"} onChange={(event) => replaceParam("mode", event.target.value === "all" ? "" : event.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <option value="all">All Modes</option>
            {serviceModes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="sr-only">Sort services</span>
          <select aria-label="Sort services" value={searchParams.get("sort") ?? "newest"} onChange={(event) => replaceParam("sort", event.target.value === "newest" ? "" : event.target.value)} className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </label>
        <button type="button" onClick={() => { setSearch(""); router.replace(pathname, { scroll: false }); }} className="h-11 rounded-xl px-3 text-sm font-medium text-primary transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          Clear filters
        </button>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
        <p aria-live="polite" className="text-xs text-muted-foreground">Showing {total} {total === 1 ? "service" : "services"}</p>
        {hasFilters ? (
          <div className="flex flex-wrap gap-2" aria-label="Active filters">
            {activeFilters.filter((item) => item[2]).map(([key, label, value]) => (
              <button key={key} type="button" onClick={() => { if (key === "search") setSearch(""); replaceParam(key, ""); }} className="inline-flex min-h-7 items-center gap-1 rounded-full border border-border bg-secondary/70 px-2.5 text-[11px] font-medium text-secondary-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {label}: {value}<X className="size-3" aria-hidden="true" /><span className="sr-only">Remove {label} filter</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SearchSyncedFilters({ total }: { total: number }) {
  const searchParams = useSearchParams();
  return <FilterControls key={searchParams.get("search") ?? ""} total={total} />;
}

export function ServiceFilters({ total }: { total: number }) {
  return <Suspense fallback={<div className="h-28 animate-pulse rounded-2xl border border-border bg-card" aria-hidden="true" />}><SearchSyncedFilters total={total} /></Suspense>;
}
