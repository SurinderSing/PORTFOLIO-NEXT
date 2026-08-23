'use client';

import React, { useEffect } from 'react';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';

interface AdminDeleteModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  itemName?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AdminDeleteModal: React.FC<AdminDeleteModalProps> = ({
  isOpen,
  title = 'Delete Item',
  description = 'Are you sure you want to permanently delete this item? This action cannot be undone.',
  itemName,
  loading = false,
  onConfirm,
  onCancel,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !loading) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200"
        onClick={() => {
          if (!loading) onCancel();
        }}
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 fade-in-0 duration-200 font-mono"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
            <AlertTriangle className="h-5 w-5" />
          </div>

          <div className="flex-1 space-y-2">
            <h3 className="text-base font-bold text-foreground tracking-tight">
              {title}
            </h3>
            {itemName && (
              <div className="rounded-lg bg-tertiary-2 px-3 py-1.5 text-xs font-semibold text-primary border border-border/60">
                &ldquo;{itemName}&rdquo;
              </div>
            )}
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end gap-2.5 pt-4 border-t border-border/50">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-tertiary-2 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 transition-colors shadow-xs disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Permanently</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteModal;
