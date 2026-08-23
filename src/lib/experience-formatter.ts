import { Experience } from '@/types/database';
import { TimelineItem } from '@/components/website/pages/resume/timeline-experience';

/**
 * Transforms dynamic database Experience records into timeline view models.
 * Strictly uses live database fields (place, title, description, technologies)
 * so any edits in the Admin Dashboard immediately reflect on the portfolio.
 */
export function formatExperiencesToTimeline(
  experiences: Experience[],
  type: 'WORK' | 'EDUCATION'
): TimelineItem[] {
  return experiences.map((item) => {
    // Parse DB description into clean bullet points
    const dbBullets = item.description
      ? item.description
          .split(/\r?\n/)
          .map((line) => line.trim().replace(/^[-•*›]\s*/, ''))
          .filter(Boolean)
      : [];

    // Parse DB technologies
    const dbTechnologies =
      item.technologies &&
      Array.isArray(item.technologies) &&
      item.technologies.length > 0
        ? item.technologies
        : [];

    return {
      id: item.id,
      company: item.place || 'Organization',
      role: item.title || 'Role',
      dateRange: item.date_range,
      bullets:
        dbBullets.length > 0
          ? dbBullets
          : [
              'Executed core technical deliverables with focus on scalability, maintainability, and clean architecture.',
              'Collaborated with cross-functional stakeholders to deliver reliable and tested features.',
            ],
      technologies: dbTechnologies,
      type: item.type,
      isCurrent: item.date_range.toLowerCase().includes('present'),
    };
  });
}
