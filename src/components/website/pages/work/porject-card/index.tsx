import Image, { StaticImageData } from 'next/image';
import React from 'react';
import FailedImage from '@/assets/images/failed-image.jpg';
import { ScrollRevealItem } from '@/components/animations/scroll-reveal';
import LivePreview from '@/components/website/pages/work/live-preview';
import { PreviewMode } from '@/types/database';
import { ExternalLink, Code2, LayoutGrid } from 'lucide-react';

interface ProjectCardProps {
  image?: StaticImageData | string;
  title: string;
  technologies: string[];
  link?: string;
  githubUrl?: string | null;
  description?: string;
  previewUrl?: string | null;
  previewMode?: PreviewMode;
  isWide?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  technologies,
  image = FailedImage,
  link,
  githubUrl,
  description,
  previewUrl,
  previewMode = 'image',
  isWide = false,
}) => {
  const effectivePreviewUrl =
    previewUrl || (link && link !== '#' ? link : null);
  const showIframe = previewMode === 'iframe' && effectivePreviewUrl;

  // Render Image Preview Frame
  const previewElement = (
    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-border/50 bg-tertiary-2 flex items-center justify-center">
      {showIframe ? (
        <LivePreview
          previewUrl={effectivePreviewUrl}
          title={title}
          fallbackImage={image}
        />
      ) : image ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes={
            isWide
              ? '(max-width: 768px) 100vw, 50vw'
              : '(max-width: 768px) 100vw, 50vw'
          }
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-muted-foreground gap-2 p-6">
          <LayoutGrid className="h-9 w-9 text-primary/70" />
        </div>
      )}
    </div>
  );

  // If Wide card (horizontal split on desktop)
  if (isWide) {
    return (
      <ScrollRevealItem className="w-full md:col-span-2">
        <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-6 font-mono shadow-xs hover:border-primary/50 transition-all duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left Image Preview */}
            <div>{previewElement}</div>

            {/* Right Meta & Actions */}
            <div className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                  {title}
                </h3>
                {description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                )}
              </div>

              {/* Green Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary border border-primary/20"
                  >
                    #{tech}
                  </span>
                ))}
              </div>

              {/* Divider & Action Buttons */}
              <div className="pt-3 border-t border-border/60 flex flex-wrap items-center gap-2.5">
                {link && link !== '#' && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}

                {githubUrl && githubUrl !== '#' && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-tertiary-2 transition-colors"
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    <span>View Source</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealItem>
    );
  }

  // Standard 2-column card
  return (
    <ScrollRevealItem className="w-full">
      <div className="flex flex-col justify-between h-full rounded-xl border border-border/80 bg-card p-5 sm:p-6 font-mono shadow-xs hover:border-primary/50 transition-all duration-200 space-y-4">
        {/* Preview Frame with padding inside card */}
        <div>{previewElement}</div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {description}
              </p>
            )}
          </div>

          {/* Green Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary border border-primary/20"
              >
                #{tech}
              </span>
            ))}
          </div>

          {/* Divider & Action Buttons */}
          <div className="pt-3 border-t border-border/60 flex flex-wrap items-center gap-2">
            {link && link !== '#' && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live Demo</span>
              </a>
            )}

            {githubUrl && githubUrl !== '#' && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-tertiary-2 transition-colors"
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>View Source</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </ScrollRevealItem>
  );
};

export default ProjectCard;
