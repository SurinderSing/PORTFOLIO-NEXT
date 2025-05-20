import React from 'react';
import DownloadResumeBtn from './download-resume-btn';
import { Mail, MapPin, Phone } from 'lucide-react';
import ContactBox from './contact-box';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface ContactsSectionDataInterface {
  id: number | string;
  icon: React.ReactNode;
  title: string;
  detail: string;
}

const contactsSectionData: ContactsSectionDataInterface[] = [
  {
    id: 1,
    icon: <Phone color="#EC1C09" size={18} className="min-w-[18px]" />,
    title: 'Phone',
    detail: '+91 6386202678',
  },
  {
    id: 2,
    icon: <Mail color="#FF9A1A" size={18} className="min-w-[18px]" />,
    title: 'Email',
    detail: 'ssurindersingh100@gmail.com',
  },
  {
    id: 3,
    icon: <MapPin color="#EC1C09" size={18} className="min-w-[18px]" />,
    title: 'Location',
    detail: 'Delhi, India',
  },
];

const ContactsSection: React.FC = () => {
  return (
    <ScrollArea className="w-full max-w-[85%] md:max-w-[95%] bg-background rounded-2xl my-5">
      <div>
        {contactsSectionData?.map((contactData) => (
          <ContactBox key={contactData.id} contactData={contactData} />
        ))}
      </div>
      <div className="text-center p-4">
        <DownloadResumeBtn />
      </div>
    </ScrollArea>
  );
};

export default ContactsSection;
