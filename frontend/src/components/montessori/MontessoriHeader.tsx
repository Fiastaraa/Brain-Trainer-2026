import React from 'react';
import { Sun, Moon, Globe, Sparkles, UserCheck } from 'lucide-react';
import { useMontessori } from '../../context/MontessoriContext';
import { soundFX } from '../../utils/audio';

export const MontessoriHeader: React.FC = () => {
  const { language, setLanguage, theme, toggleTheme, activeTab, t } = useMontessori();
  const isDark = theme === 'dark';

  const tabTitles: Record<string, { id: string; en: string }> = {
    dashboard: { id: 'Dashboard Kanvas Montessori', en: 'Bilingual Montessori Canvas' },
    modules: { id: 'Katalog Modul Pembelajaran', en: 'Learning Modules Catalog' },
    game: { id: 'Latihan Konkret: Batang Angka', en: 'Interactive Gameplay: Number Rods' },
    sandbox: { id: 'Sandbox Eksplorasi Konkret', en: 'Concrete Math Sandbox Canvas' },
    rewards: { id: 'Prestasi & Lencana Reward', en: 'Achievements & Reward Badges' },
    portal: { id: 'Portal Monitoring Guru & Orang Tua', en: 'Parent & Teacher Monitoring Portal' },
    settings: { id: 'Pengaturan Sistem & Profil', en: 'System & Profile Settings' },
  };

  const handleLang = (lang: 'id' | 'en') => {
    soundFX.playClick();
    setLanguage(lang);
  };

  const handleTheme = () => {
    soundFX.playClick();
    toggleTheme();
  };

  const currentTitle = tabTitles[activeTab] || tabTitles.dashboard;

  return (
    <header
      className={`h-16 px-6 border-b flex items-center justify-between transition-colors ${
        isDark
          ? 'bg-slate-900/80 border-slate-800 text-slate-100'
          : 'bg-white/80 border-slate-200 text-slate-800 shadow-sm'
      }`}
    >
      {/* Title & subtitle */}
      <div className="flex items-center space-x-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold">
            {t(currentTitle.id, currentTitle.en)}
          </h2>
          <p className="text-xs text-slate-400 font-medium hidden sm:block">
            {t('Metode Sensorik-Konkret Montessori untuk Matematika Dasar', 'Sensory-Concrete Montessori Methods for Early Math Learning')}
          </p>
        </div>
      </div>

      {/* Dual System Toggles: EN|ID & Light|Dark Mode */}
      <div className="flex items-center space-x-3">
        {/* Bilingual Switcher: EN | ID */}
        <div
          className={`flex items-center p-1 rounded-xl border text-xs font-bold transition-all ${
            isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-100 border-slate-300'
          }`}
        >
          <button
            onClick={() => handleLang('en')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition ${
              language === 'en'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="English Mode"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>EN</span>
          </button>
          <span className="text-slate-500 px-0.5">|</span>
          <button
            onClick={() => handleLang('id')}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition ${
              language === 'id'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mode Bahasa Indonesia"
          >
            <span>ID</span>
          </button>
        </div>

        {/* Multi-Mode: Dark | Light Mode */}
        <button
          onClick={handleTheme}
          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition ${
            isDark
              ? 'bg-slate-800/90 border-slate-700 text-amber-300 hover:bg-slate-700'
              : 'bg-slate-100 border-slate-300 text-indigo-700 hover:bg-slate-200'
          }`}
          title={isDark ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 fill-amber-300" />
              <span className="hidden sm:inline">Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 fill-indigo-600" />
              <span className="hidden sm:inline">Dark Mode</span>
            </>
          )}
        </button>

        {/* Student Avatar Tag */}
        <div
          className={`hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
            isDark
              ? 'bg-indigo-950/40 border-indigo-800/40 text-indigo-300'
              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Alvan Habibi (Siswa)</span>
        </div>
      </div>
    </header>
  );
};
