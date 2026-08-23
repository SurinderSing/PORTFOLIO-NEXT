import React from 'react';
import { Briefcase, History, GraduationCap, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimelineItem {
  id: number | string;
  company: string;
  role: string;
  dateRange: string;
  bullets: string[];
  technologies: string[];
  type?: 'WORK' | 'EDUCATION';
  isCurrent?: boolean;
}

interface TimelineExperienceProps {
  title: string;
  items: TimelineItem[];
  type?: 'WORK' | 'EDUCATION';
}

export const TimelineExperience: React.FC<TimelineExperienceProps> = ({
  title,
  items,
  type = 'WORK',
}) => {
  return (
    <div className="w-full font-mono mb-16">
      {/* Section Header with Green Underline and Right Divider */}
      <div className="flex items-center gap-4 mb-10">
        <div className="relative pb-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            {title}
          </h2>
          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary rounded-full" />
        </div>
        <div className="flex-1 h-[1px] bg-border/70" />
      </div>

      {/* Timeline Wrapper */}
      <div className="relative">
        {/* Central Vertical Timeline Rule (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-border/80" />

        {/* Left Vertical Timeline Rule (Mobile) */}
        <div className="block md:hidden absolute left-5 top-4 bottom-4 w-[2px] bg-border/80" />

        {/* Timeline Items List */}
        <div className="space-y-8 md:space-y-12">
          {items.map((item, index) => {
            // Alternating sides on desktop: Even index = Right, Odd index = Left (matching screenshot)
            const isRightSide = index % 2 === 0;

            const isCurrent =
              item.isCurrent ||
              item.dateRange.toLowerCase().includes('present');

            return (
              <div
                key={item.id}
                className={cn(
                  'relative flex flex-col md:flex-row items-start',
                  isRightSide ? 'md:flex-row-reverse' : ''
                )}
              >
                {/* Timeline Node Icon */}
                <div
                  className={cn(
                    'absolute z-10 flex items-center justify-center rounded-lg bg-card shadow-xs transition-colors',
                    // Desktop positioning: centered on the middle line
                    'hidden md:flex left-1/2 -translate-x-1/2 top-6',
                    // Icon node size & styling
                    item.type === 'EDUCATION'
                      ? 'w-8 h-8 border border-border text-muted-foreground'
                      : isCurrent
                        ? 'w-8 h-8 border-2 border-primary text-primary'
                        : 'w-8 h-8 border border-border text-muted-foreground'
                  )}
                >
                  {item.type === 'EDUCATION' ? (
                    <GraduationCap className="h-4 w-4" />
                  ) : isCurrent ? (
                    <Briefcase className="h-4 w-4" />
                  ) : (
                    <History className="h-4 w-4" />
                  )}
                </div>

                {/* Mobile Icon Node */}
                <div
                  className={cn(
                    'md:hidden absolute left-5 -translate-x-1/2 top-6 z-10 flex items-center justify-center rounded-lg bg-card shadow-xs',
                    item.type === 'EDUCATION'
                      ? 'w-7 h-7 border border-border text-muted-foreground'
                      : isCurrent
                        ? 'w-7 h-7 border-2 border-primary text-primary'
                        : 'w-7 h-7 border border-border text-muted-foreground'
                  )}
                >
                  {item.type === 'EDUCATION' ? (
                    <GraduationCap className="h-3.5 w-3.5" />
                  ) : isCurrent ? (
                    <Briefcase className="h-3.5 w-3.5" />
                  ) : (
                    <History className="h-3.5 w-3.5" />
                  )}
                </div>

                {/* Card Container (takes ~45% width on desktop to leave room for center line) */}
                <div
                  className={cn(
                    'w-full md:w-[46%] pl-12 md:pl-0',
                    isRightSide ? 'md:ml-auto' : 'md:mr-auto'
                  )}
                >
                  <div
                    className={cn(
                      'relative rounded-xl border border-border/80 bg-card p-5 sm:p-6 shadow-xs hover:border-primary/50 transition-all duration-200'
                    )}
                  >
                    {/* Header Row: Company/Place & Date Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-foreground">
                        {item.company}
                      </h3>
                      <span className="inline-flex items-center shrink-0 whitespace-nowrap self-start sm:self-auto rounded bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary border border-primary/20">
                        {item.dateRange}
                      </span>
                    </div>

                    {/* Subtitle: Role Title */}
                    <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-4">
                      {item.role}
                    </p>

                    {/* Bullet Points */}
                    {item.bullets.length > 0 && (
                      <ul className="space-y-2.5 mb-5 text-xs text-foreground/90 leading-relaxed">
                        {item.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            {isCurrent ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                            ) : (
                              <span className="text-primary font-bold shrink-0 mt-0.5">
                                ›
                              </span>
                            )}
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technology Badges */}
                    {item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                        {item.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded bg-tertiary-2 px-2 py-0.5 text-[10px] font-mono text-muted-foreground border border-border/50"
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
    </div>
  );
};

export default TimelineExperience;
