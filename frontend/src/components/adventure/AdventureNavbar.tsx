import React, { useState } from 'react';
import {
  Flame,
  Coins,
  Sparkles,
  Heart,
  Globe,
  RotateCcw,
  Trophy,
  User,
  Shield,
  Zap,
} from 'lucide-react';
import { useAdventure } from '../../context/AdventureContext';
import { useMontessori } from '../../context/MontessoriContext';
import { soundFX } from '../../utils/audio';

interface AdventureNavbarProps {
  onOpenProfile: () => void;
  onOpenBadges: () => void;
}

export const AdventureNavbar: React.FC<AdventureNavbarProps> = ({
  onOpenProfile,
  onOpenBadges,
}) => {
  const {
    name,
    avatar,
    level,
    xp,
    maxXp,
    coins,
    hearts,
    maxHearts,
    streak,
    title,
  } = useAdventure();

  const { language, setLanguage, t } = useMontessori();

  const xpPercent = Math.min(100, Math.round((xp / maxXp) * 100));

  const handleLang = (lang: 'id' | 'en') => {
    soundFX.playClick();
    setLanguage(lang);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b-2 border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & Codédex Vibe Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-xl">
              🎮
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base sm:text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-indigo-300 to-rose-300">
                BrainDex
              </span>
              <span className="text-[10px] font-bold text-amber-400 border border-amber-400/30 px-1.5 py-0.2 rounded-full bg-amber-400/10 hidden sm:inline-block">
                ⋆˙⟡ Adventure
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              {t('Petualangan Game Latihan Otak', 'Start Your Math Adventure')}
            </p>
          </div>
        </div>

        {/* Center: RPG Stat HUD (HP Hearts, XP Bar, Coins) */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Hearts (HP) */}
          <div
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-400"
            title={`${hearts} / ${maxHearts} HP`}
          >
            {Array.from({ length: maxHearts }).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                  i < hearts
                    ? 'fill-rose-500 text-rose-500 scale-100'
                    : 'text-slate-700 scale-90'
                }`}
              />
            ))}
          </div>

          {/* XP Progress Bar */}
          <div className="hidden md:flex flex-col w-36 lg:w-48 space-y-1">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-indigo-300 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                Lv. {level}
              </span>
              <span className="text-slate-400">
                {xp}/{maxXp} XP
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-slate-700">
              <div
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          {/* Coins / Gold */}
          <div
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-black"
            title="Koin Hasil Quest"
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span>{coins}</span>
          </div>

          {/* Daily Streak */}
          <div
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs sm:text-sm font-black"
            title="Streak Harian"
          >
            <Flame className="w-4 h-4 fill-orange-400 text-orange-400" />
            <span>{streak}d</span>
          </div>
        </div>

        {/* Right: Character Profile & Language Switch (NO LOGIN REQUIRED) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Trophy Room Quick Action */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenBadges();
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-slate-700 flex items-center gap-1.5 text-xs font-bold transition active:scale-95"
            title="Koleksi Lencana / Badges"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">{t('Lencana', 'Badges')}</span>
          </button>

          {/* Player Avatar Button */}
          <button
            onClick={() => {
              soundFX.playClick();
              onOpenProfile();
            }}
            className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/40 hover:border-indigo-400 transition active:scale-95 shadow-md shadow-indigo-900/20"
            title="Ubah Karakter Petualang"
          >
            <span className="text-xl sm:text-2xl">{avatar}</span>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-black text-white leading-tight max-w-24 truncate">
                {name}
              </p>
              <p className="text-[10px] font-semibold text-indigo-400">{title}</p>
            </div>
          </button>

          {/* Bilingual Switcher: EN | ID */}
          <div className="flex items-center p-0.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-bold">
            <button
              onClick={() => handleLang('en')}
              className={`px-2 py-1 rounded-lg transition ${
                language === 'en'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLang('id')}
              className={`px-2 py-1 rounded-lg transition ${
                language === 'id'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ID
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
