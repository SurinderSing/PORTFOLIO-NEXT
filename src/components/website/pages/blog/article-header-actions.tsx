'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Edit2, Trash2 } from 'lucide-react';
import { useClientAuth } from '@/hooks/use-client-auth';
import { blogApi } from '@/services/blogApi';
import BlogDeleteModal from '@/components/website/pages/blog/blog-delete-modal';

interface ArticleHeaderActionsProps {
  postId: string;
  postSlug: string;
  authorId: string;
  postTitle: string;
}

export const ArticleHeaderActions: React.FC<ArticleHeaderActionsProps> = ({
  postId,
  postSlug,
  authorId,
  postTitle,
}) => {
  const router = useRouter();
  const { user, profile, isAdmin, loading } = useClientAuth();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  if (loading) return null;

  const isAuthor = Boolean(user && user.id === authorId);
  const effectiveIsAdmin = isAdmin || profile?.role === 'ADMIN';
  const canManage = effectiveIsAdmin || isAuthor;

  if (!canManage) return null;

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await blogApi.deletePost(postId);
      if (res.success) {
        setShowDeleteModal(false);
        router.push('/blog');
        router.refresh();
      } else {
        alert(res.error || 'Failed to delete article.');
      }
    } catch (err: any) {
      alert(err.message || 'An error occurred while deleting.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 font-mono text-xs">
        <Link
          href={`/blog/edit/${postSlug}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-tertiary-2 hover:border-primary/50 transition-colors shadow-xs"
          title="Edit Article"
        >
          <Edit2 className="h-3.5 w-3.5 text-primary" />
          <span>Edit Article</span>
        </Link>

        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-colors shadow-xs"
          title="Delete Article"
        >
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
          <span>Delete</span>
        </button>
      </div>

      <BlogDeleteModal
        isOpen={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title="Delete Article"
        itemName={postTitle}
        description="Are you sure you want to delete this article? This action cannot be undone."
      />
    </>
  );
};

export default ArticleHeaderActions;
