import PageProvider from '@/components/website/pages/page-provider';
import ProjectCard from '@/components/website/pages/work/porject-card';
import React from 'react';
// import FailedImage from '@/assets/images/failed-image.jpg';
import GimmefyImage from '@/assets/images/projects/gimmefy-ai.png';
import DialmantraImage from '@/assets/images/projects/dialmantra.png';
import AmotusImage from '@/assets/images/projects/amotus-online.png';
import DrishtiImage from '@/assets/images/projects/drishti-ias.png';

const projectsData = [
  {
    id: 1,
    image: GimmefyImage,
    title: 'Gimmefy AI',
    technologies: ['React', 'TypeScript', 'Mantine', 'Redux Toolkit'],
    description:
      'AI-Enhanced Marketing Platform with 150+ automated tasks and personalized AI assistants designed for marketers, by marketers.',
    link: 'https://gimmefy.ai',
  },
  {
    id: 2,
    image: DialmantraImage,
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
    link: 'https://www.dialmantra.in/',
  },
  {
    id: 3,
    image: AmotusImage,
    title: 'Amotus Online',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    description:
      'Amotus Online stands as an innovative remote screen sharing platform, offering a unique solution for enhanced collaboration and communication.',
    link: 'https://amotus.online/',
  },
  {
    id: 4,
    image: DrishtiImage,
    title: 'Drishti IAS Website',
    technologies: ['JavaScript', 'HTML', 'CSS', 'API Integration'],
    description:
      'Improved institute website user interface and experience through collaborative efforts.',
    link: 'https://drishtiias.com',
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
      <div className="flex flex-wrap gap-4 justify-evenly mb-6 overflow-auto">
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
