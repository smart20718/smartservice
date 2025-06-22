import React from 'react';
import { LogOut, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserAvatar } from './UserAvatar';
import { UserProfileInfo } from './UserProfileInfo';
import { UserProfileSkeleton } from './UserProfileSkeleton';
import { useUserProfileContext } from '@/user-profile/UserProfileContext';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

interface UserProfileSectionProps {
  isExpanded: boolean;
  onNavigate?: (section: "settings") => void;
}

export const UserProfileSection: React.FC<UserProfileSectionProps> = ({ isExpanded, onNavigate }) => {
  const { profile, loading } = useUserProfileContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  return (
    <div className="mt-auto border-t border-black/10 dark:border-white/5 pt-4 px-3 pb-4">
      {loading ? (
        <UserProfileSkeleton isExpanded={isExpanded} />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar profile={profile} size={40} />
            <UserProfileInfo profile={profile} isExpanded={isExpanded} />
          </div>
          
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-100 dark:hover:bg-white/10 text-blue-700 dark:text-white/70 hover:text-blue-900 dark:hover:text-white transition-colors"
              onClick={handleSignOut}
              title="Sign out"
            >
              <LogOut size={18} />
            </motion.button>
          )}

          {isExpanded && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-100 dark:hover:bg-white/10 text-blue-700 dark:text-white/70 hover:text-blue-900 dark:hover:text-white transition-colors"
              onClick={() => onNavigate && onNavigate("settings")}
              title="Settings"
            >
              <Settings size={18} />
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}; 