'use client';

import React, { useEffect, useState } from 'react';
import ToggleDarkModeBtn from '@/components/website/toggle-dark-mode-btn';
import LogoHeading from '@/components/website/logo-heading';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn('z-40 w-full transition-all duration-300 ease-in-out')}
    >
      <div className="section-container">
        <div className="flex justify-between items-center mx-auto transition-all duration-300">
          <LogoHeading title="Inder <span>Dev.</span>" href="/" />
          <ToggleDarkModeBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
