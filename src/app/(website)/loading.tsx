import LogoLoader from '@/components/ui/logo-loader';
import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <LogoLoader />
    </div>
  );
}
