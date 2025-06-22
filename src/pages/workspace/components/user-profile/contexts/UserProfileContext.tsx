import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { UserProfile } from '@/pages/workspace/components/user-profile/types';

interface UserProfileContextValue {
  profile: UserProfile | null;
  loading: boolean;
  refresh: () => Promise<void>;
  setProfile: (p: UserProfile) => void;
}

const UserProfileContext = createContext<UserProfileContextValue | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setProfile(null);
        return;
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error('Error fetching profile', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const contextValue: UserProfileContextValue = {
    profile,
    loading,
    refresh: fetchProfile,
    setProfile: (p) => setProfile(p),
  };

  return (
    <UserProfileContext.Provider value={contextValue}>{children}</UserProfileContext.Provider>
  );
};

export const useUserProfileContext = () => {
  const ctx = useContext(UserProfileContext);
  if (!ctx) throw new Error('useUserProfileContext must be used within UserProfileProvider');
  return ctx;
}; 