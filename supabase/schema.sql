-- Schema definition for Supabase database (Idempotent & Safe to Run Repeatedly)

-- ==============================================================================
-- 1. Profiles Table (Synced with auth.users)
-- ==============================================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  first_name text,
  last_name text,
  phone text,
  bio text,
  profile_picture text,
  role text default 'USER' check (role in ('USER', 'ADMIN', 'MODERATOR')),
  status text default 'ACTIVE' check (status in ('ACTIVE', 'INACTIVE', 'SUSPENDED')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;
alter table public.profiles add column if not exists role text default 'USER';
alter table public.profiles add column if not exists status text default 'ACTIVE';

drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

drop policy if exists "Users can update their own profile." on public.profiles;
create policy "Users can update their own profile." on public.profiles
  for update using (auth.uid() = id);

-- Trigger function to handle new auth users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, first_name, last_name, phone, role, status)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'firstName',
    new.raw_user_meta_data->>'lastName',
    new.phone,
    coalesce(new.raw_user_meta_data->>'role', 'USER'),
    'ACTIVE'
  )
  on conflict (id) do update set
    username = coalesce(excluded.username, profiles.username),
    first_name = coalesce(excluded.first_name, profiles.first_name),
    last_name = coalesce(excluded.last_name, profiles.last_name),
    phone = coalesce(excluded.phone, profiles.phone),
    updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution for new user
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger execution to delete auth user when profile is deleted
create or replace function public.handle_profile_deleted()
returns trigger as $$
begin
  delete from auth.users where id = old.id;
  return old;
end;
$$ language plpgsql security definer;

drop trigger if exists on_profile_deleted on public.profiles;
create trigger on_profile_deleted
  after delete on public.profiles
  for each row execute procedure public.handle_profile_deleted();

-- ==============================================================================
-- 2. Site Settings Table (Single-row global configuration)
-- ==============================================================================
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  site_title text not null default 'Surinder Singh | Frontend Developer',
  site_description text not null default 'Frontend Developer specializing in React, Next.js, and AI tools.',
  owner_name text not null default 'Surinder Singh',
  owner_title text not null default 'Frontend Developer',
  owner_summary text not null default '4+ Years in Industry | Experienced Developer with Proficiency in Frontend and AI Tools',
  home_heading text not null default 'Hi, I’m Surinder. A Frontend Engineer focused on building scalable web applications.',
  home_description text not null default 'I build modern web applications where performance, scalability, and user experience matter. My work focuses on developing SaaS platforms, AI-powered tools, and real-time systems using React, Next.js, and TypeScript.',
  resume_summary text not null default '4+ Years in Industry | Experienced Developer with Proficiency in Frontend and AI Tools | Developed Successful Applications | Skilled in designing solid architecture | Skilled in managing work, time and resources.',
  work_description text not null default 'Here are some of my recent projects showcasing my expertise in frontend development, AI tools, and modern web technologies.',
  contact_description text not null default 'I am always open to discussing new projects, opportunities in tech world, partnerships and more so mentorship.',
  profile_photo_url text,
  resume_pdf_url text default '/assets/Surinder-Singh-Resume.pdf',
  formspree_id text default 'xrgwgbye',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.site_settings enable row level security;

drop policy if exists "Site settings are viewable by everyone." on public.site_settings;
create policy "Site settings are viewable by everyone." on public.site_settings
  for select using (true);

drop policy if exists "Only admins can modify site settings." on public.site_settings;
create policy "Only admins can modify site settings." on public.site_settings
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

-- ==============================================================================
-- 3. Contacts Table (Phone, Email, Location, etc.)
-- ==============================================================================
create table if not exists public.contacts (
  id bigint generated by default as identity primary key,
  type text not null,
  title text not null,
  detail text not null,
  icon_name text not null default 'phone',
  icon_color text default '#EC1C09',
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) null
);

alter table public.contacts enable row level security;

drop policy if exists "Contacts are viewable by everyone." on public.contacts;
create policy "Contacts are viewable by everyone." on public.contacts
  for select using (true);

drop policy if exists "Only admins can modify contacts." on public.contacts;
create policy "Only admins can modify contacts." on public.contacts
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

-- ==============================================================================
-- 4. Social Links Table (LinkedIn, GitHub, Instagram, etc.)
-- ==============================================================================
create table if not exists public.social_links (
  id bigint generated by default as identity primary key,
  name text not null,
  url text not null,
  icon_name text not null default 'github',
  icon_color text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) null
);

