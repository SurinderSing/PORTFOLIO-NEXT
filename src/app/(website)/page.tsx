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
  title: 'Surinder Singh | React & Next.js Frontend Developer',
  description:
    'Portfolio of Surinder Singh, a Frontend Engineer building high-performance SaaS platforms, AI-powered tools, and real-time systems using React, Next.js, and TypeScript.',
  alternates: {
    canonical: '/',
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
    <div className="w-full max-w-4xl mx-auto">
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
