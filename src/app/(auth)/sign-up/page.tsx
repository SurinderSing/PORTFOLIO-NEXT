import React from 'react';
import SignUpForm from '@/components/auth/sign-up/form';
import Link from 'next/link';
import { Terminal } from 'lucide-react';

const SignUp: React.FC = () => {
  return (
    <div className="w-full max-w-lg font-mono">
      <div className="rounded-2xl border border-border/80 bg-card p-7 sm:p-9 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto">
            <Terminal className="h-5 w-5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            Create Admin Account
          </h1>
          <p className="text-xs text-muted-foreground">
            Register administrator credentials to configure portfolio data.
          </p>
        </div>

        <SignUpForm />

        <div className="text-center text-xs text-muted-foreground pt-2">
          <span>Already have an account? </span>
          <Link
            href="/sign-in"
            className="text-primary hover:underline font-semibold"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
