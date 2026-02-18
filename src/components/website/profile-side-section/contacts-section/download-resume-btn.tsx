import { Download } from 'lucide-react';
import React from 'react';

const DownloadResumeBtn: React.FC = () => {
  const handleDownload = () => {
    // Direct path to the resume file in public folder
    const resumeUrl = '/resume/Surinder_Singh_Resume.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Surinder_Singh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="main-gradient-1 px-4 py-2 rounded-full hover:opacity-90 transition-opacity duration-200"
      aria-label="Download Resume"
    >
      <div className="flex items-center justify-center gap-2">
        <Download size={16} />
        <p className="para-2 font-semibold">Download Resume</p>
      </div>
    </button>
  );
};

export default DownloadResumeBtn;
