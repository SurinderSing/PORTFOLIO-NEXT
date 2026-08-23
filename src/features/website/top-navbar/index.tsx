'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import ToggleDarkModeBtn from '@/components/website/toggle-dark-mode-btn';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { SiteSettings } from '@/types/database';

interface TopNavbarProps {
  settings?: Partial<SiteSettings>;
}

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Resume', href: '/resume' },
  { name: 'Work', href: '/work' },
  { name: 'Contact', href: '/contact' },
];

const TopNavbar: React.FC<TopNavbarProps> = ({ settings }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dynamic brand title fallback
  const brandName = settings?.owner_name
    ? `${settings.owner_name.toLowerCase().replace(/\s+/g, '')}.dev`
    : 'DevEngine v1.0';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md transition-colors">
      <div className="section-container">
        <div className="flex h-14 items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Terminal className="h-3.5 w-3.5" />
            </div>
            <span>{brandName}</span>
            <span
              className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
              title="System Online"
            />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3.5 py-1.5 rounded-md transition-all duration-150',
                    isActive
                      ? 'text-primary font-semibold bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
                  )}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ToggleDarkModeBtn />

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:bg-tertiary-2 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="hidden sm:block border-t border-border/60 py-3 pb-4 font-mono text-xs">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 rounded-md transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-muted-foreground hover:bg-tertiary-2 hover:text-foreground'
                    )}
                  >
                    <span>{link.name}</span>
                    {isActive && <ArrowUpRight className="h-3.5 w-3.5" />}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNavbar;
