import { createAnonClient } from '@/utils/supabase/server-anon';
import {
  SiteSettings,
  Contact,
  SocialLink,
  AboutCard,
  SkillCategoryWithSkills,
  Experience,
  Project,
} from '@/types/database';

// ============================================================================
// Default Static Fallbacks (Used when Supabase is offline or unseeded)
// ============================================================================

export const defaultSiteSettings: SiteSettings = {
  id: 1,
  site_title: 'Surinder Singh | Frontend Developer',
  site_description:
    'Frontend Developer specializing in React, Next.js, and AI tools. Building high-performance SaaS platforms and real-time systems.',
  owner_name: 'Surinder Singh',
  owner_title: 'Frontend Developer',
  owner_summary:
    '4+ Years in Industry | Experienced Developer with Proficiency in Frontend and AI Tools',
  home_heading:
    'Hi, I’m Surinder. A Frontend Engineer focused on building scalable web applications.',
  home_description:
    'I build modern web applications where performance, scalability, and user experience matter. My work focuses on developing SaaS platforms, AI-powered tools, and real-time systems using React, Next.js, and TypeScript. I enjoy solving complex frontend problems such as managing large application state, designing reusable component architectures, and building interfaces that support high-interaction workflows. Over time, I’ve worked on products ranging from AI-driven editing tools and automation platforms to high-traffic educational websites and real-time CRM systems. I’m particularly interested in frontend architecture and performance optimization, and building systems that remain reliable as products scale.',
  resume_summary:
    '4+ Years in Industry | Experienced Developer with Proficiency in Frontend and AI Tools | Developed Successful Applications | Skilled in designing solid architecture | Skilled in managing work, time and resources.',
  work_description:
    'Here are some of my recent projects showcasing my expertise in frontend development, AI tools, and modern web technologies.',
  contact_description:
    'I am always open to discussing new projects, opportunities in tech world, partnerships and more so mentorship. With 4+ years of experience in frontend development and AI tools, I am passionate about creating innovative solutions and helping others grow in their careers.',
  profile_photo_url: null,
  resume_pdf_url: '/assets/Surinder-Singh-Resume.pdf',
  formspree_id: process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || 'xrgwgbye',
  updated_at: new Date().toISOString(),
};

export const defaultContacts: Contact[] = [
  {
    id: 1,
    type: 'phone',
    title: 'Phone',
    detail: '+91 6386202678',
    icon_name: 'phone',
    icon_color: '#EC1C09',
    sort_order: 1,
  },
  {
    id: 2,
    type: 'email',
    title: 'Email',
    detail: 'ssurindersingh100@gmail.com',
    icon_name: 'mail',
    icon_color: '#FF9A1A',
    sort_order: 2,
  },
  {
    id: 3,
    type: 'location',
    title: 'Location',
    detail: 'Delhi, India',
    icon_name: 'map-pin',
    icon_color: '#EC1C09',
    sort_order: 3,
  },
];

export const defaultSocialLinks: SocialLink[] = [
  {
    id: 1,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/surinder-singh-dev/',
    icon_name: 'linkedin',
    icon_color: '#0077B5',
    sort_order: 1,
  },
  {
    id: 2,
    name: 'Github',
    url: 'https://github.com/SurinderSing',
    icon_name: 'github',
    icon_color: null,
    sort_order: 2,
  },
  {
    id: 3,
    name: 'Instagram',
    url: 'https://www.instagram.com/inder.sgh_/',
    icon_name: 'instagram',
    icon_color: '#d62976',
    sort_order: 3,
  },
];

export const defaultAboutCards: AboutCard[] = [
  {
    id: 1,
    title: 'Frontend Development',
    description:
      'Specialized in React, Next.js, and modern frontend technologies. Experienced with Redux Toolkit, TypeScript, and component libraries like Mantine, Ant Design, and Material-UI. Passionate about creating responsive, user-friendly applications with optimal performance.',
    icon_name: 'code-xml',
    bg_color_class: 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
    sort_order: 1,
  },
  {
    id: 2,
    title: 'Full-Stack Development',
    description:
      'Proficient in both frontend and backend development with Node.js, Express.js, MongoDB, and SQL. Experienced in building scalable applications, REST APIs, and managing CI/CD pipelines for efficient deployment and development workflows.',
    icon_name: 'layout-grid',
    bg_color_class: 'bg-tertiary-2',
    sort_order: 2,
  },
  {
    id: 3,
    title: 'AI Tools',
    description:
      'Currently working as a Frontend Developer at Gimmefy AI, developing AI-powered tools. Skilled in AI tools, prompting, and creating intelligent solutions that boost user engagement and streamline workflows.',
    icon_name: 'brain',
    bg_color_class: 'bg-tertiary-2',
    sort_order: 3,
  },
  {
    id: 4,
    title: 'Team Leadership & Mentoring',
    description:
      '4+ years of industry experience with proven track record of mentoring interns and managing team growth. Skilled in project management, time management, and collaborating effectively with cross-functional teams to deliver successful applications.',
    icon_name: 'badge-help',
    bg_color_class: 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
    sort_order: 4,
  },
  {
    id: 5,
    title: 'Performance Optimization',
    description:
      'Expert in optimizing application performance, reducing load times, and implementing best practices. Experience with Webpack, Vite.js, ESLint, and modern build tools to ensure fast, efficient, and maintainable codebases.',
    icon_name: 'zap',
    bg_color_class: 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
    sort_order: 5,
  },
  {
    id: 6,
    title: 'Communication & Problem Solving',
    description:
      'Strong communication skills and excellent problem-solving abilities. Experienced in managing work, time, and resources effectively. Passionate about designing solid architecture and creating innovative solutions for complex challenges.',
    icon_name: 'slack',
    bg_color_class: 'bg-tertiary-2',
    sort_order: 6,
  },
];

