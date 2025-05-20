'use client';

import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import FailedImage from '@/assets/images/failed-image.jpg';

interface ProjectCardProps {
  image?: StaticImageData;
  title: string;
  technologies: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  technologies,
  image = FailedImage,
}) => {
  const [imgSrc, setImgSrc] = useState<StaticImageData>(image);
  return (
    <button className="flex-[48.48%] w-full bg-card p-2 rounded-xl shadow-sm text-left dark:bg-secondary">
      <Image
        src={imgSrc}
        alt={title}
        onError={() => setImgSrc(FailedImage)}
        width={500}
        height={300}
        className="rounded-xl object-cover aspect-[4/1.3] mb-2 mx-auto"
      />
      <p className="para-2 text-muted">{technologies.join(', ')}</p>
      <h3 className="leading-5">{title}</h3>
    </button>
  );
};

export default ProjectCard;
