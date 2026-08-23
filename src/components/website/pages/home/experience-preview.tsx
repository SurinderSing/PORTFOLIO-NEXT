import React from 'react';
import Link from 'next/link';
import { Experience } from '@/types/database';
import { ArrowRight, Briefcase, History, CheckCircle2 } from 'lucide-react';
import { formatExperiencesToTimeline } from '@/lib/experience-formatter';
import { cn } from '@/lib/utils';

interface ExperiencePreviewProps {
  experiences: Experience[];
}

export const ExperiencePreview: React.FC<ExperiencePreviewProps> = ({
  experiences = [],
}) => {
  const timelineItems = formatExperiencesToTimeline(
    experiences.filter((e) => e.type === 'WORK').slice(0, 2),
    'WORK'
  );

  return (
    <section className="py-10 border-b border-border/50 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="relative pb-2">
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            Experience
          </h2>
          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary rounded-full" />
        </div>
        <Link
          href="/resume"
          className="group inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold"
        >
          <span>View Full Resume</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Timeline List */}
      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-border/80" />
        <div className="block md:hidden absolute left-5 top-4 bottom-4 w-[2px] bg-border/80" />

        <div className="space-y-8 md:space-y-10">
          {timelineItems.map((item, index) => {
            const isRightSide = index % 2 === 0;
            const isCurrent = item.isCurrent;

            return (
              <div
                key={item.id}
                className={cn(
                  'relative flex flex-col md:flex-row items-start',
                  isRightSide ? 'md:flex-row-reverse' : ''
                )}
              >
                {/* Desktop Node */}
                <div
                  className={cn(
                    'hidden md:flex absolute left-1/2 -translate-x-1/2 top-6 z-10 items-center justify-center rounded-lg bg-card shadow-xs w-8 h-8',
                    isCurrent
                      ? 'border-2 border-primary text-primary'
                      : 'border border-border text-muted-foreground'
                  )}
                >
                  {isCurrent ? (
                    <Briefcase className="h-4 w-4" />
                  ) : (
                    <History className="h-4 w-4" />
                  )}
                </div>

                {/* Mobile Node */}
                <div
                  className={cn(
                    'md:hidden absolute left-5 -translate-x-1/2 top-6 z-10 flex items-center justify-center rounded-lg bg-card shadow-xs w-7 h-7',
                    isCurrent
                      ? 'border-2 border-primary text-primary'
                      : 'border border-border text-muted-foreground'
                  )}
                >
                  {isCurrent ? (
                    <Briefcase className="h-3.5 w-3.5" />
                  ) : (
                    <History className="h-3.5 w-3.5" />
                  )}
                </div>

                {/* Card */}
                <div
                  className={cn(
                    'w-full md:w-[46%] pl-12 md:pl-0',
                    isRightSide ? 'md:ml-auto' : 'md:mr-auto'
                  )}
                >
                  <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs hover:border-primary/50 transition-all duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                      <h3 className="text-base font-bold text-foreground">
                        {item.company}
                      </h3>
                      <span className="inline-flex items-center self-start sm:self-auto rounded bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary border border-primary/20">
                        {item.dateRange}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-muted-foreground mb-3">
                      {item.role}
                    </p>

                    {item.bullets.length > 0 && (
                      <ul className="space-y-2 mb-4 text-xs text-foreground/90 leading-relaxed">
                        {item.bullets.slice(0, 2).map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                        {item.technologies.slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded bg-tertiary-2 px-2 py-0.5 text-[10px] text-muted-foreground border border-border/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperiencePreview;
