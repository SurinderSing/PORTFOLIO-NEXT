import DetailCard from '@/components/website/pages/contact/detail-card';
import PageProvider from '@/components/website/pages/page-provider';
import { Mails, PhoneCall } from 'lucide-react';
import React from 'react';

const contactData = [
  {
    id: 1,
    icon: <PhoneCall size={18} className="min-w-[18px] text-primary" />,
    title: 'Phone',
    details: ['+91 6386202678'],
  },
  {
    id: 2,
    icon: <Mails size={18} className="min-w-[18px] text-secondary" />,
    title: 'Email',
    details: ['ssurindersingh100@gmail.com', 'sshantysingh@gmail.com'],
  },
];

const Contact: React.FC = () => {
  return (
    <PageProvider title="Resume">
      <div className="flex flex-wrap gap-6 justify-between mb-6">
        {contactData.map((contact) => (
          <DetailCard
            key={contact.id}
            icon={contact.icon}
            title={contact.title}
            details={contact.details}
          />
        ))}
      </div>
      <div className="bg-background rounded-2xl p-6">
        <p className="para-1 mb-6">
          I am always open to discussing{' '}
          <strong>
            new projects, opportunities in tech world, partnerships
          </strong>{' '}
          and more so <strong>mentorship</strong>.
        </p>
        <div>
          <form action="">
            <div className="mb-6 flex gap-4 justify-between">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="mb-6 flex gap-6 justify-between">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="mb-6 flex gap-6 justify-between">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows={1} />
            </div>

            <button
              type="submit"
              className="main-gradient-1 px-4 py-2 rounded-full"
            >
              <div className="flex items-center justify-center gap-2">
                <p className="para-2 font-semibold">Submit</p>
              </div>
            </button>
          </form>
        </div>
      </div>
    </PageProvider>
  );
};

export default Contact;
