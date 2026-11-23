import { Suspense } from "react";
import type { Metadata } from "next";
import { ServicesEmptyState } from "@/components/services/ServicesEmptyState";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { ServicesHeader } from "@/components/services/ServicesHeader";
import { ServiceFilters } from "@/components/services/ServiceFilters";
import { ServicesPagination } from "@/components/services/ServicesPagination";
import { getServices } from "@/lib/api/services";

export const metadata: Metadata = {
  title: "Browse Repair Services | FixMate",
  description: "Explore approved device and home appliance repair services from FixMate technicians.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;

export default async function ServicesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = {
    search: first(params.search),
    category: first(params.category),
    mode: first(params.mode),
    sort: first(params.sort),
    page: first(params.page),
  };
  const result = await getServices(query);

  return (
    <section className="min-h-[70vh] bg-background px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <ServicesHeader />
        <Suspense fallback={<div className="h-28 animate-pulse rounded-2xl border border-border bg-card" aria-hidden="true" />}>
          <ServiceFilters total={result.total} />
        </Suspense>
        {result.services.length ? (
          <div className="mt-5">
            <ServicesGrid services={result.services} />
            <Suspense fallback={null}><ServicesPagination page={result.page} totalPages={result.totalPages} /></Suspense>
          </div>
        ) : (
          <div className="mt-5"><ServicesEmptyState hasAnyServices={result.hasAnyServices} /></div>
        )}
      </div>
    </section>
  );
}
