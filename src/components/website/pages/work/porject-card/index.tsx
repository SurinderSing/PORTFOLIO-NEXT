import Image, { StaticImageData } from 'next/image';
import React from 'react';
import FailedImage from '@/assets/images/failed-image.jpg';
import { ScrollRevealItem } from '@/components/animations/scroll-reveal';

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
  const content = (
    <div
      className={`w-full h-full bg-card p-2 rounded-xl text-left dark:bg-secondary transition-[transform,box-shadow] duration-200 hover:-translate-y-1.5 hover:shadow-lg shadow-sm ${
        link && link !== '#' ? 'cursor-pointer' : ''
      }`}
    >
      <div className="relative">
        <Image
          src={image}
          alt={title}
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
        <p className="para-2 text-muted line-clamp-3">{description}</p>
      )}
    </div>
  );

  return (
    <ScrollRevealItem className="flex-[48.48%] w-full">
      {link && link !== '#' ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
          aria-label={`View ${title} project`}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </ScrollRevealItem>
  );
};

export default ProjectCard;
