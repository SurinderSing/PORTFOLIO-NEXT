import { createAnonClient } from '@/utils/supabase/server-anon';
import {
  SiteSettings,
  Contact,
  SocialLink,
  AboutCard,
  SkillCategoryWithSkills,
  Experience,
  Project,
  BlogPost,
  Comment,
  Profile,
} from '@/types/database';

// ============================================================================
// Default Static Fallbacks (Used when Supabase is offline or unseeded)
// ============================================================================

export const defaultSiteSettings: SiteSettings = {
  id: 1,
  site_title: 'Surinder Singh | Senior Software Engineer',
  site_description:
    'Senior Software Engineer and Frontend Developer specializing in architecting and delivering high-performance, scalable web applications with React.js, Next.js, and TypeScript.',
  owner_name: 'Surinder Singh',
  owner_title: 'Senior Software Engineer',
  owner_summary:
    'Senior Software Engineer & Frontend Architect | Specializing in Micro-Frontends (Module Federation), Scalable SaaS Platforms, and AI-Assisted Workflows',
  home_heading:
    'Hi! I’m Surinder,<br />A <span>Senior Software Engineer</span> focused on building high-performance scalable web applications.',
  home_description:
    'Senior Software Engineer specializing in micro-frontend architecture with Module Federation (100K+ DAU), high-scale SaaS platforms, and AI-assisted workflows. Experienced in React, Next.js, TypeScript, and state management.',
  resume_summary:
    'Senior Software Engineer and Frontend Developer specializing in architecting and delivering high-performance, scalable web applications with React.js, TypeScript, and modern JavaScript frameworks. Proven record of accomplishment building micro-frontend architecture with Module Federation for 100K+ daily active users, cutting bundle size by 30%, and achieving 95%+ Lighthouse performance scores. Skilled in frontend architecture, state management, performance optimization, automated Jenkins CI/CD pipelines, and AI-assisted development workflows.',
  work_description:
    'A curated gallery of technical deployments and production systems. Featuring micro-frontend architectures, generative AI marketing platforms, low-latency VoIP dialers, and high-traffic educational portals.',
  contact_description:
    'Available for senior frontend engineering roles, micro-frontend architecture, high-concurrency SaaS scaling, and technical leadership opportunities.',
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
    title: 'Frontend Architecture & Micro-Frontends',
    description:
      'Specialized in React, Next.js, and Module Federation architectures supporting 100K+ DAU. Experienced with state management, core web vitals optimization, and design systems.',
    icon_name: 'code-xml',
    bg_color_class: 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
    sort_order: 1,
  },
  {
    id: 2,
    title: 'Generative AI & Tool Development',
    description:
      'Engineered in-browser canvas tools and automated multi-modal generation assistants using React, TypeScript, Mantine, and Polotno.',
    icon_name: 'sparkles',
    bg_color_class: 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
    sort_order: 2,
  },
  {
    id: 3,
    title: 'Real-Time Systems & VoIP Telephony',
    description:
      'Built high-concurrency cloud dialers and screen-sharing collaboration portals with WebSockets, WebRTC, JsSIP, and low-latency audio streaming.',
    icon_name: 'layers',
    bg_color_class: 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
    sort_order: 3,
  },
  {
    id: 4,
    title: 'Performance & CI/CD Pipelines',
    description:
      'Automated release-ready CI/CD pipelines in Jenkins and boosted Lighthouse scores to 95%+ across core web vitals.',
    icon_name: 'terminal',
    bg_color_class: 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
    sort_order: 4,
  },
];

