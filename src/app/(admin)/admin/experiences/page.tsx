import React from 'react';
import { getExperiences } from '@/lib/supabase-queries';
import ExperiencesManager from './experiences-manager';

export const revalidate = 0;

export default async function ExperiencesAdminPage() {
  const experiences = await getExperiences();

  return <ExperiencesManager initialExperiences={experiences} />;
}
