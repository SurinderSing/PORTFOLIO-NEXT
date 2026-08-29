/**
 * Blog Client API Service
 * Centralized, deduplicated, and debounced client service for blog engagement.
 */

import { RequestDebouncer } from '@/utils/request-debouncer';

export interface LikeStatusResponse {
  liked: boolean;
  likesCount: number;
}

export interface ToggleLikeResponse {
  success: boolean;
  liked?: boolean;
  likesCount?: number;
  error?: string;
}

export interface CommentReactionsMap {
  [commentId: string]: {
    userReaction: 'like' | 'dislike' | null;
    likesCount: number;
  };
}

export interface ToggleReactionResponse {
  success: boolean;
  userReaction?: 'like' | 'dislike' | null;
  likesCount?: number;
  error?: string;
}

// In-flight read request cache to prevent duplicate concurrent GETs
const inFlightRequests = new Map<string, Promise<any>>();

// In-memory reactive broadcast store for live post likes
const postLikesState = new Map<string, number>();
type LikeChangeListener = (postId: string, likesCount: number) => void;
const likeChangeListeners = new Set<LikeChangeListener>();

// Request debouncers for batching rapid clicks and canceling in-flight mutations
const postLikeDebouncer = new RequestDebouncer<ToggleLikeResponse>();
const commentReactionDebouncer = new RequestDebouncer<ToggleReactionResponse>();

