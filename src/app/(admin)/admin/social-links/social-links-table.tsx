'use client';

import React from 'react';
import { SocialLink } from '@/types/database';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';
import { resolveIcon } from '@/utils/icon-resolver';
import AdminDragHandle from '@/components/admin/admin-drag-handle';

interface SocialLinksTableProps {
  links: SocialLink[];
  draggedIndex: number | null;
  dragOverIndex: number | null;
  onDragStart: (_e: React.DragEvent, _index: number) => void;
  onDragOver: (_e: React.DragEvent, _index: number) => void;
  onDragEnd: () => void;
  onDrop: (_e: React.DragEvent, _index: number) => void;
  onEdit: (_item: SocialLink) => void;
  onDelete: (_id: number) => void;
}

export default function SocialLinksTable({
  links,
  draggedIndex,
  dragOverIndex,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  onEdit,
  onDelete,
}: SocialLinksTableProps) {
  const sortedLinks = [...links].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
      <div className="p-4 border-b border-border bg-tertiary/30 flex items-center justify-between">
        <h3 className="text-sm font-semibold font-poppins flex items-center gap-2">
          <span>Social Profile Links ({sortedLinks.length})</span>
        </h3>
        <span className="text-xs text-muted-foreground">
          Drag rows to reorder
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-tertiary/20 border-b border-border text-xs text-muted-foreground uppercase font-semibold">
            <tr>
              <th className="py-2.5 px-3 w-8"></th>
              <th className="py-2.5 px-4">Icon</th>
              <th className="py-2.5 px-4">Platform</th>
              <th className="py-2.5 px-4">URL</th>
              <th className="py-2.5 px-4">Order</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedLinks.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-muted-foreground text-xs"
                >
                  No social links configured yet.
                </td>
              </tr>
            ) : (
              sortedLinks.map((item, index) => {
                const isDragging = draggedIndex === index;
                const isOver = dragOverIndex === index;

                return (
                  <tr
                    key={item.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, index)}
                    onDragOver={(e) => onDragOver(e, index)}
                    onDragEnd={onDragEnd}
                    onDrop={(e) => onDrop(e, index)}
                    className={`transition-all ${
                      isDragging
                        ? 'opacity-40 bg-primary/10'
                        : isOver
                          ? 'bg-primary/15 border-t-2 border-primary'
                          : 'hover:bg-tertiary/30'
                    }`}
                  >
                    <AdminDragHandle />
                    <td className="py-3 px-4">
                      <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center">
                        {resolveIcon(item.icon_name, {
                          color: item.icon_color || undefined,
                          size: 16,
                        })}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">{item.name}</td>
                    <td className="py-3 px-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-mono"
                      >
                        <span className="max-w-xs truncate">{item.url}</span>
                        <ExternalLink size={11} />
                      </a>
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-tertiary text-xs font-mono">
                        {item.sort_order}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => onEdit(item)}
                          className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
