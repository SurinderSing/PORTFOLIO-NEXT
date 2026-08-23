import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import SubContainer from '@/components/website/pages/resume/sub-container';
import TimelineExperience from '@/components/website/pages/resume/timeline-experience';
import { Badge } from '@/components/ui/badge';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';
import {
  getSiteSettings,
  getExperiences,
  getSkillsByCategory,
} from '@/lib/supabase-queries';
import { formatExperiencesToTimeline } from '@/lib/experience-formatter';
import { Download, Code2, Sparkles } from 'lucide-react';
import ProfileImg from '@/assets/images/profile-photos/surinder_profile_photo.png';

export const metadata: Metadata = {
  title: 'Resume | Frontend Developer Experience | Surinder Singh',
  description:
    'Download my resume and explore my 4+ years of experience in frontend development, working with React, Next.js, and AI tools.',
  alternates: {
    canonical: '/resume',
  },
};

export const revalidate = 3600;

export default async function ResumePage() {
  const [settings, educationExperiences, workExperiences, skillCategories] =
    await Promise.all([
      getSiteSettings(),
      getExperiences('EDUCATION'),
      getExperiences('WORK'),
      getSkillsByCategory(),
    ]);

  const resumeUrl =
    settings.resume_pdf_url || '/assets/Surinder-Singh-Resume.pdf';

  const workTimelineItems = formatExperiencesToTimeline(
    workExperiences,
    'WORK'
  );
  const educationTimelineItems = formatExperiencesToTimeline(
    educationExperiences,
    'EDUCATION'
  );

  return (
    <div className="w-full font-mono py-4">
      <FadeIn staggerChildren={0.15}>
        {/* Terminal Breadcrumb */}
        <FadeInItem className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-md bg-tertiary-2 px-2.5 py-1 text-xs text-muted-foreground border border-border/60">
            <span className="text-primary font-bold">$</span>
            <span>cat resume.md</span>
          </div>
        </FadeInItem>

        {/* Profile Card Header */}
        <FadeInItem className="mb-12">
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
            <div className="space-y-4 text-center sm:text-left flex-1">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {settings.owner_name}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-primary mt-1">
                  {settings.owner_title}
                </p>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                {settings.resume_summary}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </a>

                <a
                  href="https://github.com/SurinderSing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-medium text-foreground hover:bg-tertiary-2 transition-colors"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>View Source</span>
                </a>
              </div>
            </div>

            <div className="relative h-48 w-48 sm:h-56 sm:w-56 lg:h-60 lg:w-60 shrink-0 rounded-2xl overflow-hidden border-2 border-border shadow-md">
              <Image
                src={settings.profile_photo_url || ProfileImg}
                alt={settings.owner_name}
                fill
                sizes="(max-width: 768px) 192px, 240px"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </FadeInItem>

        {/* Technical Skills Matrix */}
        <FadeInItem className="mb-14 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              Technical Proficiencies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillCategories.map((category) => (
              <SubContainer key={category.id} title={category.name}>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="outline"
                      className="text-[11px] font-mono border-border bg-background/80 hover:border-primary/50 transition-colors"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </SubContainer>
            ))}
          </div>
        </FadeInItem>

        {/* Work Experience Timeline */}
        <FadeInItem>
          <TimelineExperience
            title="Experience"
            items={workTimelineItems}
            type="WORK"
          />
        </FadeInItem>

        {/* Education Timeline */}
        <FadeInItem>
          <TimelineExperience
            title="Education"
            items={educationTimelineItems}
            type="EDUCATION"
          />
        </FadeInItem>
      </FadeIn>
    </div>
  );
}
