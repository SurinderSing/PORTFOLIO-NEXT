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
} from '@/lib/supabase-queries';
import {
  Settings,
  Phone,
  Share2,
  Sparkles,
  Code2,
  Briefcase,
  FolderGit2,
  ArrowRight,
  Database,
  CheckCircle2,
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
  ] = await Promise.all([
    getSiteSettings(),
    getContacts(),
    getSocialLinks(),
    getAboutCards(),
    getSkillsByCategory(),
    getExperiences(),
    getProjects(),
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
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Contacts',
      description:
        'Phone, email, location displayed in sidebar and contact page',
      count: `${contacts.length} entries`,
      href: '/admin/contacts',
      icon: Phone,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Social Links',
      description: 'LinkedIn, GitHub, Instagram, and other profile URLs',
      count: `${socialLinks.length} links`,
      href: '/admin/social-links',
      icon: Share2,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'About Cards',
      description: '"What I do!" cards displayed on the portfolio homepage',
      count: `${aboutCards.length} cards`,
      href: '/admin/about-cards',
      icon: Sparkles,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Skills & Categories',
      description: 'Structured technical skills matrix on resume page',
      count: `${skillCategories.length} categories (${totalSkills} skills)`,
      href: '/admin/skills',
      icon: Code2,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
    },
    {
      title: 'Experiences',
      description: 'Education and Work timelines with date ranges and roles',
      count: `${experiences.length} records`,
      href: '/admin/experiences',
      icon: Briefcase,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
    },
    {
      title: 'Projects',
      description: 'Portfolio projects, technologies chips, links, and covers',
      count: `${projects.length} projects`,
      href: '/admin/projects',
      icon: FolderGit2,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-card border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-semibold mb-2">
            <CheckCircle2 size={13} />
            <span>Supabase Sync Active</span>
          </div>
          <h2 className="text-2xl font-bold font-poppins">
            Welcome to Portfolio Admin
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your dynamic portfolio attributes, resume timelines,
            projects, and future blog content without code changes.
          </p>
        </div>

        <div className="text-right sm:text-left">
          <p className="text-xs text-muted-foreground">Managing Profile</p>
          <p className="text-sm font-semibold text-primary">
            {settings.owner_name} ({settings.owner_title})
          </p>
        </div>
      </div>

      {/* Grid of Manageable Sections */}
      <div>
        <h3 className="text-lg font-semibold font-poppins mb-4 flex items-center gap-2">
          <Database size={18} className="text-primary" />
          <span>Content Management</span>
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 gap-4">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link
                key={sec.href}
                href={sec.href}
                className="group p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${sec.bgColor} ${sec.color} flex items-center justify-center`}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">
                      {sec.count}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold group-hover:text-primary transition-colors">
                    {sec.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {sec.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-medium text-primary">
                  <span>Manage</span>
                  <ArrowRight
                    size={14}
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
