import { MenuItemInterface } from '@/components/server/menu-btn';
import { HomeIcon, BookOpenIcon, BriefcaseIcon, MailIcon } from 'lucide-react';

class Configs {
  static baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || '';
  static menuItems: MenuItemInterface[] = [
    {
      id: 1,
      label: 'Home',
      href: '/',
      icon: HomeIcon,
    },
    {
      id: 2,
      label: 'Resume',
      href: '/resume',
      icon: BookOpenIcon,
    },
    {
      id: 3,
      label: 'Work',
      href: '/work',
      icon: BriefcaseIcon,
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
      icon: MailIcon,
    },
  ];
}

export default Configs;