export const blogApi = {
  /**
   * Subscribe to live like count changes across components/pages
   */
  subscribeToLikes(listener: LikeChangeListener): () => void {
    likeChangeListeners.add(listener);
    return () => {
      likeChangeListeners.delete(listener);
    };
  },

  /**
   * Broadcast a like count change to all active subscribers
   */
  notifyLikesChange(postId: string, likesCount: number): void {
    postLikesState.set(postId, likesCount);
    likeChangeListeners.forEach((fn) => {
      try {
        fn(postId, likesCount);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error in likeChangeListener:', err);
      }
    });
  },

  /**
   * Get cached live likes count for a post if available
   */
  getCachedLikes(postId: string): number | undefined {
    return postLikesState.get(postId);
  },

  /**
   * Fetch current user's like status and total likes for a post (deduplicated)
   */
  async fetchPostLikeStatus(postId: string): Promise<LikeStatusResponse> {
    const key = `like-status-${postId}`;
    if (inFlightRequests.has(key)) {
      return inFlightRequests.get(key);
    }

    const promise = (async (): Promise<LikeStatusResponse> => {
      try {
        const res = await fetch(
          `/api/blog/like?postId=${encodeURIComponent(postId)}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch like status: ${res.statusText}`);
        }

        const data = await res.json();
        return {
          liked: Boolean(data.liked),
          likesCount: Number(data.likesCount || 0),
        };
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('blogApi.fetchPostLikeStatus error:', err);
        return { liked: false, likesCount: 0 };
      } finally {
        inFlightRequests.delete(key);
      }
    })();

    inFlightRequests.set(key, promise);
    return promise;
  },

  /**
   * Debounced and cancelable like toggle for rapid user clicks.
   * Cancels in-flight requests and batches rapid clicks into 1 final call.
   */
  async debouncedTogglePostLike(
    postId: string,
    desiredLiked: boolean,
    delayMs = 350
  ): Promise<ToggleLikeResponse | null> {
    return postLikeDebouncer.dispatch(
      postId,
      async (signal) => {
        const res = await fetch('/api/blog/like', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, desiredLiked }),
          signal,
        });

        const data = await res.json();
        if (!res.ok) {
          return {
            success: false,
            error: data.error || 'Failed to update like',
          };
        }

        if (typeof data.likesCount === 'number') {
          blogApi.notifyLikesChange(postId, data.likesCount);
        }

        return {
          success: true,
          liked: data.liked,
          likesCount: data.likesCount,
        };
      },
      delayMs
    );
  },

  /**
   * Fetch user reaction states and live like counts for all comments in a post (deduplicated)
   */
  async fetchCommentReactions(postId: string): Promise<CommentReactionsMap> {
    const key = `comments-rx-${postId}`;
    if (inFlightRequests.has(key)) {
      return inFlightRequests.get(key);
    }

    const promise = (async (): Promise<CommentReactionsMap> => {
      try {
        const res = await fetch(
          `/api/blog/reaction?postId=${encodeURIComponent(postId)}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch comment reactions: ${res.statusText}`
          );
        }

        const data = await res.json();
        return (data.reactions || {}) as CommentReactionsMap;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('blogApi.fetchCommentReactions error:', err);
        return {};
      } finally {
        inFlightRequests.delete(key);
      }
    })();

    inFlightRequests.set(key, promise);
    return promise;
  },

  /**
   * Debounced and cancelable comment reaction toggle for rapid clicks.
   * Cancels in-flight requests and batches rapid clicks into 1 final call.
   */
  async debouncedToggleCommentReaction(
    commentId: string,
    desiredReaction: 'like' | 'dislike' | null,
    delayMs = 350
  ): Promise<ToggleReactionResponse | null> {
    return commentReactionDebouncer.dispatch(
      commentId,
      async (signal) => {
        const res = await fetch('/api/blog/reaction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ commentId, desiredReaction }),
          signal,
        });

        const data = await res.json();
        if (!res.ok) {
          return {
            success: false,
            error: data.error || 'Failed to update reaction',
          };
        }

        return {
          success: true,
          userReaction: data.userReaction,
          likesCount: data.likesCount,
        };
      },
      delayMs
    );
  },

  /**
   * Create a new blog post (delegates to server action)
   */
  async createPost(data: {
    title: string;
    slug: string;
    excerpt?: string | null;
    content: string;
    cover_image_url?: string | null;
    tags?: string[];
    status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'PENDING_REVIEW';
  }) {
    const { createUserBlogPostAction } = await import('@/lib/admin-actions');
    return createUserBlogPostAction(data);
  },

  /**
   * Update an existing blog post (author or admin)
   */
  async updatePost(
    id: string,
    data: {
      title?: string;
      slug?: string;
      excerpt?: string | null;
      content?: string;
      cover_image_url?: string | null;
      tags?: string[];
      status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'PENDING_REVIEW';
    }
  ) {
    const { updateUserBlogPostAction } = await import('@/lib/admin-actions');
    return updateUserBlogPostAction(id, data);
  },

  /**
   * Delete a blog post (author or admin)
   */
  async deletePost(id: string) {
    const { deleteUserBlogPostAction } = await import('@/lib/admin-actions');
    return deleteUserBlogPostAction(id);
  },

  /**
   * Approve a pending post (admin only)
   */
  async approvePost(id: string) {
    const { approveBlogPostAction } = await import('@/lib/admin-actions');
    return approveBlogPostAction(id);
  },

  /**
   * Reject a pending post (admin only)
   */
  async rejectPost(id: string) {
    const { rejectBlogPostAction } = await import('@/lib/admin-actions');
    return rejectBlogPostAction(id);
  },

  /**
   * Fetch a blog post for editing (verifies author/admin)
   */
  async getPostForEdit(slug: string) {
    const { getBlogPostForEditAction } = await import('@/lib/admin-actions');
    return getBlogPostForEditAction(slug);
  },

  /**
   * Fetch author's own posts across all statuses (draft, pending, published)
   */
  async getUserPosts() {
    const { getUserBlogPostsAction } = await import('@/lib/admin-actions');
    return getUserBlogPostsAction();
  },

  /**
   * Fetch all posts for admin moderation and management
   */
  async getAdminPosts() {
    const { getAdminBlogPostsAction } = await import('@/lib/admin-actions');
    return getAdminBlogPostsAction();
  },
};

export default blogApi;
