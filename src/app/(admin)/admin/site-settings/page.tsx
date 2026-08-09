import React from 'react';
import { getSiteSettings } from '@/lib/supabase-queries';
import SettingsForm from './settings-form';
import { Settings } from 'lucide-react';

export const revalidate = 0;

export default async function SiteSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-poppins flex items-center gap-2">
          <Settings size={20} className="text-primary" />
          <span>Site Settings</span>
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Update global portfolio attributes, headings, descriptions, and resume
          download settings.
        </p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
