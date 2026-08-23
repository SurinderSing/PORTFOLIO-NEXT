import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteSettings, SocialLink } from '@/types/database';
import { Download, Code2, Mail, MapPin } from 'lucide-react';
import ProfileImg from '@/assets/images/profile-photos/surinder_profile_photo.png';

interface HeroSectionProps {
  settings: SiteSettings;
  socialLinks?: SocialLink[];
}

/**
 * Dynamically highlights key role titles or keywords in green within the home heading.
 */
function renderHeading(heading: string, ownerTitle?: string) {
  if (!heading) return null;

  // Highlights list (priority to user's configured owner_title)
  const highlights = [
    ownerTitle,
    'Frontend Engineer',
    'Frontend Developer',
    'Full Stack Developer',
    'Full-Stack Developer',
    'Software Engineer',
    'React Developer',
    'Next.js Developer',
    'Web Developer',
  ].filter(Boolean) as string[];

  // Find if any highlight term matches
  const matchedTerm = highlights.find((term) =>
    heading.toLowerCase().includes(term.toLowerCase())
  );

  if (matchedTerm) {
    const escaped = matchedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = heading.split(regex);

    return parts.map((part, index) => {
      if (part.toLowerCase() === matchedTerm.toLowerCase()) {
        return (
          <span key={index} className="text-primary font-bold">
            {part}
          </span>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  }

  return heading;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  socialLinks = [],
}) => {
  const githubLink =
    socialLinks.find((s) => s.name.toLowerCase().includes('git'))?.url ||
    'https://github.com/SurinderSing';
  const resumeUrl =
    settings.resume_pdf_url || '/assets/Surinder-Singh-Resume.pdf';

  const headingContent = settings.home_heading ? (
    renderHeading(settings.home_heading, settings.owner_title)
  ) : (
    <>
      Hi, I&apos;m {settings.owner_name.split(' ')[0] || 'Surinder'}. <br />A{' '}
      <span className="text-primary font-bold">
        {settings.owner_title || 'Frontend Engineer'}
      </span>{' '}
      focused on building scalable web applications.
    </>
  );

  const descriptionContent =
    settings.home_description ||
    settings.owner_summary ||
    'Located in Delhi, India. Specializing in React, Next.js, and modern TypeScript ecosystems.';

  return (
    <section className="relative w-full py-8 md:py-12 border-b border-border/50">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left text column */}
        <div className="flex-1 space-y-5 text-left">
          {/* Terminal Command Badge */}
          <div className="inline-flex items-center gap-2 rounded-md bg-tertiary-2 px-2.5 py-1 text-xs font-mono text-muted-foreground border border-border/60">
            <span className="text-primary font-bold">$</span>
            <span>whoami</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono tracking-tight text-foreground leading-[1.2]">
            {headingContent}
          </h1>

          {/* Location & Summary Description */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground font-mono leading-relaxed max-w-2xl">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
            <span>{descriptionContent}</span>
          </div>

          {/* Action Buttons & Social Icons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-mono font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
            >
              <Download className="h-4 w-4" />
              <span>Download Resume</span>
            </a>

            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-tertiary-2 transition-colors"
              title="GitHub"
              aria-label="GitHub Profile"
            >
              <Code2 className="h-4 w-4" />
            </a>

            <Link
              href="/contact"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-tertiary-2 transition-colors"
              title="Contact Me"
              aria-label="Contact Page"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Right profile photo column */}
        <div className="relative shrink-0">
          <div className="relative h-48 w-48 sm:h-56 sm:w-56 rounded-2xl overflow-hidden border-2 border-border bg-card shadow-md">
            <Image
              src={settings.profile_photo_url || ProfileImg}
              alt={settings.owner_name}
              fill
              sizes="(max-width: 768px) 192px, 224px"
              priority
              className="object-cover"
            />
          </div>
          {/* Status badge pill */}
          <div className="absolute -bottom-2.5 right-3 flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-[10px] font-mono shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-muted-foreground">Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
