import React from 'react';
import { Comment } from '@/types/database';
import { Trash2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommentItemProps {
  comment: Comment;
  canDelete: boolean;
  isDeleting: boolean;
  reaction: { type: 'like' | 'dislike' | null; count: number };
  isLoggedIn: boolean;
  onDelete: (id: string) => void;
  onReaction: (id: string, type: 'like' | 'dislike') => void;
}

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  canDelete,
  isDeleting,
  reaction,
  isLoggedIn,
  onDelete,
  onReaction,
}) => {
  const userInitials =
    comment.user?.first_name?.[0] || comment.user?.username?.[0] || 'U';

  const userName = comment.user
    ? `${comment.user.first_name || ''} ${comment.user.last_name || ''}`.trim() ||
      comment.user.username ||
      'Developer'
    : 'Developer';

  const formattedDate = comment.created_at
    ? new Date(comment.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <div className="rounded-xl border border-border/70 bg-card p-4 space-y-3 shadow-2xs transition-colors hover:border-border">
      {/* User Info & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 rounded-full bg-tertiary-2 text-foreground items-center justify-center text-xs font-bold border border-border/60">
            {userInitials}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-xs font-bold text-foreground">
                {userName}
              </span>
              {comment.user?.role === 'ADMIN' && (
                <span className="rounded bg-primary/10 border border-primary/20 px-1.5 py-0.2 text-[9px] font-bold text-primary">
                  Author / Admin
                </span>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground">{formattedDate}</p>
          </div>
        </div>

        {canDelete && (
          <button
            type="button"
            onClick={() => onDelete(comment.id)}
            disabled={isDeleting}
            className="text-muted-foreground hover:text-rose-500 transition-colors p-1"
            title="Delete comment"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Comment Body */}
      <p className="font-sans text-xs md:text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap pl-9">
        {comment.content}
      </p>

      {/* Reaction Buttons Row */}
      <div className="flex items-center gap-2 pl-9 pt-1 text-xs text-muted-foreground">
        <button
          type="button"
          onClick={() => onReaction(comment.id, 'like')}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs transition-all select-none border',
            reaction.type === 'like'
              ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30 font-bold'
              : 'bg-card border-border/60 text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
          )}
          title={
            isLoggedIn
              ? reaction.type === 'like'
                ? 'Remove thumbs up'
                : 'Thumbs up'
              : 'Sign in to react'
          }
        >
          <ThumbsUp
            className={cn(
              'h-3.5 w-3.5',
              reaction.type === 'like' && 'fill-current'
            )}
          />
          <span>{reaction.count}</span>
        </button>

        <button
          type="button"
          onClick={() => onReaction(comment.id, 'dislike')}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs transition-all select-none border',
            reaction.type === 'dislike'
              ? 'bg-rose-500/15 text-rose-500 border-rose-500/30 font-bold'
              : 'bg-card border-border/60 text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
          )}
          title={
            isLoggedIn
              ? reaction.type === 'dislike'
                ? 'Remove thumbs down'
                : 'Thumbs down'
              : 'Sign in to react'
          }
        >
          <ThumbsDown
            className={cn(
              'h-3.5 w-3.5',
              reaction.type === 'dislike' && 'fill-current'
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