export const defaultSkillsByCategory: SkillCategoryWithSkills[] = [
  {
    id: 1,
    name: 'Frontend Skills',
    sort_order: 1,
    skills: [
      { id: 1, category_id: 1, name: 'React', sort_order: 1 },
      { id: 2, category_id: 1, name: 'Next.js', sort_order: 2 },
      { id: 3, category_id: 1, name: 'Redux', sort_order: 3 },
      { id: 4, category_id: 1, name: 'Redux Toolkit', sort_order: 4 },
      { id: 5, category_id: 1, name: 'Tailwind', sort_order: 5 },
      { id: 6, category_id: 1, name: 'HTML5', sort_order: 6 },
      { id: 7, category_id: 1, name: 'CSS3', sort_order: 7 },
      { id: 8, category_id: 1, name: 'TypeScript', sort_order: 8 },
      { id: 9, category_id: 1, name: 'JavaScript', sort_order: 9 },
    ],
  },
  {
    id: 2,
    name: 'Component Libraries',
    sort_order: 2,
    skills: [
      { id: 10, category_id: 2, name: 'ShadCn', sort_order: 1 },
      { id: 11, category_id: 2, name: 'Mantine', sort_order: 2 },
      { id: 12, category_id: 2, name: 'AntDesign', sort_order: 3 },
      { id: 13, category_id: 2, name: 'MaterialUI', sort_order: 4 },
      { id: 14, category_id: 2, name: 'Bootstrap', sort_order: 5 },
    ],
  },
  {
    id: 3,
    name: 'Additional Skills',
    sort_order: 3,
    skills: [
      { id: 15, category_id: 3, name: 'Websockets', sort_order: 1 },
      { id: 16, category_id: 3, name: 'Git', sort_order: 2 },
      { id: 17, category_id: 3, name: 'GitHub', sort_order: 3 },
      { id: 18, category_id: 3, name: 'CI/CD Pipeline', sort_order: 4 },
      { id: 19, category_id: 3, name: 'REST API', sort_order: 5 },
      { id: 20, category_id: 3, name: 'Linux', sort_order: 6 },
      { id: 21, category_id: 3, name: 'Nginx', sort_order: 7 },
      { id: 22, category_id: 3, name: 'ESLint', sort_order: 8 },
      { id: 23, category_id: 3, name: 'Webpack', sort_order: 9 },
      { id: 24, category_id: 3, name: 'Vite.js', sort_order: 10 },
      { id: 25, category_id: 3, name: 'AI Tools', sort_order: 11 },
      { id: 26, category_id: 3, name: 'Prompting', sort_order: 12 },
    ],
  },
  {
    id: 4,
    name: 'Backend & Databases',
    sort_order: 4,
    skills: [
      { id: 27, category_id: 4, name: 'Node.js', sort_order: 1 },
      { id: 28, category_id: 4, name: 'Express.js', sort_order: 2 },
      { id: 29, category_id: 4, name: 'MongoDB', sort_order: 3 },
      { id: 30, category_id: 4, name: 'SQL', sort_order: 4 },
    ],
  },
  {
    id: 5,
    name: 'Soft Skills',
    sort_order: 5,
    skills: [
      { id: 31, category_id: 5, name: 'Problem Solving', sort_order: 1 },
      { id: 32, category_id: 5, name: 'Team Collaboration', sort_order: 2 },
      { id: 33, category_id: 5, name: 'Communication', sort_order: 3 },
      { id: 34, category_id: 5, name: 'Time Management', sort_order: 4 },
      { id: 35, category_id: 5, name: 'Mentoring', sort_order: 5 },
      { id: 36, category_id: 5, name: 'Project Management', sort_order: 6 },
    ],
  },
];

