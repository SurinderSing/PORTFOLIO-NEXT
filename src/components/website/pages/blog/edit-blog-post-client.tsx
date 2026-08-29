'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogPostForm, { BlogPostFormData } from './blog-post-form';
import { blogApi } from '@/services/blogApi';
import { BlogPost } from '@/types/database';

interface EditBlogPostClientProps {
  post: BlogPost;
  isAdmin: boolean;
}

export const EditBlogPostClient: React.FC<EditBlogPostClientProps> = ({
  post,
  isAdmin,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const initialFormData: BlogPostFormData = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: post.content,
    cover_image_url: post.cover_image_url || '',
    tags: post.tags?.join(', ') || '',
    status: post.status,
  };

  const handleSubmit = async (formData: BlogPostFormData) => {
    setLoading(true);
    setStatusMessage(null);

    const tagArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await blogApi.updatePost(post.id, {
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        excerpt: formData.excerpt.trim() || null,
        content: formData.content.trim(),
        cover_image_url: formData.cover_image_url.trim() || null,
        tags: tagArray,
        status: formData.status,
      });

      if (res.success) {
        setStatusMessage({
          type: 'success',
          message: res.message || 'Article updated successfully!',
        });
        setTimeout(() => {
          router.push(`/blog/${formData.slug.trim()}`);
          router.refresh();
        }, 1500);
      } else {
        setStatusMessage({
          type: 'error',
          message: res.error || 'Failed to update article.',
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        message: err.message || 'An unexpected error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogPostForm
      initialData={initialFormData}
      mode="edit"
      isAdmin={isAdmin}
      loading={loading}
      statusMessage={statusMessage}
      onSubmit={handleSubmit}
    />
  );
};

export default EditBlogPostClient;
