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
    id: 'a1000000-0000-0000-0000-000000000001',
    author_id: defaultAuthor.id,
    title:
      'Zero-Downtime Micro-Frontend Deployments: Dockerizing & Orchestrating with Kubernetes',
    slug: 'zero-downtime-micro-frontends-docker-kubernetes',
    excerpt:
      'How to containerize micro-frontends with multi-stage Docker builds and deploy them on Kubernetes clusters with zero downtime using Ingress routing, rolling updates, and HPA.',
    cover_image_url:
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=1200&auto=format&fit=crop',
    tags: ['Docker', 'Kubernetes', 'DevOps', 'Micro-Frontends', 'Cloud'],
    status: 'PUBLISHED',
    published_at: '2026-08-28T10:00:00.000Z',
    created_at: '2026-08-28T09:00:00.000Z',
    updated_at: '2026-08-28T10:00:00.000Z',
    author: defaultAuthor,
    likes_count: 14,
    comments_count: 2,
    content: `## The Challenge of Scaling Enterprise Micro-Frontends

As web platforms scale to hundreds of thousands of daily active users and multi-team collaboration models, deploying frontend updates without introducing outages or cache mismatches becomes a critical operational requirement.

In a micro-frontend architecture powered by **Module Federation**, each remote application and the container host must be versioned, containerized, and deployed independently without taking down the user experience.

---

## 1. Multi-Stage Docker Builds for Frontend Services

Optimizing Docker image sizes directly reduces deployment latency, pod startup times, and network bandwidth in Kubernetes clusters. Here is our production-ready multi-stage \`Dockerfile\` using Node.js Alpine and Nginx:

\`\`\`dockerfile
# Stage 1: Build & Bundle
FROM node:20-alpine AS builder
WORKDIR /app

# Leverage layer caching for dependencies
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit

COPY . .
ENV NODE_ENV=production
RUN npm run build

# Stage 2: Minimal Production Nginx Image
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Clean default nginx static files
RUN rm -rf ./*

# Copy build artifacts and custom reverse proxy config
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Run as non-root security context
USER 1001
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD wget -qO- http://localhost:8080/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
\`\`\`

By separating the build environment from the runtime Nginx container, we reduced container image sizes from **1.1 GB to under 32 MB**, speeding up container pull times in Kubernetes nodes by over **85%**.

---

## 2. Kubernetes Deployment & Zero-Downtime Rolling Updates

To guarantee zero downtime during continuous deployments, we configure declarative Kubernetes manifests with \`maxSurge\` and \`maxUnavailable\` controls alongside readiness and liveness probes:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: micro-remote-analytics
  labels:
    app: micro-remote-analytics
spec:
  replicas: 4
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 0
  selector:
    matchLabels:
      app: micro-remote-analytics
  template:
    metadata:
      labels:
        app: micro-remote-analytics
    spec:
      containers:
        - name: web
          image: registry.example.com/analytics-remote:v2.4.0
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080
          resources:
            requests:
              cpu: "100m"
              memory: "128Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          readinessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /healthz
              port: 8080
            initialDelaySeconds: 15
            periodSeconds: 10
\`\`\`

---

## 3. Ingress Routing & Dynamic Remote Entry Resolution

Kubernetes Ingress controllers route traffic to individual micro-frontend pods based on route prefixes or domain sub-paths, allowing container host applications to dynamically consume remote entries without centralized redeployments:

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: platform-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
spec:
  rules:
    - host: platform.example.com
      http:
        paths:
          - path: /remotes/analytics
            pathType: Prefix
            backend:
              service:
                name: micro-remote-analytics-svc
                port:
                  number: 8080
          - path: /
            pathType: Prefix
            backend:
              service:
                name: micro-host-shell-svc
                port:
                  number: 8080
\`\`\`

---

## 4. Key Takeaways & Performance Gains

1. **Zero Deployment Glitches:** Setting \`maxUnavailable: 0\` ensures old pods remain active until new pods pass all health probes.
2. **Independent Release Cadence:** Feature teams push updates to their specific Kubernetes namespace without coordinating with the host shell team.
3. **Automated Elasticity:** Horizontal Pod Autoscalers (HPA) automatically scale pods between 3 and 15 replicas based on CPU/memory telemetry during peak traffic bursts.`,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000002',
    author_id: defaultAuthor.id,
    title:
      'Advanced Frontend Performance Engineering: Slashing TTFB, LCP & CLS for High-Traffic Web Apps',
    slug: 'advanced-frontend-performance-engineering-core-web-vitals',
    excerpt:
      'Practical strategies to achieve 95+ Lighthouse scores across 500K+ monthly active users: bundle splitting, dynamic imports, font preloading, layout shift elimination, and memory profiling.',
    cover_image_url:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    tags: [
      'Performance',
      'Frontend',
      'Core Web Vitals',
      'React',
      'Optimization',
    ],
    status: 'PUBLISHED',
    published_at: '2026-08-26T14:30:00.000Z',
    created_at: '2026-08-26T13:30:00.000Z',
    updated_at: '2026-08-26T14:30:00.000Z',
    author: defaultAuthor,
    likes_count: 19,
    comments_count: 1,
    content: `## The High Cost of Frontend Latency

In modern enterprise web applications serving hundreds of thousands of concurrent users, every 100ms delay in Time to First Byte (TTFB) or Largest Contentful Paint (LCP) directly impacts conversion rates and user retention.

Achieving a **95+ Lighthouse Score** and maintaining green Core Web Vitals requires a systematic, multi-layered optimization strategy across the browser rendering pipeline.

---

## 1. Eliminating JavaScript Execution Bottlenecks

### Code Splitting & Dynamic Component Imports
Never bundle secondary UI (modals, heavy editors, charts, or export utilities) into the initial page chunk. Use route-level and component-level dynamic imports with React Suspense:

\`\`\`tsx
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically load heavy canvas / chart component only when visible
const InteractiveAnalyticsChart = dynamic(
  () => import("@/components/analytics/chart-canvas"),
  {
    loading: () => <Skeleton className="h-96 w-full rounded-xl" />,
    ssr: false,
  }
);
\`\`\`

### Tree-Shaking Icon & Utility Libraries
Direct namespace imports like \`import * as Icons from "lucide-react"\` pull thousands of unused symbols into the client bundle. Always use targeted named imports or modular path resolvers:

\`\`\`typescript
// Bad: Bloats bundle by 450KB+
import * as LucideIcons from "lucide-react";

// Good: Tree-shakes to under 2KB
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
\`\`\`

---

## 2. Slashing Largest Contentful Paint (LCP)

LCP measures when the main visual content of a page is painted. We optimize LCP through three core techniques:

1. **Preloading Critical Hero Assets:** Preload primary hero images and critical fonts in the HTML header:
\`\`\`html
<link rel="preload" as="image" href="/assets/hero-banner.webp" type="image/webp" fetchpriority="high" />
\`\`\`
2. **Next.js Image Optimization:** Utilize modern formats like AVIF and WebP with explicit responsive \`sizes\` and blur placeholders.
3. **Cookieless Edge Prerendering:** Eliminating server-side session lookups on public landing pages enables CDN edge caching with TTFB under **50ms**.

---

## 3. Zero Cumulative Layout Shift (CLS)

Cumulative Layout Shift occurs when DOM elements jump as asynchronous fonts, images, or ads load.

- **Set Explicit Aspect Ratios:** Always define \`aspect-ratio\` or height/width placeholders on images, iframes, and dynamic card slots.
- **Font Display Optional / Swap with Metric Matching:** Use \`next/font\` to automatically inject size-adjust and fallback font metric overrides, eliminating flash of unstyled text (FOUT) shifts.

\`\`\`css
/* Custom CSS Font Fallback Matching */
@font-face {
  font-family: 'Inter-Fallback';
  src: local('Arial');
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
  size-adjust: 107%;
}
\`\`\`

---

## 4. Production Results from Real-World Projects

Applying this architectural discipline to educational and SaaS portals serving 500K+ monthly users resulted in:
- **Lighthouse Performance Score:** Boosted from 68 to **97/100**
- **First Contentful Paint (FCP):** Reduced from 2.1s to **0.6s**
- **Cumulative Layout Shift (CLS):** Reduced from 0.24 to **0.002** (Green Zone)`,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000003',
    author_id: defaultAuthor.id,
    title:
      'Modern Web Rendering Decoded: Choosing Between SSR, CSR, SSG, and ISR in Next.js 14',
    slug: 'modern-web-rendering-ssr-csr-ssg-isr-nextjs',
    excerpt:
      'A deep comparative analysis of Server-Side Rendering (SSR), Client-Side Rendering (CSR), Static Site Generation (SSG), and Incremental Static Regeneration (ISR) in Next.js 14 App Router.',
    cover_image_url:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'SSR', 'ISR', 'React', 'Architecture'],
    status: 'PUBLISHED',
    published_at: '2026-08-24T09:15:00.000Z',
    created_at: '2026-08-24T08:00:00.000Z',
    updated_at: '2026-08-24T09:15:00.000Z',
    author: defaultAuthor,
    likes_count: 22,
    comments_count: 0,
    content: `## The Evolution of Rendering Strategies

Modern web developers no longer have to choose between a blank Single Page App (CSR) and heavy legacy server templates. Next.js 14 App Router and React Server Components (RSC) introduce granular hybrid rendering paradigms that can be tuned per route.

Understanding when and how to leverage **SSR, CSR, SSG, and ISR** is essential for balancing server resource consumption, database load, and sub-second page performance.

---

## 1. Comparing the Four Core Rendering Models

| Strategy | When Rendered | JavaScript Sent to Client | Best Use Case |
| :--- | :--- | :--- | :--- |
| **SSG** (Static Site Gen) | Build Time | Zero (for RSC) | Documentation, Marketing, Blogs |
| **ISR** (Incremental Static) | Background on Demand / Timer | Minimal / Hydrated components | E-commerce catalogs, Portfolio feeds |
| **SSR** (Server-Side) | Every Request | Hydration payloads | Real-time user dashboards, Live stock tickers |
| **CSR** (Client-Side) | In Browser Runtime | Full component trees | Interactive canvases, Canvas editors, Games |

---

## 2. Deep Dive: Incremental Static Regeneration (ISR)

ISR provides the speed of static HTML with the dynamic freshness of server rendering. Rather than rebuilding the entire static site for every content change, Next.js regenerates pages in the background when requested or via on-demand triggers:

### Time-Based Revalidation
\`\`\`typescript
// app/blog/page.tsx
import { getBlogPosts } from "@/lib/supabase-queries";

// Revalidate this static page at most every 60 seconds
export const revalidate = 60;

export default async function BlogFeedPage() {
  const posts = await getBlogPosts();
  return <BlogFeedClient posts={posts} />;
}
\`\`\`

### On-Demand Server Action Cache Invalidation
Whenever an admin updates a blog post or publishes a project, trigger immediate revalidation:

\`\`\`typescript
'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

export async function publishPostAction(formData: FormData) {
  const supabase = createClient();
  const slug = formData.get('slug') as string;
  
  await supabase.from('blog_posts').update({ status: 'PUBLISHED' }).eq('slug', slug);

  // Invalidate both the post detail and the blog feed instantly
  revalidatePath(\`/blog/\${slug}\`);
  revalidatePath('/blog');
  revalidatePath('/admin/blogs');
  
  return { success: true };
}
\`\`\`

---

## 3. The Golden Rule of Cookieless Server Queries

A common pitfall in Next.js 14 is reading cookies or session headers during public page rendering. Accessing \`cookies()\` or \`headers()\` inside a Server Component automatically forces the page into **Dynamic SSR**, disabling SSG and ISR.

To preserve lightning-fast static generation for public pages:
- Use an **anonymous, stateless Supabase/API client** (\`createAnonClient\`) for public reads.
- Use **authenticated cookie-based clients** only inside authenticated admin layouts, route handlers, or Server Actions.

---

## 4. Architectural Summary

- **Public Marketing & Content Pages:** Default to **SSG + ISR** with cookieless query helpers.
- **Dynamic User Portals & Admin Dashboards:** Use **SSR with Suspense boundaries** for streaming UI.
- **Complex In-Browser Tools (Editors, Audio Visualizers):** Isolate to **CSR** leaf components marked with \`'use client'\`.`,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000004',
    author_id: defaultAuthor.id,
    title:
      'Supabase vs Firebase in Production: Row-Level Security, Realtime Subscriptions & SQL Flexibility',
    slug: 'supabase-vs-firebase-production-architecture-rls',
    excerpt:
      'Comparing Supabase (PostgreSQL BaaS) and Firebase (NoSQL Firestore) for production SaaS: security policies, real-time sync performance, schema migrations, and edge computing integration.',
    cover_image_url:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop',
    tags: ['Supabase', 'Firebase', 'Database', 'PostgreSQL', 'Cloud'],
    status: 'PUBLISHED',
    published_at: '2026-08-22T11:00:00.000Z',
    created_at: '2026-08-22T10:00:00.000Z',
    updated_at: '2026-08-22T11:00:00.000Z',
    author: defaultAuthor,
    likes_count: 17,
    comments_count: 1,
    content: `## The Modern Backend-as-a-Service Landscape

For years, Google Firebase was the default BaaS platform for rapid prototyping. However, as web applications grow in complexity and require relational integrity, **Supabase (built on PostgreSQL)** has emerged as an enterprise-grade open-source alternative.

Having built high-concurrency production applications on both ecosystems, let us examine their architectural tradeoffs across security, querying, real-time sync, and cost scaling.

---

## 1. Database Paradigms: Relational SQL vs NoSQL Firestore

### Supabase (PostgreSQL)
- **Data Integrity:** Strict foreign keys, ACID compliance, enum constraints, and relational joins.
- **Complex Aggregations:** Full SQL support for window functions, full-text search (\`tsvector\`), CTEs, and views.
- **Extensions:** Native ecosystem access to PostGIS, pgvector (AI embeddings), and pg_cron.

### Firebase (Cloud Firestore)
- **Document Model:** Flexible JSON-like documents organized in collections and subcollections.
- **Deep Nesting:** Requires client-side stitching or duplicate denormalized data to perform multi-table lookups.
- **Search Limitations:** No native full-text search; requires external integrations like Algolia or MeiliSearch.

---

## 2. Security Architecture: Postgres RLS vs Firebase Security Rules

Supabase shifts security directly into the database engine using PostgreSQL **Row Level Security (RLS)** policies. This guarantees that whether queries originate from client apps, server actions, or external workers, data isolation is cryptographically guaranteed by PostgreSQL.

### Postgres RLS Policy Example
\`\`\`sql
-- Allow public users to read published posts
CREATE POLICY "Public posts viewable by everyone" ON public.blog_posts
  FOR SELECT USING (status = 'PUBLISHED');

-- Allow authors or admins to update
CREATE POLICY "Authors or admins can update posts" ON public.blog_posts
  FOR UPDATE USING (
    auth.uid() = author_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN'
    )
  );
\`\`\`

### Contrast with Firebase Rules
Firebase rules are evaluated in a proprietary DSL sandbox:
\`\`\`javascript
match /blog_posts/{postId} {
  allow read: if resource.data.status == 'PUBLISHED';
  allow update: if request.auth != null && (
    request.auth.uid == resource.data.author_id ||
    request.auth.token.role == 'ADMIN'
  );
}
\`\`\`

---

## 3. Real-Time Synchronization & Performance

Both platforms provide real-time updates over WebSockets:
- **Supabase Realtime:** Listens directly to PostgreSQL replication stream (WAL). It broadcasts \`INSERT\`, \`UPDATE\`, and \`DELETE\` events with row-level authorization filtering.
- **Firebase Firestore:** Document snapshot listeners sync state changes in real time. Very easy to implement on mobile, but can generate high read charges if listening to large collections.

---

## 4. Architectural Decision Matrix

| Requirement | Preferred Choice | Rationale |
| :--- | :--- | :--- |
| **Complex Relational Data & Foreign Keys** | **Supabase** | Native PostgreSQL joins and relational constraints prevent data corruption. |
| **AI Vectors & LLM Embeddings** | **Supabase** | Native \`pgvector\` extension allows embedding similarity search in the same DB. |
| **Mobile-First Offline Persistence** | **Firebase** | Firestore mobile SDKs feature built-in multi-gigabyte offline caches. |
| **Vendor Lock-in Avoidance** | **Supabase** | 100% open-source PostgreSQL; can be self-hosted on Docker or Kubernetes anywhere. |`,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000005',
    author_id: defaultAuthor.id,
    title:
      'Scaling Enterprise Frontend Architecture: Micro-Frontends with Module Federation & Automated CI/CD',
    slug: 'scaling-enterprise-micro-frontends-module-federation',
    excerpt:
      'How we decoupled a high-concurrency monolithic dashboard into independently deployable micro-frontends with Webpack 5 Module Federation, serving 100K+ DAU and reducing bundle sizes by 30%.',
    cover_image_url:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    tags: ['Micro-Frontends', 'React', 'TypeScript', 'CI/CD', 'Webpack'],
    status: 'PUBLISHED',
    published_at: '2026-08-20T16:00:00.000Z',
    created_at: '2026-08-20T15:00:00.000Z',
    updated_at: '2026-08-20T16:00:00.000Z',
    author: defaultAuthor,
    likes_count: 31,
    comments_count: 0,
    content: `## The Monolithic Challenge at Scale

As digital platforms scale to hundreds of thousands of daily transactions and tens of thousands of active users, monolithic frontend codebases suffer from distinct scaling bottlenecks:
- Giant build times exceeding 25 minutes per commit.
- Inter-team deployment collisions where an issue in one feature delays production releases for unrelated features.
- Monolithic bundles forcing users to download megabytes of code they may never execute.

To resolve these challenges for a platform handling **100K+ Daily Active Users**, we architected a decoupled **Micro-Frontend system powered by Webpack 5 Module Federation**.

---

## 1. Host Shell & Remote Architecture

Instead of compiling everything into a single bundle, we divided the frontend into isolated, autonomous domains:

1. **Host Shell Container:** Provides the navigation bar, layout chrome, global authentication context, and core routing orchestrator.
2. **Payment & Checkout Remote:** Independent micro-app handling high-security payment integrations and transaction history.
3. **Analytics & Merchant Dashboard Remote:** Visualizations, charting engines, and reporting tables.

\`\`\`javascript
// Container (Host) Webpack 5 Module Federation Configuration
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host_container',
      remotes: {
        paymentApp: 'paymentApp@https://cdn.example.com/payment/remoteEntry.js',
        merchantAnalytics: 'merchantAnalytics@https://cdn.example.com/analytics/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0', eager: true },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0', eager: true },
        '@reduxjs/toolkit': { singleton: true, requiredVersion: '^2.0.0' },
      },
    }),
  ],
};
\`\`\`

---

## 2. Dynamic Remote Fallback & Error Boundaries

Network partitions or CDN outages on a remote entry must never crash the entire host container. We wrap all remote entry points in resilient **Error Boundaries with Retry Strategies**:

\`\`\`tsx
import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';
import { SkeletonLoader } from '@/components/ui/skeleton-loader';

const RemotePaymentModule = React.lazy(() => import('paymentApp/CheckoutWidget'));

export function PaymentSection() {
  return (
    <ErrorBoundary fallback={<div className="p-4 border rounded">Payment module temporarily offline. Please refresh.</div>}>
      <Suspense fallback={<SkeletonLoader className="h-64 w-full" />}>
        <RemotePaymentModule />
      </Suspense>
    </ErrorBoundary>
  );
}
\`\`\`

---

## 3. Automated Jenkins & GitHub Actions Pipelines

Each micro-frontend repository contains its own CI/CD pipeline:
1. **Lint & Test:** Runs unit tests and ESLint in parallel.
2. **Webpack Build:** Generates standalone \`remoteEntry.js\` and content-hashed asset chunks.
3. **S3/Cloud CDN Deployment:** Deploys versioned bundles to edge storage buckets.
4. **Cache Purge:** Invalidates remote entry points with zero downtime.

---

## 4. Measurable Engineering Outcomes

- **30% Bundle Size Cut:** Initial page downloads dropped from 2.4 MB to 850 KB.
- **Independent 2-Minute Deployments:** Micro-apps deploy autonomously 15+ times a day without impacting sibling teams.
- **95%+ Lighthouse Rating:** Smooth sub-second hydration across core merchant workflows.`,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000006',
    author_id: defaultAuthor.id,
    title:
      'Building Low-Latency Real-Time Telephony & Screen Sharing: WebSockets, WebRTC & Docker',
    slug: 'low-latency-telephony-screensharing-websockets-docker',
    excerpt:
      'Engineering resilient browser-based VoIP and remote collaboration platforms using JsSIP, WebRTC data channels, WebSocket session heartbeats, and containerized cloud signaling nodes.',
    cover_image_url:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    tags: ['Cloud', 'WebSockets', 'WebRTC', 'Docker', 'System Design'],
    status: 'PUBLISHED',
    published_at: '2026-08-18T13:45:00.000Z',
    created_at: '2026-08-18T12:30:00.000Z',
    updated_at: '2026-08-18T13:45:00.000Z',
    author: defaultAuthor,
    likes_count: 26,
    comments_count: 1,
    content: `## The Architecture of Real-Time Web Applications

Building interactive SaaS platforms like cloud telephony dialers (**Dialmantra Dialer**) and low-latency remote collaboration tools (**Amotus Online**) requires mastering real-time network protocols: **WebSockets, WebRTC, and SIP over WebSockets (JsSIP)**.

Unlike traditional stateless HTTP APIs, real-time communications involve long-lived bidirectional channels, dynamic media stream negotiation (SDP/ICE), and resilient session reconnect handlers.

---

## 1. In-Browser VoIP Telephony with JsSIP & WebRTC

To eliminate expensive on-premise PBX hardware, we built browser-native VoIP calling portals directly in React using **JsSIP** communicating with cloud SIP gateways over secure WebSockets (\`wss://\`):

\`\`\`typescript
import { UA, WebSocketInterface } from 'jssip';

export function initializeSipUserAgent(extension: string, secret: string, serverWsUrl: string) {
  const socket = new WebSocketInterface(serverWsUrl);
  
  const configuration = {
    sockets: [socket],
    uri: \`sip:\${extension}@sip.dialmantra.in\`,
    password: secret,
    session_timers: false,
    register: true,
  };

  const phoneUA = new UA(configuration);

  phoneUA.on('registered', () => {
    console.log(\`[SIP] Extension \${extension} registered successfully.\`);
  });

  phoneUA.on('newRTCSession', ({ session }) => {
    session.on('accepted', () => {
      const remoteStream = session.connection.getRemoteStreams()[0];
      const audioElement = document.getElementById('remote-audio') as HTMLAudioElement;
      if (audioElement && remoteStream) {
        audioElement.srcObject = remoteStream;
        audioElement.play();
      }
    });
  });

  phoneUA.start();
  return phoneUA;
}
\`\`\`

---

## 2. Low-Latency Screen Sharing with WebRTC Media Streams

For real-time screen sharing and collaborative co-browsing, WebRTC peer-to-peer data channels and media tracks deliver sub-100ms video rendering:

\`\`\`typescript
// Screen Sharing Stream Capture
export async function startScreenShareSession(peerConnection: RTCPeerConnection) {
  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        frameRate: { ideal: 30, max: 60 },
        width: { ideal: 1920 },
        height: { ideal: 1080 },
      },
      audio: true,
    });

    // Replace video track on active peer connection
    const videoTrack = screenStream.getVideoTracks()[0];
    const sender = peerConnection.getSenders().find((s) => s.track?.kind === 'video');
    
    if (sender) {
      sender.replaceTrack(videoTrack);
    } else {
      peerConnection.addTrack(videoTrack, screenStream);
    }
  } catch (error) {
    console.error('Failed to acquire screen stream:', error);
  }
}
\`\`\`

---

## 3. Stateful Cloud Deployment with Docker & Sticky Sessions

Because WebSocket and WebRTC signaling sessions maintain in-memory state, deploying them across cloud clusters requires:
1. **Sticky Session Load Balancing:** Nginx or AWS ALB IP-hash routing to direct client reconnects to the same backend pod.
2. **Heartbeat & Backoff Reconnection:** Implementing exponential jitter backoff on the frontend to gracefully handle cellular network handovers.
3. **Containerized Microservices:** Dockerizing signaling daemons with high socket descriptor limits (\`ulimit -n 65535\`).

---

## 4. Key Performance Impact

- **35% Reduction in Data Latency:** Replacing polling with bidirectional WebSocket channels.
- **50% Faster Customer Onboarding:** Completely removed external softphones and hardware setup through in-browser JsSIP dialing.`,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000007',
    author_id: defaultAuthor.id,
    title:
      'Building Interactive AI Media Canvas Tools: React, Polotno, Redux Toolkit & Generative Pipelines',
    slug: 'building-interactive-ai-canvas-tools-react-polotno',
    excerpt:
      'Architecting browser-based image and video editors powered by generative AI assistants: canvas rendering with Polotno, undo/redo state serialization in Redux Toolkit, and streaming LLM tasks.',
    cover_image_url:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    tags: ['AI', 'Generative AI', 'React', 'Redux Toolkit', 'Vite'],
    status: 'PUBLISHED',
    published_at: '2026-08-16T10:30:00.000Z',
    created_at: '2026-08-16T09:00:00.000Z',
    updated_at: '2026-08-16T10:30:00.000Z',
    author: defaultAuthor,
    likes_count: 28,
    comments_count: 0,
    content: `## The Frontier of AI-Native Creative Interfaces

Building generative AI products like **Gimmefy AI** requires moving beyond basic text-chat inputs toward rich, interactive browser canvases where users can co-create, edit, and manipulate visual media alongside intelligent assistants.

Delivering this experience demands a rock-solid frontend architecture capable of orchestrating **Polotno canvas rendering, multi-layer vector operations, Redux Toolkit state serialization, and asynchronous AI generation streams**.

---

## 1. Canvas Layer Management with Polotno & React

The canvas engine must support complex graphical transformations (cropping, scaling, filters, text overlays, and AI inpainting) at 60 FPS:

\`\`\`tsx
import React, { useEffect, useRef } from 'react';
import { createStore } from 'polotno/model/store';
import { Workspace } from 'polotno/canvas/workspace';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';

export function AICanvasEditor({ initialImageUrl }: { initialImageUrl?: string }) {
  const storeRef = useRef(createStore());
  const store = storeRef.current;

  useEffect(() => {
    // Initialize canvas page
    const page = store.addPage();
    if (initialImageUrl) {
      page.addElement({
        type: 'image',
        src: initialImageUrl,
        x: 50,
        y: 50,
        width: 600,
        height: 400,
      });
    }
  }, [store, initialImageUrl]);

  return (
    <PolotnoContainer className="h-[800px] w-full border rounded-xl overflow-hidden shadow-2xl">
      <SidePanelWrap store={store} />
      <WorkspaceWrap>
        <Workspace store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
}
\`\`\`

---

## 2. Managing Complex Undo/Redo & State in Redux Toolkit

While the canvas maintains local DOM coordinates, the application state (active project, AI prompt history, layer revisions, export presets) is managed via **Redux Toolkit**:

\`\`\`typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CanvasState {
  activeTool: 'select' | 'text' | 'ai-inpaint' | 'crop';
  isGeneratingAI: boolean;
  historyTimeline: string[];
  activeStep: number;
}

const initialState: CanvasState = {
  activeTool: 'select',
  isGeneratingAI: false,
  historyTimeline: [],
  activeStep: 0,
};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setTool(state, action: PayloadAction<CanvasState['activeTool']>) {
      state.activeTool = action.payload;
    },
    recordSnapshot(state, action: PayloadAction<string>) {
      state.historyTimeline = state.historyTimeline.slice(0, state.activeStep + 1);
      state.historyTimeline.push(action.payload);
      state.activeStep = state.historyTimeline.length - 1;
    },
    undo(state) {
      if (state.activeStep > 0) state.activeStep -= 1;
    },
    redo(state) {
      if (state.activeStep < state.historyTimeline.length - 1) state.activeStep += 1;
    },
  },
});
\`\`\`

---

## 3. Streaming AI Generations Directly to Canvas Layers

Instead of blocking the UI during diffusion model generation, we stream progress percentages over Server-Sent Events (SSE) and replace temporary shimmer placeholders upon generation completion:

\`\`\`typescript
export async function generateAIAssetStream(prompt: string, onProgress: (pct: number) => void) {
  const response = await fetch('/api/ai/generate-canvas-layer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    const chunk = decoder.decode(value);
    const data = JSON.parse(chunk);
    if (data.progress) onProgress(data.progress);
    if (data.resultUrl) return data.resultUrl;
  }
}
\`\`\`

---

## 4. Engineering Impact at Gimmefy AI

- **150+ Automated AI Tasks:** Integrated seamless generative copywriting, background removal, and asset composition tools.
- **25% Render Speed Increase:** Optimized Redux state selector memoization to prevent unneeded canvas re-draws.`,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000008',
    author_id: defaultAuthor.id,
    title:
      'Production Kubernetes Blueprint: Nginx Ingress, Cert-Manager SSL & Cloud Native Workflows',
    slug: 'production-kubernetes-blueprint-nginx-ingress-ssl',
    excerpt:
      'A production-tested Kubernetes configuration guide: setting up declarative Ingress rules, automated Let’s Encrypt TLS certificates with Cert-Manager, Nginx reverse proxy buffers, and liveness probes.',
    cover_image_url:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    tags: ['Kubernetes', 'Cloud', 'Docker', 'Nginx', 'Security'],
    status: 'PUBLISHED',
    published_at: '2026-08-14T15:00:00.000Z',
    created_at: '2026-08-14T14:00:00.000Z',
    updated_at: '2026-08-14T15:00:00.000Z',
    author: defaultAuthor,
    likes_count: 24,
    comments_count: 0,
    content: `## Moving from Local Containers to Cloud Kubernetes

Running Docker containers locally with Docker Compose is straightforward. However, deploying multi-tier web applications into production requires **Kubernetes (K8s)** to manage declarative ingress routing, SSL certificate lifecycle, zero-downtime rolling updates, and container resilience.

Here is a tested production blueprint for setting up **Nginx Ingress with automatic Let’s Encrypt SSL via Cert-Manager**.

---

## 1. Automated SSL with Cert-Manager & Let's Encrypt

Cert-Manager automatically provisions and renews TLS certificates by solving HTTP-01 or DNS-01 ACME challenges without human intervention:

\`\`\`yaml
# cluster-issuer.yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-production
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: ssurindersingh100@gmail.com
    privateKeySecretRef:
      name: letsencrypt-production-key
    solvers:
      - http01:
          ingress:
            class: nginx
\`\`\`

---

## 2. Production Nginx Ingress with TLS Termination

The Ingress resource routes incoming HTTPS traffic to internal ClusterIP services and mounts the auto-provisioned TLS secret:

\`\`\`yaml
# production-ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: main-web-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-production
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: "25m"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "300"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "300"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - surindersingh.dev
        - api.surindersingh.dev
      secretName: portfolio-tls-cert
  rules:
    - host: surindersingh.dev
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 3000
    - host: api.surindersingh.dev
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: backend-api-service
                port:
                  number: 8080
\`\`\`

---

## 3. Container Resource Limits & Health Probes

To prevent runaway memory consumption (OOM kills) and ensure faulty pods are automatically restarted:

\`\`\`yaml
resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
  limits:
    cpu: "1000m"
    memory: "1024Mi"
livenessProbe:
  httpGet:
    path: /api/health
    port: 3000
  initialDelaySeconds: 15
  periodSeconds: 10
readinessProbe:
  httpGet:
    path: /api/health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
\`\`\`

---

## 4. Key Security Best Practices

1. **Non-Root Containers:** Always configure \`securityContext: runAsNonRoot: true\` in your pod spec.
2. **Network Policies:** Restrict pod-to-pod communication so frontend pods cannot directly touch sensitive database ports without passing through the API layer.
3. **Secret Management:** Never commit plaintext credentials to Git; use Kubernetes Secrets synced from cloud KMS or HashiCorp Vault.`,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000009',
    author_id: defaultAuthor.id,
    title:
      'Maximizing Core Web Vitals with Next.js 14 App Router, Server Components & Edge Caching',
    slug: 'maximizing-core-web-vitals-nextjs-14-rsc-edge-caching',
    excerpt:
      'Architectural techniques for lightning-fast web apps: cookieless anonymous queries for SSG/ISR, React Server Component streaming with Suspense boundaries, and CDN edge cache headers.',
    cover_image_url:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    tags: ['Next.js', 'Performance', 'Cloud', 'React', 'Core Web Vitals'],
    status: 'PUBLISHED',
    published_at: '2026-08-12T12:00:00.000Z',
    created_at: '2026-08-12T11:00:00.000Z',
    updated_at: '2026-08-12T12:00:00.000Z',
    author: defaultAuthor,
    likes_count: 29,
    comments_count: 0,
    content: `## The Paradigm of React Server Components (RSC)

React Server Components (RSC) fundamentally shift how frontend engineers think about performance. In Next.js 14 App Router, components render exclusively on the server by default, streaming lightweight serialized HTML to the browser with **zero client-side JavaScript execution cost**.

However, achieving top-tier performance requires knowing how to combine RSC with edge caching, Suspense streaming boundaries, and cookieless data layers.

---

## 1. Streaming with Suspense Boundaries

Instead of waiting for slow asynchronous data queries to block the entire initial page load, wrap asynchronous components in \`<Suspense>\` boundaries. The browser immediately receives the page shell and streams resolved components as soon as data is ready:

\`\`\`tsx
// app/dashboard/page.tsx
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { MetricsGrid } from './metrics-grid';
import { RecentActivities } from './recent-activities';

export default function DashboardPage() {
  return (
    <div className="container space-y-8 py-8">
      <h1 className="text-3xl font-bold">Platform Overview</h1>
      
      {/* Metrics render fast */}
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <MetricsGrid />
      </Suspense>

      {/* Slower database queries stream progressively without blocking navigation */}
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <RecentActivities />
      </Suspense>
    </div>
  );
}
\`\`\`

---

## 2. Cookieless Edge Caching for Static Generation

If a Server Component invokes \`cookies()\` or \`headers()\` directly, Next.js marks the entire subtree as **Dynamic**, turning off static generation and forcing a new server execution on every single incoming HTTP request.

### The Solution: Layered Client Separation
- **Anonymous Supabase Client (\`server-anon.ts\`):** Cookieless client used for all public read queries (\`getProjects\`, \`getBlogPosts\`, \`getSiteSettings\`). Enables Next.js to prerender static pages at build time and cache them across global CDN edge nodes.
- **Session-Aware Client (\`server.ts\`):** Used exclusively in authenticated routes (\`/admin/*\`) and Server Actions.

\`\`\`typescript
// src/utils/supabase/server-anon.ts
import { createClient } from '@supabase/supabase-js';

export function createAnonClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
\`\`\`

---

## 3. Granular Cache Revalidation via Server Actions

Instead of hardcoded time-based pollers, trigger on-demand revalidation whenever data mutations succeed:

\`\`\`typescript
'use server';
import { revalidatePath } from 'next/cache';

export async function updatePortfolioProject(projectId: number, updates: any) {
  // Mutation logic ...
  revalidatePath('/work');
  revalidatePath('/');
  return { success: true };
}
\`\`\`

---

## 4. Key Performance Gains

- **Time to First Byte (TTFB):** Under **45ms** when served from edge CDN caches.
- **Total Blocking Time (TBT):** **0ms** on static marketing and article pages due to zero hydration overhead.`,
  },
  {
    id: 'a1000000-0000-0000-0000-000000000010',
    author_id: defaultAuthor.id,
    title:
      'Predictable State at Enterprise Scale: Redux Toolkit, RTK Query & Optimistic Cache Synchronization',
    slug: 'enterprise-state-management-redux-toolkit-rtk-query',
    excerpt:
      'Managing complex, high-frequency state in enterprise React applications: normalized entity adapters, optimistic UI updates, middleware for real-time WebSocket state, and memoized re-render prevention.',
    cover_image_url:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    tags: ['Redux', 'TypeScript', 'State Management', 'React', 'Frontend'],
    status: 'PUBLISHED',
    published_at: '2026-08-10T09:00:00.000Z',
    created_at: '2026-08-10T08:00:00.000Z',
    updated_at: '2026-08-10T09:00:00.000Z',
    author: defaultAuthor,
    likes_count: 21,
    comments_count: 0,
    content: `## Taming State in High-Frequency React Applications

In complex frontend applications—such as real-time VoIP dialers, interactive canvas editors, and trading dashboards—uncontrolled state mutations lead to UI lag, race conditions, and unmaintainable code.

**Redux Toolkit (RTK)** paired with **RTK Query** provides an architecture for managing both global client-side UI state and synchronized server cache data.

---

## 1. Normalized State with \`createEntityAdapter\`

Instead of storing arrays of items that require $O(n)$ searches and expensive full-array updates, RTK's \`createEntityAdapter\` normalizes data into an \`{ ids: [], entities: {} }\` lookup table:

\`\`\`typescript
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export interface CallLog {
  id: string;
  callerNumber: string;
  durationSeconds: number;
  status: 'COMPLETED' | 'MISSED' | 'IN_PROGRESS';
  timestamp: string;
}

export const callLogsAdapter = createEntityAdapter<CallLog>({
  selectId: (log) => log.id,
  sortComparer: (a, b) => b.timestamp.localeCompare(a.timestamp),
});

export const callLogsSlice = createSlice({
  name: 'callLogs',
  initialState: callLogsAdapter.getInitialState({ isDialing: false }),
  reducers: {
    addCallLog: callLogsAdapter.addOne,
    updateCallStatus: callLogsAdapter.updateOne,
    removeCallLog: callLogsAdapter.removeOne,
    setDialingState(state, action) {
      state.isDialing = action.payload;
    },
  },
});
\`\`\`

---

## 2. Optimistic UI Updates with RTK Query

For instant user feedback, RTK Query allows you to update the local cached state immediately before the network mutation finishes, automatically rolling back if the request fails:

\`\`\`typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const portfolioApi = createApi({
  reducerPath: 'portfolioApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  tagTypes: ['Projects'],
  endpoints: (builder) => ({
    toggleProjectStar: builder.mutation<{ success: boolean }, { id: number; isStarred: boolean }>({
      query: ({ id, isStarred }) => ({
        url: \`projects/\${id}/star\`,
        method: 'POST',
        body: { isStarred },
      }),
      async onQueryStarted({ id, isStarred }, { dispatch, queryFulfilled }) {
        // Optimistically update the UI cache
        const patchResult = dispatch(
          portfolioApi.util.updateQueryData('getProjects' as any, undefined, (draft: any) => {
            const project = draft.find((p: any) => p.id === id);
            if (project) project.is_starred = isStarred;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          // Revert cache if server rejected
          patchResult.undo();
        }
      },
    }),
  }),
});
\`\`\`

---

## 3. Real-Time WebSocket Redux Middleware

Connecting incoming WebSocket messages directly to Redux actions keeps the UI reactive while keeping components purely presentational:

\`\`\`typescript
import { Middleware } from '@reduxjs/toolkit';
import { callLogsSlice } from './call-logs-slice';

export const webSocketMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action: any) => {
    if (action.type === 'ws/connect') {
      socket = new WebSocket(action.payload.url);
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'CALL_UPDATE') {
          store.dispatch(callLogsSlice.actions.updateCallStatus(message.data));
        }
      };
    }
    return next(action);
  };
};
\`\`\`

---

## 4. Best Practice Summary

1. **Keep Component State Local:** Only hoist state to Redux when it is shared across multiple disjoint subtrees.
2. **Use Normalized Entity Adapters:** Prevents expensive re-renders and simplifies CRUD modifications.
3. **Use Optimistic Updates:** Makes user actions feel instantaneous regardless of network latency.`,
  },
];

