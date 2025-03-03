import MenuBtn from '@/components/client/menu-btn';
import React from 'react';
import useData from './useData';

const Navbar: React.FC = () => {
  const [menuItems] = useData();
  return (
    <div className="flex gap-10 items-center justify-center max-w-[503px] justify-self-end py-3 px-5 rounded-2xl shadow-custom-1">
      {menuItems.map((menuItem, index: number) => (
        <MenuBtn key={menuItem.id + '-' + index} menuItem={menuItem} />
      ))}
    </div>
  );
};

export default Navbar;
