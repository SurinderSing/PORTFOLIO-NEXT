'use client';

import React, { useState } from 'react';
import { Contact } from '@/types/database';
import {
  createContactAction,
  updateContactAction,
  deleteContactAction,
  reorderContactsAction,
} from '@/lib/admin-actions';
import { Plus, Phone } from 'lucide-react';
import { useDragDropReorder } from '@/hooks/use-drag-drop-reorder';
import AdminStatusBanner, {
  AdminStatusState,
} from '@/components/admin/admin-status-banner';
import AdminPageHeader from '@/components/admin/admin-page-header';
import ContactForm, { ContactFormData } from './contact-form';
import ContactsTable from './contacts-table';

interface ContactsManagerProps {
  initialContacts: Contact[];
}

export default function ContactsManager({
  initialContacts,
}: ContactsManagerProps) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<AdminStatusState>({
    type: null,
    message: '',
  });

  const [formData, setFormData] = useState<ContactFormData>({
    type: 'phone',
    title: '',
    detail: '',
    icon_name: 'phone',
    icon_color: '#EC1C09',
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
    items: contacts,
    setItems: setContacts,
    onPersist: reorderContactsAction,
    onStatusChange: setStatus,
    successMessage: 'Contacts reordered successfully.',
  });

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      type: 'phone',
      title: '',
      detail: '',
      icon_name: 'phone',
      icon_color: '#EC1C09',
      sort_order: contacts.length + 1,
    });
  };

  const handleStartEdit = (contact: Contact) => {
    setEditingId(contact.id);
    setIsCreating(false);
    setFormData({
      type: contact.type,
      title: contact.title,
      detail: contact.detail,
      icon_name: contact.icon_name,
      icon_color: contact.icon_color || '#EC1C09',
      sort_order: contact.sort_order,
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
        const res = await createContactAction(formData);
        if (res.success) {
          setStatus({
            type: 'success',
            message: 'Contact created successfully.',
          });
          setIsCreating(false);
          setContacts((prev) => [
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
            message: res.error || 'Failed to create contact.',
          });
        }
      } else if (editingId !== null) {
        const res = await updateContactAction(editingId, formData);
        if (res.success) {
          setStatus({
            type: 'success',
            message: 'Contact updated successfully.',
          });
          setEditingId(null);
          setContacts((prev) =>
            prev.map((c) =>
              c.id === editingId
                ? { ...c, ...formData, sort_order: Number(formData.sort_order) }
                : c
            )
          );
        } else {
          setStatus({
            type: 'error',
            message: res.error || 'Failed to update contact.',
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
    if (!confirm('Are you sure you want to delete this contact?')) return;
    setLoading(true);
    try {
      const res = await deleteContactAction(id);
      if (res.success) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
        setStatus({
          type: 'success',
          message: 'Contact deleted successfully.',
        });
      } else {
        setStatus({
          type: 'error',
          message: res.error || 'Failed to delete contact.',
        });
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
        title="Manage Contacts"
        description="Reorder contacts by dragging the grip icon, or add phone, email, and location details."
        icon={Phone}
      >
        {!isCreating && editingId === null && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl main-gradient-1 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={15} />
            <span>Add Contact</span>
          </button>
        )}
      </AdminPageHeader>

      {/* Form Section */}
      {(isCreating || editingId !== null) && (
        <ContactForm
          isCreating={isCreating}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
      )}

      {/* List Table Section */}
      <ContactsTable
        contacts={contacts}
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
