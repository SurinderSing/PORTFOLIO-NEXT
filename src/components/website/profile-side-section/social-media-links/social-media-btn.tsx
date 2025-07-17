import React from 'react';
import { socialMediaLinksInterface } from './index';

interface SocialMediaBtnProps {
  linkData: socialMediaLinksInterface;
}

const SocialMediaBtn: React.FC<SocialMediaBtnProps> = ({ linkData }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!linkData.link) {
      e.preventDefault();
      alert(`${linkData.name} link is not available yet.`);
    }
  };

  return (
    <a
      key={linkData.id}
      href={linkData.link || '#'}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${linkData.name} profile`}
      className="text-center bg-background rounded-lg p-[1rem] flex items-center justify-center hover:bg-tertiary-2-hover transition-colors duration-200"
    >
      <span>{linkData.icon}</span>
    </a>
  );
};

export default SocialMediaBtn;
