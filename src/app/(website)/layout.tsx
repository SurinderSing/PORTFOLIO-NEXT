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

// WARNING: Update all occurrences of the base URL in layout.tsx, sitemap.ts, and robots.ts whenever the production deployment domain changes!
export const metadata: Metadata = {
  metadataBase: new URL('https://surinder-singh-portfolio.vercel.app'),
  title: {
    default: 'Surinder Singh | Frontend Developer',
    template: '%s | Surinder Singh',
  },
  description:
    'Frontend Developer with 4+ years experience specializing in React, Next.js, AI tools, and building high-performance web applications.',
  keywords: [
    'Frontend Developer',
    'React Developer',
    'Next.js Specialist',
    'TypeScript Engineer',
    'Surinder Singh',
    'Surinder Singh Portfolio',
    'Web Development Specialist',
    'AI Tools Developer',
    'Gimmefy AI',
  ],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  authors: [{ name: 'Surinder Singh' }],
  creator: 'Surinder Singh',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Surinder Singh | Frontend Developer',
    description:
      'Frontend Developer specializing in React, Next.js, and modern web technologies. Explore my projects and experience.',
    type: 'website',
    locale: 'en_US',
    url: 'https://surinder-singh-portfolio.vercel.app',
    siteName: 'Surinder Singh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surinder Singh | Frontend Developer',
    description:
      'Frontend Developer specializing in React, Next.js, and modern web technologies. Explore my projects and experience.',
    creator: '@SurinderDev',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, socialLinks] = await Promise.all([
    getSiteSettings(),
    getSocialLinks(),
  ]);

  const sameAsUrls = socialLinks.map((link) => link.url);

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
        <GlobalLoader />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: settings.owner_name,
              url: 'https://surinder-singh-portfolio.vercel.app',
              jobTitle: settings.owner_title,
              sameAs: sameAsUrls,
              description: settings.owner_summary,
              worksFor: {
                '@type': 'Organization',
                name: 'Gimmefy AI',
              },
            }),
          }}
        />
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
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
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
