'use client';

import React from 'react';
import { X } from 'lucide-react';
import FileUpload from '@/components/ui/file-upload';
import { uploadProjectImageAction } from '@/lib/storage-actions';

export interface ProjectFormData {
  title: string;
  description: string;
  technologies: string;
  link: string;
  github_url: string;
  image_url: string;
  preview_url: string;
  preview_mode: 'image' | 'iframe';
  sort_order: number;
}

interface ProjectFormProps {
  isCreating: boolean;
  editingId: number | null;
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  onSubmit: (_e: React.FormEvent) => void;
  onCancel: () => void;
  loading: boolean;
}

export default function ProjectForm({
  isCreating,
  editingId,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  loading,
}: ProjectFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-base font-semibold font-poppins">
          {isCreating ? 'Create Portfolio Project' : 'Edit Project Details'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 rounded-lg text-muted-foreground hover:bg-tertiary transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Project Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Gimmefy - AI Marketing Platform"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Technologies (comma separated)
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Next.js, React, Tailwind CSS, TypeScript"
            value={formData.technologies}
            onChange={(e) =>
              setFormData({ ...formData, technologies: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Description
          </label>
          <textarea
            rows={2}
            placeholder="Brief overview of the project and key highlights..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            External Project URL (Live Demo)
          </label>
          <input
            type="url"
            placeholder="https://gimmefy.ai"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Source Code URL (GitHub - Optional)
          </label>
          <input
            type="url"
            placeholder="https://github.com/SurinderSing/project-repo"
            value={formData.github_url}
            onChange={(e) =>
              setFormData({ ...formData, github_url: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Preview Mode
          </label>
          <select
            value={formData.preview_mode}
            onChange={(e) =>
              setFormData({
                ...formData,
                preview_mode: e.target.value as 'image' | 'iframe',
              })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          >
            <option value="iframe">Live Website Embed (Iframe Preview)</option>
            <option value="image">Static Cover Image Only</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Live Preview URL (Optional - defaults to Project URL)
          </label>
          <input
            type="url"
            placeholder="https://gimmefy.ai"
            value={formData.preview_url}
            onChange={(e) =>
              setFormData({ ...formData, preview_url: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Sort Order (Position)
          </label>
          <input
            type="number"
            value={formData.sort_order}
            onChange={(e) =>
              setFormData({
                ...formData,
                sort_order: parseInt(e.target.value) || 0,
              })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <FileUpload
            label={`Project Cover Image ${
              formData.preview_mode === 'iframe' ? '(Fallback)' : ''
            }`}
            accept="image/jpeg,image/png,image/webp"
            maxSizeMB={5}
            previewType="image"
            enableCrop={true}
            aspectRatio={16 / 9}
            cropShape="rect"
            currentUrl={formData.image_url}
            onUpload={(fd) =>
              uploadProjectImageAction(fd, editingId || undefined)
            }
            onUrlChange={(newUrl) =>
              setFormData((prev) => ({ ...prev, image_url: newUrl || '' }))
            }
            helperText="Upload 16:9 banner image. Used as static cover and live preview fallback."
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl bg-tertiary text-xs font-semibold hover:bg-tertiary/70 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-xl main-gradient-1 text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
}
