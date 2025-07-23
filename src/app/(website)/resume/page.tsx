import PageProvider from '@/components/website/pages/page-provider';
import SubContainer from '@/components/website/pages/resume/sub-container';
import React from 'react';
import { Brain, NotebookPen } from 'lucide-react';
import DetailCard from '@/components/website/pages/resume/detail-card';
import { Badge } from '@/components/ui/badge';

const educationData = [
  {
    id: 1,
    date: '2022 - 2023',
    title: 'Bachelor of Computer Applications',
    place: 'Capital University, Jharkhand (First Division)',
  },
  {
    id: 2,
    date: '2018 - 2021',
    title: 'CSE Diploma',
    place:
      'B.B.S.B.P. College, Sirhind, PSBTE & IT, Chandigarh (First Division)',
  },
  {
    id: 3,
    date: '2018',
    title: 'High School',
    place: 'Guru Nanak Public Sr. Sec School, CBSE, Kanpur (First Division)',
  },
];

const workExperienceData = [
  {
    id: 1,
    date: '12/2023 - Present',
    title: 'Front-End Developer (Product- AI Marketing Tools)',
    place: 'Gimmefy AI - Remote',
  },
  {
    id: 2,
    date: '06/2022 - 10/2023',
    title:
      'Front-End Developer (Products- Amotus online, Diamantra dialer, Call Center CRM)',
    place: 'Collaberus technologies pvt. ltd. - Delhi',
  },
  {
    id: 3,
    date: '10/2021 - 06/2022',
    title: 'Front-End & Technical Associate',
    place: 'Drishti IAS - Delhi',
  },
];

const frontendSkillsData = [
  'React',
  'Next.js',
  'Redux',
  'Redux Toolkit',
  'Tailwind',
  'HTML5',
  'CSS3',
  'TypeScript',
  'JavaScript',
];

const componentLibrariesData = [
  'ShadCn',
  'Mantine',
  'AntDesign',
  'MaterialUI',
  'Bootstrap',
];

const additionalSkillsData = [
  'Websockets',
  'Git',
  'GitHub',
  'CI/CD Pipeline',
  'REST API',
  'Linux',
  'Nginx',
  'ESLint',
  'Webpack',
  'Vite.js',
  'AI Tools',
  'Prompting',
];

const backendSkillsData = ['Node.js', 'Express.js', 'MongoDB', 'SQL'];

const softSkillsData = [
  'Problem Solving',
  'Team Collaboration',
  'Communication',
  'Time Management',
  'Mentoring',
  'Project Management',
];

const Resume: React.FC = () => {
  return (
    <main className="w-full">
      <PageProvider title="Resume">
        <div>
          <div className="mb-6">
            <h3 className="mb-3">Professional Summary</h3>
            <p className="para-2 text-muted">
              4+ Years in Industry | Experienced Developer with Proficiency in
              Frontend and AI Tools | Developed Successful Applications |
              Skilled in designing solid architecture | Skilled in managing
              work, time and resources.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <SubContainer
              title="Education"
              icon={<Brain size={20} className="text-secondary" />}
            >
              <div className="grid grid-cols-1 gap-4">
                {educationData.map((education) => (
                  <DetailCard
                    key={education.id}
                    date={education.date}
                    title={education.title}
                    place={education.place}
                  />
                ))}
              </div>
            </SubContainer>
            <SubContainer
              title="Experience"
              icon={<NotebookPen size={20} className="text-primary" />}
            >
              <div className="grid grid-cols-1 gap-4">
                {workExperienceData.map((workExperience) => (
                  <DetailCard
                    key={workExperience.id}
                    date={workExperience.date}
                    title={workExperience.title}
                    place={workExperience.place}
                  />
                ))}
              </div>
            </SubContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <SubContainer title="Frontend Skills">
              <div className="flex flex-wrap gap-2">
                {frontendSkillsData.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </SubContainer>
            <SubContainer title="Component Libraries">
              <div className="flex flex-wrap gap-2">
                {componentLibrariesData.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </SubContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <SubContainer title="Additional Skills">
              <div className="flex flex-wrap gap-2">
                {additionalSkillsData.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </SubContainer>
            <SubContainer title="Backend & Databases">
              <div className="flex flex-wrap gap-2">
                {backendSkillsData.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </SubContainer>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-8">
            <SubContainer title="Soft Skills">
              <div className="flex flex-wrap gap-2">
                {softSkillsData.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </SubContainer>
          </div>
        </div>
      </PageProvider>
    </main>
  );
};

export default Resume;
