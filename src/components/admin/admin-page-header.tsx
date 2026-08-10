'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AdminPageHeaderProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}

export default function AdminPageHeader({
  title,
  description,
  icon: Icon,
  children,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold font-poppins flex items-center gap-2">
          {Icon && <Icon size={20} className="text-primary" />}
          <span>{title}</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      {children && (
        <div className="flex items-center gap-2 flex-wrap">{children}</div>
      )}
    </div>
  );
}
