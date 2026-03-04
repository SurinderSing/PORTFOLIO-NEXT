import React from 'react';
import { ScrollRevealItem } from '@/components/animations/scroll-reveal';

interface SkillDataProps {
  skill: {
    id: number | string;
    title: string;
    description: string;
    icon: React.ReactNode;
    bgColor: string;
  };
}

const DetailCard: React.FC<SkillDataProps> = ({ skill }) => {
  return (
    <ScrollRevealItem
      className={`flex-[48.5%] w-full p-4 rounded-3xl shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1.5 hover:shadow-lg ${skill.bgColor}`}
    >
      <div className="flex items-center gap-2 mb-1">
        {skill.icon}
        <h3>{skill.title}</h3>
      </div>
      <p className="para-2 font-medium">{skill.description || 'Coming soon'}</p>
    </ScrollRevealItem>
  );
};

export default DetailCard;
