import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import ToggleDarkModeBtn from '@/components/client/toggle-dark-mode-btn';

const Header = () => {
  return (
    <header>
      <div className="section-container">
        <div></div>
        <Link href="/">
          <Image
            src="https://picsum.photos/42/42"
            alt="logo"
            width={42}
            height={42}
          />
        </Link>
        <div>
          <ToggleDarkModeBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
