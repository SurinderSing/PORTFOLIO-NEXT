'use client';

import React from 'react';
import { X } from 'lucide-react';

interface SkillCategoryFormProps {
  isCreating: boolean;
  categoryName: string;
  setCategoryName: (_val: string) => void;
  categoryOrder: number;
  setCategoryOrder: (_val: number) => void;
  onSubmit: (_e: React.FormEvent) => void;
  onCancel: () => void;
  loading: boolean;
}

export default function SkillCategoryForm({
  isCreating,
  categoryName,
  setCategoryName,
  categoryOrder,
  setCategoryOrder,
  onSubmit,
  onCancel,
  loading,
}: SkillCategoryFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-base font-semibold font-poppins">
          {isCreating ? 'Create Skill Category' : 'Edit Skill Category'}
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
            Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            placeholder="e.g. Frontend Skills, Component Libraries"
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Sort Order
          </label>
          <input
            type="number"
            value={categoryOrder}
            onChange={(e) => setCategoryOrder(parseInt(e.target.value) || 0)}
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
          {loading ? 'Saving...' : 'Save Category'}
        </button>
      </div>
    </form>
  );
}
