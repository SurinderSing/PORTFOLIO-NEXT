import { Download } from 'lucide-react';
import React from 'react';

const DownloadResumeBtn: React.FC = () => {
  return (
    <a
      href="/resume/Surinder_Singh_Resume.pdf"
      download="Surinder_Singh_Resume.pdf"
      className="inline-block main-gradient-1 px-4 py-2 rounded-full hover:opacity-90 transition-opacity duration-200"
      aria-label="Download Resume"
    >
      <div className="flex items-center justify-center gap-2 text-white">
        <Download size={16} />
        <p className="para-2 font-semibold">Download Resume</p>
      </div>
    </a>
  );
};

export default DownloadResumeBtn;
