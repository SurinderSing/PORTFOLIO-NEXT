import React from 'react';
import { Metadata } from 'next';
import PageProvider from '@/components/website/pages/page-provider';
import SubContainer from '@/components/website/pages/resume/sub-container';
import { createClient } from '@/utils/supabase/server';

export const metadata: Metadata = {
  title: 'Resume | Frontend Developer Experience',
  description:
    'Download my resume and explore my 4+ years of experience in frontend development, working with React, Next.js, and AI tools.',
  alternates: {
    canonical: '/resume',
  },
};

import { Brain, NotebookPen } from 'lucide-react';
import DetailCard from '@/components/website/pages/resume/detail-card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';
import { ScrollReveal } from '@/components/animations/scroll-reveal';

const staticEducationData = [
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

const staticWorkExperienceData = [
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

export const revalidate = 3600;

export default async function Resume() {
  let educationData = staticEducationData;
  let workExperienceData = staticWorkExperienceData;

  try {
    const supabase = createClient();
    const { data: dbExperiences, error } = await supabase
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && dbExperiences && dbExperiences.length > 0) {
      const ed = dbExperiences
        .filter((item: any) => item.type === 'EDUCATION')
        .map((item: any) => ({
          id: item.id,
          date: item.date_range,
          title: item.title,
          place: item.place,
        }));

      const wk = dbExperiences
        .filter((item: any) => item.type === 'WORK')
        .map((item: any) => ({
          id: item.id,
          date: item.date_range,
          title: item.title,
          place: item.place,
        }));

      if (ed.length > 0) educationData = ed;
      if (wk.length > 0) workExperienceData = wk;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      'Supabase query failed, falling back to static experiences:',
      err
    );
  }

  return (
    <main className="w-full">
      <PageProvider title="Resume">
        <FadeIn staggerChildren={0.15}>
          <FadeInItem className="mb-6">
            <h3 className="mb-3">Professional Summary</h3>
            <p className="para-2 text-muted">
              4+ Years in Industry | Experienced Developer with Proficiency in
              Frontend and AI Tools | Developed Successful Applications |
              Skilled in designing solid architecture | Skilled in managing
              work, time and resources.
            </p>
          </FadeInItem>

          <ScrollReveal
            yOffset={20}
            delay={0.15}
            className="grid grid-cols-2 gap-4 sm:grid-cols-1 mb-8"
          >
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
          </ScrollReveal>

          <ScrollReveal
            yOffset={20}
            className="grid grid-cols-2 gap-4 sm:grid-cols-1 mb-8"
          >
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
          </ScrollReveal>

          <ScrollReveal
            yOffset={20}
            className="grid grid-cols-2 gap-4 sm:grid-cols-1 mb-8"
          >
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
          </ScrollReveal>

          <ScrollReveal yOffset={20} className="grid grid-cols-1 gap-4 mb-8">
            <SubContainer title="Soft Skills">
              <div className="flex flex-wrap gap-2">
                {softSkillsData.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </SubContainer>
          </ScrollReveal>
        </FadeIn>
      </PageProvider>
    </main>
  );
}
