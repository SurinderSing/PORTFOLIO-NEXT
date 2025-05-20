import MenuBtn from '@/components/website/menu-btn';
import React from 'react';
import useData from './useData';

const Navbar: React.FC = () => {
  const [menuItems] = useData();
  return (
    <div className="flex gap-6 items-center justify-center justify-self-end sm:justify-self-center max-w-[503px] sm:max-w-none py-2 px-10 sm:px-none rounded-2xl bg-tertiary shadow-sm mb-2 sm:mb-[6rem]">
      {menuItems.map((menuItem, index: number) => (
        <MenuBtn key={menuItem.id + '-' + index} menuItem={menuItem} />
      ))}
    </div>
  );
};

export default Navbar;
