'use client';

import { Home, BookOpen, Briefcase, Mail, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const iconMap: Record<string, LucideIcon> = {
  Home,
  BookOpen,
  Briefcase,
  Mail,
};

export interface MenuItemInterface {
  id: number;
  label: string;
  href: string;
  icon: keyof typeof iconMap;
}

interface MenuBtnInterface {
  menuItem: MenuItemInterface;
}

const MenuBtn: React.FC<MenuBtnInterface> = ({ menuItem }) => {
  const pathname = usePathname();
  const isActive = pathname === menuItem.href;
  const Icon = iconMap[menuItem.icon];

  if (!Icon) {
    return null;
  }

  return (
    <Link href={menuItem.href}>
      <div
        className={`inline-flex flex-col items-center justify-center rounded-2xl h-14 w-14 ${
          isActive
            ? 'main-gradient-1'
            : 'bg-tertiary-2 hover:bg-tertiary-2-hover'
        }`}
      >
        <Icon size={14} strokeWidth={2.5} />
        <p className="para-3">{menuItem.label}</p>
      </div>
    </Link>
  );
};

export default MenuBtn;
