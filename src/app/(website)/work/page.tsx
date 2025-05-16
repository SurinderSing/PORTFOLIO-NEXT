import PageProvider from '@/components/website/pages/page-provider';
import ProjectCard from '@/components/website/pages/work/porject-card';
import React from 'react';
import FailedImage from '@/assets/images/failed-image.jpg';

const projectsData = [
  {
    id: 1,
    image: FailedImage,
    title: 'Project 1',
    technologies: ['React', 'Node.js'],
  },
  {
    id: 2,
    image: FailedImage,
    title: 'Project 2',
    technologies: ['React', 'Node.js'],
  },
  {
    id: 3,
    image: FailedImage,
    title: 'Project 3',
    technologies: ['React', 'Node.js'],
  },
  {
    id: 4,
    image: FailedImage,
    title: 'Project 4',
    technologies: ['React', 'Node.js'],
  },
  {
    id: 5,
    image: FailedImage,
    title: 'Project 5',
    technologies: ['React', 'Node.js'],
  },
  {
    id: 6,
    image: FailedImage,
    title: 'Project 6',
    technologies: ['React', 'Node.js'],
  },
];

const Work: React.FC = () => {
  return (
    <PageProvider title="Portfolio">
      <div className="flex gap-4 justify-evenly items-start mb-6 flex-wrap">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            technologies={project.technologies}
            image={project.image}
          />
        ))}
      </div>
    </PageProvider>
  );
};

export default Work;
