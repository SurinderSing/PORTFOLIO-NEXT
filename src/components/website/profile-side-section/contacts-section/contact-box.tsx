import React from 'react';
import { ContactsSectionDataInterface } from './index';

interface ContactBoxProps {
  contactData: ContactsSectionDataInterface;
}

const ContactBox: React.FC<ContactBoxProps> = ({ contactData }) => {
  return (
    <div className="flex items-center gap-4 border-b-2 border-tertiary-2 max-w-[17rem] p-3 mx-auto">
      {contactData.icon}
      <div>
        <p className="para-2 font-semibold text-muted dark:text-foreground !leading-[20px]">
          {contactData.title}
        </p>
        <p className="para-1 font-bold !leading-[20px]">{contactData.detail}</p>
      </div>
    </div>
  );
};

export default ContactBox;
