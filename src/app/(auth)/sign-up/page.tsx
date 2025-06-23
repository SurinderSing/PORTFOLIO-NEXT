import React from 'react';

const SignUp: React.FC = () => {
  return (
    <div className="bg-tertiary rounded-2xl shadow-sm w-full max-w-[550px] mx-auto">
      <div className="px-16 py-10">
        <h1 className="font-bold mb-6">Sign Up</h1>
        <form action="">
          <div className="mb-4">
            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" name="first-name" />
          </div>
          <div className="mb-4">
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" name="last-name" />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="main-gradient-1 px-4 py-2 rounded-full mt-4"
            >
              <div className="flex items-center justify-center gap-2">
                <p className="para-2 font-semibold">Sign up</p>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
