'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Photo from '@/assets/images/profile-photos/surinder_profile_photo.jpg';

const PhotoSection: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[70%]">
      <div className="relative w-[150px] h-[74px]">
        <Image
          src={
            imageError
              ? 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              : Photo
          }
          alt="Surinder Singh - Frontend Developer"
          width={150}
          height={150}
          className="object-cover aspect-square rounded-full absolute -top-[82px]"
          onError={handleImageError}
          priority
        />
      </div>
      <h3 className="mb-1 text-[22px]">Surinder Singh</h3>
      <p className="para-2 font-semibold text-muted">Frontend Developer</p>
    </div>
  );
};

export default PhotoSection;
