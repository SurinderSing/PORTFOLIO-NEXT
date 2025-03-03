import React from 'react';
import ToggleDarkModeBtn from '@/components/client/toggle-dark-mode-btn';
import LogoHeading from '@/components/server/logo-heading';

const Header = () => {
  return (
    <header>
      <div className="section-container">
        <div className="flex justify-between items-center mx-auto py-10">
          <LogoHeading title="Inder <span>Dev.</span>" href="/" />
          <ToggleDarkModeBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
