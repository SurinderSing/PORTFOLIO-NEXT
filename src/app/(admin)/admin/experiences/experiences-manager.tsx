'use client';

import React, { useState } from 'react';
import { Experience, ExperienceType } from '@/types/database';
import {
  createExperienceAction,
  updateExperienceAction,
  deleteExperienceAction,
} from '@/lib/admin-actions';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  GraduationCap,
  X,
} from 'lucide-react';

interface ExperiencesManagerProps {
  initialExperiences: Experience[];
}

export default function ExperiencesManager({
  initialExperiences,
}: ExperiencesManagerProps) {
  const [experiences, setExperiences] =
    useState<Experience[]>(initialExperiences);
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
    date_range: string;
    title: string;
    place: string;
    type: ExperienceType;
    sort_order: number;
  }>({
    date_range: '',
    title: '',
    place: '',
    type: 'WORK',
    sort_order: 0,
  });

  const handleStartCreate = (type: ExperienceType = 'WORK') => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      date_range: '',
      title: '',
      place: '',
      type,
      sort_order: experiences.filter((e) => e.type === type).length + 1,
    });
  };

  const handleStartEdit = (item: Experience) => {
    setEditingId(item.id);
    setIsCreating(false);
    setFormData({
      date_range: item.date_range,
      title: item.title,
      place: item.place,
      type: item.type,
      sort_order: item.sort_order,
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

    try {
      if (isCreating) {
        const res = await createExperienceAction(formData);
        if (res.success) {
          setStatus({
            type: 'success',
            message: 'Experience added successfully.',
          });
          setIsCreating(false);
          setExperiences((prev) => [
            ...prev,
            {
              ...formData,
              id: Date.now(),
              sort_order: Number(formData.sort_order),
            },
          ]);
        } else {
          setStatus({
            type: 'error',
            message: res.error || 'Failed to create.',
          });
        }
      } else if (editingId !== null) {
        const res = await updateExperienceAction(editingId, formData);
        if (res.success) {
          setStatus({
            type: 'success',
            message: 'Experience updated successfully.',
          });
          setEditingId(null);
          setExperiences((prev) =>
            prev.map((item) =>
              item.id === editingId
                ? {
                    ...item,
                    ...formData,
                    sort_order: Number(formData.sort_order),
                  }
                : item
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
    if (!confirm('Are you sure you want to delete this experience record?'))
      return;
    setLoading(true);
    try {
      const res = await deleteExperienceAction(id);
      if (res.success) {
        setExperiences((prev) => prev.filter((item) => item.id !== id));
        setStatus({
          type: 'success',
          message: 'Experience deleted successfully.',
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

  const workItems = experiences.filter((e) => e.type === 'WORK');
  const educationItems = experiences.filter((e) => e.type === 'EDUCATION');

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
            <Briefcase size={20} className="text-primary" />
            <span>Manage Experiences</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Update work history timeline and educational qualifications on the
            resume page.
          </p>
        </div>

        {!isCreating && editingId === null && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStartCreate('WORK')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full main-gradient-1 text-white text-xs font-semibold shadow-md hover:opacity-90 transition-opacity"
            >
              <Plus size={14} />
              <span>Add Work</span>
            </button>
            <button
              onClick={() => handleStartCreate('EDUCATION')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card text-foreground text-xs font-semibold hover:bg-tertiary transition-colors"
            >
              <Plus size={14} />
              <span>Add Education</span>
            </button>
          </div>
        )}
      </div>

      {(isCreating || editingId !== null) && (
        <form
          onSubmit={handleSave}
          className="p-6 rounded-2xl bg-card border border-primary/40 space-y-4 shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold font-poppins text-primary">
              {isCreating
                ? `Add ${formData.type} Record`
                : `Edit ${formData.type} Record`}
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
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as ExperienceType,
                  })
                }
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              >
                <option value="WORK">WORK (Job / Internship)</option>
                <option value="EDUCATION">EDUCATION (Degree / School)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Date Range
              </label>
              <input
                type="text"
                value={formData.date_range}
                onChange={(e) =>
                  setFormData({ ...formData, date_range: e.target.value })
                }
                required
                placeholder="e.g. 12/2023 - Present or 2022 - 2023"
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Role / Degree Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="Front-End Developer / Bachelor of Computer Applications"
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Organization / University & Location
              </label>
              <input
                type="text"
                value={formData.place}
                onChange={(e) =>
                  setFormData({ ...formData, place: e.target.value })
                }
                required
                placeholder="Gimmefy AI - Remote / Capital University, Jharkhand"
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="w-36">
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
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
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
            <div className="flex gap-2">
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
                {loading ? 'Saving...' : 'Save Experience'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Work Experiences Section */}
      <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-tertiary/30 flex items-center justify-between">
          <h3 className="text-sm font-semibold font-poppins flex items-center gap-2">
            <Briefcase size={16} className="text-primary" />
            <span>Work Experience ({workItems.length})</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-tertiary/20 border-b border-border text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-4">Period</th>
                <th className="py-2.5 px-4">Title</th>
                <th className="py-2.5 px-4">Place</th>
                <th className="py-2.5 px-4">Order</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {workItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-tertiary/30 transition-colors"
                >
                  <td className="py-3 px-4 font-mono text-xs text-primary whitespace-nowrap">
                    {item.date_range}
                  </td>
                  <td className="py-3 px-4 font-semibold">{item.title}</td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">
                    {item.place}
                  </td>
                  <td className="py-3 px-4 text-xs">{item.sort_order}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Education Experiences Section */}
      <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-tertiary/30 flex items-center justify-between">
          <h3 className="text-sm font-semibold font-poppins flex items-center gap-2">
            <GraduationCap size={16} className="text-secondary" />
            <span>Education ({educationItems.length})</span>
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-tertiary/20 border-b border-border text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-4">Period</th>
                <th className="py-2.5 px-4">Degree / School</th>
                <th className="py-2.5 px-4">University / Board</th>
                <th className="py-2.5 px-4">Order</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {educationItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-tertiary/30 transition-colors"
                >
                  <td className="py-3 px-4 font-mono text-xs text-secondary whitespace-nowrap">
                    {item.date_range}
                  </td>
                  <td className="py-3 px-4 font-semibold">{item.title}</td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">
                    {item.place}
                  </td>
                  <td className="py-3 px-4 text-xs">{item.sort_order}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
