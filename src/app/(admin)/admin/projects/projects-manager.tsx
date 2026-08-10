'use client';

import React, { useState } from 'react';
import { Project } from '@/types/database';
import {
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
  reorderProjectsAction,
} from '@/lib/admin-actions';
import { Plus, FolderKanban } from 'lucide-react';
import { useDragDropReorder } from '@/hooks/use-drag-drop-reorder';
import AdminStatusBanner, {
  AdminStatusState,
} from '@/components/admin/admin-status-banner';
import AdminPageHeader from '@/components/admin/admin-page-header';
import ProjectForm, { ProjectFormData } from './project-form';
import ProjectsTable from './projects-table';

interface ProjectsManagerProps {
  initialProjects: Project[];
}

export default function ProjectsManager({
  initialProjects,
}: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<AdminStatusState>({
    type: null,
    message: '',
  });

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    technologies: '',
    link: '',
    image_url: '',
    preview_url: '',
    preview_mode: 'iframe',
    sort_order: 0,
  });

  const {
    draggedIndex,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
  } = useDragDropReorder({
    items: projects,
    setItems: setProjects,
    onPersist: reorderProjectsAction,
    onStatusChange: setStatus,
    successMessage: 'Projects reordered successfully.',
  });

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      link: '',
      image_url: '',
      preview_url: '',
      preview_mode: 'iframe',
      sort_order: projects.length + 1,
    });
  };

  const handleStartEdit = (project: Project) => {
    setEditingId(project.id);
    setIsCreating(false);
    setFormData({
      title: project.title,
      description: project.description || '',
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(', ')
        : (project.technologies as any) || '',
      link: project.link || '',
      image_url: project.image_url || '',
      preview_url: project.preview_url || '',
      preview_mode: project.preview_mode || 'iframe',
      sort_order: project.sort_order,
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    const techArray = formData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      description: formData.description,
      technologies: techArray,
      link: formData.link || null,
      image_url: formData.image_url || null,
      preview_url: formData.preview_url || null,
      preview_mode: formData.preview_mode,
      sort_order: Number(formData.sort_order),
    };

    try {
      if (isCreating) {
        const res = await createProjectAction(payload);
        if (res.success) {
          setStatus({
            type: 'success',
            message: 'Project created successfully.',
          });
          setIsCreating(false);
          setProjects((prev) => [
            ...prev,
            {
              ...payload,
              id: Date.now(),
            },
          ]);
        } else {
          setStatus({
            type: 'error',
            message: res.error || 'Failed to create project.',
          });
        }
      } else if (editingId !== null) {
        const res = await updateProjectAction(editingId, payload);
        if (res.success) {
          setStatus({
            type: 'success',
            message: 'Project updated successfully.',
          });
          setEditingId(null);
          setProjects((prev) =>
            prev.map((p) => (p.id === editingId ? { ...p, ...payload } : p))
          );
        } else {
          setStatus({
            type: 'error',
            message: res.error || 'Failed to update project.',
          });
        }
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'An error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    setLoading(true);
    try {
      const res = await deleteProjectAction(id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setStatus({
          type: 'success',
          message: 'Project deleted successfully.',
        });
      } else {
        setStatus({
          type: 'error',
          message: res.error || 'Failed to delete project.',
        });
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to delete project.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminStatusBanner status={status} />

      <AdminPageHeader
        title="Manage Portfolio Projects"
        description="Reorder projects by dragging the grip icon, or configure live interactive embeds & screenshots."
        icon={FolderKanban}
      >
        {!isCreating && editingId === null && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl main-gradient-1 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={15} />
            <span>Add Project</span>
          </button>
        )}
      </AdminPageHeader>

      {/* Form Section */}
      {(isCreating || editingId !== null) && (
        <ProjectForm
          isCreating={isCreating}
          editingId={editingId}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {/* List Table Section */}
      <ProjectsTable
        projects={projects}
        draggedIndex={draggedIndex}
        dragOverIndex={dragOverIndex}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        onEdit={handleStartEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
