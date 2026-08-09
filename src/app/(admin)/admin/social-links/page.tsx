import React from 'react';
import { getSocialLinks } from '@/lib/supabase-queries';
import SocialLinksManager from './social-links-manager';

export const revalidate = 0;

export default async function SocialLinksPage() {
  const links = await getSocialLinks();

  return <SocialLinksManager initialLinks={links} />;
}
