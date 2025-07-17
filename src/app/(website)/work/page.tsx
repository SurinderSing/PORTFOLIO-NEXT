import PageProvider from '@/components/website/pages/page-provider';
import ProjectCard from '@/components/website/pages/work/porject-card';
import React from 'react';
import FailedImage from '@/assets/images/failed-image.jpg';

const projectsData = [
  {
    id: 1,
    image: FailedImage,
    title: 'Gimmefy AI',
    technologies: ['React', 'TypeScript', 'Mantine', 'Redux Toolkit'],
    description:
      'AI-Enhanced Marketing Platform with 150+ automated tasks and personalized AI assistants designed for marketers, by marketers.',
    link: 'https://gimmefy.ai',
  },
  {
    id: 2,
    image: FailedImage,
    title: 'Dialmantra Dialer',
    technologies: [
      'React.js',
      'Redux.js',
      'JavaScript',
      'JSSIP',
      'HTML',
      'Ant Design',
      'LESS',
    ],
    description:
      'Fast, easy and low cost solution to run a world class contact center without huge investments on hardware and software.',
    link: 'https://dialmantra.com',
  },
  {
    id: 3,
    image: FailedImage,
    title: 'Amotus Online',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    description: 'Online platform for business management and operations.',
    link: '#',
  },
  {
    id: 4,
    image: FailedImage,
    title: 'Call Center CRM',
    technologies: ['React', 'Redux', 'Node.js', 'SQL'],
    description: 'Customer Relationship Management system for call centers.',
    link: '#',
  },
  {
    id: 5,
    image: FailedImage,
    title: 'Drishti IAS Website',
    technologies: ['JavaScript', 'HTML', 'CSS', 'API Integration'],
    description:
      'Improved institute website user interface and experience through collaborative efforts.',
    link: 'https://drishtiias.com',
  },
  {
    id: 6,
    image: FailedImage,
    title: 'Portfolio Website',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    description:
      'Modern, responsive portfolio website built with Next.js and TypeScript.',
    link: 'https://surindersingh.app',
  },
];

const Work: React.FC = () => {
  return (
    <PageProvider title="Portfolio">
      <div className="mb-4">
        <p className="para-2 text-muted">
          Here are some of my recent projects showcasing my expertise in
          frontend development, AI tools, and modern web technologies.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-evenly items-start mb-6 overflow-auto">
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            technologies={project.technologies}
            image={project.image}
            link={project.link}
            description={project.description}
          />
        ))}
      </div>
    </PageProvider>
  );
};

export default Work;
