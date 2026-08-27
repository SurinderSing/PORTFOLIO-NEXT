'use client';

import React, { useState } from 'react';
import { BlogPost, PostStatus } from '@/types/database';
import {
  createBlogPostAction,
  updateBlogPostAction,
  deleteBlogPostAction,
} from '@/lib/admin-actions';
import { Plus, BookOpen, Search } from 'lucide-react';
import AdminStatusBanner, {
  AdminStatusState,
} from '@/components/admin/admin-status-banner';
import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminDeleteModal from '@/components/admin/admin-delete-modal';
import BlogForm, { BlogFormData } from './blog-form';
import BlogsTable from './blogs-table';

interface BlogsManagerProps {
  initialPosts: BlogPost[];
}

export default function BlogsManager({ initialPosts }: BlogsManagerProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<AdminStatusState>({
    type: null,
    message: '',
  });

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image_url: '',
    tags: '',
    status: 'DRAFT',
  });

  const filteredPosts = posts.filter(
    (p) =>
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image_url: '',
      tags: '',
      status: 'DRAFT',
    });
    setEditingId(null);
    setIsCreating(false);
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      cover_image_url: post.cover_image_url || '',
      tags: post.tags?.join(', ') || '',
      status: post.status,
    });
    setEditingId(post.id);
    setIsCreating(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    const tagArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Partial<BlogPost> = {
      title: formData.title.trim(),
      slug: formData.slug.trim(),
      excerpt: formData.excerpt.trim() || null,
      content: formData.content.trim(),
      cover_image_url: formData.cover_image_url.trim() || null,
      tags: tagArray,
      status: formData.status,
    };

    if (isCreating) {
      const res = await createBlogPostAction(payload);
      if (res.success && res.post) {
        setPosts([res.post, ...posts]);
        setStatus({
          type: 'success',
          message: 'Article created successfully!',
        });
        resetForm();
      } else {
        setStatus({
          type: 'error',
          message: res.error || 'Failed to create article.',
        });
      }
    } else if (editingId) {
      const res = await updateBlogPostAction(editingId, payload);
      if (res.success) {
        setPosts(
          posts.map((p) =>
            p.id === editingId
              ? { ...p, ...payload, updated_at: new Date().toISOString() }
              : p
          )
        );
        setStatus({
          type: 'success',
          message: 'Article updated successfully!',
        });
        resetForm();
      } else {
        setStatus({
          type: 'error',
          message: res.error || 'Failed to update article.',
        });
      }
    }
    setLoading(false);
  };

  const handleToggleStatus = async (post: BlogPost, newStatus: PostStatus) => {
    const res = await updateBlogPostAction(post.id, { status: newStatus });
    if (res.success) {
      setPosts(
        posts.map((p) => (p.id === post.id ? { ...p, status: newStatus } : p))
      );
      setStatus({
        type: 'success',
        message: `Article status updated to ${newStatus}.`,
      });
    } else {
      setStatus({
        type: 'error',
        message: res.error || 'Failed to update status.',
      });
    }
  };

  const handleDelete = async () => {
    if (!deletingPost) return;
    setLoading(true);
    const res = await deleteBlogPostAction(deletingPost.id);
    if (res.success) {
      setPosts(posts.filter((p) => p.id !== deletingPost.id));
      setStatus({
        type: 'success',
        message: 'Article deleted successfully.',
      });
      setDeletingPost(null);
    } else {
      setStatus({
        type: 'error',
        message: res.error || 'Failed to delete article.',
      });
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <AdminPageHeader
        icon={BookOpen}
        title="Blog & Articles Manager"
        description="Draft, edit, publish, and manage engineering articles and technical insights."
      >
        {!isCreating && !editingId && (
          <button
            type="button"
            onClick={() => {
              resetForm();
              setIsCreating(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-xs"
          >
            <Plus size={15} />
            <span>New Article</span>
          </button>
        )}
      </AdminPageHeader>

      <AdminStatusBanner status={status} />

      {/* Form Dialog / Drawer */}
      {(isCreating || editingId) && (
        <BlogForm
          formData={formData}
          setFormData={setFormData}
          isCreating={isCreating}
          editingId={editingId}
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />
      )}

      {/* Search Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, tag, slug..."
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Showing {filteredPosts.length} of {posts.length} articles
        </p>
      </div>

      {/* Table */}
      <BlogsTable
        posts={filteredPosts}
        onEdit={handleEdit}
        onDelete={(p) => setDeletingPost(p)}
        onToggleStatus={handleToggleStatus}
      />

      {/* Delete Modal */}
      {deletingPost && (
        <AdminDeleteModal
          isOpen={!!deletingPost}
          onCancel={() => setDeletingPost(null)}
          onConfirm={handleDelete}
          loading={loading}
          title="Delete Article"
          itemName={deletingPost.title}
          description="Are you sure you want to delete this article? This action cannot be undone."
        />
      )}
    </div>
  );
}
