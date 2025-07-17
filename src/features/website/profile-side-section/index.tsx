'use client';
import ContactsSection from '@/components/website/profile-side-section/contacts-section';
import PhotoSection from '@/components/website/profile-side-section/photo-section';
import SocialMediaLinks from '@/components/website/profile-side-section/social-media-links';
import React from 'react';

const ProfileSideSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full max-w-[23rem] sm:max-w-none h-[calc(100vh-9.7pc)] sm:h-full bg-tertiary rounded-2xl shadow-sm">
      <PhotoSection />
      <SocialMediaLinks />
      <ContactsSection />
    </div>
  );
};

export default ProfileSideSection;
