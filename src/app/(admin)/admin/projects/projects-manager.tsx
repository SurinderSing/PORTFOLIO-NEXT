'use client';

import React, { useState } from 'react';
import { Project } from '@/types/database';
import {
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
} from '@/lib/admin-actions';
import { uploadProjectImageAction } from '@/lib/storage-actions';
import FileUpload from '@/components/ui/file-upload';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FolderGit2,
  X,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    technologiesText: string;
    link: string;
    image_url: string;
    sort_order: number;
  }>({
    title: '',
    description: '',
    technologiesText: '',
    link: '',
    image_url: '',
    sort_order: 0,
  });

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      technologiesText: 'React, Next.js, TypeScript',
      link: '',
      image_url: '',
      sort_order: projects.length + 1,
    });
  };

  const handleStartEdit = (proj: Project) => {
    setEditingId(proj.id);
    setIsCreating(false);
    setFormData({
      title: proj.title,
      description: proj.description,
      technologiesText: (proj.technologies || []).join(', '),
      link: proj.link || '',
      image_url: proj.image_url || '',
      sort_order: proj.sort_order,
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

    const techArray = formData.technologiesText
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      title: formData.title,
      description: formData.description,
      technologies: techArray,
      link: formData.link.trim() || null,
      image_url: formData.image_url.trim() || null,
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
          setProjects((prev) => [...prev, { ...payload, id: Date.now() }]);
        } else {
          setStatus({
            type: 'error',
            message: res.error || 'Failed to create.',
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
            prev.map((item) =>
              item.id === editingId ? { ...item, ...payload } : item
            )
          );
        } else {
          setStatus({
            type: 'error',
            message: res.error || 'Failed to update.',
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
        setStatus({ type: 'error', message: res.error || 'Failed to delete.' });
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to delete.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {status.type && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            status.type === 'success'
              ? 'bg-green-500/10 text-green-600 border border-green-500/20'
              : 'bg-red-500/10 text-red-600 border border-red-500/20'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-poppins flex items-center gap-2">
            <FolderGit2 size={20} className="text-primary" />
            <span>Manage Portfolio Projects</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Create, update, or reorder showcase projects on the portfolio work
            page.
          </p>
        </div>

        {!isCreating && editingId === null && (
          <button
            onClick={handleStartCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full main-gradient-1 text-white text-xs font-semibold shadow-md hover:opacity-90 transition-opacity"
          >
            <Plus size={14} />
            <span>Add Project</span>
          </button>
        )}
      </div>

      {(isCreating || editingId !== null) && (
        <form
          onSubmit={handleSave}
          className="p-6 rounded-2xl bg-card border border-primary/40 space-y-4 shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold font-poppins text-primary">
              {isCreating ? 'Add Portfolio Project' : 'Edit Portfolio Project'}
            </h3>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 rounded-lg text-muted-foreground hover:bg-tertiary"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Project Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="Gimmefy AI, Dialmantra Dialer..."
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Project Live Link (URL)
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                placeholder="https://..."
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-muted-foreground">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              placeholder="Detailed description of the project and its value..."
              className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-muted-foreground">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              value={formData.technologiesText}
              onChange={(e) =>
                setFormData({ ...formData, technologiesText: e.target.value })
              }
              placeholder="React, TypeScript, Redux Toolkit, Mantine"
              required
              className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
            />
          </div>

          {/* Cover Image Upload & URL */}
          <div className="space-y-3">
            <FileUpload
              label="Project Cover Image (Storage Upload)"
              accept="image/jpeg,image/png,image/webp"
              maxSizeMB={5}
              previewType="image"
              enableCrop={true}
              aspectRatio={16 / 9}
              cropShape="rect"
              currentUrl={formData.image_url}
              onUpload={(fd) =>
                uploadProjectImageAction(fd, editingId || undefined)
              }
              onUrlChange={(newUrl) =>
                setFormData((prev) => ({ ...prev, image_url: newUrl || '' }))
              }
              helperText="Upload 16:9 banner image. Cropping tool opens automatically."
            />

            <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
              <div>
                <label className="block text-[11px] font-medium mb-1 text-muted-foreground">
                  Or Direct Image URL (optional override)
                </label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  placeholder="https://... or bucket URL"
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-background border border-border focus:border-primary outline-none text-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium mb-1 text-muted-foreground">
                  Sort Order
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
                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-background border border-border focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-full border border-border text-xs font-medium hover:bg-tertiary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-full main-gradient-1 text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      )}

      {/* Projects List Table */}
      <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-tertiary/50 border-b border-border text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Technologies</th>
                <th className="py-3 px-4">Link</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-muted-foreground text-xs"
                  >
                    No projects configured yet.
                  </td>
                </tr>
              ) : (
                projects.map((proj) => (
                  <tr
                    key={proj.id}
                    className="hover:bg-tertiary/30 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold whitespace-nowrap">
                      {proj.title}
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground max-w-xs truncate">
                      {proj.description}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {(proj.technologies || [])
                          .slice(0, 3)
                          .map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-[10px] py-0"
                            >
                              {tech}
                            </Badge>
                          ))}
                        {(proj.technologies || []).length > 3 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{(proj.technologies || []).length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {proj.link ? (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <span className="max-w-[120px] truncate">
                            {proj.link}
                          </span>
                          <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs">{proj.sort_order}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleStartEdit(proj)}
                          className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
