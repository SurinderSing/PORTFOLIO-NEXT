import React from 'react';
import { getBlogPosts } from '@/lib/supabase-queries';
import BlogsManager from './blogs-manager';

export const revalidate = 0;

export default async function BlogsAdminPage() {
  // In admin view, pass empty status option to get all posts (Drafts, Published, Archived)
  const posts = await getBlogPosts({ status: undefined });

  return <BlogsManager initialPosts={posts} />;
}