export const defaultSkillsByCategory: SkillCategoryWithSkills[] = [
  {
    id: 1,
    name: 'Frontend',
    sort_order: 1,
    skills: [
      { id: 1, category_id: 1, name: 'React', sort_order: 1 },
      { id: 2, category_id: 1, name: 'Next.js', sort_order: 2 },
      { id: 3, category_id: 1, name: 'TypeScript', sort_order: 3 },
      { id: 4, category_id: 1, name: 'JavaScript', sort_order: 4 },
      { id: 5, category_id: 1, name: 'Redux Toolkit', sort_order: 5 },
      { id: 6, category_id: 1, name: 'Redux', sort_order: 6 },
      { id: 7, category_id: 1, name: 'Frontend Architecture', sort_order: 7 },
      { id: 8, category_id: 1, name: 'State Management', sort_order: 8 },
      {
        id: 9,
        category_id: 1,
        name: 'Micro-Frontend (Module Federation)',
        sort_order: 9,
      },
      { id: 10, category_id: 1, name: 'HTML5', sort_order: 10 },
      { id: 11, category_id: 1, name: 'CSS3', sort_order: 11 },
      { id: 12, category_id: 1, name: 'Tailwind CSS', sort_order: 12 },
    ],
  },
  {
    id: 2,
    name: 'Build & DevOps',
    sort_order: 2,
    skills: [
      { id: 13, category_id: 2, name: 'Git', sort_order: 1 },
      { id: 14, category_id: 2, name: 'GitHub', sort_order: 2 },
      { id: 15, category_id: 2, name: 'Jenkins', sort_order: 3 },
      { id: 16, category_id: 2, name: 'CI/CD Pipelines', sort_order: 4 },
      { id: 17, category_id: 2, name: 'Webpack', sort_order: 5 },
      { id: 18, category_id: 2, name: 'Vite', sort_order: 6 },
      { id: 19, category_id: 2, name: 'Docker', sort_order: 7 },
      { id: 20, category_id: 2, name: 'Nginx', sort_order: 8 },
      { id: 21, category_id: 2, name: 'ESLint', sort_order: 9 },
    ],
  },
  {
    id: 3,
    name: 'UI & Component Libraries',
    sort_order: 3,
    skills: [
      { id: 22, category_id: 3, name: 'ShadCN', sort_order: 1 },
      { id: 23, category_id: 3, name: 'Mantine', sort_order: 2 },
      { id: 24, category_id: 3, name: 'Ant Design', sort_order: 3 },
      { id: 25, category_id: 3, name: 'Material UI', sort_order: 4 },
      { id: 26, category_id: 3, name: 'Bootstrap', sort_order: 5 },
      { id: 27, category_id: 3, name: 'Reusable UI Components', sort_order: 6 },
      { id: 28, category_id: 3, name: 'Design Systems', sort_order: 7 },
    ],
  },
  {
    id: 4,
    name: 'Backend & APIs',
    sort_order: 4,
    skills: [
      { id: 29, category_id: 4, name: 'Node.js', sort_order: 1 },
      { id: 30, category_id: 4, name: 'Express.js', sort_order: 2 },
      { id: 31, category_id: 4, name: 'REST APIs', sort_order: 3 },
      { id: 32, category_id: 4, name: 'API Integration', sort_order: 4 },
      { id: 33, category_id: 4, name: 'MongoDB', sort_order: 5 },
      { id: 34, category_id: 4, name: 'SQL', sort_order: 6 },
      { id: 35, category_id: 4, name: 'WebSockets', sort_order: 7 },
      {
        id: 36,
        category_id: 4,
        name: 'Server-Sent Events (SSE)',
        sort_order: 8,
      },
    ],
  },
  {
    id: 5,
    name: 'Testing & Performance',
    sort_order: 5,
    skills: [
      { id: 37, category_id: 5, name: 'Unit Testing', sort_order: 1 },
      { id: 38, category_id: 5, name: 'Lighthouse', sort_order: 2 },
      { id: 39, category_id: 5, name: 'Core Web Vitals', sort_order: 3 },
      {
        id: 40,
        category_id: 5,
        name: 'Performance Optimization',
        sort_order: 4,
      },
    ],
  },
  {
    id: 6,
    name: 'AI & Developer Tools',
    sort_order: 6,
    skills: [
      { id: 41, category_id: 6, name: 'Cursor', sort_order: 1 },
      {
        id: 42,
        category_id: 6,
        name: 'AI-Assisted Development',
        sort_order: 2,
      },
      { id: 43, category_id: 6, name: 'Agentic Coding', sort_order: 3 },
      { id: 44, category_id: 6, name: 'Prompt Engineering', sort_order: 4 },
    ],
  },
];

