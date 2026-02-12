import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/main.css';
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
  title: 'Surinder Singh - Frontend Developer',
  description:
    'Frontend Developer with 4+ years experience specializing in React, Next.js, AI tools, and modern web technologies.',
  keywords: [
    'Frontend Developer',
    'React',
    'Next.js',
    'TypeScript',
    'frontend developer',
    'gimmefy',
    'Web Development',
    'Portfolio',
  ],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  authors: [{ name: 'Surinder Singh' }],
  creator: 'Surinder Singh',
  openGraph: {
    title: 'Surinder Singh - Frontend Developer',
    description:
      'Frontend Developer with 4+ years experience specializing in React, Next.js, AI tools, and modern web technologies.',
    type: 'website',
    locale: 'en_US',
    url: 'https://surindersingh.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surinder Singh - Frontend Developer',
    description:
      'Frontend Developer with 4+ years experience specializing in React, Next.js, AI tools, and modern web technologies.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'antialiased h-screen bg-background overflow-hidden sm:overflow-auto'
        )}
      >
        <Suspense>
          <RouteLoader />
        </Suspense>
        <GlobalLoader />
        <Providers>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <div className="section-container pt-[.5rem] sm:pb-4">
                <Navbar />
                <div className="flex gap-3 sm:flex-col sm:items-center">
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
