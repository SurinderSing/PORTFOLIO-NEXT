import React from 'react';
import { getAboutCards } from '@/lib/supabase-queries';
import AboutCardsManager from './about-cards-manager';

export const revalidate = 0;

export default async function AboutCardsPage() {
  const cards = await getAboutCards();

  return <AboutCardsManager initialCards={cards} />;
}
