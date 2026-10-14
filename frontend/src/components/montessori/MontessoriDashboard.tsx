import React from 'react';
import {
  Calendar,
  Sparkles,
  Zap,
  Flame,
  ArrowRight,
  Ruler,
  Coins,
  CheckCircle2,
} from 'lucide-react';
import { useMontessori } from '../../context/MontessoriContext';
import { soundFX } from '../../utils/audio';

export const MontessoriDashboard: React.FC = () => {
  const { t, setActiveTab, theme } = useMontessori();
  const isDark = theme === 'dark';

  const handleStartGame = (tab: 'game' | 'sandbox') => {
    soundFX.playClick();
    setActiveTab(tab);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-slate-800'
            : 'bg-gradient-to-r from-sky-50 via-indigo-50 to-white border-indigo-100 shadow-sm'
        }`}
      >
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('Platform 8 Latihan Kognitif & Metode Sensorik-Konkret', '8 Cognitive Training Games & Sensory-Concrete Montessori')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {t('Selamat Datang di Kanvas Matematika Montessori!', 'Welcome to Montessori Math Canvas!')}
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {t(
              'Belajar matematika dari konkret ke abstrak menggunakan Batang Angka berwarna dan Manik Emas untuk membangun intuisi logika sejak dini.',
              'Learn mathematics from concrete to abstract using colored Number Rods and Golden Beads to build strong logical intuition early.'
            )}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => handleStartGame('game')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-indigo-600/30 transition active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('Mulai Latihan Konkret', 'Start Concrete Practice')}</span>
            </button>
            <button
              onClick={() => handleStartGame('sandbox')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition"
            >
              {t('Buka Sandbox Bebas', 'Open Math Sandbox')}
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 4 Core Dashboard Cards (as shown in wireframe image) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Daily Challenge (Latihan Harian) */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {t('Tantangan Harian', 'Daily Challenge')}
              </span>
              <Calendar className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">
              {t('Latihan Harian Sensorik', 'Sensory Daily Challenge')}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {t(
                'Latihan digital interaktif dengan metode Montessori untuk melatih otak matematika 60 detik.',
                'Interactive digital sensory methods for math brains in 60-second sessions.'
              )}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => handleStartGame('game')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition"
            >
              <span>{t('Mulai Daily Challenge', 'Daily Challenge')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>5 Hari Streak</span>
            </div>
          </div>
        </div>

        {/* Card 2: Number Rods (Batang Angka) */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                {t('Manipulatif Konkret', 'Concrete Manipulative')}
              </span>
              <Ruler className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">
              {t('Number Rods (Batang Angka)', 'Number Rods - Addition')}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {t(
                'Representasi fisik batang merah-biru bergantian untuk mengasah intuisi kuantitas & penjumlahan.',
                'Alternating red-blue rods for intuitive sensory addition & quantities.'
              )}
            </p>

            {/* Visual mini rod */}
            <div className="mt-3 flex rounded overflow-hidden h-4 border border-slate-700">
              <div className="flex-1 bg-rose-500"></div>
              <div className="flex-1 bg-blue-500"></div>
              <div className="flex-1 bg-rose-500"></div>
              <div className="flex-1 bg-blue-500"></div>
              <div className="flex-1 bg-rose-500"></div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleStartGame('game')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition"
            >
              <span>{t('Mainkan Batang Angka', 'Play Number Rods')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Golden Beads (Manik Emas) */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {t('Nilai Tempat Desimal', 'Decimal Place Value')}
              </span>
              <Coins className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">
              {t('Golden Beads (Manik Emas)', 'Golden Beads')}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {t(
                'Perangkat manik-manik emas interaktif untuk satuan, puluhan, ratusan, dan ribuan.',
                'Interactive draggable beads sets with place value cards.'
              )}
            </p>

            {/* Visual golden beads cluster */}
            <div className="mt-3 flex gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-amber-400 shadow shadow-amber-400/50" />
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleStartGame('game')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition"
            >
              <span>{t('Jelajahi Manik Emas', 'Explore Golden Beads')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 4: Mental Math Level Progress */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {t('Level Progresif', 'Progressive Levels')}
              </span>
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">
              {t('Mental Math (Tingkat Kognitif)', 'Mental Math - Level Progress')}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {t(
                'Transisi dari manipulatif konkret ke perhitungan abstrak cepat tingkat 1, 2, dan 3.',
                'Transition from concrete manipulatives to fast abstract mental math.'
              )}
            </p>

            {/* Level Circles as seen in blueprint image */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 border-2 border-amber-500 flex items-center justify-center font-black text-sm">
                  1
                </div>
                <span className="text-[10px] text-slate-400 font-bold">Level 1</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 border-2 border-rose-500 flex items-center justify-center font-black text-sm">
                  2
                </div>
                <span className="text-[10px] text-slate-400 font-bold">Level 2</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center font-black text-sm">
                  3
                </div>
                <span className="text-[10px] text-slate-400 font-bold">Level 3</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleStartGame('game')}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center justify-center gap-1.5 transition"
            >
              <span>{t('Tantangan Mental Math', 'Mental Math Challenge')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
