'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Settings,
  Phone,
  Share2,
  Sparkles,
  Code2,
  Briefcase,
  FolderGit2,
} from 'lucide-react';
import { Profile } from '@/types/database';

export const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/site-settings', label: 'Site Settings', icon: Settings },
  { href: '/admin/contacts', label: 'Contacts', icon: Phone },
  { href: '/admin/social-links', label: 'Social Links', icon: Share2 },
  { href: '/admin/about-cards', label: 'About Cards', icon: Sparkles },
  { href: '/admin/skills', label: 'Skills & Categories', icon: Code2 },
  { href: '/admin/experiences', label: 'Experiences', icon: Briefcase },
  { href: '/admin/projects', label: 'Projects', icon: FolderGit2 },
];

interface AdminSidebarProps {
  profile: Profile | null;
  userEmail: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  profile,
  userEmail,
}) => {
  const pathname = usePathname();

  return (
    <aside className="w-60 hidden md:flex sticky top-14 h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] border-r border-border bg-card/50 px-3 py-3 flex-col justify-between shrink-0 select-none overflow-hidden">
      {/* Top Navigation Items */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-1.5">
          Management
        </p>
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150',
                  isActive
                    ? 'bg-primary/10 text-primary font-bold border border-primary/25 shadow-2xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2 border border-transparent'
                )}
              >
                <Icon
                  size={15}
                  className={cn(
                    'shrink-0',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Pinned User Profile Info */}
      <div className="pt-2.5 mt-auto border-t border-border shrink-0">
        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-background/60 border border-border/50">
          <div className="flex h-7 w-7 rounded-full bg-primary/15 text-primary items-center justify-center text-xs font-bold shrink-0 border border-primary/20">
            {profile?.first_name?.[0] || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-foreground truncate">
              {profile?.first_name
                ? `${profile.first_name} ${profile.last_name || ''}`.trim()
                : 'Admin'}
            </p>
            <p
              className="text-[10px] text-muted-foreground truncate"
              title={userEmail}
            >
              {userEmail}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export const AdminMobileNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="flex md:hidden overflow-x-auto gap-2 pb-3 mb-4 no-scrollbar border-b border-border">
      {navItems.map((item) => {
        const isActive =
          item.href === '/admin'
            ? pathname === '/admin'
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-lg transition-colors',
              isActive
                ? 'bg-primary/15 text-primary font-bold border border-primary/30'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default AdminSidebar;
