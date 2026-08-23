'use client';

import React from 'react';
import { Project } from '@/types/database';
import Image from 'next/image';
import { Edit2, Trash2, Globe, ExternalLink, Sparkles } from 'lucide-react';
import AdminDragHandle from '@/components/admin/admin-drag-handle';

interface ProjectsTableProps {
  projects: Project[];
  draggedIndex: number | null;
  dragOverIndex: number | null;
  onDragStart: (_e: React.DragEvent, _index: number) => void;
  onDragOver: (_e: React.DragEvent, _index: number) => void;
  onDragEnd: () => void;
  onDrop: (_e: React.DragEvent, _index: number) => void;
  onEdit: (_project: Project) => void;
  onDelete: (_id: number) => void;
}

export default function ProjectsTable({
  projects,
  draggedIndex,
  dragOverIndex,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDrop,
  onEdit,
  onDelete,
}: ProjectsTableProps) {
  const sortedProjects = [...projects].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
      <div className="p-4 border-b border-border bg-tertiary/30 flex items-center justify-between">
        <h3 className="text-sm font-semibold font-poppins flex items-center gap-2">
          <span>Portfolio Projects ({sortedProjects.length})</span>
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
              <th className="py-2.5 px-4">Preview</th>
              <th className="py-2.5 px-4">Title</th>
              <th className="py-2.5 px-4">Technologies</th>
              <th className="py-2.5 px-4">Mode</th>
              <th className="py-2.5 px-4">Link</th>
              <th className="py-2.5 px-4">Order</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedProjects.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-8 text-center text-muted-foreground text-xs"
                >
                  No projects configured yet.
                </td>
              </tr>
            ) : (
              sortedProjects.map((project, index) => {
                const isDragging = draggedIndex === index;
                const isOver = dragOverIndex === index;

                return (
                  <tr
                    key={project.id}
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
                      {project.image_url ? (
                        <div className="relative w-14 h-9 rounded-lg overflow-hidden border border-border bg-tertiary">
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-9 rounded-lg bg-tertiary border border-border flex items-center justify-center text-muted-foreground">
                          <Globe size={14} />
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold whitespace-nowrap">
                      {project.title}
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground max-w-xs truncate">
                      {Array.isArray(project.technologies)
                        ? project.technologies.join(', ')
                        : project.technologies}
                    </td>
                    <td className="py-3 px-4 text-xs whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          project.preview_mode === 'iframe'
                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                            : 'bg-primary/10 text-primary border border-primary/20'
                        }`}
                      >
                        {project.preview_mode === 'iframe' ? (
                          <>
                            <Sparkles size={10} />
                            <span>Live Iframe</span>
                          </>
                        ) : (
                          <span>Static Image</span>
                        )}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs space-y-1">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline font-mono"
                        >
                          <span className="max-w-[140px] truncate">
                            {project.link}
                          </span>
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <span className="px-2 py-0.5 rounded-md bg-tertiary text-xs font-mono">
                        {project.sort_order}
                      </span>
                    </td>
                    <td
                      className="py-3 px-4 text-right"
                      draggable={false}
                      onDragStart={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                    >
                      <div
                        className="inline-flex items-center gap-2"
                        draggable={false}
                        onDragStart={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
                        <button
                          type="button"
                          draggable={false}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(project);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          draggable={false}
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(project.id);
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
