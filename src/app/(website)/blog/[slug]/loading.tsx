import React from 'react';

export default function ArticleDetailLoading() {
  return (
    <article className="w-full font-mono py-2 max-w-5xl mx-auto space-y-5 animate-pulse">
      {/* Navigation Breadcrumb Skeleton */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="h-8 w-44 rounded-lg bg-card border border-border" />
        <div className="h-7 w-48 rounded-md bg-tertiary-2 border border-border/60" />
      </div>

      {/* Article Header Skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-3/4 max-w-full rounded-xl bg-card border border-border" />
        <div className="h-12 w-full rounded-xl bg-card/60 border border-border/60" />
        <div className="flex gap-2">
          <div className="h-6 w-20 rounded-md bg-tertiary-2 border border-border" />
          <div className="h-6 w-24 rounded-md bg-tertiary-2 border border-border" />
        </div>
      </div>

      {/* Cover Image Skeleton */}
      <div className="aspect-[16/9] w-full rounded-2xl bg-card border border-border" />

      {/* Article Body Skeleton */}
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-6">
        <div className="h-6 w-1/3 rounded-lg bg-muted-foreground/20" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-muted-foreground/10" />
          <div className="h-4 w-full rounded bg-muted-foreground/10" />
          <div className="h-4 w-5/6 rounded bg-muted-foreground/10" />
        </div>
        <div className="h-28 w-full rounded-xl bg-tertiary-2 border border-border/60" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-muted-foreground/10" />
          <div className="h-4 w-3/4 rounded bg-muted-foreground/10" />
        </div>
      </div>
    </article>
  );
}