export const defaultExperiences: Experience[] = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    place: 'Paytm | Noida, India',
    date_range: 'April 2026 – Present',
    type: 'WORK',
    sort_order: 1,
    description:
      '• Architected and deployed 2 micro-frontend applications using Module Federation, supporting 100K+ daily active users and millions of daily transactions while cutting bundle size by 30%\n• Shipped 6 core platform features within a focused 2-person engineering team, partnering directly with product to adapt the platform to fast-evolving business requirements\n• Reached 100%-unit test coverage and raised Lighthouse performance scores to 95%+ across core web vitals\n• Built automated CI/CD pipelines in Jenkins, keeping deployments and repositories consistently release-ready\n• Adopted Cursor and agentic AI coding workflows to speed up delivery while keeping repositories clean and fully documented',
    technologies: [
      'React',
      'TypeScript',
      'Module Federation',
      'Micro-Frontends',
      'Jenkins',
      'Redux Toolkit',
      'Webpack',
      'Unit Testing',
    ],
  },
  {
    id: 2,
    title: 'Frontend Engineer',
    place: 'Teemuno (gimmefy AI) | Singapore (Remote)',
    date_range: 'December 2023 – February 2026',
    type: 'WORK',
    sort_order: 2,
    description:
      '• Built AI-powered image and video editing tools using React, TypeScript, Mantine, and Polotno, enabling marketers to produce and edit media directly within the platform\n• Developed reusable UI component systems supporting 150+ automated AI marketing tasks and assistants\n• Implemented Redux Toolkit for complex state management and optimized deployment pipelines, improving client-side render speed by 25%',
    technologies: [
      'React',
      'TypeScript',
      'Mantine',
      'Polotno',
      'Redux Toolkit',
      'AI Tools',
      'Vite',
    ],
  },
  {
    id: 3,
    title: 'Frontend Engineer',
    place: 'Collaberus Technologies Pvt. Ltd. | New Delhi, India',
    date_range: 'June 2022 – October 2023',
    type: 'WORK',
    sort_order: 3,
    description:
      '• Led frontend development for 3 SaaS dialer and CRM platforms (Dialmantra Dialer, Amotus Online, Call Center CRM) using React, Redux, and Webpack\n• Built Admin, Customer, and Caller portals with Ant Design and WebSocket-driven real-time updates, cutting data latency by 35%\n• Integrated browser-based VoIP calling via JsSIP, removing hardware setup cost cutting onboarding time by 50%',
    technologies: [
      'React',
      'Redux',
      'WebSockets',
      'JsSIP',
      'Ant Design',
      'Webpack',
      'VoIP',
    ],
  },
  {
    id: 4,
    title: 'Frontend & Technical Associate',
    place: 'VDK Eduventures Pvt. Ltd. (Drishti IAS) | New Delhi, India',
    date_range: 'October 2021 – June 2022',
    type: 'WORK',
    sort_order: 4,
    description:
      '• Enhanced UI/UX responsiveness for an educational platform serving 500K+ monthly users, cutting initial page load times by 40%\n• Streamlined asynchronous API calls with JavaScript async/await and Axios, reducing client-side error and crash reports by 30%',
    technologies: [
      'JavaScript',
      'HTML5',
      'CSS3',
      'Axios',
      'REST APIs',
      'Performance Optimization',
    ],
  },
  {
    id: 5,
    title: 'Bachelor of Computer Applications (BCA)',
    place: 'Capital University',
    date_range: '2021 – 2023',
    type: 'EDUCATION',
    sort_order: 1,
    description:
      'Completed Bachelor of Computer Applications focused on software development, computer architecture, databases, and modern web engineering methodologies.',
    technologies: [
      'Software Engineering',
      'Data Structures',
      'Database Systems',
      'Web Technologies',
    ],
  },
  {
    id: 6,
    title: 'Diploma in Computer Science',
    place: 'B.B.S.B.P. College, Sirhind (PSBTE & IT, Chandigarh)',
    date_range: '2018 – 2021',
    type: 'EDUCATION',
    sort_order: 2,
    description:
      'Comprehensive 3-year technical diploma curriculum covering foundational computer science, C/C++, Java, data structures, and computer networks.',
    technologies: [
      'Computer Science',
      'Data Structures',
      'Algorithms',
      'OOP',
      'C/C++',
    ],
  },
];

