import MenuBtn from '@/components/client/menu-btn';
import React from 'react';
import useData from './useData';

const Navbar: React.FC = () => {
  const [menuItems] = useData();
  return (
    <div className="flex gap-8 items-center justify-center max-w-[503px] justify-self-end py-2 px-6 rounded-2xl shadow-custom-1">
      {menuItems.map((menuItem, index: number) => (
        <MenuBtn key={menuItem.id + '-' + index} menuItem={menuItem} />
      ))}
    </div>
  );
};

export default Navbar;
