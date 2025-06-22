import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Import translation files
import landingPageTranslations from '../translations/landingpage.json';
import authTranslations from '../translations/auth.json';
import workspaceTranslations from '../translations/workspace.json';

// Define available languages
export type Language = 'en' | 'fr';

// Define translation structure
export interface Translations {
  landingPage: typeof landingPageTranslations.en;
  auth: typeof authTranslations.en;
  workspace: typeof workspaceTranslations.en;
}

// Create context with default values
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const defaultTranslations: Translations = {
  landingPage: landingPageTranslations.en,
  auth: authTranslations.en,
  workspace: workspaceTranslations.en,
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: defaultTranslations,
});

// Create provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or use 'en' as default
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  // Prepare translations based on selected language
  const [translations, setTranslations] = useState<Translations>(defaultTranslations);

  useEffect(() => {
    // Update translations when language changes
    const newTranslations: Translations = {
      landingPage: language === 'en' ? landingPageTranslations.en : landingPageTranslations.fr,
      auth: language === 'en' ? authTranslations.en : authTranslations.fr,
      workspace: language === 'en' ? workspaceTranslations.en : workspaceTranslations.fr,
    };
    
    setTranslations(newTranslations);
    
    // Save language preference to localStorage
    localStorage.setItem('language', language);
    
    // Update HTML lang attribute
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Function to change language
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext; 