'use client';
import DetailCard from '@/components/website/pages/contact/detail-card';
import PageProvider from '@/components/website/pages/page-provider';
import { Mails, PhoneCall } from 'lucide-react';
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

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
    details: ['ssurindersingh100@gmail.com'],
  },
];

const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm('xrgwgbye');

  if (state.succeeded) {
    return (
      <div className="bg-background rounded-2xl p-8">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Message Sent Successfully!
            </h3>
            <p className="para-1 text-muted-foreground leading-relaxed">
              Thank you for reaching out! I&apos;ve received your message and
              will get back to you within 24 hours.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="main-gradient-1 px-6 py-3 rounded-full hover:opacity-90 transition-opacity duration-200 shadow-lg"
            >
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p className="para-2 font-semibold">Send Another Message</p>
              </div>
            </button>

            <p className="text-xs text-muted-foreground/70">
              You can also reach me directly at{' '}
              <a
                href="mailto:ssurindersingh100@gmail.com"
                className="text-primary hover:underline"
              >
                ssurindersingh100@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-2xl p-6">
      <p className="para-1 mb-6">
        I am always open to discussing{' '}
        <strong>new projects, opportunities in tech world, partnerships</strong>{' '}
        and more so <strong>mentorship</strong>. With 4+ years of experience in
        frontend development and AI tools, I am passionate about creating
        innovative solutions and helping others grow in their careers.
      </p>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex gap-4 justify-between">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <ValidationError
            prefix="Name"
            field="name"
            errors={state.errors}
            className="text-red-500 text-sm mb-2"
          />

          <div className="mb-6 flex gap-6 justify-between">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-red-500 text-sm mb-2"
          />

          <div className="mb-6 flex gap-6 justify-between">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows={1} required />
          </div>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-red-500 text-sm mb-2"
          />

          <button
            type="submit"
            disabled={state.submitting}
            className="main-gradient-1 px-4 py-2 rounded-full"
          >
            <div className="flex items-center justify-center gap-2">
              <p className="para-2 font-semibold">
                {state.submitting ? 'Sending...' : 'Submit'}
              </p>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  return (
    <PageProvider title="Contact">
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
      <ContactForm />
    </PageProvider>
  );
};

export default Contact;
