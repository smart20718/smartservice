import React from 'react';
import { UserProfile } from './types';
import { motion } from 'framer-motion';

interface UserProfileInfoProps {
  profile: UserProfile | null;
  isExpanded: boolean;
}

export const UserProfileInfo: React.FC<UserProfileInfoProps> = ({ profile, isExpanded }) => {
  if (!profile) return null;

  return (
    <motion.div 
      className="flex flex-col"
      animate={{ 
        opacity: isExpanded ? 1 : 0,
        display: isExpanded ? 'flex' : 'none'
      }}
      transition={{ duration: 0.2 }}
    >
      <span className="text-sm font-medium text-blue-800 dark:text-white truncate">
        {profile.username}
      </span>
      <span className="text-xs text-blue-600 dark:text-white/60 truncate">
        {profile.email}
      </span>
    </motion.div>
  );
}; 