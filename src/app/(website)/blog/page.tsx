import React from 'react';
import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/supabase-queries';
import BlogFeedClient from '@/components/website/pages/blog/blog-feed-client';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';

export const metadata: Metadata = {
  title: 'Engineering Blog & Articles | Surinder Singh Portfolio',
  description:
    'Deep dives on Micro-Frontends, Webpack Module Federation, React Server Components, Next.js 14, and scalable frontend architectures by Surinder Singh.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Engineering Blog & Articles | Surinder Singh Portfolio',
    description:
      'Deep dives on Micro-Frontends, Webpack Module Federation, React Server Components, Next.js 14, and scalable frontend architectures by Surinder Singh.',
    url: 'https://surinder-singh-portfolio.vercel.app/blog',
  },
};

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts({ status: 'PUBLISHED' });

  return (
    <div className="w-full font-mono py-4">
      <FadeIn staggerChildren={0.15}>
        {/* Header Breadcrumb */}
        <FadeInItem className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-md bg-tertiary-2 px-2.5 py-1 text-xs text-muted-foreground border border-border/60">
            <span className="text-primary font-bold">$</span>
            <span>cat ./articles --latest</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-sans">
                Engineering Blog & Architecture
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-2xl font-sans">
                In-depth technical writeups on scalable micro-frontend systems,
                Next.js 14 App Router, Webpack Module Federation, and AI
                developer workflows.
              </p>
            </div>
          </div>
        </FadeInItem>

        {/* Client Feed Component */}
        <FadeInItem>
          <BlogFeedClient initialPosts={posts} />
        </FadeInItem>
      </FadeIn>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://surinder-singh-portfolio.vercel.app',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://surinder-singh-portfolio.vercel.app/blog',
              },
            ],
          }),
        }}
      />
    </div>
  );
}
