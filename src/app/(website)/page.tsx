import React from 'react';
import PageProvider from '@/components/website/pages/page-provider';
import {
  BadgeHelp,
  CodeXml,
  LayoutGrid,
  Slack,
  Brain,
  Zap,
} from 'lucide-react';
import DetailCard from '@/components/website/pages/home/detail-card';

interface SkillDataInterface {
  id: number | string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
}

const skillsData: SkillDataInterface[] = [
  {
    id: 1,
    title: 'Frontend Development',
    description: `Specialized in React, Next.js, and modern frontend technologies. 
          Experienced with Redux Toolkit, TypeScript, and component libraries like 
          Mantine, Ant Design, and Material-UI. Passionate about creating responsive, 
          user-friendly applications with optimal performance.`,
    icon: <CodeXml size={24} className="text-primary" />,
    bgColor: 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
  },
  {
    id: 2,
    title: 'Full-Stack Development',
    description: `Proficient in both frontend and backend development with Node.js, 
                  Express.js, MongoDB, and SQL. Experienced in building scalable 
                  applications, REST APIs, and managing CI/CD pipelines for efficient 
                  deployment and development workflows.`,
    icon: <LayoutGrid size={24} className="text-secondary" />,
    bgColor: 'bg-tertiary-2',
  },
  {
    id: 3,
    title: 'AI Tools',
    description: `Currently working as a Frontend Developer at Gimmefy AI, developing 
                  AI-powered tools. Skilled in AI tools, 
                  prompting, and creating intelligent solutions that boost user engagement 
                  and streamline workflows.`,
    icon: <Brain size={24} className="text-secondary" />,
    bgColor: 'bg-tertiary-2',
  },
  {
    id: 4,
    title: 'Team Leadership & Mentoring',
    description: `4+ years of industry experience with proven track record of mentoring 
                  interns and managing team growth. Skilled in project management, 
                  time management, and collaborating effectively with cross-functional 
                  teams to deliver successful applications.`,
    icon: <BadgeHelp size={24} className="text-primary" />,
    bgColor: 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
  },
  {
    id: 5,
    title: 'Performance Optimization',
    description: `Expert in optimizing application performance, reducing load times, 
                  and implementing best practices. Experience with Webpack, Vite.js, 
                  ESLint, and modern build tools to ensure fast, efficient, and 
                  maintainable codebases.`,
    icon: <Zap size={24} className="text-primary" />,
    bgColor: 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
  },
  {
    id: 6,
    title: 'Communication & Problem Solving',
    description: `Strong communication skills and excellent problem-solving abilities. 
                  Experienced in managing work, time, and resources effectively. 
                  Passionate about designing solid architecture and creating 
                  innovative solutions for complex challenges.`,
    icon: <Slack size={24} className="text-secondary" />,
    bgColor: 'bg-tertiary-2',
  },
];

const Home = () => {
  return (
    <main className="w-full">
      <PageProvider title="About Me">
        {/* About Summary */}
        <div className="mb-3">
          <p className="para-2">
            Hello there! I am Surinder Singh, a passionate and experienced
            Frontend Developer with 4+ years in the industry. I specialize in
            React, Next.js, and modern web technologies, currently working as an
            Frontend Developer at Gimmefy AI. I have a proven track record of
            developing successful applications, optimizing performance, and
            mentoring team members. My expertise spans from frontend development
            to AI tools integration, making me a versatile developer who can
            tackle complex challenges and deliver innovative solutions.
          </p>
        </div>

        {/* What I do! */}
        <div>
          <h2 className="mb-3">What I do!</h2>
          <div className="flex flex-wrap gap-4">
            {skillsData.map((skill) => (
              <DetailCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </PageProvider>
    </main>
  );
};

export default Home;
