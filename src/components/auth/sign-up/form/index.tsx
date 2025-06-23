'use client';
import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormErrorMsg from '@/components/common/form-error-msg';
import { useSignUpMutation } from '@/services/userApi';

const formSchema = z
  .object({
    username: z.string().min(1, 'User name is required'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    phone: z
      .string()
      .min(10, 'Phone is required')
      .max(13, 'Phone must be at most 13 characters'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignUpForm: React.FC = () => {
  const [signUp, { isLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur', // Validate on blur
    reValidateMode: 'onChange', // Re-validate on change
  });

  const onSubmit = async (data: z.infer<typeof formSchema>, e?: any) => {
    e?.preventDefault();
    console.log('clicked');
    // Handle form submission logic here
    const res = await signUp(data);
    console.log('Sign up response:', res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="mb-4">
        <label htmlFor="user-name">User name</label>
        <input type="text" id="user-name" {...register('username')} />
        {errors.username && (
          <FormErrorMsg>{errors.username.message}</FormErrorMsg>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="first-name">First name</label>
        <input type="text" id="first-name" {...register('firstName')} />
        {errors.firstName && (
          <FormErrorMsg>{errors.firstName.message}</FormErrorMsg>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="last-name">Last name</label>
        <input type="text" id="last-name" {...register('lastName')} />
        {errors.lastName && (
          <FormErrorMsg>{errors.lastName.message}</FormErrorMsg>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register('email')} />
        {errors.email && <FormErrorMsg>{errors.email.message}</FormErrorMsg>}
      </div>
      <div className="mb-4">
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" {...register('phone')} />
        {errors.phone && <FormErrorMsg>{errors.phone.message}</FormErrorMsg>}
      </div>
      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register('password')} />
        {errors.password && (
          <FormErrorMsg>{errors.password.message}</FormErrorMsg>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <FormErrorMsg>{errors.confirmPassword.message}</FormErrorMsg>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="main-gradient-1 px-4 py-2 rounded-full mt-4"
          disabled={isLoading}
          aria-label="Sign up"
        >
          <div className="flex items-center justify-center gap-2">
            <p className="para-2 font-semibold">Sign up</p>
          </div>
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
