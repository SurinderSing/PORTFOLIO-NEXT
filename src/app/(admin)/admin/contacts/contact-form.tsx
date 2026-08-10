'use client';

import React from 'react';
import { X } from 'lucide-react';

export interface ContactFormData {
  type: string;
  title: string;
  detail: string;
  icon_name: string;
  icon_color: string;
  sort_order: number;
}

interface ContactFormProps {
  isCreating: boolean;
  formData: ContactFormData;
  setFormData: React.Dispatch<React.SetStateAction<ContactFormData>>;
  onSubmit: (_e: React.FormEvent) => void;
  onCancel: () => void;
  loading: boolean;
}

export default function ContactForm({
  isCreating,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  loading,
}: ContactFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-base font-semibold font-poppins">
          {isCreating ? 'Create New Contact' : 'Edit Contact Details'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 rounded-lg text-muted-foreground hover:bg-tertiary transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          >
            <option value="phone">Phone</option>
            <option value="email">Email</option>
            <option value="location">Location</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Title / Label
          </label>
          <input
            type="text"
            required
            placeholder="Phone, Email, Location..."
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Detail / Value
          </label>
          <input
            type="text"
            required
            placeholder="+91 9876543210 or user@example.com"
            value={formData.detail}
            onChange={(e) =>
              setFormData({ ...formData, detail: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Icon Name (Lucide Icon)
          </label>
          <input
            type="text"
            required
            placeholder="phone, mail, map-pin..."
            value={formData.icon_name}
            onChange={(e) =>
              setFormData({ ...formData, icon_name: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Icon Color Hex
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={formData.icon_color}
              onChange={(e) =>
                setFormData({ ...formData, icon_color: e.target.value })
              }
              className="w-10 h-10 rounded-xl bg-tertiary border border-border cursor-pointer p-0.5"
            />
            <input
              type="text"
              value={formData.icon_color}
              onChange={(e) =>
                setFormData({ ...formData, icon_color: e.target.value })
              }
              placeholder="#EC1C09"
              className="flex-1 px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary font-mono"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Sort Order (Position)
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
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl bg-tertiary text-xs font-semibold hover:bg-tertiary/70 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2 rounded-xl main-gradient-1 text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Contact'}
        </button>
      </div>
    </form>
  );
}
