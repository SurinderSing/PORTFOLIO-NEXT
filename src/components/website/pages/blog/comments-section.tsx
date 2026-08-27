'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Comment, Profile } from '@/types/database';
import { addCommentAction, deleteCommentAction } from '@/lib/admin-actions';
import { useClientAuth } from '@/hooks/use-client-auth';
import { blogApi } from '@/services/blogApi';
import {
  MessageSquare,
  Send,
  Trash2,
  LogIn,
  UserPlus,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommentsSectionProps {
  postId: string;
  postSlug: string;
  initialComments: Comment[];
  currentUser?: { id: string; email?: string } | null;
  currentProfile?: Profile | null;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  postSlug,
  initialComments,
  currentUser: initialUser,
  currentProfile: initialProfile,
}) => {
  const router = useRouter();
  const {
    user: clientUser,
    profile: clientProfile,
    loading: authLoading,
  } = useClientAuth();

  const effectiveUser = clientUser || initialUser || null;
  const effectiveProfile = clientProfile || initialProfile || null;

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Comment reaction state: commentId -> { type: 'like' | 'dislike' | null, count: number }
  const [reactions, setReactions] = useState<
    Record<string, { type: 'like' | 'dislike' | null; count: number }>
  >(() => {
    const initMap: Record<
      string,
      { type: 'like' | 'dislike' | null; count: number }
    > = {};
    initialComments.forEach((c) => {
      initMap[c.id] = { type: null, count: c.likes_count || 0 };
    });
    return initMap;
  });

  // Fetch current user's reaction status and live like counts for this post's comments
  useEffect(() => {
    if (!postId) return;

    let isMounted = true;
    const fetchReactions = async () => {
      const res = await blogApi.fetchCommentReactions(postId);
      if (isMounted && res) {
        const nextMap: Record<
          string,
          { type: 'like' | 'dislike' | null; count: number }
        > = {};
        Object.entries(res).forEach(([cId, val]) => {
          nextMap[cId] = {
            type: val.userReaction,
            count: val.likesCount ?? 0,
          };
        });
        setReactions((prev) => ({
          ...prev,
          ...nextMap,
        }));
      }
    };

    fetchReactions();
    return () => {
      isMounted = false;
    };
  }, [postId, effectiveUser]);

  const handleToggleReaction = async (
    commentId: string,
    type: 'like' | 'dislike'
  ) => {
    if (!effectiveUser) {
      router.push(
        `/sign-in?redirect=${encodeURIComponent(`/blog/${postSlug}`)}`
      );
      return;
    }

    const current = reactions[commentId] || { type: null, count: 0 };
    const isRemoving = current.type === type;
    const nextType: 'like' | 'dislike' | null = isRemoving ? null : type;

    // Accurate optimistic like count calculation
    let nextCount = current.count;
    if (type === 'like') {
      nextCount = isRemoving
        ? Math.max(0, current.count - 1)
        : current.count + 1;
    } else if (type === 'dislike' && current.type === 'like') {
      nextCount = Math.max(0, current.count - 1);
    }

    // Optimistic UI update
    setReactions((prev) => ({
      ...prev,
      [commentId]: { type: nextType, count: nextCount },
    }));

    try {
      const res = await blogApi.debouncedToggleCommentReaction(
        commentId,
        nextType
      );
      if (res && res.success && res.userReaction !== undefined) {
        setReactions((prev) => ({
          ...prev,
          [commentId]: {
            type: res.userReaction ?? null,
            count: res.likesCount ?? 0,
          },
        }));
      } else if (res && !res.success) {
        // Rollback only on actual API failure (not cancellation)
        setReactions((prev) => ({
          ...prev,
          [commentId]: current,
        }));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to persist comment reaction:', err);
      // Rollback on error
      setReactions((prev) => ({
        ...prev,
        [commentId]: current,
      }));
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await addCommentAction({
      post_id: postId,
      slug: postSlug,
      content: content.trim(),
    });

    if (res.success && res.comment) {
      setComments((prev) => [...prev, res.comment!]);
      setContent('');
      setSuccessMsg('Your comment has been posted!');
      setTimeout(() => setSuccessMsg(null), 4000);
    } else {
      setErrorMsg(res.error || 'Failed to post comment. Please try again.');
    }
    setIsSubmitting(false);
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    setDeletingId(commentId);
    const res = await deleteCommentAction(commentId, postSlug);

    if (res.success) {
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } else {
      alert(res.error || 'Could not delete comment.');
    }
    setDeletingId(null);
  };

  const commenterName = effectiveProfile?.first_name
    ? `${effectiveProfile.first_name} ${effectiveProfile.last_name || ''}`.trim()
    : effectiveProfile?.username || effectiveUser?.email || 'Developer';

  return (
    <section className="w-full pt-10 border-t border-border/70 font-mono space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-foreground">
              Discussion ({comments.length})
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Technical insights, critiques, and feedback
            </p>
          </div>
        </div>
      </div>

      {/* Input or Sign-In Prompt Box */}
      {authLoading ? (
        <div className="rounded-xl border border-border/60 bg-card p-6 flex items-center justify-center text-xs text-muted-foreground gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span>Verifying authentication status...</span>
        </div>
      ) : effectiveUser ? (
        <form
          onSubmit={handleAddComment}
          className="rounded-xl border border-border/80 bg-card p-4 space-y-3 shadow-xs"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex h-6 w-6 rounded-full bg-primary/15 text-primary items-center justify-center text-[10px] font-bold">
              {commenterName[0]}
            </div>
            <span>
              Commenting as{' '}
              <strong className="text-foreground">{commenterName}</strong>
            </span>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, architectural feedback, or questions..."
            rows={3}
            required
            className="w-full rounded-lg border border-border bg-tertiary-2 p-3 text-xs font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
          />

          {errorMsg && (
            <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/20 p-2.5 text-xs text-rose-500">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-xs text-emerald-500">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-muted-foreground">
              Markdown formatting supported
            </span>
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 shadow-xs"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{isSubmitting ? 'Posting...' : 'Post Comment'}</span>
            </button>
          </div>
        </form>
      ) : (
        /* Sign In CTA in place of Comment Form for Unauthenticated Visitors */
        <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/25">
              <MessageSquare className="h-5 w-5" />
            </div>
          </div>

          <div className="space-y-1">
            <p className="font-sans text-sm font-bold text-foreground">
              Sign in to join the discussion
            </p>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Leave comments, react with upvotes/feedback, and exchange
              architecture notes with other developers.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              href={`/sign-in?redirect=/blog/${postSlug}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-xs"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In to Comment</span>
            </Link>
            <Link
              href={`/sign-up?redirect=/blog/${postSlug}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-tertiary-2 transition-colors"
            >
              <UserPlus className="h-3.5 w-3.5 text-primary" />
              <span>Create Account</span>
            </Link>
          </div>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-6">
            No comments yet. Be the first to start the discussion!
          </p>
        ) : (
          comments.map((comment) => {
            const isAuthor = effectiveUser?.id === comment.user_id;
            const isAdmin = effectiveProfile?.role === 'ADMIN';
            const canDelete = isAuthor || isAdmin;
            const reaction = reactions[comment.id] || {
              type: null,
              count: comment.likes_count || 0,
            };

            const userInitials =
              comment.user?.first_name?.[0] ||
              comment.user?.username?.[0] ||
              'U';
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
              <div
                key={comment.id}
                className="rounded-xl border border-border/70 bg-card p-4 space-y-3 shadow-2xs transition-colors hover:border-border"
              >
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
                      <p className="text-[10px] text-muted-foreground">
                        {formattedDate}
                      </p>
                    </div>
                  </div>

                  {canDelete && (
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(comment.id)}
                      disabled={deletingId === comment.id}
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
                    onClick={() => handleToggleReaction(comment.id, 'like')}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs transition-all select-none border',
                      reaction.type === 'like'
                        ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30 font-bold'
                        : 'bg-card border-border/60 text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
                    )}
                    title={
                      effectiveUser
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
                    onClick={() => handleToggleReaction(comment.id, 'dislike')}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs transition-all select-none border',
                      reaction.type === 'dislike'
                        ? 'bg-rose-500/15 text-rose-500 border-rose-500/30 font-bold'
                        : 'bg-card border-border/60 text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
                    )}
                    title={
                      effectiveUser
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
          })
        )}
      </div>
    </section>
  );
};

export default CommentsSection;
