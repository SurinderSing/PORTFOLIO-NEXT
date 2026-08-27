'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Comment, Profile } from '@/types/database';
import { addCommentAction, deleteCommentAction } from '@/lib/admin-actions';
import { useClientAuth } from '@/hooks/use-client-auth';
import { blogApi } from '@/services/blogApi';
import { CommentsHeader } from './comments/comments-header';
import { CommentForm } from './comments/comment-form';
import { CommentItem } from './comments/comment-item';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Comment reactions state: commentId -> { type: 'like' | 'dislike' | null, count: number }
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

  // Fetch current user's reaction statuses and live counts on mount
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
        // Rollback only on actual API failure
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

  const handleAddComment = async (commentText: string): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const res = await addCommentAction({
        post_id: postId,
        slug: postSlug,
        content: commentText,
      });

      if (res.success && res.comment) {
        setComments((prev) => [...prev, res.comment!]);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <section className="w-full pt-10 border-t border-border/70 font-mono space-y-8">
      {/* Header */}
      <CommentsHeader count={comments.length} />

      {/* Input or Sign-In Prompt Box */}
      <CommentForm
        postSlug={postSlug}
        effectiveUser={effectiveUser}
        effectiveProfile={effectiveProfile}
        authLoading={authLoading}
        isSubmitting={isSubmitting}
        onSubmit={handleAddComment}
      />

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

            return (
              <CommentItem
                key={comment.id}
                comment={comment}
                canDelete={canDelete}
                isDeleting={deletingId === comment.id}
                reaction={reaction}
                isLoggedIn={Boolean(effectiveUser)}
                onDelete={handleDeleteComment}
                onReaction={handleToggleReaction}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default CommentsSection;
