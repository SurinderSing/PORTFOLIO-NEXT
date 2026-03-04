import React from 'react';
import { cn } from '@/lib/utils';

interface HighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * A reusable component for professionally highlighting text.
 * Default styling uses font-semibold and text-foreground for subtle emphasis.
 */
export const Highlight = ({
  children,
  className,
  ...props
}: HighlightProps) => {
  return (
    <span className={cn('font-semibold text-foreground', className)} {...props}>
      {children}
    </span>
  );
};

export default Highlight;
