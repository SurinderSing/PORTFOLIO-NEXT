import React from 'react';
import { Metadata } from 'next';
import PageProvider from '@/components/website/pages/page-provider';
import ProjectCard from '@/components/website/pages/work/porject-card';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { getSiteSettings, getProjects } from '@/lib/supabase-queries';
import GimmefyImage from '@/assets/images/projects/gimmefy-ai.png';
import DialmantraImage from '@/assets/images/projects/dialmantra.png';
import AmotusImage from '@/assets/images/projects/amotus-online.png';
import DrishtiImage from '@/assets/images/projects/drishti-ias.png';

export const metadata: Metadata = {
  title: 'Projects | React & Next.js Development Work | Surinder Singh',
  description:
    'Explore a collection of my recent projects, including AI-enhanced marketing platforms, remote screen sharing tools, and more.',
  alternates: {
    canonical: '/work',
  },
};

const staticImageMap: Record<string, any> = {
  'Gimmefy AI': GimmefyImage,
  'Dialmantra Dialer': DialmantraImage,
  'Amotus Online': AmotusImage,
  'Drishti IAS Website': DrishtiImage,
};

export const revalidate = 3600;

export default async function Work() {
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
    image: proj.image_url || staticImageMap[proj.title] || undefined,
    previewUrl: proj.preview_url,
    previewMode: proj.preview_mode,
  }));

  return (
    <main className="w-full">
      <PageProvider title="Portfolio">
        <FadeIn>
          <FadeInItem className="mb-4">
            <p className="para-2 text-muted whitespace-pre-line">
              {settings.work_description}
            </p>
          </FadeInItem>
          <ScrollReveal
            staggerChildren={0.1}
            yOffset={20}
            delay={0.15}
            className="flex flex-wrap gap-4 justify-evenly mb-6"
          >
            {projectsData.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                technologies={project.technologies}
                image={project.image}
                link={project.link || undefined}
                description={project.description}
                previewUrl={project.previewUrl}
                previewMode={project.previewMode}
              />
            ))}
          </ScrollReveal>

          {/* GitHub Section */}
          <ScrollReveal
            yOffset={20}
            className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                Want to see more projects?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Explore my GitHub profile to discover more projects,
                contributions, and code samples.
              </p>
              <a
                href="https://github.com/SurinderSing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                Visit My GitHub Profile
              </a>
            </div>
          </ScrollReveal>
        </FadeIn>

        {/* CreativeWork Structured Data for Projects */}
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
      </PageProvider>
    </main>
  );
}
