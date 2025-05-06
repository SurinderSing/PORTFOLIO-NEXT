import { Github, Instagram, Linkedin } from 'lucide-react';
import React from 'react';
import SocialMediaBtn from './social-media-btn';

export interface socialMediaLinksInterface {
  id: number | string;
  name: string;
  link: string;
  icon: React.ReactNode;
  iconColor?: string;
}

const socialMediaLinks: socialMediaLinksInterface[] = [
  {
    id: 1,
    name: 'LinkedIn',
    link: '',
    icon: <Linkedin color="#0077B5" />,
  },
  {
    id: 2,
    name: 'Github',
    link: '',
    icon: <Github />,
  },
  {
    id: 3,
    name: 'Instagram',
    link: '',
    icon: <Instagram color="#d62976" />,
  },
];

const SocialMediaLinks: React.FC = () => {
  return (
    <div className="grid grid-cols-3 justify-between gap-2 w-full max-w-[70%] mt-3.5">
      {socialMediaLinks.map((linkData) => (
        <SocialMediaBtn key={linkData.id} linkData={linkData} />
      ))}
    </div>
  );
};

export default SocialMediaLinks;
