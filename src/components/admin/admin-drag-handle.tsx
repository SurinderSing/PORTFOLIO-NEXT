'use client';

import React from 'react';
import { GripVertical } from 'lucide-react';

interface AdminDragHandleProps {
  size?: number;
  className?: string;
}

export default function AdminDragHandle({
  size = 16,
  className = '',
}: AdminDragHandleProps) {
  return (
    <td
      className={`py-3 px-3 w-8 text-muted-foreground/40 hover:text-foreground cursor-grab active:cursor-grabbing ${className}`}
    >
      <GripVertical size={size} />
    </td>
  );
}
