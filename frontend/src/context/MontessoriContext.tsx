import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en';
export type Theme = 'dark' | 'light';
export type ActiveTab =
  | 'dashboard'
  | 'modules'
  | 'game'
  | 'sandbox'
  | 'rewards'
  | 'portal'
  | 'settings';

interface MontessoriContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  t: (idText: string, enText: string) => string;
}

const MontessoriContext = createContext<MontessoriContextType | undefined>(undefined);

export const MontessoriProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('brain_trainer_lang') as Language) || 'id';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('brain_trainer_theme') as Theme) || 'dark';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  useEffect(() => {
    localStorage.setItem('brain_trainer_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('brain_trainer_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Helper translation shortcut
  const t = (idText: string, enText: string) => (language === 'id' ? idText : enText);

  return (
    <MontessoriContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        activeTab,
        setActiveTab,
        t,
      }}
    >
      {children}
    </MontessoriContext.Provider>
  );
};

export const useMontessori = () => {
  const context = useContext(MontessoriContext);
  if (!context) {
    throw new Error('useMontessori must be used within a MontessoriProvider');
  }
  return context;
};