export const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'Gimmefy AI',
    description:
      'AI-powered marketing and media creation platform featuring 150+ automated AI tasks, personalized assistants, and in-browser image/video canvas editors built with React, TypeScript, Mantine, and Polotno.',
    technologies: [
      'React',
      'TypeScript',
      'Mantine',
      'Polotno',
      'Redux Toolkit',
      'Generative AI',
      'Vite',
    ],
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
      'High-concurrency SaaS cloud telephony and dialer platform featuring browser-based VoIP calling via JsSIP, real-time WebSocket caller portals, and automated campaign management.',
    technologies: [
      'React',
      'Redux',
      'JsSIP',
      'WebSockets',
      'Ant Design',
      'Webpack',
      'VoIP',
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
      'Innovative remote screen-sharing and real-time collaboration SaaS platform engineered with low-latency media streams, responsive dashboard interfaces, and multi-user sessions.',
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'Express',
      'WebSockets',
      'WebRTC',
    ],
    link: 'https://amotus.online/',
    image_url: null,
    preview_url: 'https://amotus.online/',
    preview_mode: 'iframe',
    sort_order: 3,
  },
  {
    id: 4,
    title: 'Drishti IAS Platform',
    description:
      'High-traffic educational web portal serving 500K+ monthly active students, optimized for sub-second page loads, responsive learning workflows, and streamlined async API integrations.',
    technologies: [
      'JavaScript',
      'HTML5',
      'CSS3',
      'Axios',
      'REST APIs',
      'Core Web Vitals',
    ],
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

// ============================================================================
// Default Blog Posts & Comments Fallback Datasets
// ============================================================================

export const defaultAuthor: Profile = {
  id: '00000000-0000-0000-0000-000000000001',
  first_name: 'Surinder',
  last_name: 'Singh',
  username: 'surindersingh',
  phone: '+91 6386202678',
  bio: 'Senior Software Engineer & Frontend Architect',
  role: 'ADMIN' as const,
  status: 'ACTIVE' as const,
  profile_picture: null,
  created_at: '2026-01-01T00:00:00.000Z',
  updated_at: '2026-01-01T00:00:00.000Z',
};

export const defaultBlogPosts: BlogPost[] = [
  {
    id: 'b1111111-1111-1111-1111-111111111111',
    author_id: defaultAuthor.id,
    title: 'Architecting Scalable Micro-Frontends with Module Federation',
    slug: 'architecting-scalable-micro-frontends',
    excerpt:
      'How we decoupled a monolithic React dashboard into independently deployable micro-frontends serving 100K+ daily active users while reducing bundle sizes by 30%.',
    cover_image_url:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    tags: ['Micro-Frontends', 'Webpack', 'Architecture', 'React'],
    status: 'PUBLISHED',
    published_at: '2026-08-15T10:00:00.000Z',
    created_at: '2026-08-15T09:00:00.000Z',
    updated_at: '2026-08-15T10:00:00.000Z',
    author: defaultAuthor,
    likes_count: 0,
    comments_count: 0,
    content: `## The Monolithic Challenge

As modern frontend engineering teams scale, monolithic web applications often face severe architectural bottlenecks:
- Bloated JavaScript bundles exceeding 2MB initial parse time.
- Slow CI/CD build queues where a single change re-tests the whole codebase.
- Inter-team deployment collisions and code ownership ambiguity.

To solve this for high-scale enterprise applications handling **100K+ Daily Active Users (DAU)**, we implemented a decoupled **Micro-Frontend Architecture** powered by Webpack 5 Module Federation.

---

## Architectural Strategy: Host & Remotes

Instead of a single monolithic deployment, we broke the application into dedicated, isolated domains:
1. **Shell Container (Host):** Manages global authentication, layout shell, routing coordinator, and the shared theme provider.
2. **Analytics Remote:** Independently versioned micro-app rendering dynamic chart engines and telemetry streams.
3. **Billing & Subscriptions Remote:** Isolated payment workflows with specialized security sandboxing.

\`\`\`javascript
// Host Module Federation Config
new ModuleFederationPlugin({
  name: 'app_shell',
  remotes: {
    analyticsApp: 'analyticsApp@https://cdn.example.com/analytics/remoteEntry.js',
    billingApp: 'billingApp@https://cdn.example.com/billing/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
  },
});
\`\`\`

---

## Key Performance Results

By decoupling dependencies and executing independent chunk loading:
- **30% Initial Bundle Reduction:** Only the host container code is fetched initially; remote domains stream on demand.
- **Independent CI/CD Pipelines:** Domain teams deploy updates in under 2 minutes without re-bundling other modules.
- **95+ Lighthouse Score:** Zero blocking runtime scripts on critical first-paint rendering.`,
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    author_id: defaultAuthor.id,
    title: 'Mastering Next.js 14 App Router & React Server Components',
    slug: 'mastering-nextjs-14-rsc-architecture',
    excerpt:
      'A comprehensive guide to leveraging Server Components, Server Actions, cookieless static prerendering, and Suspense streaming for sub-second page loads.',
    cover_image_url:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'React', 'RSC', 'Performance'],
    status: 'PUBLISHED',
    published_at: '2026-08-20T14:30:00.000Z',
    created_at: '2026-08-20T14:00:00.000Z',
    updated_at: '2026-08-20T14:30:00.000Z',
    author: defaultAuthor,
    likes_count: 0,
    comments_count: 0,
    content: `## The Paradigm Shift of Server Components

React Server Components (RSC) fundamentally redefine the client-server boundary by executing component logic exclusively on the server at request or build time, streaming zero JavaScript to the browser for static UI elements.

---

## Three Fundamental Rules for RSC Success

### 1. Separate Read Operations from Interactive Mutations
Use cookieless anonymous queries for all public, read-only content to allow Next.js to prerender static HTML (SSG) and apply Incremental Static Regeneration (ISR):

\`\`\`typescript
// Server Component (RSC)
import { getBlogPosts } from '@/lib/supabase-queries';

export default async function BlogFeedPage() {
  const posts = await getBlogPosts();
  return <BlogGrid posts={posts} />;
}
\`\`\`

### 2. Isolate Interactivity to Leaf Components
Keep your main page wrappers as Server Components, and push \`'use client'\` down to specific interactive components (like search inputs, like buttons, or comment forms).

### 3. Leverage Server Actions for Mutations
Server Actions provide type-safe, endpoint-free mutation workflows with built-in cache revalidation:

\`\`\`typescript
'use server';

export async function addCommentAction(postId: string, content: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from('comments').insert({ post_id: postId, content });
  revalidatePath('/blog/[slug]');
  return { success: !error };
}
\`\`\`

---

## Conclusion

Combining React Server Components with optimized database query layers yields the best of both worlds: ultra-fast initial HTML rendering and rich client-side interactivity when needed.`,
  },
  {
    id: 'b3333333-3333-3333-3333-333333333333',
    author_id: defaultAuthor.id,
    title: 'Building Resilient AI Workflows & Token Economy in Web Platforms',
    slug: 'building-resilient-ai-workflows-token-economy',
    excerpt:
      'Practical patterns for integrating Large Language Models into modern web platforms with deterministic graph traversal, context pruning, and token optimization.',
    cover_image_url:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    tags: ['AI', 'LLM', 'System Design', 'Frontend'],
    status: 'PUBLISHED',
    published_at: '2026-08-25T09:15:00.000Z',
    created_at: '2026-08-25T08:00:00.000Z',
    updated_at: '2026-08-25T09:15:00.000Z',
    author: defaultAuthor,
    likes_count: 0,
    comments_count: 0,
    content: `## The Token Economy in Modern Web Engineering

Integrating generative AI models into modern web platforms requires careful attention to **token consumption**, latency, and prompt reliability.

---

## 1. Deterministic Knowledge Graphs vs Raw Prompting

Instead of passing thousands of lines of raw repository code into a prompt, architecting knowledge into structured, linked nodes (like Obsidian Maps of Content or Memory Banks) allows AI agents to traverse directly to relevant slices of context:

- **Reduces token footprint by 70–90%**
- **Eliminates hallucinated API interfaces**
- **Accelerates model inference latency**

---

## 2. Streaming Responses with UI Fallbacks

Always stream token output using Server-Sent Events (SSE) or WebSockets with fallback buffering to guarantee responsive user feedback even during high-load API queueing.

\`\`\`typescript
const response = await fetch('/api/ai/stream', { method: 'POST' });
const reader = response.body?.getReader();
// Stream chunks dynamically into UI state
\`\`\`

---

## Key Takeaway

Treating AI context as a structured, cacheable graph transforms slow, expensive prompts into high-speed, predictable developer experiences.`,
  },
];

