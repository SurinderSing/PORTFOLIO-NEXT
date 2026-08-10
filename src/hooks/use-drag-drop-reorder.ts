'use client';

import { useState, type DragEvent } from 'react';
import { reorderArray } from '@/utils/reorder';
import { ActionResult } from '@/lib/admin-actions';

interface UseDragDropReorderOptions<
  T extends { id: number; sort_order?: number },
> {
  items: T[];
  setItems: (items: T[] | ((prev: T[]) => T[])) => void;
  onPersist?: (
    _items: { id: number; sort_order: number }[]
  ) => Promise<ActionResult>;
  onStatusChange?: (_status: {
    type: 'success' | 'error' | null;
    message: string;
  }) => void;
  successMessage?: string;
}

export function useDragDropReorder<
  T extends { id: number; sort_order?: number },
>({
  items,
  setItems,
  onPersist,
  onStatusChange,
  successMessage = 'Items reordered successfully.',
}: UseDragDropReorderOptions<T>) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = async (e: DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const currentSorted = [...items].sort(
      (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
    );
    const updated = reorderArray(currentSorted, draggedIndex, targetIndex);

    setItems(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);

    if (onStatusChange) {
      onStatusChange({ type: 'success', message: successMessage });
    }

    if (onPersist) {
      const payload = updated.map((item) => ({
        id: item.id,
        sort_order: item.sort_order || 0,
      }));
      const res = await onPersist(payload);
      if (!res.success && onStatusChange) {
        onStatusChange({
          type: 'error',
          message: res.error || 'Failed to sync reordered items.',
        });
      }
    }
  };

  return {
    draggedIndex,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
  };
}
