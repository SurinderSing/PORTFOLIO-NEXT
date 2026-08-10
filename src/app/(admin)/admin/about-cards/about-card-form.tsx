'use client';

import React from 'react';
import { X } from 'lucide-react';

export interface AboutCardFormData {
  title: string;
  description: string;
  icon_name: string;
  bg_color_class: string;
  sort_order: number;
}

interface AboutCardFormProps {
  isCreating: boolean;
  formData: AboutCardFormData;
  setFormData: React.Dispatch<React.SetStateAction<AboutCardFormData>>;
  onSubmit: (_e: React.FormEvent) => void;
  onCancel: () => void;
  loading: boolean;
}

export default function AboutCardForm({
  isCreating,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  loading,
}: AboutCardFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-base font-semibold font-poppins">
          {isCreating ? 'Create About Card' : 'Edit About Card'}
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
            Card Title
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Frontend Development"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
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
            placeholder="e.g. code-xml, layout-grid, brain, zap"
            value={formData.icon_name}
            onChange={(e) =>
              setFormData({ ...formData, icon_name: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Description
          </label>
          <textarea
            rows={3}
            required
            placeholder="Describe your role, core specializations, and technologies..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Background Style
          </label>
          <select
            value={formData.bg_color_class}
            onChange={(e) =>
              setFormData({ ...formData, bg_color_class: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          >
            <option value="bg-card dark:bg-gradient-to-r from-secondary to-primary">
              Accent Card (Secondary/Primary Gradient)
            </option>
            <option value="bg-tertiary-2">
              Tertiary Minimal Card (bg-tertiary-2)
            </option>
          </select>
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
          {loading ? 'Saving...' : 'Save Card'}
        </button>
      </div>
    </form>
  );
}
