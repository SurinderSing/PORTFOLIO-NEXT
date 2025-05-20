import React from 'react';
import ToggleDarkModeBtn from '@/components/website/toggle-dark-mode-btn';
import LogoHeading from '@/components/website/logo-heading';

const Header = () => {
  return (
    <header>
      <div className="section-container">
        <div className="flex justify-between items-center mx-auto py-6 sm:py-3">
          <LogoHeading title="Inder <span>Dev.</span>" href="/" />
          <ToggleDarkModeBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
