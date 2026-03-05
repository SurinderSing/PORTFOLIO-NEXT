import React from 'react';
import ToggleDarkModeBtn from '@/components/website/toggle-dark-mode-btn';
import LogoHeading from '@/components/website/logo-heading';
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header
      className={cn(
        'z-40 w-full transition-all duration-300 ease-in-out bg-background py-3'
      )}
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
