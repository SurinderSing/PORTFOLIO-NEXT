import React from 'react';
import Link from 'next/link';
import {
  getSiteSettings,
  getContacts,
  getSocialLinks,
  getAboutCards,
  getSkillsByCategory,
  getExperiences,
  getProjects,
  getBlogPosts,
} from '@/lib/supabase-queries';
import {
  Settings,
  Phone,
  Share2,
  Sparkles,
  Code2,
  Briefcase,
  FolderGit2,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminOverviewPage() {
  const [
    settings,
    contacts,
    socialLinks,
    aboutCards,
    skillCategories,
    experiences,
    projects,
    blogPosts,
  ] = await Promise.all([
    getSiteSettings(),
    getContacts(),
    getSocialLinks(),
    getAboutCards(),
    getSkillsByCategory(),
    getExperiences(),
    getProjects(),
    getBlogPosts({ status: undefined }),
  ]);

  const totalSkills = skillCategories.reduce(
    (acc, cat) => acc + (cat.skills?.length || 0),
    0
  );

  const sections = [
    {
      title: 'Site Settings',
      description: 'Owner name, headings, summaries, descriptions, resume PDF',
      count: 'Global Config',
      href: '/admin/site-settings',
      icon: Settings,
    },
    {
      title: 'Blog Posts',
      description:
        'Draft, publish, and manage engineering articles and discussions',
      count: `${blogPosts.length} articles`,
      href: '/admin/blogs',
      icon: BookOpen,
    },
    {
      title: 'Contacts',
      description: 'Phone, email, location displayed in contact page and nodes',
      count: `${contacts.length} entries`,
      href: '/admin/contacts',
      icon: Phone,
    },
    {
      title: 'Social Links',
      description: 'LinkedIn, GitHub, Instagram, and other profile URLs',
      count: `${socialLinks.length} links`,
      href: '/admin/social-links',
      icon: Share2,
    },
    {
      title: 'About Cards',
      description: '"What I do!" cards and highlights',
      count: `${aboutCards.length} cards`,
      href: '/admin/about-cards',
      icon: Sparkles,
    },
    {
      title: 'Skills & Categories',
      description: 'Structured technical skills matrix on resume page',
      count: `${skillCategories.length} categories (${totalSkills} skills)`,
      href: '/admin/skills',
      icon: Code2,
    },
    {
      title: 'Experiences',
      description: 'Education and Work timelines with date ranges and roles',
      count: `${experiences.length} records`,
      href: '/admin/experiences',
      icon: Briefcase,
    },
    {
      title: 'Projects',
      description: 'Portfolio projects, technologies chips, links, and covers',
      count: `${projects.length} projects`,
      href: '/admin/projects',
      icon: FolderGit2,
    },
  ];

  return (
    <div className="space-y-6 font-mono">
      {/* Welcome Banner */}
      <div className="p-6 rounded-xl bg-card border border-border/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[11px] font-semibold border border-emerald-500/20">
            <CheckCircle2 size={12} />
            <span>Supabase Sync Active</span>
          </div>
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            Welcome to Portfolio Admin
          </h2>
          <p className="text-xs text-muted-foreground">
            Manage your dynamic portfolio attributes, resume timelines,
            projects, and future blog content without code changes.
          </p>
        </div>

        <div className="text-right sm:text-left rounded-lg bg-background p-3 border border-border/50">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
            Managing Profile
          </p>
          <p className="text-xs font-bold text-primary">
            {settings.owner_name} ({settings.owner_title})
          </p>
        </div>
      </div>

      {/* Grid of Manageable Sections */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-primary" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Content Management
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link
                key={sec.href}
                href={sec.href}
                className="group p-5 rounded-xl bg-card border border-border/70 hover:border-primary/50 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-sm space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Icon size={16} />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-tertiary-2 text-muted-foreground border border-border/40">
                      {sec.count}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {sec.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {sec.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Manage</span>
                  <ArrowRight
                    size={13}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
