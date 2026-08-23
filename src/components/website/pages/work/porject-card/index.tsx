import Image, { StaticImageData } from 'next/image';
import React from 'react';
import FailedImage from '@/assets/images/failed-image.jpg';
import { ScrollRevealItem } from '@/components/animations/scroll-reveal';
import LivePreview from '@/components/website/pages/work/live-preview';
import { PreviewMode } from '@/types/database';
import { ExternalLink, Code2, Layers } from 'lucide-react';

interface ProjectCardProps {
  image?: StaticImageData | string;
  title: string;
  technologies: string[];
  link?: string;
  description?: string;
  previewUrl?: string | null;
  previewMode?: PreviewMode;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  technologies,
  image = FailedImage,
  link,
  description,
  previewUrl,
  previewMode = 'image',
}) => {
  const effectivePreviewUrl =
    previewUrl || (link && link !== '#' ? link : null);
  const showIframe = previewMode === 'iframe' && effectivePreviewUrl;

  return (
    <ScrollRevealItem className="w-full">
      <div className="flex flex-col rounded-xl border border-border/80 bg-card overflow-hidden transition-all duration-200 hover:border-primary/50 hover:shadow-md font-mono">
        {/* Preview Frame */}
        <div className="relative aspect-[16/9] w-full bg-tertiary-2 overflow-hidden border-b border-border/50 flex items-center justify-center">
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
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
              <Layers className="h-8 w-8 text-primary/60" />
              <span className="text-xs">Deployment Preview</span>
            </div>
          )}
        </div>

        {/* Info & Meta */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                className="rounded bg-tertiary-2 px-2 py-0.5 text-[10px] text-muted-foreground border border-border/50"
              >
                #{tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40">
            {link && link !== '#' && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="h-3 w-3" />
                <span>Live Demo</span>
              </a>
            )}

            <a
              href="https://github.com/SurinderSing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-tertiary-2 transition-colors"
            >
              <Code2 className="h-3 w-3" />
              <span>View Source</span>
            </a>
          </div>
        </div>
      </div>
    </ScrollRevealItem>
  );
};

export default ProjectCard;
