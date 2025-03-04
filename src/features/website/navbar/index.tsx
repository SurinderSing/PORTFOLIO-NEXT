import MenuBtn from '@/components/website/menu-btn';
import React from 'react';
import useData from './useData';

const Navbar: React.FC = () => {
  const [menuItems] = useData();
  return (
    <div className="flex gap-8 items-center justify-center justify-self-end max-w-[503px] py-2 px-6 rounded-2xl bg-tertiary shadow-custom-1">
      {menuItems.map((menuItem, index: number) => (
        <MenuBtn key={menuItem.id + '-' + index} menuItem={menuItem} />
      ))}
    </div>
  );
};

export default Navbar;
