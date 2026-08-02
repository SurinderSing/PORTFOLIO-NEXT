import React from 'react';
import Link from 'next/link';

export default function VerificationSuccess() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md text-center bg-tertiary p-8 rounded-2xl shadow-custom-1 border border-border/55 space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
          <svg
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold font-poppins main-text-gradient">
            Email Verified!
          </h2>
          <p className="text-sm text-muted-foreground font-raleway">
            Thank you for verifying your email address. Your account is now
            fully active.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/sign-in"
            className="inline-flex w-full justify-center rounded-full main-gradient-1 py-2.5 px-4 text-sm font-semibold hover:opacity-90 transition duration-300 text-white"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
