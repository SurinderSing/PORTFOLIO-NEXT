'use client';

import React, { useState } from 'react';
import { SocialLink } from '@/types/database';
import {
  createSocialLinkAction,
  updateSocialLinkAction,
  deleteSocialLinkAction,
} from '@/lib/admin-actions';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Share2,
  X,
  ExternalLink,
} from 'lucide-react';
import { resolveIcon } from '@/utils/icon-resolver';

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
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    icon_name: 'github',
    icon_color: '#0077B5',
    sort_order: 0,
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
            <Share2 size={20} className="text-primary" />
            <span>Manage Social Links</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Configure profile URLs (LinkedIn, GitHub, Instagram, Twitter, etc.)
          </p>
        </div>

        {!isCreating && editingId === null && (
          <button
            onClick={handleStartCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full main-gradient-1 text-white text-xs font-semibold shadow-md hover:opacity-90 transition-opacity"
          >
            <Plus size={14} />
            <span>Add Social Link</span>
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
              {isCreating ? 'Add Social Link' : 'Edit Social Link'}
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
                Platform Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="LinkedIn, GitHub, X..."
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Profile URL
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                required
                placeholder="https://..."
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Icon Identifier (github, linkedin, instagram, globe)
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
                placeholder="#0077B5"
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
              {loading ? 'Saving...' : 'Save Social Link'}
            </button>
          </div>
        </form>
      )}

      <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-tertiary/50 border-b border-border text-xs text-muted-foreground uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Icon</th>
                <th className="py-3 px-4">Platform</th>
                <th className="py-3 px-4">URL</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {links.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-muted-foreground text-xs"
                  >
                    No social links configured yet.
                  </td>
                </tr>
              ) : (
                links.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-tertiary/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center">
                        {resolveIcon(item.icon_name, {
                          color: item.icon_color || undefined,
                          size: 16,
                        })}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold">{item.name}</td>
                    <td className="py-3 px-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-mono"
                      >
                        <span className="max-w-xs truncate">{item.url}</span>
                        <ExternalLink size={11} />
                      </a>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
