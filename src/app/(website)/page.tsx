import React from 'react';
import { Metadata } from 'next';
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
import Highlight from '@/components/ui/highlight';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { AnimatedDivider } from '@/components/animations/animated-divider';

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

export const metadata: Metadata = {
  title: 'Surinder Singh | React & Next.js Frontend Developer',
  description:
    'Portfolio of Surinder Singh, a Frontend Engineer building high-performance SaaS platforms, AI-powered tools, and real-time systems using React, Next.js, and TypeScript.',
  alternates: {
    canonical: '/',
  },
};

const Home = () => {
  return (
    <main className="w-full">
      <PageProvider title="About Me">
        <FadeIn staggerChildren={0.15}>
          {/* About Summary */}
          <FadeInItem className="mb-3">
            <div className="space-y-4">
              <h3>
                Hi, I’m Surinder
                <br />A Frontend Engineer focused on building scalable web
                applications.
              </h3>

              <p className="para-2 text-foreground/80 leading-relaxed">
                I build modern web applications where{' '}
                <Highlight>
                  performance, scalability, and user experience
                </Highlight>{' '}
                matter. My work focuses on developing{' '}
                <Highlight>
                  SaaS platforms, AI-powered tools, and real-time systems
                </Highlight>{' '}
                using <Highlight>React, Next.js, and TypeScript</Highlight>. I
                enjoy solving complex frontend problems such as managing large
                application state, designing reusable component architectures,
                and building interfaces that support high-interaction workflows.
                Over time, I’ve worked on products ranging from AI-driven
                editing tools and automation platforms to high-traffic
                educational websites and real-time CRM systems. I’m particularly
                interested in <Highlight>frontend architecture</Highlight> and{' '}
                <Highlight>performance optimization</Highlight>, and building
                systems that remain reliable as products scale.
              </p>
            </div>
          </FadeInItem>

          <AnimatedDivider className="my-2" delay={0.15} />

          {/* What I do! */}
          <ScrollReveal staggerChildren={0.1} yOffset={20} delay={0.25}>
            <h2 className="mb-3">What I do!</h2>
            <div className="flex flex-wrap gap-4">
              {skillsData.map((skill) => (
                <DetailCard key={skill.id} skill={skill} />
              ))}
            </div>
          </ScrollReveal>
        </FadeIn>
      </PageProvider>
    </main>
  );
};

export default Home;
