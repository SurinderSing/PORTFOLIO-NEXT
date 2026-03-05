'use client';
import MenuBtn from '@/components/website/menu-btn';
import React, { useEffect, useState } from 'react';
import useData from './useData';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [menuItems] = useData();
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
    <div
      className={cn(
        'z-40 flex gap-6 items-center justify-center transition-all duration-300 rounded-2xl ml-auto mr-0 mb-2 sm:mb-[6rem] w-fit',
        isMobile ? 'sticky top-[35px] mx-auto' : 'relative',
        isMobile && isScrolled
          ? 'py-1 px-8 bg-tertiary/70 backdrop-blur-md shadow-md'
          : 'py-2 px-10 bg-tertiary shadow-sm'
      )}
    >
      {menuItems.map((menuItem, index: number) => (
        <MenuBtn key={menuItem.id + '-' + index} menuItem={menuItem} />
      ))}
    </div>
  );
};

export default Navbar;
