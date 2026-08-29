'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { PostStatus } from '@/types/database';
import {
  Eye,
  Edit3,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Info,
} from 'lucide-react';
import ArticleContent from '@/components/website/pages/blog/article-content';
import {
  validateImageUrl,
  SUPPORTED_IMAGE_PROVIDERS,
} from '@/utils/image-providers';

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

// ============================================================================
// Types & Constants
// ============================================================================

export interface BlogPostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  tags: string;
  status: PostStatus;
}

export const EMPTY_FORM_DATA: BlogPostFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image_url: '',
  tags: '',
  status: 'DRAFT',
};

interface BlogPostFormProps {
  initialData?: BlogPostFormData;
  mode: 'create' | 'edit';
  isAdmin: boolean;
  loading: boolean;
  statusMessage?: { type: 'success' | 'error'; message: string } | null;
  onSubmit: (data: BlogPostFormData) => Promise<void>;
}

// ============================================================================
// Component
// ============================================================================

export default function BlogPostForm({
  initialData,
  mode,
  isAdmin,
  loading,
  statusMessage,
  onSubmit,
}: BlogPostFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<BlogPostFormData>(
    initialData || EMPTY_FORM_DATA
  );
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [imageError, setImageError] = useState<string | null>(null);

  // Auto-generate slug from title (only when creating & slug is empty)
  const handleTitleChange = useCallback(
    (val: string) => {
      setFormData((prev) => ({
        ...prev,
        title: val,
        slug:
          mode === 'create' && !prev.slug
            ? val
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            : prev.slug,
      }));
    },
    [mode]
  );

  // Validate image URL on change
  const handleImageUrlChange = useCallback((url: string) => {
    setFormData((prev) => ({ ...prev, cover_image_url: url }));
    if (url.trim()) {
      const result = validateImageUrl(url);
      setImageError(result.valid ? null : result.error || null);
    } else {
      setImageError(null);
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate image URL before submit
    if (formData.cover_image_url.trim()) {
      const result = validateImageUrl(formData.cover_image_url);
      if (!result.valid) {
        setImageError(result.error || 'Invalid image URL');
        return;
      }
    }

    await onSubmit(formData);
  };

  const statusOptions: { value: PostStatus; label: string }[] = isAdmin
    ? [
        { value: 'DRAFT', label: 'Draft (Hidden)' },
        { value: 'PUBLISHED', label: 'Published (Live)' },
        { value: 'ARCHIVED', label: 'Archived' },
      ]
    : [
        { value: 'DRAFT', label: 'Draft (Save for later)' },
        { value: 'PUBLISHED', label: 'Submit for Review' },
      ];

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full max-w-5xl mx-auto space-y-6 font-mono"
    >
      {/* Status Message */}
      {statusMessage && (
        <div
          className={`flex items-center gap-2 rounded-xl border p-4 text-xs font-medium ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
              : 'bg-red-500/10 border-red-500/30 text-red-500'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{statusMessage.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2 font-sans">
          <Sparkles className="h-5 w-5 text-primary" />
          <span>
            {mode === 'create' ? 'Write New Article' : 'Edit Article'}
          </span>
        </h2>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 rounded-lg bg-tertiary-2 p-1 border border-border">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md font-bold transition-all ${
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
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md font-bold transition-all ${
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
        <div className="space-y-5">
          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Building Scalable Micro-Frontends with Module Federation"
                className="w-full rounded-lg border border-border bg-card/80 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground">
                URL Slug *
              </label>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">/blog/</span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="building-scalable-micro-frontends"
                  className="flex-1 rounded-lg border border-border bg-card/80 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Cover Image URL & Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-muted-foreground">
                Cover Image URL
              </label>
              <input
                type="url"
                value={formData.cover_image_url}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className={`w-full rounded-lg border bg-card/80 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary ${
                  imageError
                    ? 'border-red-500/60 focus:ring-red-500'
                    : 'border-border'
                }`}
              />
              {imageError && (
                <div className="flex items-start gap-1.5 text-[11px] text-red-500">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <div>
                    <p>{imageError}</p>
                    <p className="text-muted-foreground mt-1">
                      Supported providers:{' '}
                      {SUPPORTED_IMAGE_PROVIDERS.map((p) => p.name).join(', ')}
                    </p>
                  </div>
                </div>
              )}
              {!imageError && !formData.cover_image_url && (
                <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Info className="h-3 w-3" />
                  <span>
                    Supported:{' '}
                    {SUPPORTED_IMAGE_PROVIDERS.map((p) => p.name).join(', ')}
                  </span>
                </p>
              )}
            </div>

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
                className="w-full rounded-lg border border-border bg-card/80 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {!isAdmin && formData.status === 'PUBLISHED' && (
                <p className="text-[11px] text-amber-500 flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  <span>Your article will be reviewed before going live.</span>
                </p>
              )}
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
              className="w-full rounded-lg border border-border bg-card/80 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
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
              className="w-full rounded-lg border border-border bg-card/80 px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none font-sans"
            />
          </div>

          {/* Markdown Editor */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground flex items-center justify-between">
              <span>Article Body (Markdown) *</span>
              <span className="text-[10px] text-primary font-normal">
                Use the toolbar for formatting — bold, italic, headings, code,
                lists, links & images
              </span>
            </label>
            <div
              data-color-mode="dark"
              className="rounded-xl overflow-hidden border border-border"
            >
              <MDEditor
                value={formData.content}
                onChange={(val) =>
                  setFormData((prev) => ({
                    ...prev,
                    content: val || '',
                  }))
                }
                height={500}
                preview="edit"
                visibleDragbar={false}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Live Preview Mode */
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 space-y-6">
          <div>
            <h1 className="font-sans text-2xl md:text-3xl font-bold text-foreground">
              {formData.title || 'Untitled Article'}
            </h1>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
              <span className="text-primary">/blog/</span>
              <span>{formData.slug || 'slug'}</span>
            </p>
          </div>

          {formData.excerpt && (
            <p className="font-sans text-sm text-muted-foreground italic border-l-2 border-primary pl-4 py-1 bg-primary/5 rounded-r-lg">
              {formData.excerpt}
            </p>
          )}

          {formData.tags && (
            <div className="flex flex-wrap gap-1.5">
              {formData.tags
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-tertiary-2 border border-border/50 px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          )}

          <div className="border-t border-border pt-4">
            <ArticleContent
              content={formData.content || '_No content written yet._'}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-border px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-tertiary-2 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || !!imageError}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 shadow-xs"
        >
          {loading
            ? 'Saving...'
            : mode === 'create'
              ? isAdmin
                ? 'Create Article'
                : formData.status === 'PUBLISHED'
                  ? 'Submit for Review'
                  : 'Save Draft'
              : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
