import React from 'react';

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
    <div
      key={skill.id}
      className={`flex-[48.5%] p-4 rounded-3xl shadow-sm ${skill.bgColor}`}
    >
      <div className="flex items-center gap-2 mb-1">
        {skill.icon}
        <h3>{skill.title}</h3>
      </div>
      <p className="para-2 font-medium">{skill.description || 'Coming soon'}</p>
    </div>
  );
};

export default DetailCard;
