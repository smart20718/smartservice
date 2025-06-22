import React from 'react';
import { motion } from 'framer-motion';

interface UserProfileSkeletonProps {
  isExpanded: boolean;
}

export const UserProfileSkeleton: React.FC<UserProfileSkeletonProps> = ({ isExpanded }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar skeleton */}
      <div className="rounded-full bg-blue-200 dark:bg-white/10 animate-pulse w-10 h-10" />
      
      {/* Text skeleton */}
      {isExpanded && (
        <motion.div 
          className="flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="h-3 w-20 bg-blue-200 dark:bg-white/10 rounded animate-pulse" />
          <div className="h-2 w-24 bg-blue-200 dark:bg-white/10 rounded animate-pulse" />
        </motion.div>
      )}
    </div>
  );
}; 