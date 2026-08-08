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

-- Trigger execution
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

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
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) null
);

alter table public.experiences enable row level security;
alter table public.experiences add column if not exists sort_order integer default 0;

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
  image_url text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) null
);

alter table public.projects enable row level security;
alter table public.projects add column if not exists sort_order integer default 0;

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
(1, 'Frontend Skills', 1),
(2, 'Component Libraries', 2),
(3, 'Additional Skills', 3),
(4, 'Backend & Databases', 4),
(5, 'Soft Skills', 5)
on conflict (id) do nothing;

insert into public.skills (category_id, name, sort_order)
select 1, 'React', 1 where not exists (select 1 from public.skills where category_id = 1 and name = 'React');
insert into public.skills (category_id, name, sort_order)
select 1, 'Next.js', 2 where not exists (select 1 from public.skills where category_id = 1 and name = 'Next.js');
insert into public.skills (category_id, name, sort_order)
select 1, 'Redux', 3 where not exists (select 1 from public.skills where category_id = 1 and name = 'Redux');
insert into public.skills (category_id, name, sort_order)
select 1, 'Redux Toolkit', 4 where not exists (select 1 from public.skills where category_id = 1 and name = 'Redux Toolkit');
insert into public.skills (category_id, name, sort_order)
select 1, 'Tailwind', 5 where not exists (select 1 from public.skills where category_id = 1 and name = 'Tailwind');
insert into public.skills (category_id, name, sort_order)
select 1, 'HTML5', 6 where not exists (select 1 from public.skills where category_id = 1 and name = 'HTML5');
insert into public.skills (category_id, name, sort_order)
select 1, 'CSS3', 7 where not exists (select 1 from public.skills where category_id = 1 and name = 'CSS3');
insert into public.skills (category_id, name, sort_order)
select 1, 'TypeScript', 8 where not exists (select 1 from public.skills where category_id = 1 and name = 'TypeScript');
insert into public.skills (category_id, name, sort_order)
select 1, 'JavaScript', 9 where not exists (select 1 from public.skills where category_id = 1 and name = 'JavaScript');

insert into public.skills (category_id, name, sort_order)
select 2, 'ShadCn', 1 where not exists (select 1 from public.skills where category_id = 2 and name = 'ShadCn');
insert into public.skills (category_id, name, sort_order)
select 2, 'Mantine', 2 where not exists (select 1 from public.skills where category_id = 2 and name = 'Mantine');
insert into public.skills (category_id, name, sort_order)
select 2, 'AntDesign', 3 where not exists (select 1 from public.skills where category_id = 2 and name = 'AntDesign');
insert into public.skills (category_id, name, sort_order)
select 2, 'MaterialUI', 4 where not exists (select 1 from public.skills where category_id = 2 and name = 'MaterialUI');
insert into public.skills (category_id, name, sort_order)
select 2, 'Bootstrap', 5 where not exists (select 1 from public.skills where category_id = 2 and name = 'Bootstrap');

insert into public.skills (category_id, name, sort_order)
select 3, 'Websockets', 1 where not exists (select 1 from public.skills where category_id = 3 and name = 'Websockets');
insert into public.skills (category_id, name, sort_order)
select 3, 'Git', 2 where not exists (select 1 from public.skills where category_id = 3 and name = 'Git');
insert into public.skills (category_id, name, sort_order)
select 3, 'GitHub', 3 where not exists (select 1 from public.skills where category_id = 3 and name = 'GitHub');
insert into public.skills (category_id, name, sort_order)
select 3, 'CI/CD Pipeline', 4 where not exists (select 1 from public.skills where category_id = 3 and name = 'CI/CD Pipeline');
insert into public.skills (category_id, name, sort_order)
select 3, 'REST API', 5 where not exists (select 1 from public.skills where category_id = 3 and name = 'REST API');
insert into public.skills (category_id, name, sort_order)
select 3, 'Linux', 6 where not exists (select 1 from public.skills where category_id = 3 and name = 'Linux');
insert into public.skills (category_id, name, sort_order)
select 3, 'Nginx', 7 where not exists (select 1 from public.skills where category_id = 3 and name = 'Nginx');
insert into public.skills (category_id, name, sort_order)
select 3, 'ESLint', 8 where not exists (select 1 from public.skills where category_id = 3 and name = 'ESLint');
insert into public.skills (category_id, name, sort_order)
select 3, 'Webpack', 9 where not exists (select 1 from public.skills where category_id = 3 and name = 'Webpack');
insert into public.skills (category_id, name, sort_order)
select 3, 'Vite.js', 10 where not exists (select 1 from public.skills where category_id = 3 and name = 'Vite.js');
insert into public.skills (category_id, name, sort_order)
select 3, 'AI Tools', 11 where not exists (select 1 from public.skills where category_id = 3 and name = 'AI Tools');
insert into public.skills (category_id, name, sort_order)
select 3, 'Prompting', 12 where not exists (select 1 from public.skills where category_id = 3 and name = 'Prompting');

