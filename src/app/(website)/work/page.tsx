import React from 'react';
import { Metadata } from 'next';
import ProjectCard from '@/components/website/pages/work/porject-card';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { getSiteSettings, getProjects } from '@/lib/supabase-queries';
import GimmefyImage from '@/assets/images/projects/gimmefy-ai.png';
import DialmantraImage from '@/assets/images/projects/dialmantra.png';
import AmotusImage from '@/assets/images/projects/amotus-online.png';
import DrishtiImage from '@/assets/images/projects/drishti-ias.png';
import { Code2, Github } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects | Systems & Architecture | Surinder Singh',
  description:
    'Explore a collection of technical deployments and scalable frontend systems built using React, Next.js, and TypeScript.',
  alternates: {
    canonical: '/work',
  },
};

const getProjectFallbackImage = (title: string) => {
  const normalized = title.toLowerCase();
  if (normalized.includes('gimmefy')) return GimmefyImage;
  if (normalized.includes('dialmantra')) return DialmantraImage;
  if (normalized.includes('amotus')) return AmotusImage;
  if (normalized.includes('drishti')) return DrishtiImage;
  return undefined;
};

export const revalidate = 3600;

export default async function WorkPage() {
  const [settings, dbProjects] = await Promise.all([
    getSiteSettings(),
    getProjects(),
  ]);

  const projectsData = dbProjects.map((proj) => ({
    id: proj.id,
    title: proj.title,
    description: proj.description,
    technologies: proj.technologies,
    link: proj.link,
    githubUrl: proj.github_url,
    image: proj.image_url || getProjectFallbackImage(proj.title) || undefined,
    previewUrl: proj.preview_url,
    previewMode: proj.preview_mode,
  }));

  return (
    <div className="w-full font-mono py-4">
      <FadeIn staggerChildren={0.15}>
        {/* Page Header with Terminal Breadcrumb */}
        <FadeInItem className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-md bg-tertiary-2 px-2.5 py-1 text-xs text-muted-foreground border border-border/60">
            <span className="text-primary font-bold">$</span>
            <span>ls -la ./projects</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Systems & Architecture
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {settings.work_description ||
              'A gallery of technical deployments. These projects represent deep structural work in frontend architecture, data visualization, and specialized UI engineering.'}
          </p>
        </FadeInItem>

        {/* Projects Grid */}
        <ScrollReveal
          staggerChildren={0.1}
          yOffset={20}
          delay={0.15}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {projectsData.map((project, index) => {
            const isLastItem = index === projectsData.length - 1;
            const isOddTotal = projectsData.length % 2 !== 0;
            const isWide = isLastItem && isOddTotal;

            return (
              <ProjectCard
                key={project.id}
                title={project.title}
                technologies={project.technologies}
                image={project.image}
                link={project.link || undefined}
                githubUrl={project.githubUrl}
                description={project.description}
                previewUrl={project.previewUrl}
                previewMode={project.previewMode}
                isWide={isWide}
              />
            );
          })}
        </ScrollReveal>

        {/* GitHub Section Callout */}
        <FadeInItem>
          <div className="rounded-xl border border-border/80 bg-card p-6 text-center space-y-3">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto">
              <Github className="h-5 w-5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-foreground">
              Looking for more codebases & open-source tools?
            </h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Explore my GitHub repository to discover more repositories,
              architectures, and experiments.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/SurinderSing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Visit GitHub Profile</span>
              </a>
            </div>
          </div>
        </FadeInItem>
      </FadeIn>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: projectsData.map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'CreativeWork',
                name: project.title,
                description: project.description,
                url: project.link,
                creator: {
                  '@type': 'Person',
                  name: settings.owner_name,
                },
              },
            })),
          }),
        }}
      />
    </div>
  );
}
