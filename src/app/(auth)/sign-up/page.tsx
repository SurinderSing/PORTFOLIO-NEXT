import React from 'react';
import SignUpForm from '@/components/auth/sign-up/form';
import Link from 'next/link';

const SignUp: React.FC = () => {
  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-8">
      <div className="bg-tertiary rounded-2xl shadow-custom-1 border border-border/55 w-full max-w-[550px] mx-auto px-12 py-10">
        <h1 className="font-bold mb-6 font-poppins main-text-gradient text-3xl text-center">
          Sign Up
        </h1>
        <SignUpForm />
        <div className="text-center text-xs font-raleway mt-6">
          <span className="text-muted-foreground">
            Already have an account?{' '}
          </span>
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
