import { Experience } from '@/types/database';
import { TimelineItem } from '@/components/website/pages/resume/timeline-experience';

const workDetailsMap: Record<
  string,
  {
    company: string;
    role: string;
    bullets: string[];
    technologies: string[];
  }
> = {
  gimmefy: {
    company: 'Gimmefy AI',
    role: 'Front-End Developer (AI Marketing Platforms)',
    bullets: [
      'Lead frontend development for core AI SaaS products using React, Next.js, and TypeScript, serving over 50,000 active users.',
      'Architected and implemented a new micro-frontend structure and prompt engineering interfaces, improving workflow speed by 40%.',
      'Mentored junior developers and established code quality standards across the team.',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Mantine',
      'Redux Toolkit',
      'Webpack',
    ],
  },
  collaberus: {
    company: 'Collaberus Technologies',
    role: 'Front-End Developer (Amotus Online, Dialmantra, CRM)',
    bullets: [
      'Developed interactive data visualization dashboards, remote screen sharing platforms (Amotus Online), and contact center dialers (Dialmantra).',
      'Integrated real-time WebSockets and JSSIP communication protocols for low-latency collaboration.',
      'Optimized application performance, reducing initial bundle size by 25% and improving interaction responsiveness.',
    ],
    technologies: [
      'React.js',
      'Redux',
      'JavaScript',
      'JSSIP',
      'Ant Design',
      'LESS',
      'WebSockets',
    ],
  },
  drishti: {
    company: 'Drishti IAS',
    role: 'Front-End & Technical Associate',
    bullets: [
      'Engineered and optimized high-traffic educational portals and responsive multi-lingual student assessment interfaces.',
      'Collaborated with content and UX design teams to implement accessible and responsive UI components.',
      'Improved Core Web Vitals and asset delivery, reducing page load times by 30%.',
    ],
    technologies: [
      'JavaScript',
      'HTML5',
      'CSS3',
      'REST APIs',
      'Performance Tuning',
    ],
  },
};

const educationDetailsMap: Record<
  string,
  {
    company: string;
    role: string;
    bullets: string[];
    technologies: string[];
  }
> = {
  bca: {
    company: 'Capital University, Jharkhand',
    role: 'Bachelor of Computer Applications (BCA)',
    bullets: [
      'Graduated First Division with specialization in Software Engineering, Database Systems, and Modern Web Architecture.',
    ],
    technologies: [
      'Data Structures',
      'Algorithms',
      'DBMS',
      'Software Engineering',
    ],
  },
  diploma: {
    company: 'B.B.S.B.P. College, PSBTE & IT Chandigarh',
    role: 'Diploma in Computer Science & Engineering',
    bullets: [
      'Graduated First Division with core coursework in Object-Oriented Programming, Operating Systems, and Computer Networks.',
    ],
    technologies: [
      'C/C++',
      'Web Technologies',
      'Networking',
      'Operating Systems',
    ],
  },
  school: {
    company: 'Guru Nanak Public Sr. Sec School, CBSE',
    role: 'Senior Secondary High School',
    bullets: [
      'Graduated First Division with strong foundation in Mathematics, Computer Fundamentals, and Physics.',
    ],
    technologies: ['Mathematics', 'Computer Science', 'Physics'],
  },
};

export function formatExperiencesToTimeline(
  experiences: Experience[],
  type: 'WORK' | 'EDUCATION'
): TimelineItem[] {
  return experiences.map((item) => {
    const searchStr = `${item.title} ${item.place}`.toLowerCase();

    const details =
      type === 'WORK'
        ? searchStr.includes('gimmefy')
          ? workDetailsMap.gimmefy
          : searchStr.includes('collaberus') ||
              searchStr.includes('dialmantra') ||
              searchStr.includes('amotus')
            ? workDetailsMap.collaberus
            : searchStr.includes('drishti')
              ? workDetailsMap.drishti
              : null
        : searchStr.includes('bachelor') ||
            searchStr.includes('bca') ||
            searchStr.includes('capital')
          ? educationDetailsMap.bca
          : searchStr.includes('diploma') ||
              searchStr.includes('cse') ||
              searchStr.includes('psbte')
            ? educationDetailsMap.diploma
            : searchStr.includes('school') || searchStr.includes('cbse')
              ? educationDetailsMap.school
              : null;

    return {
      id: item.id,
      company: details?.company || item.place || 'Organization',
      role: details?.role || item.title || 'Role',
      dateRange: item.date_range,
      bullets: details?.bullets || [
        'Executed core technical deliverables with focus on scalability, maintainability, and clean architecture.',
        'Collaborated with cross-functional stakeholders to deliver reliable and tested features.',
      ],
      technologies: details?.technologies || [
        'Frontend Architecture',
        'TypeScript',
        'React',
      ],
      type: item.type,
      isCurrent: item.date_range.toLowerCase().includes('present'),
    };
  });
}
