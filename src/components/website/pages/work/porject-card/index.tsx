'use client';

import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import FailedImage from '@/assets/images/failed-image.jpg';

interface ProjectCardProps {
  image?: StaticImageData;
  title: string;
  technologies: string[];
  link?: string;
  description?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  technologies,
  image = FailedImage,
  link,
  description,
}) => {
  const [imgSrc, setImgSrc] = useState<StaticImageData>(image);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImgSrc(FailedImage);
    setImageError(true);
  };

  const handleCardClick = () => {
    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`flex-[48.48%] w-full bg-card p-2 rounded-xl shadow-sm text-left dark:bg-secondary hover:shadow-md transition-shadow duration-200 ${
        link && link !== '#' ? 'cursor-pointer' : ''
      }`}
      onClick={handleCardClick}
      role={link && link !== '#' ? 'button' : undefined}
      tabIndex={link && link !== '#' ? 0 : undefined}
      onKeyDown={
        link && link !== '#'
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick();
              }
            }
          : undefined
      }
      aria-label={link && link !== '#' ? `View ${title} project` : undefined}
    >
      <div className="relative">
        <Image
          src={imgSrc}
          alt={imageError ? 'Project placeholder image' : title}
          onError={handleImageError}
          width={500}
          height={300}
          className="rounded-xl object-cover aspect-[4/1.3] mb-2 mx-auto"
          priority={false}
        />
        {link && link !== '#' && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            View Project
          </div>
        )}
      </div>
      <p className="para-2 text-muted mb-1">{technologies.join(', ')}</p>
      <h3 className="leading-5 mb-1">{title}</h3>
      {description && (
        <p className="para-2 text-muted line-clamp-2">{description}</p>
      )}
    </div>
  );
};

export default ProjectCard;
