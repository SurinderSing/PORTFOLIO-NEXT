'use client';

import React, { useState } from 'react';
import { SocialLink } from '@/types/database';
import {
  createSocialLinkAction,
  updateSocialLinkAction,
  deleteSocialLinkAction,
  reorderSocialLinksAction,
} from '@/lib/admin-actions';
import { Plus, Share2 } from 'lucide-react';
import { useDragDropReorder } from '@/hooks/use-drag-drop-reorder';
import AdminStatusBanner, {
  AdminStatusState,
} from '@/components/admin/admin-status-banner';
import AdminPageHeader from '@/components/admin/admin-page-header';
import SocialLinkForm, { SocialLinkFormData } from './social-link-form';
import SocialLinksTable from './social-links-table';

interface SocialLinksManagerProps {
  initialLinks: SocialLink[];
}

export default function SocialLinksManager({
  initialLinks,
}: SocialLinksManagerProps) {
  const [links, setLinks] = useState<SocialLink[]>(initialLinks);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<AdminStatusState>({
    type: null,
    message: '',
  });

  const [formData, setFormData] = useState<SocialLinkFormData>({
    name: '',
    url: '',
    icon_name: 'github',
    icon_color: '#0077B5',
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
    items: links,
    setItems: setLinks,
    onPersist: reorderSocialLinksAction,
    onStatusChange: setStatus,
    successMessage: 'Social links reordered successfully.',
  });

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      name: '',
      url: '',
      icon_name: 'github',
      icon_color: '#0077B5',
      sort_order: links.length + 1,
    });
  };

  const handleStartEdit = (item: SocialLink) => {
    setEditingId(item.id);
    setIsCreating(false);
    setFormData({
      name: item.name,
      url: item.url,
      icon_name: item.icon_name,
      icon_color: item.icon_color || '',
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
        const res = await createSocialLinkAction(formData);
        if (res.success) {
          setStatus({
            type: 'success',
            message: 'Social link created successfully.',
          });
          setIsCreating(false);
          setLinks((prev) => [
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
        const res = await updateSocialLinkAction(editingId, formData);
        if (res.success) {
          setStatus({
            type: 'success',
            message: 'Social link updated successfully.',
          });
          setEditingId(null);
          setLinks((prev) =>
            prev.map((l) =>
              l.id === editingId
                ? { ...l, ...formData, sort_order: Number(formData.sort_order) }
                : l
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
    if (!confirm('Are you sure you want to delete this social link?')) return;
    setLoading(true);
    try {
      const res = await deleteSocialLinkAction(id);
      if (res.success) {
        setLinks((prev) => prev.filter((l) => l.id !== id));
        setStatus({
          type: 'success',
          message: 'Social link deleted successfully.',
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
        title="Manage Social Links"
        description="Reorder links by dragging the grip icon, or configure profiles shown in the sidebar."
        icon={Share2}
      >
        {!isCreating && editingId === null && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl main-gradient-1 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={15} />
            <span>Add Social Link</span>
          </button>
        )}
      </AdminPageHeader>

      {/* Form Section */}
      {(isCreating || editingId !== null) && (
        <SocialLinkForm
          isCreating={isCreating}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {/* List Table Section */}
      <SocialLinksTable
        links={links}
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
