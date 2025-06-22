import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useUserProfileContext } from '@/user-profile/UserProfileContext';
import { Button } from '@/components/ui/inputs/button';
import { FloatingInput } from '@/components/ui/inputs/FloatingInput';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const PasswordStrengthBar: React.FC<{ score: number }> = ({ score }) => {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-600',
  ];
  return (
    <div className="w-full h-2 bg-blue-100 dark:bg-white/10 rounded mt-2 flex overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 transition-colors ${i < score ? colors[score - 1] : 'bg-transparent'}`}
        />
      ))}
    </div>
  );
};

const ChangePasswordForm: React.FC = () => {
  const { profile } = useUserProfileContext();
  const { toast } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const calcStrength = (pw:string)=>{
    let score=0;
    if(pw.length>=8) score++;
    if(/[A-Z]/.test(pw)) score++;
    if(/[0-9]/.test(pw)) score++;
    if(/[^A-Za-z0-9]/.test(pw)) score++;
    if(pw.length>=12) score++;
    return score; //0-5
  };
  const strength = calcStrength(newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    if (newPassword !== confirmPassword) {
      toast({ title: 'Passwords do not match' });
      return;
    }
    if (strength < 2) {
      toast({ title: 'Password is too weak' });
      return;
    }

    try {
      setSaving(true);

      // verify current password by signing in silently
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password: currentPassword,
      });
      if (signInError) throw new Error('Current password is incorrect');

      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) throw updateError;

      toast({ title: 'Password updated successfully' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      toast({ title: 'Failed to update password', description: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 max-w-lg mx-auto">
      <h3 className="text-xl font-semibold text-blue-800 dark:text-white mb-4 text-center">Change Password</h3>
      <div className="space-y-6">
        <FloatingInput
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <div>
          <FloatingInput
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordStrengthBar score={strength + 1} />
        </div>
        <FloatingInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" className="w-full" disabled={saving}>
          {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Update Password
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm; 