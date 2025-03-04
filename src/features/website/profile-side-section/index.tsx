import PhotoSection from '@/components/website/profile-side-section/photo-section';
import React from 'react';

const ProfileSideSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-tertiary rounded-2xl max-w-[300px] shadow-sm">
      <PhotoSection />
    </div>
  );
};

export default ProfileSideSection;
