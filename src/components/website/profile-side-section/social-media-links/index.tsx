import React from 'react';
import SocialMediaBtn from './social-media-btn';
import { getSocialLinks } from '@/lib/supabase-queries';
import { resolveIcon } from '@/utils/icon-resolver';

export interface socialMediaLinksInterface {
  id: number | string;
  name: string;
  link: string;
  icon: React.ReactNode;
  iconColor?: string;
}

const SocialMediaLinks: React.FC = async () => {
  const dbLinks = await getSocialLinks();

  const links: socialMediaLinksInterface[] = dbLinks.map((item) => ({
    id: item.id,
    name: item.name,
    link: item.url,
    icon: resolveIcon(item.icon_name, {
      color: item.icon_color || undefined,
    }),
    iconColor: item.icon_color || undefined,
  }));

  return (
    <div className="grid grid-cols-3 justify-between gap-2 w-full max-w-[70%] md:max-w-[93%] mt-3.5">
      {links.map((linkData) => (
        <SocialMediaBtn key={linkData.id} linkData={linkData} />
      ))}
    </div>
  );
};

export default SocialMediaLinks;
