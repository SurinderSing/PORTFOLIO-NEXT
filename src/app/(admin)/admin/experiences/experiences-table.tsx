'use client';

import React from 'react';
import { Experience, ExperienceType } from '@/types/database';
import { Edit2, Trash2, LucideIcon } from 'lucide-react';
import AdminDragHandle from '@/components/admin/admin-drag-handle';

interface ExperiencesTableProps {
  title: string;
  type: ExperienceType;
  icon: LucideIcon;
  iconColorClass?: string;
  items: Experience[];
  draggedItem: { type: ExperienceType; index: number } | null;
  dragOverItem: { type: ExperienceType; index: number } | null;
  onDragStart: (
    _e: React.DragEvent,
    _type: ExperienceType,
    _index: number
  ) => void;
  onDragOver: (
    _e: React.DragEvent,
    _type: ExperienceType,
    _index: number
  ) => void;
  onDragEnd: () => void;
  onDrop: (_e: React.DragEvent, _type: ExperienceType, _index: number) => void;
  onEdit: (_item: Experience) => void;
  onDelete: (_id: number) => void;
}

export default function ExperiencesTable({
  title,
  type,
  icon: Icon,
  iconColorClass = 'text-primary',
  items,
  draggedItem,
  dragOverItem,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  onEdit,
  onDelete,
}: ExperiencesTableProps) {
  const sortedItems = [...items].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
      <div className="p-4 border-b border-border bg-tertiary/30 flex items-center justify-between">
        <h3 className="text-sm font-semibold font-poppins flex items-center gap-2">
          <Icon size={16} className={iconColorClass} />
          <span>
            {title} ({sortedItems.length})
          </span>
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
              <th className="py-2.5 px-4">Period</th>
              <th className="py-2.5 px-4">
                {type === 'WORK' ? 'Title' : 'Degree / School'}
              </th>
              <th className="py-2.5 px-4">
                {type === 'WORK' ? 'Place' : 'University / Board'}
              </th>
              <th className="py-2.5 px-4">Order</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedItems.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-muted-foreground text-xs"
                >
                  No {title.toLowerCase()} records yet.
                </td>
              </tr>
            ) : (
              sortedItems.map((item, index) => {
                const isDragging =
                  draggedItem?.type === type && draggedItem.index === index;
                const isOver =
                  dragOverItem?.type === type && dragOverItem.index === index;

                return (
                  <tr
                    key={item.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, type, index)}
                    onDragOver={(e) => onDragOver(e, type, index)}
                    onDragEnd={onDragEnd}
                    onDrop={(e) => onDrop(e, type, index)}
                    className={`transition-all ${
                      isDragging
                        ? 'opacity-40 bg-primary/10'
                        : isOver
                          ? 'bg-primary/15 border-t-2 border-primary'
                          : 'hover:bg-tertiary/30'
                    }`}
                  >
                    <AdminDragHandle />
                    <td
                      className={`py-3 px-4 font-mono text-xs whitespace-nowrap ${
                        type === 'WORK' ? 'text-primary' : 'text-secondary'
                      }`}
                    >
                      {item.date_range}
                    </td>
                    <td className="py-3 px-4 font-semibold">{item.title}</td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">
                      {item.place}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-tertiary text-xs font-mono">
                        {item.sort_order}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(item);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item.id);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
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
