import React from 'react';
import { getSkillsByCategory } from '@/lib/supabase-queries';
import SkillsManager from './skills-manager';

export const revalidate = 0;

export default async function SkillsAdminPage() {
  const categories = await getSkillsByCategory();

  return <SkillsManager initialCategories={categories} />;
}
