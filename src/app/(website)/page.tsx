import React from 'react';
import PageProvider from '@/components/website/pages/page-provider';
import { BadgeHelp, CodeXml, LayoutGrid, Slack } from 'lucide-react';

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
    title: 'Web Development',
    description: `As a developer, I find myself most 
          captivated by the power and flexibility of 
          NEXT.js. I'm always eager to dive into new
          projects that leverage NEXT.js and 
          discover innovative ways to create fast, 
          scalable, and user-friendly applications.`,
    icon: <CodeXml size={24} className="text-primary" />,
    bgColor: 'bg-[#FFEBD1] dark:bg-gradient-to-r from-secondary to-primary',
  },
  {
    id: 2,
    title: 'App Development',
    description: `With a focus on user-centric design and
                  cutting-edge technologies, I thrive on 
                  building intuitive and efficient apps 
                  that make a positive impact on people's 
                  lives. Let's turn ideas into reality and 
                  shape the future together.`,
    icon: <LayoutGrid size={24} className="text-secondary" />,
    bgColor: 'bg-tertiary-2',
  },
  {
    id: 4,
    title: 'UI/UX Designing',
    description: `Crafting visually appealing and intuitive user
                  interfaces that offer a delightful user 
                  experience is something I'm truly fanatic 
                  about.`,
    icon: <Slack size={24} className="text-secondary" />,
    bgColor: 'bg-tertiary-2',
  },
  {
    id: 3,
    title: 'Mentorship',
    description: `I have also found great joy in sharing my 
                  knowledge with others. Being a technical 
                  mentor allows me to give back to the 
                  community that has supported me 
                  throughout my career. `,
    icon: <BadgeHelp size={24} className="text-primary" />,
    bgColor: 'bg-[#FFEBD1] dark:bg-gradient-to-r from-secondary to-primary',
  },
];

const Home = () => {
  return (
    <main className="w-full">
      <PageProvider title="ABOUT ME">
        {/* About Summary */}
        <div className="mb-3">
          <p className="para-2">
            Hello there! I am thrilled to welcome you to my portfolio. I am a
            passionate and versatile full-stack developer with a keen interest
            in exploring the latest cutting-edge technologies. My journey in the
            world of web development has been nothing short of exhilarating, and
            I constantly strive to enhance my skills and embrace emerging trends
            in the industry.
          </p>
        </div>

        {/* What I do! */}
        <div>
          <h2 className="mb-3">What I do!</h2>
          <div className="grid grid-cols-2 gap-4">
            {skillsData.map((skill) => (
              <div
                key={skill.id}
                className={`p-4 rounded-3xl shadow-sm ${skill.bgColor}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {skill.icon}
                  <h3 className="font-semibold text-lg">{skill.title}</h3>
                </div>
                <p className="para-2 font-medium">
                  {skill.description || 'Coming soon'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageProvider>
    </main>
  );
};

export default Home;
