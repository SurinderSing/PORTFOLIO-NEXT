import { createClient } from '@/utils/supabase/client';
import { User, Session, AuthError } from '@supabase/supabase-js';

export interface SignUpParams {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

function getRedirectUrl(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/api/auth/confirm`;
  }
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_BASE_URL ||
    'https://surinder-singh-portfolio.vercel.app';
  return `${baseUrl.replace(/\/$/, '')}/api/auth/confirm`;
}

export const authApi = {
  async signIn(params: SignInParams): Promise<{
    user: User | null;
    session: Session | null;
    error: AuthError | null;
  }> {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });
    return {
      user: data?.user ?? null,
      session: data?.session ?? null,
      error,
    };
  },

  async signUp(params: SignUpParams): Promise<{
    user: User | null;
    session: Session | null;
    error: AuthError | null;
  }> {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      phone: params.phone,
      options: {
        data: {
          username: params.username,
          firstName: params.firstName,
          lastName: params.lastName,
        },
        emailRedirectTo: getRedirectUrl(),
      },
    });
    return {
      user: data?.user ?? null,
      session: data?.session ?? null,
      error,
    };
  },

  async signOut(): Promise<{ error: AuthError | null }> {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getUser(): Promise<{ user: User | null; error: AuthError | null }> {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    return { user: data?.user ?? null, error };
  },
};

export default authApi;
