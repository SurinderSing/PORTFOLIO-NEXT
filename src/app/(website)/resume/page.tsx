import React from 'react';
import { Metadata } from 'next';
import PageProvider from '@/components/website/pages/page-provider';
import SubContainer from '@/components/website/pages/resume/sub-container';
import { Brain, NotebookPen } from 'lucide-react';
import DetailCard from '@/components/website/pages/resume/detail-card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import {
  getSiteSettings,
  getExperiences,
  getSkillsByCategory,
} from '@/lib/supabase-queries';

export const metadata: Metadata = {
  title: 'Resume | Frontend Developer Experience',
  description:
    'Download my resume and explore my 4+ years of experience in frontend development, working with React, Next.js, and AI tools.',
  alternates: {
    canonical: '/resume',
  },
};

export const revalidate = 3600;

export default async function Resume() {
  const [settings, educationExperiences, workExperiences, skillCategories] =
    await Promise.all([
      getSiteSettings(),
      getExperiences('EDUCATION'),
      getExperiences('WORK'),
      getSkillsByCategory(),
    ]);

  const educationData = educationExperiences.map((item) => ({
    id: item.id,
    date: item.date_range,
    title: item.title,
    place: item.place,
  }));

  const workExperienceData = workExperiences.map((item) => ({
    id: item.id,
    date: item.date_range,
    title: item.title,
    place: item.place,
  }));

  return (
    <main className="w-full">
      <PageProvider title="Resume">
        <FadeIn staggerChildren={0.15}>
          {/* Professional Summary */}
          <FadeInItem className="mb-6">
            <h3 className="mb-3">Professional Summary</h3>
            <p className="para-2 text-muted whitespace-pre-line">
              {settings.resume_summary}
            </p>
          </FadeInItem>

          {/* Education & Experience Timeline */}
          <ScrollReveal
            yOffset={20}
            delay={0.15}
            className="grid grid-cols-2 gap-4 sm:grid-cols-1 mb-8"
          >
            <SubContainer
              title="Education"
              icon={<Brain size={20} className="text-secondary" />}
            >
              <div className="grid grid-cols-1 gap-4">
                {educationData.map((education) => (
                  <DetailCard
                    key={education.id}
                    date={education.date}
                    title={education.title}
                    place={education.place}
                  />
                ))}
              </div>
            </SubContainer>
            <SubContainer
              title="Experience"
              icon={<NotebookPen size={20} className="text-primary" />}
            >
              <div className="grid grid-cols-1 gap-4">
                {workExperienceData.map((workExperience) => (
                  <DetailCard
                    key={workExperience.id}
                    date={workExperience.date}
                    title={workExperience.title}
                    place={workExperience.place}
                  />
                ))}
              </div>
            </SubContainer>
          </ScrollReveal>

          {/* Dynamic Categorized Skills Grid */}
          <div className="space-y-8">
            {/* Render 2-column rows for skill categories */}
            {Array.from(
              { length: Math.ceil(skillCategories.length / 2) },
              (_, rowIndex) => {
                const pair = skillCategories.slice(
                  rowIndex * 2,
                  rowIndex * 2 + 2
                );
                return (
                  <ScrollReveal
                    key={rowIndex}
                    yOffset={20}
                    className={
                      pair.length === 1
                        ? 'grid grid-cols-1 gap-4 mb-8'
                        : 'grid grid-cols-2 gap-4 sm:grid-cols-1 mb-8'
                    }
                  >
                    {pair.map((category) => (
                      <SubContainer key={category.id} title={category.name}>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <Badge
                              key={skill.id}
                              variant="outline"
                              className="text-xs"
                            >
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </SubContainer>
                    ))}
                  </ScrollReveal>
                );
              }
            )}
          </div>
        </FadeIn>
      </PageProvider>
    </main>
  );
}
