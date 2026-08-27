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
   * Toggle like for current post
   */
  async togglePostLike(postId: string): Promise<{
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
        body: JSON.stringify({ postId }),
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
   * Toggle comment reaction (like/dislike)
   */
  async toggleCommentReaction(
    commentId: string,
    type: 'like' | 'dislike'
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
        body: JSON.stringify({ commentId, type }),
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
};

export default blogApi;
