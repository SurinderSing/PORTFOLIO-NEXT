import { MenuItemInterface } from '@/components/client/menu-btn';

const useData = () => {
  const menuItems: MenuItemInterface[] = [
    {
      id: 1,
      label: 'Home',
      href: '/',
      icon: 'Home',
    },
    {
      id: 2,
      label: 'Resume',
      href: '/resume',
      icon: 'BookOpen',
    },
    {
      id: 3,
      label: 'Work',
      href: '/work',
      icon: 'Briefcase',
    },
    // {
    //   id: 4,
    //   label: 'Blog',
    //   href: '/blog',
    //   icon: <BookOpenIcon />,
    // },
    {
      id: 5,
      label: 'Contact',
      href: '/contact',
      icon: 'Mail',
    },
  ];

  return [menuItems];
};

export default useData;
