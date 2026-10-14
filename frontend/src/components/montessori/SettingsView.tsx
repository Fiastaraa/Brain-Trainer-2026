import React from 'react';
import { Settings, Globe, Moon, Sun, Volume2, Database, ExternalLink } from 'lucide-react';
import { useMontessori } from '../../context/MontessoriContext';
import { soundFX } from '../../utils/audio';

export const SettingsView: React.FC = () => {
  const { language, setLanguage, theme, setTheme, t } = useMontessori();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h3 className="text-xl font-black text-slate-100">
          {t('Pengaturan Sistem & Preferensi', 'System Settings & Preferences')}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {t(
            'Konfigurasi bahasa dwibahasa, mode visual, dan konektivitas database.',
            'Configure bilingual language, visual modes, and database connectivity.'
          )}
        </p>
      </div>

      <div className="space-y-4">
        {/* Language setting */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {t('Bahasa / Dual System Language', 'Language')}
              </h4>
              <p className="text-xs text-slate-400">
                {t('Pilihan tampilan Bahasa Indonesia atau English', 'Choose between Indonesian or English')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playClick();
                setLanguage('id');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                language === 'id' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Indonesia (ID)
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                setLanguage('en');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                language === 'en' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              English (EN)
            </button>
          </div>
        </div>

        {/* Theme mode setting */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">
                {t('Mode Tampilan (Theme)', 'Visual Mode')}
              </h4>
              <p className="text-xs text-slate-400">
                {t('Pilihan Dark Mode atau Light Mode', 'Choose Dark Mode or Light Mode')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playClick();
                setTheme('dark');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Dark Mode
            </button>
            <button
              onClick={() => {
                soundFX.playClick();
                setTheme('light');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                theme === 'light' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              Light Mode
            </button>
          </div>
        </div>

        {/* Database XAMPP setting info */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-white">
                  Database XAMPP MySQL (phpMyAdmin)
                </h4>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                mysql://root:@localhost:3306/brain_trainer_db
              </p>
            </div>
          </div>

          <a
            href="http://localhost/phpmyadmin/index.php?route=/database/structure&db=brain_trainer_db"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition"
          >
            <span>phpMyAdmin 5.2.1</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
