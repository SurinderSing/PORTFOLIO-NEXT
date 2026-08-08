import React from 'react';
import { getContacts } from '@/lib/supabase-queries';
import ContactsManager from './contacts-manager';

export const revalidate = 0;

export default async function ContactsPage() {
  const contacts = await getContacts();

  return <ContactsManager initialContacts={contacts} />;
}
