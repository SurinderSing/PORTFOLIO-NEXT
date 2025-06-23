import React from 'react';
import SignUpForm from '@/components/auth/sign-up/form';

const SignUp: React.FC = () => {
  return (
    <div className="bg-tertiary rounded-2xl shadow-sm w-full max-w-[550px] mx-auto">
      <div className="px-16 py-10">
        <h1 className="font-bold mb-6">Sign Up</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
