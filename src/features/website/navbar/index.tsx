import MenuBtn from '@/components/website/menu-btn';
import React from 'react';
import useData from './useData';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [menuItems] = useData();

  return (
    <div
      className={cn(
        'z-30 flex gap-6 items-center justify-center rounded-2xl ml-auto mr-0 mb-2 sm:mb-[6rem] w-fit py-2 px-12 bg-tertiary shadow-sm sm:mx-auto sm:px-8'
      )}
    >
      {menuItems.map((menuItem, index: number) => (
        <MenuBtn key={menuItem.id + '-' + index} menuItem={menuItem} />
      ))}
    </div>
  );
};

export default Navbar;
