'use client';

import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export interface AdminStatusState {
  type: 'success' | 'error' | null;
  message: string;
}

interface AdminStatusBannerProps {
  status: AdminStatusState;
}

export default function AdminStatusBanner({ status }: AdminStatusBannerProps) {
  if (!status.type || !status.message) return null;

  const isSuccess = status.type === 'success';

  return (
    <div
      className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
        isSuccess
          ? 'bg-green-500/10 text-green-600 border border-green-500/20'
          : 'bg-red-500/10 text-red-600 border border-red-500/20'
      }`}
    >
      {isSuccess ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      <span>{status.message}</span>
    </div>
  );
}
