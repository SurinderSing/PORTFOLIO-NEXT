'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogPostForm, {
  BlogPostFormData,
  EMPTY_FORM_DATA,
} from './blog-post-form';
import { blogApi } from '@/services/blogApi';

interface NewBlogPostClientProps {
  isAdmin: boolean;
}

export const NewBlogPostClient: React.FC<NewBlogPostClientProps> = ({
  isAdmin,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = async (formData: BlogPostFormData) => {
    setLoading(true);
    setStatusMessage(null);

    const tagArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const res = await blogApi.createPost({
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
          message: res.message || 'Article created successfully!',
        });
        setTimeout(() => {
          router.push('/blog');
          router.refresh();
        }, 1500);
      } else {
        setStatusMessage({
          type: 'error',
          message: res.error || 'Failed to create article.',
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
      initialData={EMPTY_FORM_DATA}
      mode="create"
      isAdmin={isAdmin}
      loading={loading}
      statusMessage={statusMessage}
      onSubmit={handleSubmit}
    />
  );
};

export default NewBlogPostClient;
