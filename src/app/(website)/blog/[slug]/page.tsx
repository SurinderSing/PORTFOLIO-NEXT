import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getBlogPostBySlug,
  getCommentsByPostId,
  getBlogPosts,
} from '@/lib/supabase-queries';
import ArticleContent from '@/components/website/pages/blog/article-content';
import CommentsSection from '@/components/website/pages/blog/comments-section';
import LikeButton from '@/components/website/pages/blog/like-button';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Article Not Found | Surinder Singh',
    };
  }

  return {
    title: `${post.title} | Surinder Singh`,
    description: post.excerpt || post.title,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      images: post.cover_image_url ? [post.cover_image_url] : [],
      type: 'article',
      publishedTime: post.published_at || undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const comments = await getCommentsByPostId(post.id);

  const readingTime = Math.max(
    1,
    Math.ceil((post.content?.split(/\s+/).length || 200) / 200)
  );

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  const authorName = post.author
    ? `${post.author.first_name || ''} ${post.author.last_name || ''}`.trim() ||
      post.author.username ||
      'Surinder Singh'
    : 'Surinder Singh';

  return (
    <article className="w-full font-mono py-4 max-w-4xl mx-auto space-y-8">
      <FadeIn staggerChildren={0.1}>
        {/* Navigation & Breadcrumb */}
        <FadeInItem className="space-y-4">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-tertiary-2 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all articles</span>
            </Link>

            <div className="inline-flex items-center gap-2 rounded-md bg-tertiary-2 px-2.5 py-1 text-xs text-muted-foreground border border-border/60">
              <span className="text-primary font-bold">$</span>
              <span>cat ./{post.slug}.md</span>
            </div>
          </div>
        </FadeInItem>

        {/* Article Header */}
        <FadeInItem className="space-y-4 pt-2">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 text-primary font-bold">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary" />
              {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-md bg-tertiary-2 border border-border/60 px-2.5 py-1 text-xs text-muted-foreground"
              >
                <Tag className="h-3 w-3 text-primary" />
                {tag}
              </span>
            ))}
          </div>

          {/* Author Card & Engagement Bar */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-border/70 bg-card/60 backdrop-blur-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 rounded-full bg-primary/15 text-primary items-center justify-center text-xs font-bold border border-primary/20">
                {authorName[0]}
              </div>
              <div>
                <p className="font-sans text-xs font-bold text-foreground">
                  {authorName}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Senior Software Engineer & Frontend Architect
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LikeButton
                postId={post.id}
                initialLikes={post.likes_count || 0}
              />
            </div>
          </div>
        </FadeInItem>

        {/* Cover Image */}
        {post.cover_image_url && (
          <FadeInItem>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-tertiary-2 shadow-md">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          </FadeInItem>
        )}

        {/* Main Article Body */}
        <FadeInItem className="pt-4">
          <div className="rounded-xl border border-border/70 bg-card p-6 md:p-10 shadow-xs">
            <ArticleContent content={post.content} />
          </div>
        </FadeInItem>

        {/* Article Footer Action Bar */}
        <FadeInItem>
          <div className="flex items-center justify-between p-4 rounded-xl border border-border/70 bg-card/60">
            <div className="flex items-center gap-2">
              <LikeButton
                postId={post.id}
                initialLikes={post.likes_count || 0}
              />
            </div>

            <Link
              href="/blog"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Explore more articles →
            </Link>
          </div>
        </FadeInItem>

        {/* Discussion & Comments Section */}
        <FadeInItem>
          <CommentsSection
            postId={post.id}
            postSlug={post.slug}
            initialComments={comments}
          />
        </FadeInItem>
      </FadeIn>
    </article>
  );
}
