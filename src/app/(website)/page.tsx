import React from 'react';
import { Metadata } from 'next';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';
import {
  getSiteSettings,
  getSocialLinks,
  getSkillsByCategory,
  getExperiences,
  getProjects,
} from '@/lib/supabase-queries';
import HeroSection from '@/components/website/pages/home/hero-section';
import SkillsGrid from '@/components/website/pages/home/skills-grid';
import ExperiencePreview from '@/components/website/pages/home/experience-preview';
import FeaturedWork from '@/components/website/pages/home/featured-work';
import ContactTeaser from '@/components/website/pages/home/contact-teaser';

export const metadata: Metadata = {
  title: 'Surinder Singh | Frontend Developer Portfolio',
  description:
    'Official portfolio of Surinder Singh, a Senior Frontend Developer specializing in React, Next.js, TypeScript, Micro-Frontends, and building high-performance scalable web systems.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Surinder Singh | Frontend Developer Portfolio',
    description:
      'Official portfolio of Surinder Singh, a Senior Frontend Developer specializing in React, Next.js, TypeScript, Micro-Frontends, and building high-performance scalable web systems.',
    url: 'https://surinder-singh-portfolio.vercel.app',
  },
};

export const revalidate = 3600;

export default async function Home() {
  const [settings, socialLinks, skillCategories, experiences, projects] =
    await Promise.all([
      getSiteSettings(),
      getSocialLinks(),
      getSkillsByCategory(),
      getExperiences('WORK'),
      getProjects(),
    ]);

  return (
    <div className="w-full">
      <FadeIn staggerChildren={0.12}>
        <FadeInItem>
          <HeroSection settings={settings} socialLinks={socialLinks} />
        </FadeInItem>

        <FadeInItem>
          <SkillsGrid categories={skillCategories} />
        </FadeInItem>

        <FadeInItem>
          <ExperiencePreview experiences={experiences} />
        </FadeInItem>

        <FadeInItem>
          <FeaturedWork projects={projects} />
        </FadeInItem>

        <FadeInItem>
          <ContactTeaser settings={settings} />
        </FadeInItem>
      </FadeIn>
    </div>
  );
}
