import React from 'react';
import { getProjects } from '@/lib/supabase-queries';
import ProjectsManager from './projects-manager';

export const revalidate = 0;

export default async function ProjectsAdminPage() {
  const projects = await getProjects();

  return <ProjectsManager initialProjects={projects} />;
}
