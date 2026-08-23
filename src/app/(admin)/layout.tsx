import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import '@/styles/globals.css';
import '@/styles/main.css';
import { jetbrainsMono, inter } from '@/styles/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/utils/theme-provider';
import ToggleDarkModeBtn from '@/components/website/toggle-dark-mode-btn';
import RouteLoader from '@/components/ui/route-loader';
import {
  LayoutDashboard,
  Settings,
  Phone,
  Share2,
  Sparkles,
  Code2,
  Briefcase,
  FolderGit2,
  ExternalLink,
  LogOut,
  Lock,
  ArrowLeft,
  Terminal,
} from 'lucide-react';
import Providers from '../provider';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin Control Center | Surinder Singh Portfolio',
  description:
    'Administrative dashboard for managing portfolio data, settings, skills, experiences, and projects.',
};

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/site-settings', label: 'Site Settings', icon: Settings },
  { href: '/admin/contacts', label: 'Contacts', icon: Phone },
  { href: '/admin/social-links', label: 'Social Links', icon: Share2 },
  { href: '/admin/about-cards', label: 'About Cards', icon: Sparkles },
  { href: '/admin/skills', label: 'Skills & Categories', icon: Code2 },
  { href: '/admin/experiences', label: 'Experiences', icon: Briefcase },
  { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in?redirect=/admin');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Secure 403 Forbidden Screen for unauthorized non-admin users
  if (!profile || profile.role !== 'ADMIN') {
    return (
      <html
        lang="en"
        suppressHydrationWarning
        className={cn(jetbrainsMono.variable, inter.variable)}
      >
        <body className="antialiased min-h-screen bg-background text-foreground font-mono flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-2xl bg-card border border-border shadow-md space-y-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto shadow-inner">
              <Lock size={26} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold tracking-tight">
                Access Denied
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You do not have administrative privileges to access this area.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-tertiary-2 transition-colors"
              >
                <ArrowLeft size={13} />
                <span>Return to Website</span>
              </a>

              <a
                href="/api/auth/sign-out"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </a>
            </div>
          </div>
        </body>
      </html>
    );
  }

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
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
              {/* Top Navigation Bar */}
              <header className="sticky top-0 z-40 w-full border-b border-border bg-card/85 backdrop-blur-md px-6 py-3 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <div>
                    <h1 className="text-sm font-bold tracking-tight leading-none">
                      Portfolio Admin
                    </h1>
                    <span className="text-[10px] text-muted-foreground">
                      Control Center
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border bg-background hover:bg-tertiary-2 transition-colors"
                  >
                    <span>View Website</span>
                    <ExternalLink size={12} />
                  </Link>

                  <ToggleDarkModeBtn />

                  <a
                    href="/api/auth/sign-out"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut size={12} />
                    <span className="hidden sm:inline">Sign Out</span>
                  </a>
                </div>
              </header>

              {/* Body: Sidebar + Main Content */}
              <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className="w-60 hidden md:flex border-r border-border bg-card/40 p-4 flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                      Management
                    </p>
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-foreground/80 hover:text-foreground hover:bg-tertiary-2 transition-colors"
                        >
                          <Icon size={15} className="text-primary" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-border px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 rounded-full bg-primary/10 text-primary items-center justify-center text-xs font-bold">
                        {profile?.first_name?.[0] || 'A'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">
                          {profile?.first_name || 'Admin'}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 md:p-4 max-w-6xl mx-auto w-full">
                  {/* Mobile Navigation Pills */}
                  <div className="flex md:hidden overflow-x-auto gap-2 pb-3 mb-4 no-scrollbar border-b border-border">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-lg bg-card border border-border hover:bg-tertiary-2"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
