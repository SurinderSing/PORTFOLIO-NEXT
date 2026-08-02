'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormErrorMsg from '@/components/common/form-error-msg';
import { createClient } from '@/utils/supabase/client';

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

type FormValues = z.infer<typeof formSchema>;

const SignUpForm: React.FC = () => {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
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
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      phone: data.phone,
      options: {
        data: {
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
        },
        emailRedirectTo: `${window.location.origin}/api/auth/confirm`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      setSuccessMsg(
        'Registration successful! Please check your email for the verification link.'
      );
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {errorMsg && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20 text-center font-raleway">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="bg-green-500/10 text-green-500 text-sm p-3 rounded-lg border border-green-500/20 text-center font-raleway">
          {successMsg}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="user-name">User name</label>
        <input
          type="text"
          id="user-name"
          {...register('username')}
          className="w-full px-3 py-2 border-b-2 border-b-tertiary-2 focus:border-b-primary bg-background text-foreground"
        />
        {errors.username && (
          <FormErrorMsg>{errors.username.message}</FormErrorMsg>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="first-name">First name</label>
        <input
          type="text"
          id="first-name"
          {...register('firstName')}
          className="w-full px-3 py-2 border-b-2 border-b-tertiary-2 focus:border-b-primary bg-background text-foreground"
        />
        {errors.firstName && (
          <FormErrorMsg>{errors.firstName.message}</FormErrorMsg>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="last-name">Last name</label>
        <input
          type="text"
          id="last-name"
          {...register('lastName')}
          className="w-full px-3 py-2 border-b-2 border-b-tertiary-2 focus:border-b-primary bg-background text-foreground"
        />
        {errors.lastName && (
          <FormErrorMsg>{errors.lastName.message}</FormErrorMsg>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="w-full px-3 py-2 border-b-2 border-b-tertiary-2 focus:border-b-primary bg-background text-foreground"
        />
        {errors.email && <FormErrorMsg>{errors.email.message}</FormErrorMsg>}
      </div>
      <div className="mb-4">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className="w-full px-3 py-2 border-b-2 border-b-tertiary-2 focus:border-b-primary bg-background text-foreground"
        />
        {errors.phone && <FormErrorMsg>{errors.phone.message}</FormErrorMsg>}
      </div>
      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className="w-full px-3 py-2 border-b-2 border-b-tertiary-2 focus:border-b-primary bg-background text-foreground"
        />
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
          className="w-full px-3 py-2 border-b-2 border-b-tertiary-2 focus:border-b-primary bg-background text-foreground"
        />
        {errors.confirmPassword && (
          <FormErrorMsg>{errors.confirmPassword.message}</FormErrorMsg>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="main-gradient-1 px-6 py-2 rounded-full mt-4 hover:opacity-90 transition duration-300 disabled:opacity-50 text-sm font-semibold"
          disabled={loading}
          aria-label="Sign up"
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
