'use client';

import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

interface BlogDeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
  title: string;
  itemName: string;
  description?: string;
}

export const BlogDeleteModal: React.FC<BlogDeleteModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
  loading,
  title,
  itemName,
  description = 'Are you sure you want to delete this article? This action cannot be undone.',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-xl border border-destructive/40 bg-card p-6 shadow-xl font-mono space-y-4">
        {/* Close Button */}
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon & Title */}
        <div className="flex items-center gap-3 text-destructive">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 border border-destructive/20 shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-1">
              &quot;{itemName}&quot;
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground font-sans leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-tertiary-2 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-destructive px-4 py-1.5 text-xs font-bold text-destructive-foreground hover:opacity-90 transition-opacity disabled:opacity-50 shadow-xs"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>{loading ? 'Deleting...' : 'Delete Article'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDeleteModal;
