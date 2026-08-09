import React from 'react';
import DownloadResumeBtn from './download-resume-btn';
import ContactBox from './contact-box';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getContacts, getSiteSettings } from '@/lib/supabase-queries';
import { resolveIcon } from '@/utils/icon-resolver';

export interface ContactsSectionDataInterface {
  id: number | string;
  icon: React.ReactNode;
  title: string;
  detail: string;
}

const ContactsSection: React.FC = async () => {
  const [dbContacts, settings] = await Promise.all([
    getContacts(),
    getSiteSettings(),
  ]);

  const contactsData: ContactsSectionDataInterface[] = dbContacts.map(
    (item) => ({
      id: item.id,
      title: item.title,
      detail: item.detail,
      icon: resolveIcon(item.icon_name, {
        color: item.icon_color || undefined,
        size: 18,
        className: 'min-w-[18px]',
      }),
    })
  );

  return (
    <ScrollArea className="w-full max-w-[85%] md:max-w-[95%] bg-background rounded-2xl my-5">
      <div>
        {contactsData.map((contactData) => (
          <ContactBox key={contactData.id} contactData={contactData} />
        ))}
      </div>
      <div className="text-center p-4">
        <DownloadResumeBtn resumeUrl={settings.resume_pdf_url} />
      </div>
    </ScrollArea>
  );
};

export default ContactsSection;
