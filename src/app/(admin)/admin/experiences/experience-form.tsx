'use client';

import React from 'react';
import { ExperienceType } from '@/types/database';
import { X } from 'lucide-react';

export interface ExperienceFormData {
  date_range: string;
  title: string;
  place: string;
  type: ExperienceType;
  description: string;
  technologies: string;
  sort_order: number;
}

interface ExperienceFormProps {
  isCreating: boolean;
  formData: ExperienceFormData;
  setFormData: React.Dispatch<React.SetStateAction<ExperienceFormData>>;
  onSubmit: (_e: React.FormEvent) => void;
  onCancel: () => void;
  loading: boolean;
}

export default function ExperienceForm({
  isCreating,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  loading,
}: ExperienceFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-base font-semibold font-poppins">
          {isCreating
            ? `Add New ${formData.type === 'WORK' ? 'Work Experience' : 'Education'}`
            : `Edit ${formData.type === 'WORK' ? 'Work Experience' : 'Education'}`}
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
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value as ExperienceType,
              })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          >
            <option value="WORK">Work Experience</option>
            <option value="EDUCATION">Education</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Period / Date Range
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 12/2023 - Present or 2020 - 2024"
            value={formData.date_range}
            onChange={(e) =>
              setFormData({ ...formData, date_range: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Title / Role / Degree
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Senior Frontend Developer or Bachelor of Computer Applications"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Place / Company / University
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Acme Corp - Remote or Delhi University"
            value={formData.place}
            onChange={(e) =>
              setFormData({ ...formData, place: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">
            Technologies / Core Modules (Comma Separated)
          </label>
          <input
            type="text"
            placeholder="e.g. React, TypeScript, Next.js, Redux, Webpack, Mantine"
            value={formData.technologies}
            onChange={(e) =>
              setFormData({ ...formData, technologies: e.target.value })
            }
            className="w-full px-3.5 py-2 rounded-xl bg-tertiary border border-border text-sm outline-none focus:border-primary font-mono text-xs"
          />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">
            Description & Key Achievements (Bullet points - one per line)
          </label>
          <textarea
            rows={4}
            placeholder={`e.g.\nLead frontend engineering for core AI SaaS platforms serving 50k+ active users.\nArchitected micro-frontend component systems and automated workflows.\nOptimized rendering latency and reduced bundle size by 30%.`}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-3.5 py-2.5 rounded-xl bg-tertiary border border-border text-xs outline-none focus:border-primary leading-relaxed font-mono resize-y"
          />
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
        <div className="flex items-center gap-2">
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
  );
}
