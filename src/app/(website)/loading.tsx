import React from 'react';

export default function Loading() {
  return (
    <div className="w-full font-mono py-4 space-y-8 animate-pulse">
      {/* Header Breadcrumb Skeleton */}
      <div className="space-y-3">
        <div className="h-6 w-44 rounded-md bg-tertiary-2 border border-border/60" />
        <div className="space-y-2">
          <div className="h-8 w-80 max-w-full rounded-xl bg-card border border-border" />
          <div className="h-4 w-96 max-w-full rounded-md bg-muted-foreground/10" />
        </div>
      </div>

      {/* Top Banner Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-border/70 bg-card/60 p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20" />
          <div className="space-y-1.5">
            <div className="h-3.5 w-60 rounded bg-muted-foreground/15" />
            <div className="h-3 w-80 max-w-xs sm:max-w-md rounded bg-muted-foreground/10" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-28 rounded-lg bg-primary/20" />
          <div className="h-8 w-20 rounded-lg bg-tertiary-2 border border-border" />
        </div>
      </div>

      {/* Filter / Search Bar Skeleton */}
      <div className="space-y-4">
        <div className="h-11 w-full rounded-xl border border-border bg-card" />
        <div className="flex flex-wrap gap-2">
          <div className="h-7 w-28 rounded-lg bg-primary/20" />
          <div className="h-7 w-24 rounded-lg bg-card border border-border" />
          <div className="h-7 w-20 rounded-lg bg-card border border-border" />
          <div className="h-7 w-20 rounded-lg bg-card border border-border" />
        </div>
      </div>

      {/* Featured Article Card Skeleton */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-6 aspect-[16/10] bg-tertiary-2" />
        <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="h-4 w-48 rounded bg-muted-foreground/15" />
            <div className="h-7 w-3/4 rounded-lg bg-muted-foreground/20" />
            <div className="h-4 w-full rounded bg-muted-foreground/10" />
            <div className="h-4 w-5/6 rounded bg-muted-foreground/10" />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border/60">
            <div className="h-5 w-32 rounded bg-tertiary-2" />
            <div className="h-5 w-16 rounded bg-tertiary-2" />
          </div>
        </div>
      </div>

      {/* Grid Articles Skeleton (3-column) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col justify-between p-5 space-y-4"
          >
            <div className="aspect-[16/9] w-full rounded-xl bg-tertiary-2" />
            <div className="space-y-2">
              <div className="h-3 w-32 rounded bg-muted-foreground/15" />
              <div className="h-5 w-5/6 rounded bg-muted-foreground/20" />
              <div className="h-3.5 w-full rounded bg-muted-foreground/10" />
              <div className="h-3.5 w-4/5 rounded bg-muted-foreground/10" />
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="h-4 w-20 rounded bg-tertiary-2" />
              <div className="h-4 w-12 rounded bg-tertiary-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
