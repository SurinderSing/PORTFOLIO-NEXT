'use client';

import React, { useState, useEffect } from 'react';
import TerminalLoader from './terminal-loader';

export default function GlobalLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only show the boot loader once per browser session to prevent blocking navigations
    try {
      const hasSeenBoot = sessionStorage.getItem('surinder_boot_seen');
      if (!hasSeenBoot) {
        setLoading(true);
      }
    } catch {
      // Fallback if sessionStorage is disabled/blocked
      setLoading(false);
    }
  }, []);

  const handleComplete = () => {
    try {
      sessionStorage.setItem('surinder_boot_seen', 'true');
    } catch {
      // Ignore storage errors
    }
    setLoading(false);
  };

  if (!loading) return null;

  return <TerminalLoader onComplete={handleComplete} />;
}
