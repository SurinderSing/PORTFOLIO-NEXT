'use client';

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleToggleLike = () => {
    setAnimating(true);
    if (hasLiked) {
      setLikes((prev) => Math.max(0, prev - 1));
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <button
      type="button"
      onClick={handleToggleLike}
      aria-label={hasLiked ? 'Unlike post' : 'Like post'}
      className={cn(
        'inline-flex items-center gap-1.5 font-mono transition-all rounded-lg select-none',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-xs',
        hasLiked
          ? 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
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
