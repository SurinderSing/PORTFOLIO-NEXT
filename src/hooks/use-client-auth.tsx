'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { createClient } from '@/utils/supabase/client';
import { Profile } from '@/types/database';
import { User } from '@supabase/supabase-js';

export interface ClientAuthState {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<ClientAuthState>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

// Singleton memory cache to deduplicate simultaneous requests
let cachedProfile: { userId: string; profile: Profile | null } | null = null;
let profileFetchPromise: Promise<Profile | null> | null = null;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const loadProfile = async (
      currentUser: User | null
    ): Promise<Profile | null> => {
      if (!currentUser) {
        cachedProfile = null;
        return null;
      }

      if (cachedProfile && cachedProfile.userId === currentUser.id) {
        return cachedProfile.profile;
      }

      if (profileFetchPromise) {
        return profileFetchPromise;
      }

      profileFetchPromise = (async () => {
        try {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single();

          const loaded = (data as Profile) || null;
          cachedProfile = { userId: currentUser.id, profile: loaded };
          return loaded;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('AuthProvider profile fetch error:', err);
          return null;
        } finally {
          profileFetchPromise = null;
        }
      })();

      return profileFetchPromise;
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        const profileData = await loadProfile(currentUser);
        setProfile(profileData);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const supabase = createClient();
    cachedProfile = null;
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    window.location.reload();
  };

  const value = useMemo<ClientAuthState>(
    () => ({
      user,
      profile,
      loading,
      isAdmin: profile?.role === 'ADMIN',
      signOut,
    }),
    [user, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useClientAuth(): ClientAuthState {
  return useContext(AuthContext);
}

export default useClientAuth;