export const defaultComments: Record<string, Comment[]> = {
  'a1000000-0000-0000-0000-000000000001': [
    {
      id: 'c1000000-0000-0000-0000-000000000001',
      user_id: '6d71636f-9b3c-4403-b513-37c264e2f0b1',
      post_id: 'a1000000-0000-0000-0000-000000000001',
      story_id: null,
      content:
        'The multi-stage Docker build with Nginx Alpine is very slick! Did you encounter any issues with CORS when fetching remoteEntry.js across different Kubernetes subdomains?',
      created_at: '2026-08-28T11:20:00.000Z',
      updated_at: '2026-08-28T11:20:00.000Z',
      likes_count: 8,
      user: {
        id: '6d71636f-9b3c-4403-b513-37c264e2f0b1',
        first_name: 'Inder',
        last_name: 'Singh',
        username: 'Inder Singh',
        role: 'USER',
        profile_picture: null,
      },
    },
    {
      id: 'c1000000-0000-0000-0000-000000000002',
      user_id: defaultAuthor.id,
      post_id: 'a1000000-0000-0000-0000-000000000001',
      story_id: null,
      content:
        'Great question! We configured Nginx with `add_header Access-Control-Allow-Origin "*"` specifically on static `.js` assets, while keeping API routes strictly origin-checked.',
      created_at: '2026-08-28T12:05:00.000Z',
      updated_at: '2026-08-28T12:05:00.000Z',
      likes_count: 12,
      user: defaultAuthor,
    },
  ],
  'a1000000-0000-0000-0000-000000000002': [
    {
      id: 'c1000000-0000-0000-0000-000000000003',
      user_id: '201a326a-20b1-4450-8d67-10897701f508',
      post_id: 'a1000000-0000-0000-0000-000000000002',
      story_id: null,
      content:
        'The tip regarding cookieless Supabase client queries for static prerendering completely solved our ISR cache bypass issues on Vercel/Cloudflare!',
      created_at: '2026-08-26T15:10:00.000Z',
      updated_at: '2026-08-26T15:10:00.000Z',
      likes_count: 7,
      user: {
        id: '201a326a-20b1-4450-8d67-10897701f508',
        first_name: 'Surinder',
        last_name: 'Singh',
        username: 'surinder4.singh@paytmpayments.com',
        role: 'USER',
        profile_picture: null,
      },
    },
  ],
  'a1000000-0000-0000-0000-000000000004': [
    {
      id: 'c1000000-0000-0000-0000-000000000004',
      user_id: '6d71636f-9b3c-4403-b513-37c264e2f0b1',
      post_id: 'a1000000-0000-0000-0000-000000000004',
      story_id: null,
      content:
        'Postgres RLS is definitely one of the strongest reasons to choose Supabase over Firebase for relational data structures. Thanks for the thorough write-up!',
      created_at: '2026-08-22T13:40:00.000Z',
      updated_at: '2026-08-22T13:40:00.000Z',
      likes_count: 9,
      user: {
        id: '6d71636f-9b3c-4403-b513-37c264e2f0b1',
        first_name: 'Inder',
        last_name: 'Singh',
        username: 'Inder Singh',
        role: 'USER',
        profile_picture: null,
      },
    },
  ],
  'a1000000-0000-0000-0000-000000000006': [
    {
      id: 'c1000000-0000-0000-0000-000000000005',
      user_id: '201a326a-20b1-4450-8d67-10897701f508',
      post_id: 'a1000000-0000-0000-0000-000000000006',
      story_id: null,
      content:
        'Handling SIP over secure WebSockets in the browser without plugins was a huge milestone. Excellent breakdown of the JsSIP event lifecycle.',
      created_at: '2026-08-18T16:15:00.000Z',
      updated_at: '2026-08-18T16:15:00.000Z',
      likes_count: 11,
      user: {
        id: '201a326a-20b1-4450-8d67-10897701f508',
        first_name: 'Surinder',
        last_name: 'Singh',
        username: 'surinder4.singh@paytmpayments.com',
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
