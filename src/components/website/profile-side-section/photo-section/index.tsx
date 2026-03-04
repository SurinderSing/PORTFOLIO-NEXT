import Image from 'next/image';
import React from 'react';
import Photo from '@/assets/images/profile-photos/surinder_profile_photo.png';

const PhotoSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-[70%]">
      <div className="relative w-[150px] h-[74px]">
        <Image
          src={Photo}
          alt="Surinder Singh - Frontend Developer"
          width={150}
          height={150}
          className="object-cover aspect-square rounded-full absolute -top-[82px]"
          priority
        />
      </div>
      <h3 className="mb-1 text-[22px]">Surinder Singh</h3>
      <p className="para-2 font-semibold text-muted">Frontend Developer</p>
    </div>
  );
};

export default PhotoSection;
