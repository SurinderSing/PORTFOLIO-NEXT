import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact | Hire Surinder Singh',
  description:
    'Get in touch with Surinder Singh for frontend development opportunities, project collaborations, or tech consultation.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
