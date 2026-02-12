'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import LogoLoader from './logo-loader';

export default function GlobalLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Slight buffer to ensure smooth exit

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-500 ease-in-out',
        loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <LogoLoader />
    </div>
  );
}
