import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import ToggleDarkModeBtn from '@/components/client/toggle-dark-mode-btn';

const Header = () => {
  return (
    <header>
      <div>
        <Link href="/">
          <Image
            src="https://picsum.photos/42/42"
            alt="logo"
            width={42}
            height={42}
          />
        </Link>
      </div>
      <div>
        <ToggleDarkModeBtn />
      </div>
    </header>
  );
};

export default Header;
