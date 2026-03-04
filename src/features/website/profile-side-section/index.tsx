'use client';
import ContactsSection from '@/components/website/profile-side-section/contacts-section';
import PhotoSection from '@/components/website/profile-side-section/photo-section';
import SocialMediaLinks from '@/components/website/profile-side-section/social-media-links';
import React from 'react';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';

const ProfileSideSection: React.FC = () => {
  return (
    <FadeIn
      staggerChildren={0.15}
      className="flex flex-col items-center justify-start w-full max-w-[23rem] sm:max-w-none h-[calc(100vh-9.7pc)] max-h-[650px] sm:h-full sm:max-h-none bg-tertiary rounded-2xl shadow-sm"
    >
      <FadeInItem className="flex flex-col items-center w-full">
        <PhotoSection />
      </FadeInItem>
      <FadeInItem className="flex justify-center w-full">
        <SocialMediaLinks />
      </FadeInItem>
      <FadeInItem className="flex justify-center w-full">
        <ContactsSection />
      </FadeInItem>
    </FadeIn>
  );
};

export default ProfileSideSection;
