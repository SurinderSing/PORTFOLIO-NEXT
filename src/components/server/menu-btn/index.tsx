import Link from 'next/link';
import React from 'react';

export interface MenuItemInterface {
  id: number;
  label: string;
  href: string;
  icon: React.ComponentType | string;
}

interface MenuBtnInterface {
  menuItem: MenuItemInterface;
}

const MenuBtn: React.FC<MenuBtnInterface> = ({ menuItem }) => {
  return (
    <Link href={menuItem.href}>
      <menuItem.icon />
      {menuItem.label}
    </Link>
  );
};

export default MenuBtn;
