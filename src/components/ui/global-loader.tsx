'use client';

import React, { useState } from 'react';
import TerminalLoader from './terminal-loader';

export default function GlobalLoader() {
  const [loading, setLoading] = useState(true);

  if (!loading) return null;

  return <TerminalLoader onComplete={() => setLoading(false)} />;
}
