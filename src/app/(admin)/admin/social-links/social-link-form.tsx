'use client';

import React from 'react';
import { X } from 'lucide-react';

export interface SocialLinkFormData {
  name: string;
  url: string;
  icon_name: string;
  icon_color: string;
  sort_order: number;
}

interface SocialLinkFormProps {
  isCreating: boolean;
  formData: SocialLinkFormData;
  setFormData: React.Dispatch<React.SetStateAction<SocialLinkFormData>>;
  onSubmit: (_e: React.FormEvent) => void;
  onCancel: () => void;
  loading: boolean;
}

export default function SocialLinkForm({
  isCreating,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  loading,
}: SocialLinkFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-base font-semibold font-poppins">
          {isCreating ? 'Create Social Link' : 'Edit Social Link'}
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
            Platform Name
          </label>
          <input
            type="text"
            required
            placeholder="LinkedIn, GitHub, Instagram, Twitter..."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Profile URL
          </label>
          <input
            type="url"
            required
            placeholder="https://linkedin.com/in/..."
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Icon Name (Lucide Icon)
          </label>
          <input
            type="text"
            required
            placeholder="linkedin, github, instagram, twitter..."
            value={formData.icon_name}
            onChange={(e) =>
              setFormData({ ...formData, icon_name: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Icon Color Hex (optional)
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={formData.icon_color || '#0077B5'}
              onChange={(e) =>
                setFormData({ ...formData, icon_color: e.target.value })
              }
              className="w-10 h-10 rounded-xl bg-tertiary border border-border cursor-pointer p-0.5"
            />
            <input
              type="text"
              value={formData.icon_color}
              onChange={(e) =>
                setFormData({ ...formData, icon_color: e.target.value })
              }
              placeholder="#0077B5"
              className="flex-1 px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary font-mono"
            />
          </div>
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
          {loading ? 'Saving...' : 'Save Social Link'}
        </button>
      </div>
    </form>
  );
}
