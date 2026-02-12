import React from 'react';
import Image from 'next/image';

export default function LogoLoader({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
    >
      {/* Glowing effect behind logo */}
      <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full scale-150 animate-pulse" />

      <div className="relative animate-fade-in-up">
        <Image
          src="/favicon.png"
          alt="Loading..."
          width={80}
          height={80}
          className="animate-pulse-slow object-contain"
          priority
        />
      </div>

      {/* Optional: Minimal progress bar or text */}
      <div className="mt-8 h-1 w-24 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-full animate-progress origin-left bg-primary" />
      </div>
    </div>
  );
}
