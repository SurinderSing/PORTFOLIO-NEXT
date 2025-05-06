import React from 'react';
import { socialMediaLinksInterface } from './index';

interface SocialMediaBtnProps {
  linkData: socialMediaLinksInterface;
}

const SocialMediaBtn: React.FC<SocialMediaBtnProps> = ({ linkData }) => {
  return (
    <a
      key={linkData.id}
      href={linkData.link}
      className="text-center bg-background rounded-lg p-[1rem] flex items-center justify-center hover:bg-tertiary-2-hover"
    >
      <button>{linkData.icon}</button>
    </a>
  );
};

export default SocialMediaBtn;
