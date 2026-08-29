'use client';

import React, { useState } from 'react';
import { PostStatus } from '@/types/database';
import { Eye, Edit3, Sparkles, Loader2 } from 'lucide-react';
import ArticleContent from '@/components/website/pages/blog/article-content';

export interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  tags: string;
  status: PostStatus;
}

interface BlogFormProps {
  formData: BlogFormData;
  setFormData: React.Dispatch<React.SetStateAction<BlogFormData>>;
  isCreating: boolean;
  editingId: string | null;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function BlogForm({
  formData,
  setFormData,
  isCreating,
  editingId,
  loading,
  onSubmit,
  onCancel,
}: BlogFormProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug:
        isCreating && !prev.slug
          ? val
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          : prev.slug,
    }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-5 rounded-xl border border-primary/30 bg-card/90 space-y-5 font-mono shadow-md"
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>{isCreating ? 'Create New Article' : 'Edit Article'}</span>
        </h3>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 rounded-lg bg-tertiary-2 p-1 border border-border">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-bold transition-all ${
              activeTab === 'edit'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md font-bold transition-all ${
              activeTab === 'preview'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Live Preview</span>
          </button>
        </div>
      </div>

      {activeTab === 'edit' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Architecting Scalable Micro-Frontends"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                placeholder="e.g. architecting-scalable-micro-frontends"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Cover Image URL */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-muted-foreground">
                Cover Image URL
              </label>
              <input
                type="url"
                value={formData.cover_image_url}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cover_image_url: e.target.value,
                  }))
                }
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as PostStatus,
                  }))
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="DRAFT">Draft (Hidden)</option>
                <option value="PENDING_REVIEW">Pending Review</option>
                <option value="PUBLISHED">Published (Live)</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, tags: e.target.value }))
              }
              placeholder="React, Next.js, Architecture, Performance"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground">
              Short Summary / Excerpt
            </label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
              }
              placeholder="Brief blurb displayed on the cards feed..."
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none font-sans"
            />
          </div>

          {/* Content (Markdown) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground flex items-center justify-between">
              <span>Article Body (Markdown) *</span>
              <span className="text-[10px] text-primary">
                Supports ## headers, ``` code blocks, - lists
              </span>
            </label>
            <textarea
              rows={12}
              required
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="## Introduction&#10;&#10;Write your deep dive article content here in Markdown..."
              className="w-full rounded-lg border border-border bg-background p-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono leading-relaxed"
            />
          </div>
        </div>
      ) : (
        /* Live Preview Mode */
        <div className="rounded-lg border border-border bg-background p-6 space-y-6">
          <div>
            <h1 className="font-sans text-2xl font-bold text-foreground">
              {formData.title || 'Untitled Article'}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              /{formData.slug || 'slug'}
            </p>
          </div>

          {formData.excerpt && (
            <p className="font-sans text-sm text-muted-foreground italic border-l-2 border-primary pl-3">
              {formData.excerpt}
            </p>
          )}

          <div className="border-t border-border pt-4">
            <ArticleContent
              content={formData.content || '_No content written yet._'}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-3 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-border px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-tertiary-2 active:opacity-80 transition-all flex items-center justify-center shrink-0 min-h-[38px] select-none transform-gpu"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 active:opacity-80 transition-all duration-150 disabled:opacity-50 shadow-xs flex items-center justify-center gap-2 shrink-0 min-h-[38px] select-none transform-gpu"
        >
          {loading && <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />}
          <span>
            {loading
              ? 'Saving...'
              : isCreating
                ? 'Create Article'
                : 'Save Changes'}
          </span>
        </button>
      </div>
    </form>
  );
}
