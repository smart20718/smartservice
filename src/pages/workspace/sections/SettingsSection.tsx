import React, { useState, useRef } from "react";
import { useUserProfileContext } from "@/user-profile/UserProfileContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/inputs/button";
import { FloatingInput } from "@/components/ui/inputs/FloatingInput";
import { motion } from "framer-motion";
import { Loader2, UploadCloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChangePasswordForm from "./ChangePasswordForm";
import { Switch } from "@/components/ui/inputs/switch";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/inputs/select";

const SettingsSection: React.FC = () => {
  const { profile, loading, setProfile } = useUserProfileContext();
  const { t, language, setLanguage } = useLanguage();
  const [username, setUsername] = useState<string>(profile?.username || "");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar_url || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  // Theme toggle
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') !== 'light';
  });

  const handleThemeToggle = (checked: boolean) => {
    setDarkMode(checked);
    const themeValue = checked ? 'dark' : 'light';
    localStorage.setItem('theme', themeValue);
    // Trigger storage event programmatically for same-tab listeners
    window.dispatchEvent(new StorageEvent('storage', { key: 'theme', newValue: themeValue }));
    if (themeValue === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Ensure correct class on mount within settings page
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    try {
      setSaving(true);
      let avatarUrl = profile.avatar_url || null;

      // Upload avatar if a new file is selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const filePath = `${profile.id}/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("user-avatars")
          .upload(filePath, avatarFile, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("user-avatars")
          .getPublicUrl(filePath);
        avatarUrl = publicUrlData.publicUrl;
      }

      // Update profile in DB
      const { data: updatedData, error: updateError } = await supabase
        .from("profiles")
        .update({ username, avatar_url: avatarUrl })
        .eq("id", profile.id)
        .select()
        .single();

      if (updateError) throw updateError;

      // Update context so sidebar reflects immediately
      setProfile(updatedData as any);

      toast({
        title: "Profile updated successfully",
      });
    } catch (err: any) {
      console.error("Error updating profile:", err);
      toast({
        title: "Failed to update profile",
        description: err.message || "An error occurred while updating your profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600 dark:text-white" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto w-full max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 dark:scrollbar-thumb-blue-900"
    >
      <h2 className="command-title mb-6 text-center">{t.workspace.settings.title}</h2>

      {/* Username */}
      <div className="mb-6">
        <FloatingInput
          label={t.workspace.settings.username}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* User ID display */}
        {profile?.id && (
          <div className="mt-2 flex items-center gap-2 text-xs text-blue-700 dark:text-blue-300 select-all">
            <span className="font-mono">User ID:</span>
            <span className="font-mono bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">{profile.id}</span>
            <button
              type="button"
              className="ml-1 text-blue-500 hover:text-blue-700 dark:hover:text-white transition-colors"
              onClick={() => {navigator.clipboard.writeText(profile.id)}}
              title="Copy User ID"
            >
              Copy
            </button>
          </div>
        )}
      </div>

      {/* Avatar Upload */}
      <div className="mb-6 flex flex-col items-center gap-4">
        {avatarPreview ? (
          <img
            src={avatarPreview}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-white/10 flex items-center justify-center">
            <UploadCloud className="h-8 w-8 text-blue-500 dark:text-white/60" />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleAvatarChange}
        />
        <Button type="button" onClick={() => fileInputRef.current?.click()}>
          {t.workspace.settings.uploadAvatar}
        </Button>
      </div>

      {/* Save Button */}
      <Button
        type="button"
        className="w-full"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
        {t.workspace.settings.saveChanges}
      </Button>

      {/* Theme Toggle */}
      <div className="mt-10 flex items-center justify-between">
        <span className="text-sm font-medium text-blue-800 dark:text-white">{t.workspace.settings.darkMode}</span>
        <Switch checked={darkMode} onCheckedChange={handleThemeToggle} />
      </div>

      <ChangePasswordForm />

      {/* Language Selector */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-blue-800 dark:text-white">{t.workspace.settings.language}</span>
        <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};

export default SettingsSection; 