import React from 'react';
import { SiteSettings, SocialLink } from '@/types/database';
import { resolveIcon } from '@/utils/icon-resolver';

interface FooterProps {
  settings?: Partial<SiteSettings>;
  socialLinks?: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ settings, socialLinks = [] }) => {
  const currentYear = new Date().getFullYear();
  const ownerName = settings?.owner_name || 'Surinder Singh';

  return (
    <footer className="w-full border-t border-border/60 bg-card/40 py-8 font-mono text-xs text-muted-foreground transition-colors mt-16">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left branding / copyright */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <span>DevEngine v1.0</span>
          <span>•</span>
          <span>
            © {currentYear} {ownerName}. All rights reserved.
          </span>
        </div>

        {/* Right social link buttons */}
        {socialLinks.length > 0 && (
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
                aria-label={link.name}
              >
                {resolveIcon(link.icon_name, {
                  size: 14,
                  className: 'text-muted-foreground hover:text-primary',
                })}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
