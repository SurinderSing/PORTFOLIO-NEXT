import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getBlogPostForViewing,
  getCommentsByPostId,
  getBlogPosts,
} from '@/lib/supabase-queries';
import ArticleContent from '@/components/website/pages/blog/article-content';
import CommentsSection from '@/components/website/pages/blog/comments-section';
import LikeButton from '@/components/website/pages/blog/like-button';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';
import ArticleHeaderActions from '@/components/website/pages/blog/article-header-actions';
import { ArrowLeft, Tag, Clock3, AlertCircle } from 'lucide-react';

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
  const post = await getBlogPostForViewing(params.slug);

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
  const post = await getBlogPostForViewing(params.slug);

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
    <article className="w-full font-mono py-2 max-w-5xl mx-auto">
      <FadeIn staggerChildren={0.08} className="flex flex-col space-y-5">
        {/* Navigation & Breadcrumb */}
        <FadeInItem>
          <div className="flex items-center justify-between gap-3 font-mono text-xs flex-wrap">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-tertiary-2 transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">Back to all articles</span>
              <span className="sm:hidden">Back</span>
            </Link>

            <div className="flex items-center gap-2 flex-wrap">
              <ArticleHeaderActions
                postId={post.id}
                postSlug={post.slug}
                authorId={post.author_id}
                postTitle={post.title}
              />

              <div className="inline-flex items-center gap-2 rounded-md bg-tertiary-2 px-2.5 py-1 text-muted-foreground border border-border/60 max-w-[200px] sm:max-w-xs md:max-w-none overflow-hidden">
                <span className="text-primary font-bold shrink-0">$</span>
                <span className="truncate">cat ./{post.slug}.md</span>
              </div>
            </div>
          </div>
        </FadeInItem>

        {/* Non-Published Status Notice Banner */}
        {post.status !== 'PUBLISHED' && (
          <FadeInItem>
            <div
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-4 text-xs font-mono ${
                post.status === 'PENDING_REVIEW'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                  : 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400'
              }`}
            >
              <div className="flex items-start sm:items-center gap-2.5">
                {post.status === 'PENDING_REVIEW' ? (
                  <Clock3 className="h-4 w-4 shrink-0 mt-0.5 sm:mt-0 text-amber-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 sm:mt-0 text-zinc-400" />
                )}
                <div>
                  <p className="font-bold text-foreground">
                    {post.status === 'PENDING_REVIEW'
                      ? 'Article Status: Pending Review'
                      : 'Article Status: Draft'}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {post.status === 'PENDING_REVIEW'
                      ? 'This article has been submitted for review. It is only visible to you (the author) and administrators.'
                      : 'This is a private draft and is not visible to public visitors.'}
                  </p>
                </div>
              </div>
              <Link
                href={`/blog/edit/${post.slug}`}
                className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity self-start sm:self-auto shrink-0 shadow-xs"
              >
                <span>Edit Article</span>
              </Link>
            </div>
          </FadeInItem>
        )}

        {/* Article Header */}
        <FadeInItem className="space-y-3">
          {/* Title */}
          <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          {/* Author, Date & Reading Time Meta Bar */}
          <div className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-card/60 backdrop-blur-xs">
            <div className="flex h-8 w-8 rounded-full bg-primary/15 text-primary items-center justify-center text-xs font-bold border border-primary/20 shrink-0">
              {authorName[0]}
            </div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
              <span className="font-sans font-bold text-foreground">
                {authorName}
              </span>
              <span className="text-muted-foreground/60">•</span>
              <span className="text-muted-foreground">{formattedDate}</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="text-muted-foreground">
                {readingTime} min read
              </span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md bg-tertiary-2 border border-border/60 px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  <Tag className="h-3 w-3 text-primary" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </FadeInItem>

        {/* Cover Image */}
        {post.cover_image_url && (
          <FadeInItem>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-tertiary-2 shadow-xs">
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

        {/* Main Article Body & Integrated Action Footer */}
        <FadeInItem>
          <div className="rounded-2xl border border-border/70 bg-card p-6 md:p-8 shadow-xs space-y-8">
            <ArticleContent content={post.content} />

            {/* Bottom Divider & Engagement Bar */}
            <div className="pt-5 border-t border-border/60 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <LikeButton
                  postId={post.id}
                  initialLikes={post.likes_count || 0}
                />
                <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
                  Enjoyed this writeup? Leave a like!
                </span>
              </div>

              <Link
                href="/blog"
                className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 font-mono font-medium"
              >
                <span>Explore more articles</span>
                <span>→</span>
              </Link>
            </div>
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
