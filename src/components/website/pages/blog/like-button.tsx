'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useClientAuth } from '@/hooks/use-client-auth';
import { blogApi } from '@/services/blogApi';

interface LikeButtonProps {
  initialLikes?: number;
  postId: string;
  className?: string;
  size?: 'sm' | 'md';
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  initialLikes = 0,
  postId,
  className,
  size = 'md',
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useClientAuth();

  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync with initialLikes when parent prop changes
  useEffect(() => {
    setLikes(initialLikes);
  }, [initialLikes]);

  // Check if current user has liked this post and fetch accurate live count
  useEffect(() => {
    if (!postId) return;

    let isMounted = true;
    const fetchStatus = async () => {
      const res = await blogApi.fetchPostLikeStatus(postId);
      if (isMounted) {
        setHasLiked(res.liked);
        if (typeof res.likesCount === 'number') {
          setLikes(res.likesCount);
        }
      }
    };

    fetchStatus();

    // Subscribe to live broadcast updates for this post
    const unsubscribe = blogApi.subscribeToLikes(
      (changedPostId, newLikesCount) => {
        if (changedPostId === postId && isMounted) {
          setLikes(newLikesCount);
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [user, postId]);

  const handleToggleLike = async () => {
    if (!user) {
      router.push(
        `/sign-in?redirect=${encodeURIComponent(pathname || '/blog')}`
      );
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);
    setAnimating(true);

    const prevLiked = hasLiked;
    const prevLikes = likes;

    // Optimistic UI update
    const nextLiked = !prevLiked;
    const nextLikes = nextLiked ? prevLikes + 1 : Math.max(0, prevLikes - 1);
    setHasLiked(nextLiked);
    setLikes(nextLikes);

    setTimeout(() => setAnimating(false), 300);

    try {
      const res = await blogApi.togglePostLike(postId);
      if (res.success) {
        if (res.liked !== undefined) setHasLiked(res.liked);
        if (res.likesCount !== undefined) setLikes(res.likesCount);
        router.refresh();
      } else {
        // Rollback on error
        setHasLiked(prevLiked);
        setLikes(prevLikes);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to toggle like:', err);
      // Rollback on error
      setHasLiked(prevLiked);
      setLikes(prevLikes);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggleLike}
      disabled={isProcessing}
      aria-label={hasLiked ? 'Unlike post' : 'Like post'}
      title={
        user
          ? hasLiked
            ? 'Unlike article'
            : 'Like article'
          : 'Sign in to like this article'
      }
      className={cn(
        'inline-flex items-center gap-1.5 font-mono transition-all rounded-lg select-none',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs',
        hasLiked
          ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30 font-bold'
          : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-border/80 hover:bg-tertiary-2',
        className
      )}
    >
      <Heart
        className={cn(
          size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4',
          hasLiked && 'fill-current text-rose-500',
          animating && 'scale-125 transition-transform duration-200'
        )}
      />
      <span>{likes}</span>
    </button>
  );
};

export default LikeButton;
