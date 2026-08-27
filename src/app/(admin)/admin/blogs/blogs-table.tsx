'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost, PostStatus } from '@/types/database';
import { Edit2, Trash2, ExternalLink, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogsTableProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
  onToggleStatus: (post: BlogPost, newStatus: PostStatus) => void;
}

export default function BlogsTable({
  posts,
  onEdit,
  onDelete,
  onToggleStatus,
}: BlogsTableProps) {
  if (posts.length === 0) {
    return (
      <div className="p-8 text-center rounded-xl border border-dashed border-border text-muted-foreground font-mono text-xs">
        No blog posts created yet. Click &quot;New Article&quot; above to draft
        your first engineering writeup!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-xs font-mono">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-border bg-tertiary-2 text-[11px] text-muted-foreground uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3">Article</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Tags</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {posts.map((post) => {
            const formattedDate = post.published_at
              ? new Date(post.published_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Not Published';

            return (
              <tr
                key={post.id}
                className="hover:bg-tertiary-2/40 transition-colors"
              >
                {/* Article Info */}
                <td className="px-4 py-3.5 max-w-sm">
                  <div className="flex items-center gap-3">
                    {post.cover_image_url ? (
                      <div className="relative h-10 w-16 shrink-0 rounded overflow-hidden border border-border bg-background">
                        <Image
                          src={post.cover_image_url}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="min-w-0">
                      <p className="font-sans font-bold text-foreground truncate">
                        {post.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        /{post.slug}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Status Badge & Dropdown */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <select
                    value={post.status}
                    onChange={(e) =>
                      onToggleStatus(post, e.target.value as PostStatus)
                    }
                    className={cn(
                      'rounded-md px-2 py-1 text-[11px] font-bold border focus:outline-none transition-colors cursor-pointer',
                      post.status === 'PUBLISHED'
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                        : post.status === 'DRAFT'
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                          : 'bg-muted text-muted-foreground border-border'
                    )}
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </td>

                {/* Tags */}
                <td className="px-4 py-3.5 max-w-[180px]">
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded bg-tertiary-2 border border-border/50 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                      >
                        #{t}
                      </span>
                    ))}
                    {(post.tags?.length || 0) > 2 && (
                      <span className="text-[10px] text-muted-foreground">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>

                {/* Date */}
                <td className="px-4 py-3.5 whitespace-nowrap text-muted-foreground text-[11px]">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-primary" />
                    <span>{formattedDate}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-3.5 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1.5">
                    {post.status === 'PUBLISHED' && (
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-md hover:bg-tertiary-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="View Live Article"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => onEdit(post)}
                      className="p-1.5 rounded-md hover:bg-tertiary-2 text-muted-foreground hover:text-primary transition-colors"
                      title="Edit Post"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(post)}
                      className="p-1.5 rounded-md hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
