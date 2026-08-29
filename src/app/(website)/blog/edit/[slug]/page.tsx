import React from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getBlogPostForEditAction } from '@/lib/admin-actions';
import EditBlogPostClient from '@/components/website/pages/blog/edit-blog-post-client';

interface EditBlogPageProps {
  params: {
    slug: string;
  };
}

export const metadata: Metadata = {
  title: 'Edit Article | Surinder Singh Blog',
  description: 'Edit your blog article.',
};

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const result = await getBlogPostForEditAction(params.slug);

  if (!result.success || !result.post) {
    if (result.error === 'Please sign in to continue.') {
      redirect(`/sign-in?redirect=/blog/edit/${params.slug}`);
    }
    notFound();
  }

  return (
    <div className="w-full font-mono py-4">
      {/* Header Breadcrumb */}
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-md bg-tertiary-2 px-2.5 py-1 text-xs text-muted-foreground border border-border/60">
          <span className="text-primary font-bold">$</span>
          <span>nano ./articles/{params.slug}.md</span>
        </div>
      </div>

      <EditBlogPostClient
        post={result.post}
        isAdmin={Boolean(result.isAdmin)}
      />
    </div>
  );
}
