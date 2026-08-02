'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormErrorMsg from '@/components/common/form-error-msg';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignIn() {
  const supabase = createClient();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-tertiary p-8 rounded-2xl shadow-custom-1 border border-border/55">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold font-poppins main-text-gradient">
            Sign In to Admin
          </h2>
          <p className="mt-2 text-center text-xs text-muted-foreground font-raleway">
            Manage your portfolio dynamic details
          </p>
        </div>

        {errorMsg && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20 text-center font-raleway">
            {errorMsg}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address">Email address</label>
              <input
                id="email-address"
                type="email"
                required
                className="w-full px-3 py-2 border-b-2 border-b-tertiary-2 focus:border-b-primary bg-background text-foreground"
                placeholder="email@example.com"
                {...register('email')}
              />
              {errors.email && (
                <FormErrorMsg>{errors.email.message}</FormErrorMsg>
              )}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-3 py-2 border-b-2 border-b-tertiary-2 focus:border-b-primary bg-background text-foreground"
                placeholder="••••••••"
                {...register('password')}
              />
              {errors.password && (
                <FormErrorMsg>{errors.password.message}</FormErrorMsg>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-full main-gradient-1 py-2 px-4 text-sm font-semibold hover:opacity-90 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="text-center text-xs font-raleway">
          <span className="text-muted-foreground">
            Don&apos;t have an account?{' '}
          </span>
          <Link
            href="/sign-up"
            className="text-primary hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
