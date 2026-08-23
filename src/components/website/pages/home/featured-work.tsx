import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/database';
import { ArrowRight, ExternalLink, Code2 } from 'lucide-react';
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          Featured Work
        </h2>
        <Link
          href="/work"
          className="group inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
        >
          <span>View All Projects</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((project) => {
          const projectImg =
            project.image_url || staticImageMap[project.title] || null;

          return (
            <div
              key={project.id}
              className="group flex flex-col justify-between rounded-xl border border-border/70 bg-card overflow-hidden transition-all duration-200 hover:border-primary/50 hover:shadow-md"
            >
              {/* Project Image Preview / Placeholder */}
              <div className="relative aspect-[16/9] w-full bg-tertiary-2 overflow-hidden border-b border-border/40 flex items-center justify-center">
                {projectImg ? (
                  <Image
                    src={projectImg}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                    <Code2 className="h-8 w-8 text-primary/60" />
                    <span className="text-[11px]">Interactive Deployment</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-foreground mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-tertiary-2 px-2 py-0.5 text-[10px] text-muted-foreground border border-border/50"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>

                {/* Action Link */}
                {project.link && (
                  <div className="pt-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <span>Explore Live</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedWork;
