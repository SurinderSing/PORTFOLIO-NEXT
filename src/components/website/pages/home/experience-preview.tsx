import React from 'react';
import Link from 'next/link';
import { Experience } from '@/types/database';
import { ArrowRight, Briefcase } from 'lucide-react';

interface ExperiencePreviewProps {
  experiences: Experience[];
}

export const ExperiencePreview: React.FC<ExperiencePreviewProps> = ({
  experiences = [],
}) => {
  // Display top 2 work experiences on homepage
  const workList = experiences.filter((e) => e.type === 'WORK').slice(0, 2);

  return (
    <section className="py-10 border-b border-border/50 font-mono">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          Experience
        </h2>
        <Link
          href="/resume"
          className="group inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
        >
          <span>View Full Resume</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="space-y-6">
        {workList.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-border/70 bg-card p-5 sm:p-6 transition-all hover:border-primary/50"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Briefcase className="h-3.5 w-3.5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-foreground">
                  {item.title}
                </h3>
              </div>
              <span className="text-xs text-muted-foreground sm:text-right font-medium">
                {item.date_range}
              </span>
            </div>

            <p className="text-xs text-primary/90 font-semibold mb-3">
              {item.place}
            </p>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Architecting and engineering high-performance user interfaces,
              managing complex frontend state, and delivering scalable SaaS
              features.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperiencePreview;
