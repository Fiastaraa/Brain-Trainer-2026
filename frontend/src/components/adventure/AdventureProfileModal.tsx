import React, { useState } from 'react';
import { X, Trophy, Sparkles, User, Award, RotateCcw } from 'lucide-react';
import { useAdventure } from '../../context/AdventureContext';
import { useMontessori } from '../../context/MontessoriContext';
import { soundFX } from '../../utils/audio';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: 'profile' | 'badges';
}

const AVATAR_OPTIONS = ['🧙‍♂️', '🐱', '🤖', '🦊', '🧝', '🚀', '🦉', '🦄'];

export const AdventureProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  activeView,
}) => {
  const {
    name,
    setName,
    avatar,
    setAvatar,
    level,
    title,
    xp,
    maxXp,
    coins,
    streak,
    badges,
    resetAdventure,
  } = useAdventure();

  const { t } = useMontessori();
  const [tab, setTab] = useState<'profile' | 'badges'>(activeView);
  const [tempName, setTempName] = useState(name);

  if (!isOpen) return null;

  const handleSelectAvatar = (av: string) => {
    soundFX.playClick();
    setAvatar(av);
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();
    if (tempName.trim()) {
      setName(tempName.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border-2 border-indigo-500/40 p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Header: Profil Karakter vs Lencana */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              tab === 'profile'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t('Karakter Petualang', 'Adventurer Character')}</span>
          </button>
          <button
            onClick={() => setTab('badges')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
              tab === 'badges'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>{t('Koleksi Lencana', 'Badges Collection')}</span>
          </button>
        </div>

        {/* Profile Tab */}
        {tab === 'profile' && (
          <div className="space-y-6">
            {/* Current Character Card */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center space-x-4">
              <div className="text-4xl p-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 shadow-inner">
                {avatar}
              </div>
              <div className="flex-1">
                <h4 className="font-black text-lg text-white">{name}</h4>
                <p className="text-xs font-semibold text-indigo-400">{title}</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Level {level} • {xp}/{maxXp} XP • {coins} Koin
                </p>
              </div>
            </div>

            {/* Choose Avatar */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                {t('Pilih Avatar Karakter Kamu:', 'Choose Your Adventurer Avatar:')}
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    key={av}
                    onClick={() => handleSelectAvatar(av)}
                    className={`h-12 rounded-xl text-2xl flex items-center justify-center transition active:scale-90 ${
                      avatar === av
                        ? 'bg-indigo-600 ring-2 ring-indigo-400 shadow-lg'
                        : 'bg-slate-800 hover:bg-slate-700'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Change Name */}
            <form onSubmit={handleSaveName} className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                {t('Nama Petualang:', 'Adventurer Name:')}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  maxLength={20}
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-bold focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition"
                >
                  {t('Simpan', 'Save')}
                </button>
              </div>
            </form>



            {/* Reset Button */}
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
              <span className="text-[11px] text-slate-500">
                {t('Tersimpan otomatis di browser tanpa login', 'Saved in browser without login')}
              </span>
              <button
                onClick={() => {
                  soundFX.playClick();
                  if (window.confirm('Reset semua progres petualangan?')) {
                    resetAdventure();
                    onClose();
                  }
                }}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 opacity-70 hover:opacity-100"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Progres</span>
              </button>
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {tab === 'badges' && (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-4 rounded-2xl border flex items-center space-x-3 transition ${
                    b.unlocked
                      ? 'bg-amber-950/20 border-amber-500/40 text-amber-200 shadow-md'
                      : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="text-3xl">{b.icon}</div>
                  <div>
                    <h5 className="font-extrabold text-xs text-white">
                      {t(b.nameId, b.nameEn)}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {t(b.descId, b.descEn)}
                    </p>
                    <span
                      className={`inline-block mt-1 text-[10px] font-black px-2 py-0.5 rounded-full ${
                        b.unlocked
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {b.unlocked ? '✓ TERBUKA' : 'TERKUNCI'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
