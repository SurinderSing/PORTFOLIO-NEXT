import React from 'react';
import { Metadata } from 'next';
import DetailCard from '@/components/website/pages/contact/detail-card';
import PageProvider from '@/components/website/pages/page-provider';
import { FadeIn, FadeInItem } from '@/components/animations/fade-in';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import ContactForm from '@/components/website/pages/contact/contact-form';
import { getSiteSettings, getContacts } from '@/lib/supabase-queries';
import { resolveIcon } from '@/utils/icon-resolver';

export const metadata: Metadata = {
  title: 'Contact | Get in Touch with Surinder Singh',
  description:
    'Have a project in mind or want to collaborate? Contact Surinder Singh for frontend engineering, AI tool development, and tech opportunities.',
  alternates: {
    canonical: '/contact',
  },
};

export const revalidate = 3600;

export default async function ContactPage() {
  const [settings, dbContacts] = await Promise.all([
    getSiteSettings(),
    getContacts(),
  ]);

  const contactData = dbContacts.map((contact) => ({
    id: contact.id,
    icon: resolveIcon(contact.icon_name, {
      size: 18,
      className:
        contact.type === 'phone'
          ? 'min-w-[18px] text-primary'
          : 'min-w-[18px] text-secondary',
      color: contact.icon_color || undefined,
    }),
    title: contact.title,
    details: [contact.detail],
  }));

  const emailContact = dbContacts.find((c) => c.type === 'email')?.detail;

  return (
    <main className="w-full">
      <PageProvider title="Contact">
        <FadeIn staggerChildren={0.15}>
          <ScrollReveal
            yOffset={20}
            delay={0.15}
            className="flex flex-wrap gap-6 justify-between mb-6"
          >
            {contactData.map((contact) => (
              <DetailCard
                key={contact.id}
                icon={contact.icon}
                title={contact.title}
                details={contact.details}
              />
            ))}
          </ScrollReveal>
          <FadeInItem>
            <ContactForm
              formspreeId={settings.formspree_id}
              description={settings.contact_description}
              email={emailContact}
            />
          </FadeInItem>
        </FadeIn>
      </PageProvider>
    </main>
  );
}
