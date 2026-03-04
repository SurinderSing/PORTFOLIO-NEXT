import React, { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import '@/styles/main.css';
import { raleway, poppins, pacifico } from '@/styles/fonts';
import AuthProvider from '@/context/AuthProvider';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/utils/theme-provider';
import Header from '@/features/website/header';
import Navbar from '@/features/website/navbar';
import ProfileSideSection from '@/features/website/profile-side-section';
import GlobalLoader from '@/components/ui/global-loader';
import RouteLoader from '@/components/ui/route-loader';
import Providers from '../provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://surindersingh.app'),
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
    url: 'https://surindersingh.app',
    siteName: 'Surinder Singh Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surinder Singh | Frontend Developer',
    description:
      'Frontend Developer specializing in React, Next.js, and modern web technologies. Explore my projects and experience.',
    creator: '@SurinderDev', // Assuming a handle or similar
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow zooming for accessibility
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(raleway.variable, poppins.variable, pacifico.variable)}
    >
      <body
        className={cn(
          'antialiased h-screen bg-background overflow-hidden sm:overflow-auto font-raleway'
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
              name: 'Surinder Singh',
              url: 'https://surindersingh.app',
              jobTitle: 'Frontend Developer',
              sameAs: [
                'https://github.com/SurinderSing',
                'https://www.linkedin.com/in/surinder-singh-dev/',
                'https://www.instagram.com/inder.sgh_/',
              ],
              description:
                'Frontend Developer with 4+ years of experience specializing in React, Next.js, and AI tools.',
              worksFor: {
                '@type': 'Organization',
                name: 'Gimmefy AI',
              },
            }),
          }}
        />
        <Providers>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <div className="section-container pt-[.5rem] sm:pt-36 sm:pb-4">
                <Navbar />
                <div className="flex gap-3 sm:flex-col sm:items-center sm:mt-20">
                  <ProfileSideSection />
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
