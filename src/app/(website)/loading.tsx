import React from 'react';

export default function Loading() {
  return (
    <div className="bg-tertiary rounded-2xl shadow-sm w-full animate-pulse">
      <div className="w-full max-w-[46rem] mx-auto py-4 px-3">
        {/* Page Title Skeleton */}
        <div className="flex items-center gap-6 mb-6 sm:mt-4">
          <div className="h-8 w-32 bg-foreground/10 rounded-xl" />
          <div className="w-[30%] h-[3px] bg-foreground/10 rounded-full" />
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4 pt-2">
          <div className="h-5 w-3/4 bg-foreground/10 rounded-lg" />
          <div className="h-4 w-full bg-foreground/10 rounded-md" />
          <div className="h-4 w-5/6 bg-foreground/10 rounded-md" />
          <div className="h-4 w-2/3 bg-foreground/10 rounded-md" />

          {/* Cards Grid Placeholder */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 pt-6">
            <div className="h-28 bg-foreground/5 rounded-2xl border border-foreground/5" />
            <div className="h-28 bg-foreground/5 rounded-2xl border border-foreground/5" />
            <div className="h-28 bg-foreground/5 rounded-2xl border border-foreground/5" />
            <div className="h-28 bg-foreground/5 rounded-2xl border border-foreground/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