insert into public.skills (category_id, name, sort_order)
select 4, 'Node.js', 1 where not exists (select 1 from public.skills where category_id = 4 and name = 'Node.js');
insert into public.skills (category_id, name, sort_order)
select 4, 'Express.js', 2 where not exists (select 1 from public.skills where category_id = 4 and name = 'Express.js');
insert into public.skills (category_id, name, sort_order)
select 4, 'MongoDB', 3 where not exists (select 1 from public.skills where category_id = 4 and name = 'MongoDB');
insert into public.skills (category_id, name, sort_order)
select 4, 'SQL', 4 where not exists (select 1 from public.skills where category_id = 4 and name = 'SQL');

insert into public.skills (category_id, name, sort_order)
select 5, 'Problem Solving', 1 where not exists (select 1 from public.skills where category_id = 5 and name = 'Problem Solving');
insert into public.skills (category_id, name, sort_order)
select 5, 'Team Collaboration', 2 where not exists (select 1 from public.skills where category_id = 5 and name = 'Team Collaboration');
insert into public.skills (category_id, name, sort_order)
select 5, 'Communication', 3 where not exists (select 1 from public.skills where category_id = 5 and name = 'Communication');
insert into public.skills (category_id, name, sort_order)
select 5, 'Time Management', 4 where not exists (select 1 from public.skills where category_id = 5 and name = 'Time Management');
insert into public.skills (category_id, name, sort_order)
select 5, 'Mentoring', 5 where not exists (select 1 from public.skills where category_id = 5 and name = 'Mentoring');
insert into public.skills (category_id, name, sort_order)
select 5, 'Project Management', 6 where not exists (select 1 from public.skills where category_id = 5 and name = 'Project Management');

-- Seed Experiences (WORK)
insert into public.experiences (date_range, title, place, type, sort_order)
select '12/2023 - Present', 'Front-End Developer (Product- AI Marketing Tools)', 'Gimmefy AI - Remote', 'WORK', 1
where not exists (select 1 from public.experiences where title like 'Front-End Developer (Product- AI Marketing Tools)%');

insert into public.experiences (date_range, title, place, type, sort_order)
select '06/2022 - 10/2023', 'Front-End Developer (Products- Amotus online, Diamantra dialer, Call Center CRM)', 'Collaberus technologies pvt. ltd. - Delhi', 'WORK', 2
where not exists (select 1 from public.experiences where title like 'Front-End Developer (Products-%');

insert into public.experiences (date_range, title, place, type, sort_order)
select '10/2021 - 06/2022', 'Front-End & Technical Associate', 'Drishti IAS - Delhi', 'WORK', 3
where not exists (select 1 from public.experiences where title = 'Front-End & Technical Associate');

-- Seed Experiences (EDUCATION)
insert into public.experiences (date_range, title, place, type, sort_order)
select '2022 - 2023', 'Bachelor of Computer Applications', 'Capital University, Jharkhand (First Division)', 'EDUCATION', 1
where not exists (select 1 from public.experiences where title = 'Bachelor of Computer Applications');

insert into public.experiences (date_range, title, place, type, sort_order)
select '2018 - 2021', 'CSE Diploma', 'B.B.S.B.P. College, Sirhind, PSBTE & IT, Chandigarh (First Division)', 'EDUCATION', 2
where not exists (select 1 from public.experiences where title = 'CSE Diploma');

insert into public.experiences (date_range, title, place, type, sort_order)
select '2018', 'High School', 'Guru Nanak Public Sr. Sec School, CBSE, Kanpur (First Division)', 'EDUCATION', 3
where not exists (select 1 from public.experiences where title = 'High School');

-- Seed Projects
insert into public.projects (title, description, technologies, link, image_url, sort_order)
select 'Gimmefy AI', 'AI-Enhanced Marketing Platform with 150+ automated tasks and personalized AI assistants designed for marketers, by marketers.', array['React', 'TypeScript', 'Mantine', 'Redux Toolkit'], 'https://gimmefy.ai', null, 1
where not exists (select 1 from public.projects where title = 'Gimmefy AI');

insert into public.projects (title, description, technologies, link, image_url, sort_order)
select 'Dialmantra Dialer', 'Fast, easy and low cost solution to run a world class contact center without huge investments on hardware and software.', array['React.js', 'Redux.js', 'JavaScript', 'JSSIP', 'HTML', 'Ant Design', 'LESS'], 'https://www.dialmantra.in/', null, 2
where not exists (select 1 from public.projects where title = 'Dialmantra Dialer');

insert into public.projects (title, description, technologies, link, image_url, sort_order)
select 'Amotus Online', 'Amotus Online stands as an innovative remote screen sharing platform, offering a unique solution for enhanced collaboration and communication.', array['React', 'Node.js', 'MongoDB', 'Express'], 'https://amotus.online/', null, 3
where not exists (select 1 from public.projects where title = 'Amotus Online');

insert into public.projects (title, description, technologies, link, image_url, sort_order)
select 'Drishti IAS Website', 'Improved institute website user interface and experience through collaborative efforts.', array['JavaScript', 'HTML', 'CSS', 'API Integration'], 'https://drishtiias.com', null, 4
where not exists (select 1 from public.projects where title = 'Drishti IAS Website');
