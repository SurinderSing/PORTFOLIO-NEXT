import React from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import NewBlogPostClient from '@/components/website/pages/blog/new-blog-post-client';

export const metadata: Metadata = {
  title: 'Write New Article | Surinder Singh Blog',
  description:
    'Create and publish a new engineering article on the Surinder Singh blog.',
};

export default async function NewBlogPostPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in?redirect=/blog/new');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const isAdmin = profile?.role === 'ADMIN';

  return (
    <div className="w-full font-mono py-4">
      {/* Header Breadcrumb */}
      <div className="mb-8 space-y-3">
        <div className="inline-flex items-center gap-2 rounded-md bg-tertiary-2 px-2.5 py-1 text-xs text-muted-foreground border border-border/60">
          <span className="text-primary font-bold">$</span>
          <span>echo &quot;new article&quot; &gt;&gt; ./articles</span>
        </div>
      </div>

      <NewBlogPostClient isAdmin={isAdmin} />
    </div>
  );
}
