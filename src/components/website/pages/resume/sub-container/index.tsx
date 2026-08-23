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
    <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-6 font-mono space-y-4">
      <div className="flex items-center gap-2 border-b border-border/40 pb-3">
        {icon && <div className="text-primary">{icon}</div>}
        <h3 className="text-xs uppercase tracking-wider font-bold text-foreground">
          {title}
        </h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SubContainer;
