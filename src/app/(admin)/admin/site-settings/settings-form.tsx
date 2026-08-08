'use client';

import React, { useState } from 'react';
import { SiteSettings } from '@/types/database';
import { updateSiteSettingsAction } from '@/lib/admin-actions';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';

interface SettingsFormProps {
  initialSettings: SiteSettings;
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [formData, setFormData] = useState<SiteSettings>(initialSettings);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const res = await updateSiteSettingsAction(formData);
      if (res.success) {
        setStatus({
          type: 'success',
          message: res.message || 'Settings saved successfully.',
        });
      } else {
        setStatus({
          type: 'error',
          message: res.error || 'Failed to update settings.',
        });
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'An unexpected error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* Profile & Personal Info */}
      <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
        <h3 className="text-base font-semibold font-poppins text-primary">
          Owner & Identity
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-muted-foreground">
              Owner Name
            </label>
            <input
              type="text"
              name="owner_name"
              value={formData.owner_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-muted-foreground">
              Owner Job Title
            </label>
            <input
              type="text"
              name="owner_title"
              value={formData.owner_title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-muted-foreground">
            Owner Short Summary
          </label>
          <input
            type="text"
            name="owner_summary"
            value={formData.owner_summary}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-muted-foreground">
              Profile Photo URL (optional)
            </label>
            <input
              type="text"
              name="profile_photo_url"
              value={formData.profile_photo_url || ''}
              onChange={handleChange}
              placeholder="https://... or leave empty for default asset"
              className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-muted-foreground">
              Resume PDF URL / Path
            </label>
            <input
              type="text"
              name="resume_pdf_url"
              value={formData.resume_pdf_url || ''}
              onChange={handleChange}
              placeholder="/assets/Surinder-Singh-Resume.pdf"
              className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
            />
          </div>
        </div>
      </div>

      {/* Home Page Content */}
      <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
        <h3 className="text-base font-semibold font-poppins text-primary">
          Home Page Content
        </h3>
        <div>
          <label className="block text-xs font-semibold mb-1 text-muted-foreground">
            Home Heading
          </label>
          <textarea
            name="home_heading"
            rows={2}
            value={formData.home_heading}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-muted-foreground">
            Home Description Paragraph
          </label>
          <textarea
            name="home_description"
            rows={4}
            value={formData.home_description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none resize-y"
          />
        </div>
      </div>

      {/* Resume & Work Descriptions */}
      <div className="p-6 rounded-2xl bg-card border border-border space-y-4">
        <h3 className="text-base font-semibold font-poppins text-primary">
          Resume & Portfolio Descriptions
        </h3>
        <div>
          <label className="block text-xs font-semibold mb-1 text-muted-foreground">
            Resume Professional Summary
          </label>
          <textarea
            name="resume_summary"
            rows={3}
            value={formData.resume_summary}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-muted-foreground">
            Work Page Description
          </label>
          <textarea
            name="work_description"
            rows={2}
            value={formData.work_description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-muted-foreground">
            Contact Page Description
          </label>
          <textarea
            name="contact_description"
            rows={2}
            value={formData.contact_description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1 text-muted-foreground">
            Formspree Form ID
          </label>
          <input
            type="text"
            name="formspree_id"
            value={formData.formspree_id || ''}
            onChange={handleChange}
            placeholder="xrgwgbye"
            className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full main-gradient-1 text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Save size={16} />
          <span>{loading ? 'Saving Changes...' : 'Save Settings'}</span>
        </button>
      </div>
    </form>
  );
}
