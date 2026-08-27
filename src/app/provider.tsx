'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import { AuthProvider } from '@/hooks/use-client-auth';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
