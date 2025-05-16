import React from 'react';

interface SubContainerProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const SubContainer: React.FC<SubContainerProps> = ({
  title,
  icon,
  children,
}) => {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2.5">
        {icon}
        <h3>{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SubContainer;
