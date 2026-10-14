import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  HelpCircle,
  Scale,
  TrendingUp,
  Target,
  GitCompare,
  Grid,
  Hash,
  Flame,
  ArrowRight,
  Play,
} from 'lucide-react';
import { MATH_GAMES } from '../services/gameService';
import { MathGameInfo } from '../types';

const categoryColor = {
  SPEED: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
  LOGIC: 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30',
  ANALYSIS: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
  ESTIMATION: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30',
};

const getIcon = (type: string) => {
  switch (type) {
    case 'QUICK_ARITHMETIC':
      return <Zap className="w-5 h-5 text-cyan-400" />;
    case 'MISSING_OPERATOR':
      return <HelpCircle className="w-5 h-5 text-purple-400" />;
    case 'ALGEBRA_BALANCE':
      return <Scale className="w-5 h-5 text-purple-400" />;
    case 'NUMBER_SEQUENCE':
      return <TrendingUp className="w-5 h-5 text-indigo-400" />;
    case 'MENTAL_ESTIMATION':
      return <Target className="w-5 h-5 text-amber-400" />;
    case 'COMPARISON_MATH':
      return <GitCompare className="w-5 h-5 text-cyan-400" />;
    case 'MATRIX_MATH':
      return <Grid className="w-5 h-5 text-emerald-400" />;
    case 'PRIME_FACTOR':
      return <Hash className="w-5 h-5 text-emerald-400" />;
    default:
      return <Sparkles className="w-5 h-5 text-indigo-400" />;
  }
};

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-20 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 lg:py-20 text-center px-4">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Platform 8 Latihan Kognitif Berbasis Matematika</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Tingkatkan Kecepatan & Logika Otak dengan{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400">
              8 Game Matematika
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Asah ketangkasan berhitung, deduksi aljabar, pengenalan deret angka, dan estimasi mental
            dalam sesi singkat 60 detik setiap hari.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#games"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition hover:-translate-y-0.5"
            >
              <span>Pilih & Mainkan Game</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Lihat Statistik & Streak</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left border-t border-slate-800/80 pt-8">
            <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
              <p className="text-2xl font-extrabold text-white">8</p>
              <p className="text-xs text-slate-400 mt-0.5">Game Matematika Inti</p>
            </div>
            <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
              <p className="text-2xl font-extrabold text-cyan-400">60 Detik</p>
              <p className="text-xs text-slate-400 mt-0.5">Waktu Latihan Cepat</p>
            </div>
            <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
              <p className="text-2xl font-extrabold text-amber-400 flex items-center gap-1">
                <Flame className="w-5 h-5 fill-amber-400 inline" /> Streak
              </p>
              <p className="text-xs text-slate-400 mt-0.5">Konsistensi Harian</p>
            </div>
            <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
              <p className="text-2xl font-extrabold text-emerald-400">Akurasi</p>
              <p className="text-xs text-slate-400 mt-0.5">Analitik Performa</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Math Games Grid */}
      <section id="games" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white">8 Game Latihan Matematika</h2>
          <p className="mt-2 text-slate-400 text-sm">
            Setiap game menstimulasi aspek kognitif berbeda: kecepatan eksekusi, logika persamaan,
            dan analisis numerik.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MATH_GAMES.map((game: MathGameInfo, index) => (
            <div
              key={game.type}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-slate-800 group hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                    {getIcon(game.type)}
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-gradient-to-r ${
                      categoryColor[game.category]
                    }`}
                  >
                    #{index + 1} {game.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs text-indigo-400/80 font-medium mt-0.5">{game.subtitle}</p>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {game.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Target ~60s</span>
                <Link
                  to={`/games/${game.slug}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition hover:scale-105"
                >
                  <span>Mainkan</span>
                  <Play className="w-3 h-3 fill-white" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