export const defaultComments: Record<string, Comment[]> = {
  'b1111111-1111-1111-1111-111111111111': [
    {
      id: 'c1111111-1111-1111-1111-111111111111',
      user_id: '00000000-0000-0000-0000-000000000002',
      post_id: 'b1111111-1111-1111-1111-111111111111',
      story_id: null,
      content:
        'Great breakdown of Webpack Module Federation! How did you handle shared CSS tokens between the host and remote containers?',
      created_at: '2026-08-16T11:20:00.000Z',
      updated_at: '2026-08-16T11:20:00.000Z',
      likes_count: 6,
      user: {
        id: '00000000-0000-0000-0000-000000000002',
        first_name: 'Alex',
        last_name: 'Chen',
        username: 'alexchen',
        role: 'USER',
        profile_picture: null,
      },
    },
    {
      id: 'c1111111-1111-1111-1111-111111111112',
      user_id: defaultAuthor.id,
      post_id: 'b1111111-1111-1111-1111-111111111111',
      story_id: null,
      content:
        'Thanks Alex! We exposed a shared design token package via npm and injected CSS custom properties at the root layout of the Host shell, so remotes inherit theme variables automatically.',
      created_at: '2026-08-16T14:45:00.000Z',
      updated_at: '2026-08-16T14:45:00.000Z',
      likes_count: 12,
      user: defaultAuthor,
    },
  ],
  'b2222222-2222-2222-2222-222222222222': [
    {
      id: 'c2222222-2222-2222-2222-222222222221',
      user_id: '00000000-0000-0000-0000-000000000003',
      post_id: 'b2222222-2222-2222-2222-222222222222',
      story_id: null,
      content:
        'The tip about cookieless client queries for static prerendering is super critical. Solved an ISR caching issue on our production deployment.',
      created_at: '2026-08-21T09:00:00.000Z',
      updated_at: '2026-08-21T09:00:00.000Z',
      likes_count: 8,
      user: {
        id: '00000000-0000-0000-0000-000000000003',
        first_name: 'Priya',
        last_name: 'Sharma',
        username: 'priyasharma',
        role: 'USER',
        profile_picture: null,
      },
    },
  ],
};

