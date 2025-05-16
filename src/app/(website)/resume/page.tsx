import PageProvider from '@/components/website/pages/page-provider';
import SubContainer from '@/components/website/pages/resume/sub-container';
import React from 'react';
import { Brain, NotebookPen } from 'lucide-react';
import DetailCard from '@/components/website/pages/resume/detail-card';
import { Badge } from '@/components/ui/badge';

const educationData = [
  {
    id: 1,
    date: '2020 - 2024',
    title: 'Bachelor of Science in Computer Science',
    place: 'University of Example',
  },
  {
    id: 2,
    date: '2018 - 2020',
    title: 'High School Diploma',
    place: 'Example High School',
  },
];

const workExperienceData = [
  {
    id: 1,
    date: '2022 - Present',
    title: 'Software Engineer',
    place: 'Example Company',
  },
  {
    id: 2,
    date: '2021 - 2022',
    title: 'Intern Software Engineer',
    place: 'Example Internships',
  },
];

const workSkillsData = [
  'JavaScript',
  'React',
  'Node.js',
  'TypeScript',
  'Python',
];

const softSkillsData = ['Communication', 'Teamwork', 'Problem-solving'];

const Resume: React.FC = () => {
  return (
    <main className="w-full">
      <PageProvider title="Resume">
        <div>
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
            <SubContainer title="Work Skills">
              <div className="flex flex-wrap gap-2">
                {workSkillsData.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </SubContainer>
            <SubContainer title="Soft Skills">
              <div className="flex flex-wrap gap-2">
                {softSkillsData.map((skill, index) => (
                  <Badge key={index} variant="outline">
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
