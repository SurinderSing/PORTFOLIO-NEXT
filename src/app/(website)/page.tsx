import React from 'react';
import { Metadata } from 'next';
import PageProvider from '@/components/website/pages/page-provider';
import DetailCard from '@/components/website/pages/home/detail-card';
import Highlight from '@/components/ui/highlight';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { AnimatedDivider } from '@/components/animations/animated-divider';
import { getSiteSettings, getAboutCards } from '@/lib/supabase-queries';
import { resolveIcon } from '@/utils/icon-resolver';

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
  const [settings, aboutCards] = await Promise.all([
    getSiteSettings(),
    getAboutCards(),
  ]);

  const cardsData = aboutCards.map((card) => ({
    id: card.id,
    title: card.title,
    description: card.description,
    icon: resolveIcon(card.icon_name, {
      size: 24,
      className: card.bg_color_class.includes('tertiary')
        ? 'text-secondary'
        : 'text-primary',
    }),
    bgColor: card.bg_color_class,
  }));

  return (
    <main className="w-full">
      <PageProvider title="About Me">
        <FadeIn staggerChildren={0.15}>
          {/* About Summary */}
          <FadeInItem className="mb-3">
            <div className="space-y-4">
              <h3 className="whitespace-pre-line">{settings.home_heading}</h3>

              <p className="para-2 text-foreground/80 leading-relaxed">
                {settings.home_description.includes(
                  'performance, scalability'
                ) ? (
                  <>
                    I build modern web applications where{' '}
                    <Highlight>
                      performance, scalability, and user experience
                    </Highlight>{' '}
                    matter. My work focuses on developing{' '}
                    <Highlight>
                      SaaS platforms, AI-powered tools, and real-time systems
                    </Highlight>{' '}
                    using <Highlight>React, Next.js, and TypeScript</Highlight>.
                    I enjoy solving complex frontend problems such as managing
                    large application state, designing reusable component
                    architectures, and building interfaces that support
                    high-interaction workflows. Over time, I’ve worked on
                    products ranging from AI-driven editing tools and automation
                    platforms to high-traffic educational websites and real-time
                    CRM systems. I’m particularly interested in{' '}
                    <Highlight>frontend architecture</Highlight> and{' '}
                    <Highlight>performance optimization</Highlight>, and
                    building systems that remain reliable as products scale.
                  </>
                ) : (
                  settings.home_description
                )}
              </p>
            </div>
          </FadeInItem>

          <AnimatedDivider className="my-2" delay={0.15} />

          {/* What I do! */}
          <ScrollReveal staggerChildren={0.1} yOffset={20} delay={0.25}>
            <h2 className="mb-3">What I do!</h2>
            <div className="flex flex-wrap gap-4">
              {cardsData.map((skill) => (
                <DetailCard key={skill.id} skill={skill} />
              ))}
            </div>
          </ScrollReveal>
        </FadeIn>
      </PageProvider>
    </main>
  );
}
