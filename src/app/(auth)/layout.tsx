import React from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import '@/styles/main.css';
import { jetbrainsMono, inter } from '@/styles/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/utils/theme-provider';
import ToggleDarkModeBtn from '@/components/website/toggle-dark-mode-btn';
import Link from 'next/link';
import { Terminal } from 'lucide-react';
import Providers from '../provider';

export const metadata: Metadata = {
  title: 'Portfolio Admin | Authentication',
  description: 'Secure admin authentication for portfolio management',
};

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(jetbrainsMono.variable, inter.variable)}
    >
      <body
        className={cn(
          'relative antialiased min-h-screen bg-background text-foreground font-mono transition-colors'
        )}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* Minimalist Auth Header */}
            <header className="w-full border-b border-border/60 bg-card/40 py-3">
              <div className="section-container flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-sm font-bold text-foreground hover:opacity-80 transition-opacity"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Terminal className="h-3.5 w-3.5" />
                  </div>
                  <span>Portfolio Admin</span>
                </Link>

                <ToggleDarkModeBtn />
              </div>
            </header>

            <main className="section-container py-12 flex items-center justify-center">
              {children}
            </main>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