export const defaultExperiences: Experience[] = [
  {
    id: 1,
    date_range: '12/2023 - Present',
    title: 'Front-End Developer (Product- AI Marketing Tools)',
    place: 'Gimmefy AI - Remote',
    type: 'WORK',
    sort_order: 1,
  },
  {
    id: 2,
    date_range: '06/2022 - 10/2023',
    title:
      'Front-End Developer (Products- Amotus online, Diamantra dialer, Call Center CRM)',
    place: 'Collaberus technologies pvt. ltd. - Delhi',
    type: 'WORK',
    sort_order: 2,
  },
  {
    id: 3,
    date_range: '10/2021 - 06/2022',
    title: 'Front-End & Technical Associate',
    place: 'Drishti IAS - Delhi',
    type: 'WORK',
    sort_order: 3,
  },
  {
    id: 4,
    date_range: '2022 - 2023',
    title: 'Bachelor of Computer Applications',
    place: 'Capital University, Jharkhand (First Division)',
    type: 'EDUCATION',
    sort_order: 1,
  },
  {
    id: 5,
    date_range: '2018 - 2021',
    title: 'CSE Diploma',
    place:
      'B.B.S.B.P. College, Sirhind, PSBTE & IT, Chandigarh (First Division)',
    type: 'EDUCATION',
    sort_order: 2,
  },
  {
    id: 6,
    date_range: '2018',
    title: 'High School',
    place: 'Guru Nanak Public Sr. Sec School, CBSE, Kanpur (First Division)',
    type: 'EDUCATION',
    sort_order: 3,
  },
];

export const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'Gimmefy AI',
    description:
      'AI-Enhanced Marketing Platform with 150+ automated tasks and personalized AI assistants designed for marketers, by marketers.',
    technologies: ['React', 'TypeScript', 'Mantine', 'Redux Toolkit'],
    link: 'https://gimmefy.ai',
    image_url: null,
    preview_url: 'https://gimmefy.ai',
    preview_mode: 'iframe',
    sort_order: 1,
  },
  {
    id: 2,
    title: 'Dialmantra Dialer',
    description:
      'Fast, easy and low cost solution to run a world class contact center without huge investments on hardware and software.',
    technologies: [
      'React.js',
      'Redux.js',
      'JavaScript',
      'JSSIP',
      'HTML',
      'Ant Design',
      'LESS',
    ],
    link: 'https://www.dialmantra.in/',
    image_url: null,
    preview_url: 'https://www.dialmantra.in/',
    preview_mode: 'iframe',
    sort_order: 2,
  },
  {
    id: 3,
    title: 'Amotus Online',
    description:
      'Amotus Online stands as an innovative remote screen sharing platform, offering a unique solution for enhanced collaboration and communication.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: 'https://amotus.online/',
    image_url: null,
    preview_url: 'https://amotus.online/',
    preview_mode: 'iframe',
    sort_order: 3,
  },
  {
    id: 4,
    title: 'Drishti IAS Website',
    description:
      'Improved institute website user interface and experience through collaborative efforts.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'API Integration'],
    link: 'https://drishtiias.com',
    image_url: null,
    preview_url: 'https://drishtiias.com',
    preview_mode: 'iframe',
    sort_order: 4,
  },
];

// ============================================================================
// Server Queries with Try/Catch and Fallbacks
// ============================================================================

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (!error && data) {
      return data as SiteSettings;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getSiteSettings query error:', err);
  }
  return defaultSiteSettings;
}

export async function getContacts(): Promise<Contact[]> {
  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as Contact[];
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getContacts query error:', err);
  }
  return defaultContacts;
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as SocialLink[];
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getSocialLinks query error:', err);
  }
  return defaultSocialLinks;
}

export async function getAboutCards(): Promise<AboutCard[]> {
  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from('about_cards')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as AboutCard[];
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getAboutCards query error:', err);
  }
  return defaultAboutCards;
}

export async function getSkillsByCategory(): Promise<
  SkillCategoryWithSkills[]
> {
  try {
    const supabase = createAnonClient();
    const { data: categories, error: catError } = await supabase
      .from('skill_categories')
      .select('*')
      .order('sort_order', { ascending: true });

    const { data: skills, error: skillError } = await supabase
      .from('skills')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!catError && !skillError && categories && categories.length > 0) {
      return categories.map((cat: any) => ({
        ...cat,
        skills: (skills || []).filter((s: any) => s.category_id === cat.id),
      }));
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getSkillsByCategory query error:', err);
  }
  return defaultSkillsByCategory;
}

export async function getExperiences(
  type?: 'EDUCATION' | 'WORK'
): Promise<Experience[]> {
  try {
    const supabase = createAnonClient();
    let query = supabase
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true });

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as Experience[];
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getExperiences query error:', err);
  }
  return type
    ? defaultExperiences.filter((e) => e.type === type)
    : defaultExperiences;
}

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      return data as Project[];
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getProjects query error:', err);
  }
  return defaultProjects;
}
