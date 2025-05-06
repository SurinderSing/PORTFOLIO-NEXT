import React from 'react';

interface PageProviderProps {
  children: React.ReactNode;
  title: string;
}

const PageProvider: React.FC<PageProviderProps> = ({ children, title }) => {
  return (
    <div className="bg-tertiary rounded-2xl shadow-sm">
      <div className="w-full max-w-[46rem] mx-auto py-4">
        <div className="flex items-center gap-6 mb-3">
          <h1 className="whitespace-nowrap">{title}</h1>
          <span className="w-[30%] main-gradient-1 h-[3px] rounded-full"></span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageProvider;
