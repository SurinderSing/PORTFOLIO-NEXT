/**
 * Blog Client API Service
 * Centralized service for all blog-related API requests with deduplication.
 */

// In-flight request cache to deduplicate simultaneous requests
const inFlightRequests = new Map<string, Promise<any>>();

// In-memory known likes map and reactive event listeners
const postLikesState = new Map<string, number>();
type LikeChangeListener = (postId: string, likesCount: number) => void;
const likeChangeListeners = new Set<LikeChangeListener>();

// Pending debounce timers and abort controllers for batching & cancelling rapid clicks
const postLikeTimers = new Map<string, ReturnType<typeof setTimeout>>();
const postLikeAbortControllers = new Map<string, AbortController>();

const commentReactionTimers = new Map<string, ReturnType<typeof setTimeout>>();
const commentReactionAbortControllers = new Map<string, AbortController>();

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
   * Fetch current user's like status and total likes for a post
   */
  async fetchPostLikeStatus(
    postId: string
  ): Promise<{ liked: boolean; likesCount: number }> {
    const key = `like-status-${postId}`;
    if (inFlightRequests.has(key)) {
      return inFlightRequests.get(key);
    }

    const promise = (async () => {
      try {
        const res = await fetch(
          `/api/blog/like?postId=${encodeURIComponent(postId)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
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
   * Toggle like for current post (direct/immediate)
   */
  async togglePostLike(
    postId: string,
    desiredLiked?: boolean
  ): Promise<{
    success: boolean;
    liked?: boolean;
    likesCount?: number;
    error?: string;
  }> {
    try {
      const res = await fetch('/api/blog/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, desiredLiked }),
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          error: data.error || 'Failed to toggle like',
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
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('blogApi.togglePostLike error:', err);
      return {
        success: false,
        error: err.message || 'Network error',
      };
    }
  },

  /**
   * Debounced and cancelable like toggle for rapid user clicks.
   * Cancels in-flight requests and batches rapid clicks into 1 final call.
   */
  debouncedTogglePostLike(
    postId: string,
    desiredLiked: boolean,
    delayMs = 350
  ): Promise<{
    success: boolean;
    liked?: boolean;
    likesCount?: number;
    error?: string;
  }> {
    // Clear any pending debounce timer
    if (postLikeTimers.has(postId)) {
      clearTimeout(postLikeTimers.get(postId)!);
      postLikeTimers.delete(postId);
    }

    // Cancel any in-flight fetch request
    if (postLikeAbortControllers.has(postId)) {
      postLikeAbortControllers.get(postId)!.abort();
      postLikeAbortControllers.delete(postId);
    }

    return new Promise((resolve) => {
      const timer = setTimeout(async () => {
        postLikeTimers.delete(postId);

        const abortController = new AbortController();
        postLikeAbortControllers.set(postId, abortController);

        try {
          const res = await fetch('/api/blog/like', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId, desiredLiked }),
            signal: abortController.signal,
          });

          const data = await res.json();
          if (!res.ok) {
            resolve({
              success: false,
              error: data.error || 'Failed to update like',
            });
            return;
          }

          if (typeof data.likesCount === 'number') {
            blogApi.notifyLikesChange(postId, data.likesCount);
          }

          resolve({
            success: true,
            liked: data.liked,
            likesCount: data.likesCount,
          });
        } catch (err: any) {
          if (err.name === 'AbortError') {
            // Cancelled by a newer click - resolve gracefully
            return;
          }
          // eslint-disable-next-line no-console
          console.error('blogApi.debouncedTogglePostLike error:', err);
          resolve({
            success: false,
            error: err.message || 'Network error',
          });
        } finally {
          if (postLikeAbortControllers.get(postId) === abortController) {
            postLikeAbortControllers.delete(postId);
          }
        }
      }, delayMs);

      postLikeTimers.set(postId, timer);
    });
  },

  /**
   * Fetch user reaction states and live like counts for all comments in a post
   */
  async fetchCommentReactions(
    postId: string
  ): Promise<
    Record<
      string,
      { userReaction: 'like' | 'dislike' | null; likesCount: number }
    >
  > {
    const key = `comments-rx-${postId}`;
    if (inFlightRequests.has(key)) {
      return inFlightRequests.get(key);
    }

    const promise = (async () => {
      try {
        const res = await fetch(
          `/api/blog/reaction?postId=${encodeURIComponent(postId)}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch comment reactions: ${res.statusText}`
          );
        }

        const data = await res.json();
        return (data.reactions || {}) as Record<
          string,
          { userReaction: 'like' | 'dislike' | null; likesCount: number }
        >;
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
   * Toggle comment reaction (direct/immediate)
   */
  async toggleCommentReaction(
    commentId: string,
    type: 'like' | 'dislike',
    desiredReaction?: 'like' | 'dislike' | null
  ): Promise<{
    success: boolean;
    userReaction?: 'like' | 'dislike' | null;
    likesCount?: number;
    error?: string;
  }> {
    try {
      const res = await fetch('/api/blog/reaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentId, type, desiredReaction }),
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          error: data.error || 'Failed to react to comment',
        };
      }

      return {
        success: true,
        userReaction: data.userReaction,
        likesCount: data.likesCount,
      };
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error('blogApi.toggleCommentReaction error:', err);
      return {
        success: false,
        error: err.message || 'Network error',
      };
    }
  },

  /**
   * Debounced and cancelable comment reaction toggle for rapid clicks.
   * Cancels in-flight requests and batches rapid clicks into 1 final call.
   */
  debouncedToggleCommentReaction(
    commentId: string,
    desiredReaction: 'like' | 'dislike' | null,
    delayMs = 350
  ): Promise<{
    success: boolean;
    userReaction?: 'like' | 'dislike' | null;
    likesCount?: number;
    error?: string;
  }> {
    // Clear any pending debounce timer
    if (commentReactionTimers.has(commentId)) {
      clearTimeout(commentReactionTimers.get(commentId)!);
      commentReactionTimers.delete(commentId);
    }

    // Cancel any in-flight fetch request
    if (commentReactionAbortControllers.has(commentId)) {
      commentReactionAbortControllers.get(commentId)!.abort();
      commentReactionAbortControllers.delete(commentId);
    }

    return new Promise((resolve) => {
      const timer = setTimeout(async () => {
        commentReactionTimers.delete(commentId);

        const abortController = new AbortController();
        commentReactionAbortControllers.set(commentId, abortController);

        try {
          const res = await fetch('/api/blog/reaction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ commentId, desiredReaction }),
            signal: abortController.signal,
          });

          const data = await res.json();
          if (!res.ok) {
            resolve({
              success: false,
              error: data.error || 'Failed to update reaction',
            });
            return;
          }

          resolve({
            success: true,
            userReaction: data.userReaction,
            likesCount: data.likesCount,
          });
        } catch (err: any) {
          if (err.name === 'AbortError') {
            // Cancelled by a newer click - resolve gracefully
            return;
          }
          // eslint-disable-next-line no-console
          console.error('blogApi.debouncedToggleCommentReaction error:', err);
          resolve({
            success: false,
            error: err.message || 'Network error',
          });
        } finally {
          if (
            commentReactionAbortControllers.get(commentId) === abortController
          ) {
            commentReactionAbortControllers.delete(commentId);
          }
        }
      }, delayMs);

      commentReactionTimers.set(commentId, timer);
    });
  },
};

export default blogApi;
