'use client';

import React, { useState } from 'react';
import { AboutCard } from '@/types/database';
import {
  createAboutCardAction,
  updateAboutCardAction,
  deleteAboutCardAction,
} from '@/lib/admin-actions';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  X,
} from 'lucide-react';
import { resolveIcon } from '@/utils/icon-resolver';

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
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon_name: 'code-xml',
    bg_color_class: 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
    sort_order: 0,
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
    if (!confirm('Are you sure you want to delete this about card?')) return;
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
            <Sparkles size={20} className="text-primary" />
            <span>Manage About Cards (&quot;What I do!&quot;)</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Configure the 6 expertise cards shown on the portfolio home page.
          </p>
        </div>

        {!isCreating && editingId === null && (
          <button
            onClick={handleStartCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full main-gradient-1 text-white text-xs font-semibold shadow-md hover:opacity-90 transition-opacity"
          >
            <Plus size={14} />
            <span>Add Card</span>
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
              {isCreating ? 'Add About Card' : 'Edit About Card'}
            </h3>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 rounded-lg text-muted-foreground hover:bg-tertiary"
            >
              <X size={16} />
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-muted-foreground">
              Card Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              placeholder="Frontend Development, AI Tools, etc."
              className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
            />
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
              className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none resize-y"
            />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Icon Identifier (code-xml, layout-grid, brain, badge-help, zap,
                slack)
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
                Background Class
              </label>
              <input
                type="text"
                value={formData.bg_color_class}
                onChange={(e) =>
                  setFormData({ ...formData, bg_color_class: e.target.value })
                }
                required
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
              {loading ? 'Saving...' : 'Save Card'}
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
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {cards.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-muted-foreground text-xs"
                  >
                    No about cards configured yet.
                  </td>
                </tr>
              ) : (
                cards.map((card) => (
                  <tr
                    key={card.id}
                    className="hover:bg-tertiary/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center">
                        {resolveIcon(card.icon_name, {
                          size: 16,
                          className: 'text-primary',
                        })}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold whitespace-nowrap">
                      {card.title}
                    </td>
                    <td className="py-3 px-4 text-xs text-muted-foreground max-w-md truncate">
                      {card.description}
                    </td>
                    <td className="py-3 px-4 text-xs">{card.sort_order}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleStartEdit(card)}
                          className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(card.id)}
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
