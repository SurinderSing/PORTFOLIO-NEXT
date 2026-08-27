'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { authApi } from '@/services/authApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormErrorMsg from '@/components/common/form-error-msg';
import Link from 'next/link';
import {
  LogOut,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Lock,
  Mail,
} from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormValues = z.infer<typeof formSchema>;

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/admin';

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    authApi.getUser().then(({ user }) => {
      setCurrentUser(user);
      setCheckingAuth(false);
    });
  }, []);

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

    const { user, error } = await authApi.signIn({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else if (user) {
      router.push(redirectTarget);
      router.refresh();
    }
  };

  const handleSignOut = async () => {
    await authApi.signOut();
    setCurrentUser(null);
    router.refresh();
  };

  return (
    <div className="w-full max-w-md font-mono">
      <div className="rounded-2xl border border-border/80 bg-card p-7 sm:p-9 shadow-sm space-y-6">
        {/* Terminal Header */}
        <div className="text-center space-y-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto">
            <Terminal className="h-5 w-5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            Portfolio Admin
          </h1>
          <p className="text-xs text-muted-foreground">
            Sign in to manage portfolio assets and configuration.
          </p>
        </div>

        {/* If user is already authenticated */}
        {!checkingAuth && currentUser && (
          <div className="p-4 rounded-xl bg-background border border-primary/40 space-y-3 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-primary">
              <ShieldCheck size={16} />
              <span>Active Session:</span>
            </div>
            <p className="text-xs font-semibold text-foreground truncate">
              {currentUser.email}
            </p>
            <div className="flex items-center justify-center gap-2 pt-1">
              <Link
                href={redirectTarget}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <span>Dashboard</span>
                <ArrowRight size={13} />
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-medium hover:bg-tertiary-2 transition-colors"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="bg-destructive/10 text-destructive text-xs p-3 rounded-lg border border-destructive/20 text-center">
            {errorMsg}
          </div>
        )}

        {/* Regular Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1.5">
            <label htmlFor="email-address" className="flex items-center gap-1">
              <Mail className="h-3 w-3 text-primary" />
              <span>EMAIL_ADDRESS</span>
            </label>
            <input
              id="email-address"
              type="email"
              required
              className="text-xs bg-background/80"
              placeholder="admin@surinder.dev"
              {...register('email')}
            />
            {errors.email && (
              <FormErrorMsg>{errors.email.message}</FormErrorMsg>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="flex items-center gap-1">
              <Lock className="h-3 w-3 text-primary" />
              <span>PASSWORD</span>
            </label>
            <input
              id="password"
              type="password"
              required
              className="text-xs bg-background/80"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <FormErrorMsg>{errors.password.message}</FormErrorMsg>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 px-4 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <span>{loading ? 'AUTHENTICATING...' : 'Sign In'}</span>
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-1">
          <span>Need an account? </span>
          <Link
            href="/sign-up"
            className="text-primary hover:underline font-semibold"
          >
            Create Admin Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center font-mono text-xs text-muted-foreground">
          Initializing authentication system...
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
