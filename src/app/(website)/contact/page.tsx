import React from 'react';
import { Metadata } from 'next';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';
import TerminalContactForm from '@/components/website/pages/contact/terminal-contact-form';
import {
  getSiteSettings,
  getContacts,
  getSocialLinks,
} from '@/lib/supabase-queries';
import {
  Activity,
  Globe,
  MapPin,
  Radio,
  Mail,
  Github,
  Linkedin,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Hire | Surinder Singh Portfolio',
  description:
    'Get in touch with Surinder Singh for frontend engineering opportunities, project collaborations, or technical consultation in React, Next.js, and modern web architectures.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact & Hire | Surinder Singh Portfolio',
    description:
      'Get in touch with Surinder Singh for frontend engineering opportunities, project collaborations, or technical consultation in React, Next.js, and modern web architectures.',
    url: 'https://surinder-singh-portfolio.vercel.app/contact',
  },
};

export const revalidate = 3600;

export default async function ContactPage() {
  const [settings, dbContacts, socialLinks] = await Promise.all([
    getSiteSettings(),
    getContacts(),
    getSocialLinks(),
  ]);

  const emailContact =
    dbContacts.find((c) => c.type === 'email')?.detail ||
    'ssurindersingh100@gmail.com';
  const locationContact =
    dbContacts.find((c) => c.type === 'location')?.detail || 'Delhi, India';
  const githubLink =
    socialLinks.find((s) => s.name.toLowerCase().includes('git'))?.url ||
    'https://github.com/SurinderSing';
  const linkedinLink =
    socialLinks.find((s) => s.name.toLowerCase().includes('linkedin'))?.url ||
    'https://www.linkedin.com/in/surinder-singh-dev/';

  return (
    <div className="w-full font-mono py-4">
      <FadeIn staggerChildren={0.15}>
        {/* Terminal Breadcrumb */}
        <FadeInItem className="mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-md bg-tertiary-2 px-2.5 py-1 text-xs text-muted-foreground border border-border/60">
            <span className="text-primary font-bold">$</span>
            <span>init --contact</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Establish Connection
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {settings.contact_description ||
              'Execute a secure transmission to my inbox. Response typically generated within 24 standard hours.'}
          </p>
        </FadeInItem>

        {/* Two-column layout: Form Left, System Status & Nodes Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Form Column (7 cols) */}
          <FadeInItem className="lg:col-span-7">
            <TerminalContactForm
              formspreeId={settings.formspree_id}
              email={emailContact}
            />
          </FadeInItem>

          {/* Right Status & Nodes Column (5 cols) */}
          <FadeInItem className="lg:col-span-5 space-y-6">
            {/* System Status Panel */}
            <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <Activity className="h-4 w-4 text-primary" />
                <h3 className="text-xs uppercase tracking-wider font-bold text-foreground">
                  System Status
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    ONLINE
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Load</span>
                  <span className="font-semibold text-foreground">
                    Normal (Optimal)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Est. Latency</span>
                  <span className="font-semibold text-primary">~12ms</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-primary" />
                    {locationContact}
                  </span>
                </div>
              </div>
            </div>

            {/* Network Nodes Panel */}
            <div className="rounded-xl border border-border/80 bg-card p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                <Globe className="h-4 w-4 text-primary" />
                <h3 className="text-xs uppercase tracking-wider font-bold text-foreground">
                  Network Nodes
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors truncate"
                >
                  <Github className="h-3.5 w-3.5 shrink-0 text-foreground" />
                  <span className="truncate">
                    {githubLink.replace('https://', '')}
                  </span>
                </a>

                <a
                  href={linkedinLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors truncate"
                >
                  <Linkedin className="h-3.5 w-3.5 shrink-0 text-foreground" />
                  <span className="truncate">
                    {linkedinLink.replace('https://', '')}
                  </span>
                </a>

                <a
                  href={`mailto:${emailContact}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors truncate"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-foreground" />
                  <span className="truncate">{emailContact}</span>
                </a>
              </div>
            </div>

            {/* Coordinate Radar Box */}
            <div className="rounded-xl border border-dashed border-border/80 bg-background/50 p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Radio className="h-4 w-4 text-primary animate-pulse" />
                <span>NODE: 28.6139° N, 77.2090° E</span>
              </div>
              <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                DELHI, IN
              </span>
            </div>
          </FadeInItem>
        </div>
      </FadeIn>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://surinder-singh-portfolio.vercel.app',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Contact',
                    item: 'https://surinder-singh-portfolio.vercel.app/contact',
                  },
                ],
              },
              {
                '@type': 'ContactPage',
                name: 'Contact Surinder Singh',
                description:
                  'Contact form and communication channels for Surinder Singh, Senior Frontend Developer.',
                url: 'https://surinder-singh-portfolio.vercel.app/contact',
                mainEntity: {
                  '@type': 'Person',
                  name: settings.owner_name,
                  email: emailContact,
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: locationContact,
                  },
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
