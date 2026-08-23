'use client';

import React, { useState } from 'react';
import { AboutCard } from '@/types/database';
import {
  createAboutCardAction,
  updateAboutCardAction,
  deleteAboutCardAction,
  reorderAboutCardsAction,
} from '@/lib/admin-actions';
import { Plus, Sparkles } from 'lucide-react';
import { useDragDropReorder } from '@/hooks/use-drag-drop-reorder';
import AdminStatusBanner, {
  AdminStatusState,
} from '@/components/admin/admin-status-banner';
import AdminPageHeader from '@/components/admin/admin-page-header';
import AboutCardForm, { AboutCardFormData } from './about-card-form';
import AboutCardsTable from './about-cards-table';

interface AboutCardsManagerProps {
  initialCards: AboutCard[];
}

export default function AboutCardsManager({
  initialCards,
}: AboutCardsManagerProps) {
  const [cards, setCards] = useState<AboutCard[]>(initialCards);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<AdminStatusState>({
    type: null,
    message: '',
  });

  const [formData, setFormData] = useState<AboutCardFormData>({
    title: '',
    description: '',
    icon_name: 'code-xml',
    bg_color_class: 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
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
    items: cards,
    setItems: setCards,
    onPersist: reorderAboutCardsAction,
    onStatusChange: setStatus,
    successMessage: 'About cards reordered successfully.',
  });

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      icon_name: 'code-xml',
      bg_color_class: 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
      sort_order: cards.length + 1,
    });
  };

  const handleStartEdit = (card: AboutCard) => {
    setEditingId(card.id);
    setIsCreating(false);
    setFormData({
      title: card.title,
      description: card.description,
      icon_name: card.icon_name,
      bg_color_class: card.bg_color_class,
      sort_order: card.sort_order,
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
        const res = await createAboutCardAction(formData);
        if (res.success) {
          setStatus({
            type: 'success',
            message: 'About card created successfully.',
          });
          setIsCreating(false);
          setCards((prev) => [
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
        const res = await updateAboutCardAction(editingId, formData);
        if (res.success) {
          setStatus({
            type: 'success',
            message: 'About card updated successfully.',
          });
          setEditingId(null);
          setCards((prev) =>
            prev.map((c) =>
              c.id === editingId
                ? { ...c, ...formData, sort_order: Number(formData.sort_order) }
                : c
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
    setLoading(true);
    try {
      const res = await deleteAboutCardAction(id);
      if (res.success) {
        setCards((prev) => prev.filter((c) => c.id !== id));
        setStatus({
          type: 'success',
          message: 'About card deleted successfully.',
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
      <AdminStatusBanner status={status} />

      <AdminPageHeader
        title="Manage About Cards"
        description='Reorder cards by dragging the grip icon, or customize "What I do!" service cards.'
        icon={Sparkles}
      >
        {!isCreating && editingId === null && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl main-gradient-1 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={15} />
            <span>Add Card</span>
          </button>
        )}
      </AdminPageHeader>

      {/* Form Section */}
      {(isCreating || editingId !== null) && (
        <AboutCardForm
          isCreating={isCreating}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {/* List Table Section */}
      <AboutCardsTable
        cards={cards}
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
