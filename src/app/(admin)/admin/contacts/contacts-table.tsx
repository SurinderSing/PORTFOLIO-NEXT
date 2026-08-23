'use client';

import React from 'react';
import { Contact } from '@/types/database';
import { Edit2, Trash2 } from 'lucide-react';
import { resolveIcon } from '@/utils/icon-resolver';
import AdminDragHandle from '@/components/admin/admin-drag-handle';

interface ContactsTableProps {
  contacts: Contact[];
  draggedIndex: number | null;
  dragOverIndex: number | null;
  onDragStart: (_e: React.DragEvent, _index: number) => void;
  onDragOver: (_e: React.DragEvent, _index: number) => void;
  onDragEnd: () => void;
  onDrop: (_e: React.DragEvent, _index: number) => void;
  onEdit: (_contact: Contact) => void;
  onDelete: (_id: number) => void;
}

export default function ContactsTable({
  contacts,
  draggedIndex,
  dragOverIndex,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  onEdit,
  onDelete,
}: ContactsTableProps) {
  const sortedContacts = [...contacts].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
      <div className="p-4 border-b border-border bg-tertiary/30 flex items-center justify-between">
        <h3 className="text-sm font-semibold font-poppins flex items-center gap-2">
          <span>Contact Entries ({sortedContacts.length})</span>
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
              <th className="py-2.5 px-4">Title</th>
              <th className="py-2.5 px-4">Type</th>
              <th className="py-2.5 px-4">Detail</th>
              <th className="py-2.5 px-4">Order</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedContacts.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-center text-muted-foreground text-xs"
                >
                  No contacts configured yet.
                </td>
              </tr>
            ) : (
              sortedContacts.map((contact, index) => {
                const isDragging = draggedIndex === index;
                const isOver = dragOverIndex === index;

                return (
                  <tr
                    key={contact.id}
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
                        {resolveIcon(contact.icon_name, {
                          color: contact.icon_color || undefined,
                          size: 16,
                        })}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">{contact.title}</td>
                    <td className="py-3 px-4 text-xs text-muted-foreground uppercase">
                      {contact.type}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">
                      {contact.detail}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-tertiary text-xs font-mono">
                        {contact.sort_order}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(contact);
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
                            onDelete(contact.id);
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
