import { Download } from 'lucide-react';
import React from 'react';

const DownloadResumeBtn: React.FC = () => {
  return (
    <button className="main-gradient-1 px-4 py-2 rounded-full">
      <div className="flex items-center justify-center gap-2">
        <Download size={16} />
        <p className="para-2 font-semibold">Download Resume</p>
      </div>
    </button>
  );
};

export default DownloadResumeBtn;
