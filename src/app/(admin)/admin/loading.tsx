import React from 'react';

export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-muted rounded-xl" />
          <div className="h-4 w-72 bg-muted/60 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-28 bg-muted rounded-xl" />
          <div className="h-9 w-28 bg-muted rounded-xl" />
        </div>
      </div>

      {/* Main Content Area Skeleton */}
      <div className="space-y-4">
        {/* Banner/Card placeholder */}
        <div className="p-6 rounded-2xl bg-card border border-border space-y-3">
          <div className="h-5 w-40 bg-muted rounded-md" />
          <div className="h-4 w-full bg-muted/50 rounded-md" />
          <div className="h-4 w-2/3 bg-muted/50 rounded-md" />
        </div>

        {/* Rows/Table placeholder */}
        <div className="rounded-2xl bg-card border border-border p-4 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <div className="h-5 w-32 bg-muted rounded-md" />
            <div className="h-4 w-16 bg-muted/50 rounded-md" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl bg-tertiary/50 border border-border/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted" />
                <div className="space-y-1.5">
                  <div className="h-4 w-36 bg-muted rounded" />
                  <div className="h-3 w-48 bg-muted/50 rounded" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-7 w-14 bg-muted rounded-lg" />
                <div className="h-7 w-14 bg-muted rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
