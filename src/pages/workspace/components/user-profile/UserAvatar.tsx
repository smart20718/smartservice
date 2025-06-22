import React from 'react';
import { UserProfile } from './types';
import { User } from 'lucide-react';

interface UserAvatarProps {
  profile: UserProfile | null;
  size?: number;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ profile, size = 40 }) => {
  // Get initials from username if available
  const getInitials = () => {
    if (!profile?.username) return 'U';
    return profile.username.charAt(0).toUpperCase();
  };

  return (
    <div 
      className="rounded-full flex items-center justify-center bg-gradient-to-br from-command-teal/30 to-purple-500/30 border border-white/10 overflow-hidden"
      style={{ width: size, height: size }}
    >
      {profile?.avatar_url ? (
        <img 
          src={profile.avatar_url} 
          alt={profile?.username || 'User'} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          {profile ? (
            <span className="text-white font-medium text-sm">
              {getInitials()}
            </span>
          ) : (
            <User className="text-white/80" size={size * 0.6} />
          )}
        </div>
      )}
    </div>
  );
}; 