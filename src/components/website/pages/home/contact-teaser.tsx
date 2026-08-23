import React from 'react';
import Link from 'next/link';
import { SiteSettings } from '@/types/database';
import { Mail, ArrowRight, Terminal } from 'lucide-react';

interface ContactTeaserProps {
  settings: SiteSettings;
}

export const ContactTeaser: React.FC<ContactTeaserProps> = ({ settings }) => {
  return (
    <section className="py-12 font-mono">
      <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-10 text-center space-y-5">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto shadow-xs">
          <Terminal className="h-5 w-5" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            Ready to build something extraordinary?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {settings.contact_description ||
              'Open for opportunities in frontend architecture, full-stack scaling, and high-performance product development.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-mono font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
          >
            <Mail className="h-4 w-4" />
            <span>Establish Connection</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactTeaser;
