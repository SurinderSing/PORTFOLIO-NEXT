import React, { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import '@/styles/main.css';
import { jetbrainsMono, inter } from '@/styles/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/utils/theme-provider';
import TopNavbar from '@/features/website/top-navbar';
import Footer from '@/features/website/footer';
import GlobalLoader from '@/components/ui/global-loader';
import RouteLoader from '@/components/ui/route-loader';
import CustomCursor from '@/components/animations/custom-cursor';
import AntigravityBackground from '@/components/animations/antigravity-background';
import Providers from '../provider';
import { getSiteSettings, getSocialLinks } from '@/lib/supabase-queries';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

// WARNING: Update all occurrences of the base URL in layout.tsx, sitemap.ts, and robots.ts whenever the production deployment domain changes!
export const metadata: Metadata = {
  metadataBase: new URL('https://surinder-singh-portfolio.vercel.app'),
  title: {
    default: 'Surinder Singh | Frontend Developer Portfolio',
    template: '%s | Surinder Singh',
  },
  description:
    'Portfolio of Surinder Singh, a Senior Frontend Developer & Web Architect specializing in React, Next.js, TypeScript, AI tools, and building scalable high-performance web applications.',
  applicationName: 'Surinder Singh Portfolio',
  keywords: [
    'Surinder Singh',
    'Surinder Singh Portfolio',
    'Surinder Singh Frontend Developer',
    'Surinder Singh Web Developer',
    'Surinder Singh React Developer',
    'Surinder Singh Next.js',
    'Surinder Singh Engineer Delhi',
    'Senior Frontend Engineer',
    'React Specialist',
    'Next.js 14 Developer',
    'TypeScript Engineer',
    'Micro-Frontend Architecture',
    'Module Federation',
    'Frontend Web Developer Delhi',
    'Gimmefy AI Developer',
    'Web Architecture Specialist',
  ],
  authors: [
    {
      name: 'Surinder Singh',
      url: 'https://surinder-singh-portfolio.vercel.app',
    },
  ],
  creator: 'Surinder Singh',
  publisher: 'Surinder Singh',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Surinder Singh | Frontend Developer Portfolio',
    description:
      'Explore projects, engineering experience, and technical articles by Surinder Singh, a Frontend Engineer building scalable web systems.',
    type: 'website',
    locale: 'en_US',
    url: 'https://surinder-singh-portfolio.vercel.app',
    siteName: 'Surinder Singh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surinder Singh | Frontend Developer Portfolio',
    description:
      'Explore projects, engineering experience, and technical articles by Surinder Singh, a Frontend Engineer building scalable web systems.',
    creator: '@SurinderDev',
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      'r-9sHFg6rP_cszoEU3JNCzHNYsoe6cFNgUK8mKW3cfk',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#090d16',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, socialLinks] = await Promise.all([
    getSiteSettings(),
    getSocialLinks(),
  ]);

  const sameAsUrls = Array.from(
    new Set([
      ...socialLinks.map((link) => link.url),
      'https://github.com/SurinderSing',
      'https://github.com/SurinderSing/inder-dev-portfolio',
      'https://www.linkedin.com/in/surinder-singh-dev/',
    ])
  );

  const structuredDataGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://surinder-singh-portfolio.vercel.app/#website',
        url: 'https://surinder-singh-portfolio.vercel.app',
        name: 'Surinder Singh | Portfolio',
        alternateName: [
          'Surinder Singh Portfolio',
          'Surinder Singh Dev',
          'Surinder Singh Frontend Developer',
        ],
        description:
          'Official portfolio of Surinder Singh, Senior Frontend Developer and Web Architect.',
        publisher: {
          '@id': 'https://surinder-singh-portfolio.vercel.app/#person',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://surinder-singh-portfolio.vercel.app/#profilepage',
        url: 'https://surinder-singh-portfolio.vercel.app',
        name: 'Surinder Singh - Frontend Developer Profile & Portfolio',
        isPartOf: {
          '@id': 'https://surinder-singh-portfolio.vercel.app/#website',
        },
        mainEntity: {
          '@id': 'https://surinder-singh-portfolio.vercel.app/#person',
        },
      },
      {
        '@type': 'Person',
        '@id': 'https://surinder-singh-portfolio.vercel.app/#person',
        name: settings.owner_name || 'Surinder Singh',
        alternateName: 'Surinder Singh',
        url: 'https://surinder-singh-portfolio.vercel.app',
        image:
          settings.profile_photo_url ||
          'https://surinder-singh-portfolio.vercel.app/favicon.png',
        jobTitle: settings.owner_title || 'Frontend Developer',
        worksFor: {
          '@type': 'Organization',
          name: 'Gimmefy AI',
        },
        sameAs: sameAsUrls,
        description:
          settings.owner_summary ||
          'Senior Frontend Developer with 4+ years experience specializing in React, Next.js, TypeScript, Micro-Frontends, and AI web applications.',
        knowsAbout: [
          'React.js',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'Micro-Frontend Architecture',
          'Module Federation',
          'Tailwind CSS',
          'Redux Toolkit',
          'Frontend System Architecture',
          'Web Performance Optimization',
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Delhi',
          addressCountry: 'India',
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(jetbrainsMono.variable, inter.variable)}
    >
      <body
        className={cn(
          'antialiased min-h-screen bg-background text-foreground font-mono transition-colors'
        )}
      >
        <Suspense>
          <RouteLoader />
        </Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataGraph),
          }}
        />
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <GlobalLoader />
            <div className="min-h-screen flex flex-col justify-between relative">
              <AntigravityBackground />
              <CustomCursor />
              <div>
                <TopNavbar settings={settings} />
                <main className="section-container py-8 sm:py-6">
                  {children}
                </main>
              </div>
              <Footer settings={settings} socialLinks={socialLinks} />
            </div>
            <SpeedInsights />
            <Analytics />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
