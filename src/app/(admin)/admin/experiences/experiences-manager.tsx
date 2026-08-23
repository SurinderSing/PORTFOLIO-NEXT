'use client';

import React, { useState } from 'react';
import { Experience, ExperienceType } from '@/types/database';
import {
  createExperienceAction,
  updateExperienceAction,
  deleteExperienceAction,
  reorderExperiencesAction,
} from '@/lib/admin-actions';
import { Plus, Briefcase, GraduationCap } from 'lucide-react';
import { reorderArray } from '@/utils/reorder';
import AdminStatusBanner, {
  AdminStatusState,
} from '@/components/admin/admin-status-banner';
import AdminPageHeader from '@/components/admin/admin-page-header';
import AdminDeleteModal from '@/components/admin/admin-delete-modal';
import ExperienceForm, { ExperienceFormData } from './experience-form';
import ExperiencesTable from './experiences-table';

interface ExperiencesManagerProps {
  initialExperiences: Experience[];
}

export default function ExperiencesManager({
  initialExperiences,
}: ExperiencesManagerProps) {
  const [experiences, setExperiences] =
    useState<Experience[]>(initialExperiences);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingItem, setDeletingItem] = useState<Experience | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [draggedItem, setDraggedItem] = useState<{
    type: ExperienceType;
    index: number;
  } | null>(null);
  const [dragOverItem, setDragOverItem] = useState<{
    type: ExperienceType;
    index: number;
  } | null>(null);
  const [status, setStatus] = useState<AdminStatusState>({
    type: null,
    message: '',
  });

  const [formData, setFormData] = useState<ExperienceFormData>({
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

  const handleStartDelete = (item: Experience) => {
    setDeletingItem(item);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    setLoading(true);
    try {
      const res = await deleteExperienceAction(deletingItem.id);
      if (res.success) {
        setExperiences((prev) =>
          prev.filter((item) => item.id !== deletingItem.id)
        );
        setStatus({
          type: 'success',
          message: `Experience "${deletingItem.title}" deleted successfully.`,
        });
        setDeletingItem(null);
      } else {
        setStatus({ type: 'error', message: res.error || 'Failed to delete.' });
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to delete.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (
    e: React.DragEvent,
    type: ExperienceType,
    index: number
  ) => {
    setDraggedItem({ type, index });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `${type}:${index}`);
  };

  const handleDragOver = (
    e: React.DragEvent,
    type: ExperienceType,
    index: number
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (
      !draggedItem ||
      draggedItem.type !== type ||
      draggedItem.index === index
    )
      return;
    setDragOverItem({ type, index });
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDrop = async (
    e: React.DragEvent,
    targetType: ExperienceType,
    targetIndex: number
  ) => {
    e.preventDefault();
    if (
      !draggedItem ||
      draggedItem.type !== targetType ||
      draggedItem.index === targetIndex
    ) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const sourceIndex = draggedItem.index;
    const currentGroup = experiences
      .filter((item) => item.type === targetType)
      .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    const otherGroup = experiences.filter((item) => item.type !== targetType);

    const updatedGroup = reorderArray(currentGroup, sourceIndex, targetIndex);

    setExperiences([...otherGroup, ...updatedGroup]);
    setDraggedItem(null);
    setDragOverItem(null);
    setStatus({
      type: 'success',
      message: `${targetType === 'WORK' ? 'Work' : 'Education'} experiences reordered.`,
    });

    const res = await reorderExperiencesAction(
      updatedGroup.map((item) => ({
        id: item.id,
        sort_order: item.sort_order || 0,
      }))
    );
    if (!res.success) {
      setStatus({
        type: 'error',
        message: res.error || 'Failed to sync reordered experiences.',
      });
    }
  };

  const workItems = experiences.filter((e) => e.type === 'WORK');
  const educationItems = experiences.filter((e) => e.type === 'EDUCATION');

  return (
    <div className="space-y-6">
      <AdminStatusBanner status={status} />

      <AdminPageHeader
        title="Manage Experiences"
        description="Reorder items by dragging the grip icon on the left, or add and edit records."
      >
        <button
          onClick={() => handleStartCreate('WORK')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl main-gradient-1 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={15} />
          <span>Add Work</span>
        </button>
        <button
          onClick={() => handleStartCreate('EDUCATION')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary text-white text-xs font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={15} />
          <span>Add Education</span>
        </button>
      </AdminPageHeader>

      {/* Form Section */}
      {(isCreating || editingId !== null) && (
        <ExperienceForm
          isCreating={isCreating}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {/* Work Experiences Table */}
      <ExperiencesTable
        title="Work Experience"
        type="WORK"
        icon={Briefcase}
        iconColorClass="text-primary"
        items={workItems}
        draggedItem={draggedItem}
        dragOverItem={dragOverItem}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        onEdit={handleStartEdit}
        onDelete={handleStartDelete}
      />

      {/* Education Experiences Table */}
      <ExperiencesTable
        title="Education"
        type="EDUCATION"
        icon={GraduationCap}
        iconColorClass="text-secondary"
        items={educationItems}
        draggedItem={draggedItem}
        dragOverItem={dragOverItem}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDrop={handleDrop}
        onEdit={handleStartEdit}
        onDelete={handleStartDelete}
      />

      {/* Delete Confirmation Modal */}
      <AdminDeleteModal
        isOpen={deletingItem !== null}
        title="Delete Experience Record"
        description="Are you sure you want to permanently delete this experience / education record? This action will remove it from your live resume."
        itemName={
          deletingItem
            ? `${deletingItem.title} (${deletingItem.place})`
            : undefined
        }
        loading={loading}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingItem(null)}
      />
    </div>
  );
}