alter table public.social_links enable row level security;

drop policy if exists "Social links are viewable by everyone." on public.social_links;
create policy "Social links are viewable by everyone." on public.social_links
  for select using (true);

drop policy if exists "Only admins can modify social links." on public.social_links;
create policy "Only admins can modify social links." on public.social_links
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

-- ==============================================================================
-- 5. About Cards Table ("What I do!" cards on Home)
-- ==============================================================================
create table if not exists public.about_cards (
  id bigint generated by default as identity primary key,
  title text not null,
  description text not null,
  icon_name text not null default 'code-xml',
  bg_color_class text default 'bg-card dark:bg-gradient-to-r from-secondary to-primary',
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) null
);

alter table public.about_cards enable row level security;

drop policy if exists "About cards are viewable by everyone." on public.about_cards;
create policy "About cards are viewable by everyone." on public.about_cards
  for select using (true);

drop policy if exists "Only admins can modify about cards." on public.about_cards;
create policy "Only admins can modify about cards." on public.about_cards
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

-- ==============================================================================
-- 6. Skill Categories & Skills Tables (Resume Section Skills)
-- ==============================================================================
create table if not exists public.skill_categories (
  id bigint generated by default as identity primary key,
  name text not null,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) null
);

alter table public.skill_categories enable row level security;

drop policy if exists "Skill categories are viewable by everyone." on public.skill_categories;
create policy "Skill categories are viewable by everyone." on public.skill_categories
  for select using (true);

drop policy if exists "Only admins can modify skill categories." on public.skill_categories;
create policy "Only admins can modify skill categories." on public.skill_categories
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

create table if not exists public.skills (
  id bigint generated by default as identity primary key,
  category_id bigint references public.skill_categories(id) on delete cascade not null,
  name text not null,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) null
);

alter table public.skills enable row level security;

drop policy if exists "Skills are viewable by everyone." on public.skills;
create policy "Skills are viewable by everyone." on public.skills
  for select using (true);

drop policy if exists "Only admins can modify skills." on public.skills;
create policy "Only admins can modify skills." on public.skills
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

-- ==============================================================================
-- 7. Experiences Table (Education and Work timelines)
-- ==============================================================================
create table if not exists public.experiences (
  id bigint generated by default as identity primary key,
  date_range text not null,
  title text not null,
  place text not null,
  type text check (type in ('EDUCATION', 'WORK')) not null,
  description text null,
  technologies text[] default '{}',
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) null
);

alter table public.experiences enable row level security;
alter table public.experiences add column if not exists sort_order integer default 0;
alter table public.experiences add column if not exists description text null;
alter table public.experiences add column if not exists technologies text[] default '{}';

drop policy if exists "Experiences are viewable by everyone." on public.experiences;
create policy "Experiences are viewable by everyone." on public.experiences
  for select using (true);

drop policy if exists "Only admins can modify experiences." on public.experiences;
create policy "Only admins can modify experiences." on public.experiences
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

-- ==============================================================================
-- 8. Projects Table
-- ==============================================================================
create table if not exists public.projects (
  id bigint generated by default as identity primary key,
  title text not null,
  description text not null,
  technologies text[] not null default '{}',
  link text,
  github_url text,
  image_url text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) null
);

alter table public.projects enable row level security;
alter table public.projects add column if not exists sort_order integer default 0;
alter table public.projects add column if not exists preview_url text;
alter table public.projects add column if not exists preview_mode text default 'iframe' check (preview_mode in ('image', 'iframe'));
alter table public.projects add column if not exists github_url text;

drop policy if exists "Projects are viewable by everyone." on public.projects;
create policy "Projects are viewable by everyone." on public.projects
  for select using (true);

drop policy if exists "Only admins can modify projects." on public.projects;
create policy "Only admins can modify projects." on public.projects
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

-- ==============================================================================
-- 9. Future Multi-User Features: Blog Posts, Stories & Comments
-- ==============================================================================
create table if not exists public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  cover_image_url text,
  tags text[] default '{}',
  status text default 'DRAFT' check (status in ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) null
);

alter table public.blog_posts enable row level security;