// ============================================================================
// Blog & Comments Queries
// ============================================================================

export async function getBlogPosts(options?: {
  status?: string;
  tag?: string;
}): Promise<BlogPost[]> {
  try {
    const supabase = createAnonClient();
    let query = supabase
      .from('blog_posts')
      .select(
        '*, author:profiles(id, first_name, last_name, username, role, profile_picture), post_likes(id), comments(id)'
      )
      .order('published_at', { ascending: false, nullsFirst: false });

    if (options?.status) {
      query = query.eq('status', options.status);
    } else {
      query = query.eq('status', 'PUBLISHED');
    }

    if (options?.tag) {
      query = query.contains('tags', [options.tag]);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data.map((post: any) => ({
        ...post,
        likes_count: Array.isArray(post.post_likes)
          ? post.post_likes.length
          : 0,
        comments_count: Array.isArray(post.comments) ? post.comments.length : 0,
      })) as BlogPost[];
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getBlogPosts query error:', err);
  }

  // Fallback
  let filtered = defaultBlogPosts;
  if (options?.status) {
    filtered = filtered.filter((p) => p.status === options.status);
  }
  if (options?.tag) {
    filtered = filtered.filter((p) => p.tags.includes(options.tag!));
  }
  return filtered;
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select(
        '*, author:profiles(id, first_name, last_name, username, role, profile_picture), post_likes(id), comments(id)'
      )
      .eq('slug', slug)
      .single();

    if (!error && data) {
      return {
        ...data,
        likes_count: Array.isArray((data as any).post_likes)
          ? (data as any).post_likes.length
          : 0,
        comments_count: Array.isArray((data as any).comments)
          ? (data as any).comments.length
          : 0,
      } as BlogPost;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getBlogPostBySlug query error:', err);
  }

  // Fallback
  const found = defaultBlogPosts.find((p) => p.slug === slug);
  return found || null;
}

/**
 * Fetch a blog post for viewing by slug.
 * Checks public published posts first; if not found, falls back to
 * authenticated server client so authors and admins can preview drafts/pending reviews.
 */
export async function getBlogPostForViewing(
  slug: string
): Promise<BlogPost | null> {
  // 1. Try public query first
  const publicPost = await getBlogPostBySlug(slug);
  if (publicPost && publicPost.status === 'PUBLISHED') {
    return publicPost;
  }

  // 2. Fallback to authenticated server client (for author/admin drafts & pending review)
  try {
    const { createClient } = await import('@/utils/supabase/server');
    const authSupabase = createClient();
    const { data, error } = await authSupabase
      .from('blog_posts')
      .select(
        '*, author:profiles(id, first_name, last_name, username, role, profile_picture), post_likes(id), comments(id)'
      )
      .eq('slug', slug)
      .single();

    if (!error && data) {
      return {
        ...data,
        likes_count: Array.isArray((data as any).post_likes)
          ? (data as any).post_likes.length
          : 0,
        comments_count: Array.isArray((data as any).comments)
          ? (data as any).comments.length
          : 0,
      } as BlogPost;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getBlogPostForViewing auth fallback error:', err);
  }

  return publicPost || null;
}

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from('comments')
      .select(
        '*, user:profiles(id, first_name, last_name, username, role, profile_picture), comment_reactions(type)'
      )
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      return data.map((comment: any) => {
        const reactions = comment.comment_reactions || [];
        const likesCount = reactions.filter(
          (r: any) => r.type === 'like'
        ).length;
        return {
          ...comment,
          likes_count: likesCount,
        };
      }) as Comment[];
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getCommentsByPostId query error:', err);
  }

  return defaultComments[postId] || [];
}
