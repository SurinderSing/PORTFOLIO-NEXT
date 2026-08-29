'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/database';
import {
  Calendar,
  Clock,
  MessageSquare,
  Heart,
  ArrowUpRight,
  Edit2,
  Trash2,
  Clock3,
  FileText,
  User,
} from 'lucide-react';
import { ScrollRevealItem } from '@/components/animations/scroll-reveal';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  currentUserId?: string | null;
  isAdmin?: boolean;
  onDelete?: (post: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  post,
  featured = false,
  currentUserId,
  isAdmin = false,
  onDelete,
}) => {
  const isAuthor = Boolean(currentUserId && currentUserId === post.author_id);
  const canManage = isAdmin || isAuthor;

  const readingTime = Math.max(
    1,
    Math.ceil((post.content?.split(/\s+/).length || 200) / 200)
  );

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  const authorName = post.author?.first_name
    ? `${post.author.first_name} ${post.author.last_name || ''}`.trim()
    : post.author?.username || 'Surinder Singh';

  const renderStatusBadge = () => {
    if (post.status === 'PENDING_REVIEW') {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-500">
          <Clock3 className="h-3 w-3" />
          <span>Pending Review</span>
        </span>
      );
    }
    if (post.status === 'DRAFT') {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-zinc-500/10 border border-zinc-500/30 px-2.5 py-0.5 text-[10px] font-bold text-zinc-400">
          <FileText className="h-3 w-3" />
          <span>Draft</span>
        </span>
      );
    }
    return null;
  };

  const renderActionButtons = () => {
    if (!canManage) return null;

    return (
      <div
        className="flex items-center gap-1.5 z-20"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Link
          href={`/blog/edit/${post.slug}`}
          className="inline-flex items-center gap-1 rounded-md bg-card/90 border border-border/80 px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground hover:bg-tertiary-2 hover:border-primary/50 transition-all shadow-xs"
          title="Edit Article"
        >
          <Edit2 className="h-3 w-3 text-primary" />
          <span className="hidden sm:inline">Edit</span>
        </Link>

        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(post)}
            className="inline-flex items-center gap-1 rounded-md bg-card/90 border border-border/80 px-2 py-1 text-[11px] font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-all shadow-xs"
            title="Delete Article"
          >
            <Trash2 className="h-3 w-3 text-destructive" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        )}
      </div>
    );
  };

  if (featured) {
    return (
      <ScrollRevealItem className="col-span-full">
        <div className="relative group">
          <Link
            href={`/blog/${post.slug}`}
            className="relative flex flex-col lg:flex-row overflow-hidden rounded-xl border border-border/70 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg shadow-xs"
          >
            {/* Cover Image Frame */}
            {post.cover_image_url ? (
              <div className="relative aspect-[16/9] lg:aspect-auto lg:w-1/2 min-h-[240px] overflow-hidden bg-tertiary-2">
                <Image
                  src={post.cover_image_url}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 font-mono text-[10px] font-bold text-primary-foreground tracking-wider uppercase shadow-xs">
                    ★ Featured Article
                  </span>
                  {renderStatusBadge()}
                </div>
              </div>
            ) : null}

            {/* Details Frame */}
            <div className="flex flex-1 flex-col justify-between p-6 lg:p-8 font-mono">
              <div className="space-y-3">
                {/* Tags, Author, & Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-primary" />
                      <span className="font-semibold text-foreground/90">
                        {authorName}
                      </span>
                    </span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>{formattedDate}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      <span>{readingTime} min read</span>
                    </div>
                  </div>

                  {/* Inline Action Controls */}
                  {renderActionButtons()}
                </div>

                {/* Title */}
                <h2 className="font-sans text-xl lg:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center justify-between gap-2">
                  <span>{post.title}</span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-primary" />
                </h2>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="font-sans text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* Bottom Footer Details */}
              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                {/* Tag Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {post.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-tertiary-2 border border-border/50 px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Engagement metrics */}
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="h-3.5 w-3.5 text-rose-500" />
                    {post.likes_count || 0}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5 text-sky-500" />
                    {post.comments_count || 0}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </ScrollRevealItem>
    );
  }

  return (
    <ScrollRevealItem className="h-full">
      <div className="relative group h-full">
        <Link
          href={`/blog/${post.slug}`}
          className="flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-md shadow-xs font-mono"
        >
          {/* Card Cover Image */}
          {post.cover_image_url ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-tertiary-2 border-b border-border/50">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                {renderStatusBadge()}
              </div>
            </div>
          ) : null}

          {/* Card Body */}
          <div className="flex flex-1 flex-col justify-between p-5">
            <div className="space-y-2.5">
              {/* Meta Row & Action Controls */}
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3 text-primary" />
                    <span className="font-semibold text-foreground/90">
                      {authorName}
                    </span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-primary" />
                    {formattedDate}
                  </span>
                </div>

                {renderActionButtons()}
              </div>

              {/* Title */}
              <h3 className="font-sans text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="font-sans text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              )}
            </div>

            {/* Footer Row */}
            <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
              <div className="flex flex-wrap gap-1">
                {post.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-tertiary-2 border border-border/40 px-1.5 py-0.5 text-[10px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1">
                  <Heart className="h-3 w-3 text-rose-500" />
                  {post.likes_count || 0}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageSquare className="h-3 w-3 text-sky-500" />
                  {post.comments_count || 0}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </ScrollRevealItem>
  );
};

export default BlogCard;
