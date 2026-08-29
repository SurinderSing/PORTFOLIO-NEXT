import React from 'react';
import { getAdminBlogPostsAction } from '@/lib/admin-actions';
import BlogsManager from './blogs-manager';

export const revalidate = 0;

export default async function BlogsAdminPage() {
  const posts = await getAdminBlogPostsAction();

  return <BlogsManager initialPosts={posts} />;
}
