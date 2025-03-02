import MenuBtn, { MenuItemInterface } from '@/components/server/menu-btn';
import React from 'react';

interface NavbarProps {
  menuItems: MenuItemInterface[];
}

const Navbar: React.FC<NavbarProps> = ({ menuItems }) => {
  return (
    <div className="flex gap-5">
      {menuItems.map((menuItem, index) => (
        <MenuBtn key={menuItem.id + '-' + index} menuItem={menuItem} />
      ))}
    </div>
  );
};

export default Navbar;
