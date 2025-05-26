import React from 'react';
import ToggleDarkModeBtn from '@/components/website/toggle-dark-mode-btn';
import LogoHeading from '@/components/website/logo-heading';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background">
      <div className="section-container">
        <div className="flex justify-between items-center mx-auto py-1.5 sm:py-1">
          <LogoHeading title="Inder <span>Dev.</span>" href="/" />
          <ToggleDarkModeBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
