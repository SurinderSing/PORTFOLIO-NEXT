'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const ToggleDarkModeBtn = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      Inder
    </Button>
  );
};

export default ToggleDarkModeBtn;
