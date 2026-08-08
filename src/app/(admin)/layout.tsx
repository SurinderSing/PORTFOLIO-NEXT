import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import '@/styles/globals.css';
import '@/styles/main.css';
import { raleway, poppins, pacifico } from '@/styles/fonts';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/utils/theme-provider';
import ToggleDarkModeBtn from '@/components/website/toggle-dark-mode-btn';
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
  ShieldCheck,
  LogOut,
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

  if (!profile || profile.role !== 'ADMIN') {
    redirect('/');
  }

  async function handleSignOut() {
    'use server';
    const client = createClient();
    await client.auth.signOut();
    redirect('/sign-in');
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(raleway.variable, poppins.variable, pacifico.variable)}
    >
      <body
        className={cn(
          'antialiased min-h-screen bg-background text-foreground font-raleway'
        )}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col">
              {/* Top Navigation Bar */}
              <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md px-6 py-3.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl main-gradient-1 flex items-center justify-center text-white shadow-md">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h1 className="text-base font-semibold font-poppins leading-none">
                      Portfolio Admin
                    </h1>
                    <span className="text-xs text-muted-foreground">
                      Control Center
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border bg-background hover:bg-tertiary transition-colors"
                  >
                    <span>View Website</span>
                    <ExternalLink size={13} />
                  </Link>

                  <ToggleDarkModeBtn />

                  <form action={handleSignOut}>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                      title="Sign Out"
                    >
                      <LogOut size={13} />
                      <span className="sm:hidden">Sign Out</span>
                    </button>
                  </form>
                </div>
              </header>

              {/* Body: Sidebar + Main Content */}
              <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Navigation */}
                <aside className="w-64 sm:hidden border-r border-border bg-card/50 p-4 flex flex-col justify-between">
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-2">
                      Management
                    </p>
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl text-foreground/80 hover:text-foreground hover:bg-tertiary transition-all duration-150"
                        >
                          <Icon size={16} className="text-primary" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t border-border px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        {profile?.first_name?.[0] || 'A'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">
                          {profile?.first_name || 'Admin User'}
                        </p>
                        <p className="text-[10px] text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 md:p-4 max-w-7xl mx-auto w-full">
                  {/* Mobile Navigation Pills */}
                  <div className="hidden sm:flex overflow-x-auto gap-2 pb-3 mb-4 no-scrollbar border-b border-border">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-lg bg-card border border-border hover:bg-tertiary"
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
