export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
export type ExperienceType = 'EDUCATION' | 'WORK';
export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface StorageActionResult {
  success: boolean;
  message?: string;
  error?: string;
  url?: string;
}

export interface Profile {
  id: string;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  bio: string | null;
  profile_picture: string | null;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: number;
  site_title: string;
  site_description: string;
  owner_name: string;
  owner_title: string;
  owner_summary: string;
  home_heading: string;
  home_description: string;
  resume_summary: string;
  work_description: string;
  contact_description: string;
  profile_photo_url: string | null;
  resume_pdf_url: string | null;
  formspree_id: string | null;
  updated_at: string;
}

export interface Contact {
  id: number;
  type: string;
  title: string;
  detail: string;
  icon_name: string;
  icon_color?: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface SocialLink {
  id: number;
  name: string;
  url: string;
  icon_name: string;
  icon_color?: string | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface AboutCard {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  bg_color_class: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface SkillCategory {
  id: number;
  name: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: number;
  category_id: number;
  name: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface SkillCategoryWithSkills extends SkillCategory {
  skills: Skill[];
}

export interface Experience {
  id: number;
  date_range: string;
  title: string;
  place: string;
  type: ExperienceType;
  description?: string | null;
  technologies?: string[] | null;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export type PreviewMode = 'image' | 'iframe';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string | null;
  image_url: string | null;
  preview_url?: string | null;
  preview_mode?: PreviewMode;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  tags: string[];
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface Story {
  id: string;
  author_id: string;
  title: string;
  content: string;
  cover_image_url: string | null;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author?: Profile;
}

export interface Comment {
  id: string;
  user_id: string;
  post_id: string | null;
  story_id: string | null;
  content: string;
  created_at: string;
  updated_at: string;
  user?: Profile;
}
