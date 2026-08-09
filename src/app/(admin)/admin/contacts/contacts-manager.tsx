'use client';

import React, { useState } from 'react';
import { Contact } from '@/types/database';
import {
  createContactAction,
  updateContactAction,
  deleteContactAction,
} from '@/lib/admin-actions';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Phone,
  X,
} from 'lucide-react';
import { resolveIcon } from '@/utils/icon-resolver';

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
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const [formData, setFormData] = useState({
    type: 'phone',
    title: '',
    detail: '',
    icon_name: 'phone',
    icon_color: '#EC1C09',
    sort_order: 0,
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
          // Optimistic local update
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
          // Optimistic local update
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
      {/* Alert banner */}
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

      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-poppins flex items-center gap-2">
            <Phone size={20} className="text-primary" />
            <span>Manage Contacts</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Configure phone, email, and location shown in sidebar and on the
            contact page.
          </p>
        </div>

        {!isCreating && editingId === null && (
          <button
            onClick={handleStartCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full main-gradient-1 text-white text-xs font-semibold shadow-md hover:opacity-90 transition-opacity"
          >
            <Plus size={14} />
            <span>Add Contact</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal / Block */}
      {(isCreating || editingId !== null) && (
        <form
          onSubmit={handleSave}
          className="p-6 rounded-2xl bg-card border border-primary/40 space-y-4 shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold font-poppins text-primary">
              {isCreating ? 'Add New Contact' : 'Edit Contact'}
            </h3>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 rounded-lg text-muted-foreground hover:bg-tertiary"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Type (phone, email, location)
              </label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                required
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Title (Label)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                placeholder="Phone, Email, etc."
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Detail / Value
              </label>
              <input
                type="text"
                value={formData.detail}
                onChange={(e) =>
                  setFormData({ ...formData, detail: e.target.value })
                }
                required
                placeholder="+91 ..., user@example.com"
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Icon Name (phone, mail, map-pin)
              </label>
              <input
                type="text"
                value={formData.icon_name}
                onChange={(e) =>
                  setFormData({ ...formData, icon_name: e.target.value })
                }
                required
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Icon Color (HEX)
              </label>
              <input
                type="text"
                value={formData.icon_color}
                onChange={(e) =>
                  setFormData({ ...formData, icon_color: e.target.value })
                }
                placeholder="#EC1C09"
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
            <div>
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
              {loading ? 'Saving...' : 'Save Contact'}
            </button>
          </div>
        </form>
      )}

      {/* Contacts List Table */}
      <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-tertiary/50 border-b border-border text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Icon</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Detail</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-muted-foreground text-xs"
                  >
                    No contacts configured yet.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-tertiary/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center">
                        {resolveIcon(contact.icon_name, {
                          color: contact.icon_color || undefined,
                          size: 16,
                        })}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">{contact.title}</td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">
                      {contact.type}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">
                      {contact.detail}
                    </td>
                    <td className="py-3 px-4 text-xs">{contact.sort_order}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleStartEdit(contact)}
                          className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
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
