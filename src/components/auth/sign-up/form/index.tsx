'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormErrorMsg from '@/components/common/form-error-msg';
import { authApi } from '@/services/authApi';

const formSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
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

    const { error } = await authApi.signUp({
      email: data.email,
      password: data.password,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 font-mono text-xs"
    >
      {errorMsg && (
        <div className="bg-destructive/10 text-destructive text-xs p-3 rounded-lg border border-destructive/20 text-center">
          {errorMsg}
        </div>
      )}

      {successMsg && (
        <div className="bg-emerald-500/10 text-emerald-500 text-xs p-3 rounded-lg border border-emerald-500/20 text-center">
          {successMsg}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="user-name">Username</label>
        <input
          type="text"
          id="user-name"
          placeholder="john_doe"
          {...register('username')}
          className="text-xs bg-background/80"
        />
        {errors.username && (
          <FormErrorMsg>{errors.username.message}</FormErrorMsg>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            placeholder="John"
            {...register('firstName')}
            className="text-xs bg-background/80"
          />
          {errors.firstName && (
            <FormErrorMsg>{errors.firstName.message}</FormErrorMsg>
          )}
        </div>
        <div className="space-y-1">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            placeholder="Doe"
            {...register('lastName')}
            className="text-xs bg-background/80"
          />
          {errors.lastName && (
            <FormErrorMsg>{errors.lastName.message}</FormErrorMsg>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="john.doe@example.com"
          {...register('email')}
          className="text-xs bg-background/80"
        />
        {errors.email && <FormErrorMsg>{errors.email.message}</FormErrorMsg>}
      </div>

      <div className="space-y-1">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          placeholder="+15551234567"
          {...register('phone')}
          className="text-xs bg-background/80"
        />
        {errors.phone && <FormErrorMsg>{errors.phone.message}</FormErrorMsg>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            {...register('password')}
            className="text-xs bg-background/80"
          />
          {errors.password && (
            <FormErrorMsg>{errors.password.message}</FormErrorMsg>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="••••••••"
            {...register('confirmPassword')}
            className="text-xs bg-background/80"
          />
          {errors.confirmPassword && (
            <FormErrorMsg>{errors.confirmPassword.message}</FormErrorMsg>
          )}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 px-4 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          disabled={loading}
          aria-label="Sign up"
        >
          {loading ? 'CREATING ACCOUNT...' : 'Create Account'}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