drop policy if exists "Published blog posts are viewable by everyone." on public.blog_posts;
create policy "Published blog posts are viewable by everyone." on public.blog_posts
  for select using (
    status = 'PUBLISHED' or
    auth.uid() = author_id or
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

drop policy if exists "Authenticated users can create blog posts." on public.blog_posts;
create policy "Authenticated users can create blog posts." on public.blog_posts
  for insert with check (auth.uid() = author_id);

drop policy if exists "Authors or admins can update blog posts." on public.blog_posts;
create policy "Authors or admins can update blog posts." on public.blog_posts
  for update using (
    auth.uid() = author_id or
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

drop policy if exists "Authors or admins can delete blog posts." on public.blog_posts;
create policy "Authors or admins can delete blog posts." on public.blog_posts
  for delete using (
    auth.uid() = author_id or
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

create table if not exists public.stories (
  id uuid default gen_random_uuid() primary key,
  author_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text not null,
  cover_image_url text,
  status text default 'PUBLISHED' check (status in ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
  published_at timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) null
);

alter table public.stories enable row level security;

drop policy if exists "Published stories are viewable by everyone." on public.stories;
create policy "Published stories are viewable by everyone." on public.stories
  for select using (
    status = 'PUBLISHED' or
    auth.uid() = author_id or
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

drop policy if exists "Authenticated users can create stories." on public.stories;
create policy "Authenticated users can create stories." on public.stories
  for insert with check (auth.uid() = author_id);

drop policy if exists "Authors or admins can update stories." on public.stories;
create policy "Authors or admins can update stories." on public.stories
  for update using (
    auth.uid() = author_id or
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

drop policy if exists "Authors or admins can delete stories." on public.stories;
create policy "Authors or admins can delete stories." on public.stories
  for delete using (
    auth.uid() = author_id or
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

create table if not exists public.comments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  post_id uuid references public.blog_posts(id) on delete cascade,
  story_id uuid references public.stories(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) null,
  constraint comment_target_check check (
    (post_id is not null and story_id is null) or
    (post_id is null and story_id is not null)
  )
);

alter table public.comments enable row level security;

drop policy if exists "Comments are viewable by everyone." on public.comments;
create policy "Comments are viewable by everyone." on public.comments
  for select using (true);

drop policy if exists "Authenticated users can create comments." on public.comments;
create policy "Authenticated users can create comments." on public.comments
  for insert with check (auth.uid() = user_id);

drop policy if exists "Authors or admins can update comments." on public.comments;
create policy "Authors or admins can update comments." on public.comments
  for update using (
    auth.uid() = user_id or
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

drop policy if exists "Authors or admins can delete comments." on public.comments;
create policy "Authors or admins can delete comments." on public.comments
  for delete using (
    auth.uid() = user_id or
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

-- ==============================================================================
-- 10. Initial Seed Data (Safe Inserts)
-- ==============================================================================

-- Seed Site Settings
insert into public.site_settings (
  id,
  site_title,
  site_description,
  owner_name,
  owner_title,
  owner_summary,
  home_heading,
  home_description,
  resume_summary,
  work_description,
  contact_description,
  profile_photo_url,
  resume_pdf_url,
  formspree_id
) values (
  1,
  'Surinder Singh | Frontend Developer',
  'Frontend Developer specializing in React, Next.js, and AI tools. Building high-performance SaaS platforms and real-time systems.',
  'Surinder Singh',
  'Frontend Developer',
  '4+ Years in Industry | Experienced Developer with Proficiency in Frontend and AI Tools',
  'Hi, I’m Surinder. A Frontend Engineer focused on building scalable web applications.',
  'I build modern web applications where performance, scalability, and user experience matter. My work focuses on developing SaaS platforms, AI-powered tools, and real-time systems using React, Next.js, and TypeScript. I enjoy solving complex frontend problems such as managing large application state, designing reusable component architectures, and building interfaces that support high-interaction workflows.',
  '4+ Years in Industry | Experienced Developer with Proficiency in Frontend and AI Tools | Developed Successful Applications | Skilled in designing solid architecture | Skilled in managing work, time and resources.',
  'Here are some of my recent projects showcasing my expertise in frontend development, AI tools, and modern web technologies.',
  'I am always open to discussing new projects, opportunities in tech world, partnerships and more so mentorship. With 4+ years of experience in frontend development and AI tools, I am passionate about creating innovative solutions and helping others grow in their careers.',
  null,
  '/assets/Surinder-Singh-Resume.pdf',
  'xrgwgbye'
) on conflict (id) do nothing;

-- Seed Contacts
insert into public.contacts (type, title, detail, icon_name, icon_color, sort_order)
select 'phone', 'Phone', '+91 6386202678', 'phone', '#EC1C09', 1
where not exists (select 1 from public.contacts where type = 'phone');

insert into public.contacts (type, title, detail, icon_name, icon_color, sort_order)
select 'email', 'Email', 'ssurindersingh100@gmail.com', 'mail', '#FF9A1A', 2
where not exists (select 1 from public.contacts where type = 'email');

insert into public.contacts (type, title, detail, icon_name, icon_color, sort_order)
select 'location', 'Location', 'Delhi, India', 'map-pin', '#EC1C09', 3
where not exists (select 1 from public.contacts where type = 'location');

-- Seed Social Links
insert into public.social_links (name, url, icon_name, icon_color, sort_order)
select 'LinkedIn', 'https://www.linkedin.com/in/surinder-singh-dev/', 'linkedin', '#0077B5', 1
where not exists (select 1 from public.social_links where name = 'LinkedIn');

insert into public.social_links (name, url, icon_name, icon_color, sort_order)
select 'Github', 'https://github.com/SurinderSing', 'github', null, 2
where not exists (select 1 from public.social_links where name = 'Github');

insert into public.social_links (name, url, icon_name, icon_color, sort_order)
select 'Instagram', 'https://www.instagram.com/inder.sgh_/', 'instagram', '#d62976', 3
where not exists (select 1 from public.social_links where name = 'Instagram');

-- Seed About Cards ("What I do!")
insert into public.about_cards (title, description, icon_name, bg_color_class, sort_order)
select 'Frontend Development', 'Specialized in React, Next.js, and modern frontend technologies. Experienced with Redux Toolkit, TypeScript, and component libraries like Mantine, Ant Design, and Material-UI. Passionate about creating responsive, user-friendly applications with optimal performance.', 'code-xml', 'bg-card dark:bg-gradient-to-r from-secondary to-primary', 1
where not exists (select 1 from public.about_cards where title = 'Frontend Development');

insert into public.about_cards (title, description, icon_name, bg_color_class, sort_order)
select 'Full-Stack Development', 'Proficient in both frontend and backend development with Node.js, Express.js, MongoDB, and SQL. Experienced in building scalable applications, REST APIs, and managing CI/CD pipelines for efficient deployment and development workflows.', 'layout-grid', 'bg-tertiary-2', 2
where not exists (select 1 from public.about_cards where title = 'Full-Stack Development');

insert into public.about_cards (title, description, icon_name, bg_color_class, sort_order)
select 'AI Tools', 'Currently working as a Frontend Developer at Gimmefy AI, developing AI-powered tools. Skilled in AI tools, prompting, and creating intelligent solutions that boost user engagement and streamline workflows.', 'brain', 'bg-tertiary-2', 3
where not exists (select 1 from public.about_cards where title = 'AI Tools');

insert into public.about_cards (title, description, icon_name, bg_color_class, sort_order)
select 'Team Leadership & Mentoring', '4+ years of industry experience with proven track record of mentoring interns and managing team growth. Skilled in project management, time management, and collaborating effectively with cross-functional teams to deliver successful applications.', 'badge-help', 'bg-card dark:bg-gradient-to-r from-secondary to-primary', 4
where not exists (select 1 from public.about_cards where title = 'Team Leadership & Mentoring');

insert into public.about_cards (title, description, icon_name, bg_color_class, sort_order)
select 'Performance Optimization', 'Expert in optimizing application performance, reducing load times, and implementing best practices. Experience with Webpack, Vite.js, ESLint, and modern build tools to ensure fast, efficient, and maintainable codebases.', 'zap', 'bg-card dark:bg-gradient-to-r from-secondary to-primary', 5
where not exists (select 1 from public.about_cards where title = 'Performance Optimization');

insert into public.about_cards (title, description, icon_name, bg_color_class, sort_order)
select 'Communication & Problem Solving', 'Strong communication skills and excellent problem-solving abilities. Experienced in managing work, time, and resources effectively. Passionate about designing solid architecture and creating innovative solutions for complex challenges.', 'slack', 'bg-tertiary-2', 6
where not exists (select 1 from public.about_cards where title = 'Communication & Problem Solving');

-- Seed Skill Categories and Skills
insert into public.skill_categories (id, name, sort_order) values
(1, 'Frontend', 1),
(2, 'Build & DevOps', 2),
(3, 'UI & Component Libraries', 3),
(4, 'Backend & APIs', 4),
(5, 'Testing & Performance', 5),
(6, 'AI & Developer Tools', 6)
on conflict (id) do nothing;

insert into public.skills (category_id, name, sort_order) values
(1, 'React', 1), (1, 'Next.js', 2), (1, 'TypeScript', 3), (1, 'JavaScript', 4), (1, 'Redux Toolkit', 5), (1, 'Redux', 6), (1, 'Frontend Architecture', 7), (1, 'State Management', 8), (1, 'Micro-Frontend (Module Federation)', 9), (1, 'HTML5', 10), (1, 'CSS3', 11), (1, 'Tailwind CSS', 12),
(2, 'Git', 1), (2, 'GitHub', 2), (2, 'Jenkins', 3), (2, 'CI/CD Pipelines', 4), (2, 'Webpack', 5), (2, 'Vite', 6), (2, 'Docker', 7), (2, 'Nginx', 8), (2, 'ESLint', 9),
(3, 'ShadCN', 1), (3, 'Mantine', 2), (3, 'Ant Design', 3), (3, 'Material UI', 4), (3, 'Bootstrap', 5), (3, 'Reusable UI Components', 6), (3, 'Design Systems', 7),
(4, 'Node.js', 1), (4, 'Express.js', 2), (4, 'REST APIs', 3), (4, 'API Integration', 4), (4, 'MongoDB', 5), (4, 'SQL', 6), (4, 'WebSockets', 7), (4, 'Server-Sent Events (SSE)', 8),
(5, 'Unit Testing', 1), (5, 'Lighthouse', 2), (5, 'Core Web Vitals', 3), (5, 'Performance Optimization', 4),
(6, 'Cursor', 1), (6, 'AI-Assisted Development', 2), (6, 'Agentic Coding', 3), (6, 'Prompt Engineering', 4)
on conflict (id) do nothing;

-- Seed Experiences (WORK)
insert into public.experiences (id, date_range, title, place, type, sort_order, description, technologies) values
(1, 'April 2026 – Present', 'Senior Software Engineer', 'Paytm | Noida, India', 'WORK', 1,
'• Architected and deployed 2 micro-frontend applications using Module Federation, supporting 100K+ daily active users and millions of daily transactions while cutting bundle size by 30%
• Shipped 6 core platform features within a focused 2-person engineering team, partnering directly with product to adapt the platform to fast-evolving business requirements
• Reached 100%-unit test coverage and raised Lighthouse performance scores to 95%+ across core web vitals
• Built automated CI/CD pipelines in Jenkins, keeping deployments and repositories consistently release-ready
• Adopted Cursor and agentic AI coding workflows to speed up delivery while keeping repositories clean and fully documented',
array['React', 'TypeScript', 'Module Federation', 'Micro-Frontends', 'Jenkins', 'Redux Toolkit', 'Webpack', 'Unit Testing']),

(2, 'December 2023 – February 2026', 'Frontend Engineer', 'Teemuno (gimmefy AI) | Singapore (Remote)', 'WORK', 2,
'• Built AI-powered image and video editing tools using React, TypeScript, Mantine, and Polotno, enabling marketers to produce and edit media directly within the platform
• Developed reusable UI component systems supporting 150+ automated AI marketing tasks and assistants
• Implemented Redux Toolkit for complex state management and optimized deployment pipelines, improving client-side render speed by 25%',
array['React', 'TypeScript', 'Mantine', 'Polotno', 'Redux Toolkit', 'AI Tools', 'Vite']),

(3, 'June 2022 – October 2023', 'Frontend Engineer', 'Collaberus Technologies Pvt. Ltd. | New Delhi, India', 'WORK', 3,
'• Led frontend development for 3 SaaS dialer and CRM platforms (Dialmantra Dialer, Amotus Online, Call Center CRM) using React, Redux, and Webpack
• Built Admin, Customer, and Caller portals with Ant Design and WebSocket-driven real-time updates, cutting data latency by 35%
• Integrated browser-based VoIP calling via JsSIP, removing hardware setup cost cutting onboarding time by 50%',
array['React', 'Redux', 'WebSockets', 'JsSIP', 'Ant Design', 'Webpack', 'VoIP']),

(4, 'October 2021 – June 2022', 'Frontend & Technical Associate', 'VDK Eduventures Pvt. Ltd. (Drishti IAS) | New Delhi, India', 'WORK', 4,
'• Enhanced UI/UX responsiveness for an educational platform serving 500K+ monthly users, cutting initial page load times by 40%
• Streamlined asynchronous API calls with JavaScript async/await and Axios, reducing client-side error and crash reports by 30%',
array['JavaScript', 'HTML5', 'CSS3', 'Axios', 'REST APIs', 'Performance Optimization']),

-- Seed Experiences (EDUCATION)
(5, '2021 – 2023', 'Bachelor of Computer Applications (BCA)', 'Capital University', 'EDUCATION', 1,
'Completed Bachelor of Computer Applications focused on software development, computer architecture, databases, and modern web engineering methodologies.',
array['Software Engineering', 'Data Structures', 'Database Systems', 'Web Technologies']),

(6, '2018 – 2021', 'Diploma in Computer Science', 'B.B.S.B.P. College, Sirhind (PSBTE & IT, Chandigarh)', 'EDUCATION', 2,
'Comprehensive 3-year technical diploma curriculum covering foundational computer science, C/C++, Java, data structures, and computer networks.',
array['Computer Science', 'Data Structures', 'Algorithms', 'OOP', 'C/C++'])
on conflict (id) do nothing;

-- Seed Projects
insert into public.projects (id, title, description, technologies, link, image_url, preview_url, preview_mode, sort_order) values
(1, 'Gimmefy AI', 'AI-powered marketing and media creation platform featuring 150+ automated AI tasks, personalized assistants, and in-browser image/video canvas editors built with React, TypeScript, Mantine, and Polotno.', array['React', 'TypeScript', 'Mantine', 'Polotno', 'Redux Toolkit', 'Generative AI', 'Vite'], 'https://gimmefy.ai', null, 'https://gimmefy.ai', 'iframe', 1),
(2, 'Dialmantra Dialer', 'High-concurrency SaaS cloud telephony and dialer platform featuring browser-based VoIP calling via JsSIP, real-time WebSocket caller portals, and automated campaign management.', array['React', 'Redux', 'JsSIP', 'WebSockets', 'Ant Design', 'Webpack', 'VoIP'], 'https://www.dialmantra.in/', null, 'https://www.dialmantra.in/', 'iframe', 2),
(3, 'Amotus Online', 'Innovative remote screen-sharing and real-time collaboration SaaS platform engineered with low-latency media streams, responsive dashboard interfaces, and multi-user sessions.', array['React', 'Node.js', 'MongoDB', 'Express', 'WebSockets', 'WebRTC'], 'https://amotus.online/', null, 'https://amotus.online/', 'iframe', 3),
(4, 'Drishti IAS Platform', 'High-traffic educational web portal serving 500K+ monthly active students, optimized for sub-second page loads, responsive learning workflows, and streamlined async API integrations.', array['JavaScript', 'HTML5', 'CSS3', 'Axios', 'REST APIs', 'Core Web Vitals'], 'https://drishtiias.com', null, 'https://drishtiias.com', 'iframe', 4)
on conflict (id) do nothing;

-- ==============================================================================
-- 11. Supabase Storage Buckets & RLS Policies
-- ==============================================================================

-- Create "media" storage bucket if it does not already exist
insert into storage.buckets (id, name, public) 
values ('media', 'media', true)
on conflict (id) do nothing;

-- 1. Public Read Policy (Allow anyone to view public media assets)
drop policy if exists "Public media is viewable by everyone" on storage.objects;
create policy "Public media is viewable by everyone" on storage.objects
  for select using (bucket_id = 'media');

-- 2. Admin Upload Policy (Allow ADMIN profiles to upload files to media bucket)
drop policy if exists "Admins can upload to media" on storage.objects;
create policy "Admins can upload to media" on storage.objects
  for insert with check (
    bucket_id = 'media' and
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

-- 3. Admin Update Policy (Allow ADMIN profiles to update files in media bucket)
drop policy if exists "Admins can update media" on storage.objects;
create policy "Admins can update media" on storage.objects
  for update using (
    bucket_id = 'media' and
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

-- 4. Admin Delete Policy (Allow ADMIN profiles to delete files in media bucket)
drop policy if exists "Admins can delete media" on storage.objects;
create policy "Admins can delete media" on storage.objects
  for delete using (
    bucket_id = 'media' and
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'ADMIN'
    )
  );

