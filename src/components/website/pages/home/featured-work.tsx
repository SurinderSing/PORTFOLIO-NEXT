import React from 'react';
import Link from 'next/link';
import { Project } from '@/types/database';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '@/components/website/pages/work/porject-card';
import GimmefyImage from '@/assets/images/projects/gimmefy-ai.png';
import DialmantraImage from '@/assets/images/projects/dialmantra.png';
import AmotusImage from '@/assets/images/projects/amotus-online.png';
import DrishtiImage from '@/assets/images/projects/drishti-ias.png';

const staticImageMap: Record<string, any> = {
  'Gimmefy AI': GimmefyImage,
  'Dialmantra Dialer': DialmantraImage,
  'Amotus Online': AmotusImage,
  'Drishti IAS Website': DrishtiImage,
};

interface FeaturedWorkProps {
  projects: Project[];
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({
  projects = [],
}) => {
  // Display top 2 featured projects
  const featured = projects.slice(0, 2);

  return (
    <section className="py-10 border-b border-border/50 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative pb-2">
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            Featured Work
          </h2>
          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary rounded-full" />
        </div>
        <Link
          href="/work"
          className="group inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
        >
          <span>View All Projects</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((project, index) => {
          const isLastItem = index === featured.length - 1;
          const isOddTotal = featured.length % 2 !== 0;
          const isWide = isLastItem && isOddTotal;

          return (
            <ProjectCard
              key={project.id}
              title={project.title}
              technologies={project.technologies}
              image={
                project.image_url || staticImageMap[project.title] || undefined
              }
              link={project.link || undefined}
              description={project.description}
              previewUrl={project.preview_url}
              previewMode={project.preview_mode}
              isWide={isWide}
            />
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedWork;
