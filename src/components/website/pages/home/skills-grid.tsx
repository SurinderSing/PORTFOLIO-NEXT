import React from 'react';
import { SkillCategoryWithSkills } from '@/types/database';

interface SkillsGridProps {
  categories?: SkillCategoryWithSkills[];
}

// Curated fallbacks aligned with Figma
const fallbackSkillColumns = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'],
  },
  {
    title: 'Tools',
    skills: ['Git & GitHub', 'Docker', 'AWS (S3/EC2)', 'Vercel', 'Figma'],
  },
  {
    title: 'Core',
    skills: [
      'Architecture',
      'Performance Optimization',
      'CI/CD',
      'State Management',
    ],
  },
];

export const SkillsGrid: React.FC<SkillsGridProps> = ({ categories = [] }) => {
  // If categories exist in DB, format up to 4 columns or use fallbacks
  const displayColumns =
    categories.length >= 3
      ? categories.slice(0, 4).map((cat) => ({
          title:
            cat.name
              .replace(/Skills|and Databases|Component Libraries/i, '')
              .trim() || cat.name,
          skills: cat.skills.map((s) => s.name),
        }))
      : fallbackSkillColumns;

  return (
    <section className="py-10 border-b border-border/50">
      <div className="mb-6">
        <h2 className="text-xl font-bold font-mono text-foreground tracking-tight">
          Technical Skills
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
        {displayColumns.map((col, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              {col.title}
            </h3>
            <ul className="space-y-1.5 text-xs text-foreground/90">
              {col.skills.map((skill, sIdx) => (
                <li
                  key={sIdx}
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <span className="text-primary/60 font-bold">›</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsGrid;
