-- Migration: Add PENDING_REVIEW to blog_posts status check constraint
-- This allows user-submitted posts to go through admin approval

-- Drop existing check constraint on status column
ALTER TABLE public.blog_posts DROP CONSTRAINT IF EXISTS blog_posts_status_check;

-- Re-add with PENDING_REVIEW included
ALTER TABLE public.blog_posts ADD CONSTRAINT blog_posts_status_check
  CHECK (status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING_REVIEW'));
