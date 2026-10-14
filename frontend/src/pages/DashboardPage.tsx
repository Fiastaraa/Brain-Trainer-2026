import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Trophy, Play, Calendar, RefreshCw, Target, Award } from 'lucide-react';
import { gameService } from '../services/gameService';
import { UserAnalyticsResponse } from '../types';

const defaultStats: UserAnalyticsResponse = {
  profile: {
    id: 'u-1',
    username: 'Fia',
    email: 'fia@example.com',
    createdAt: new Date().toISOString(),
  },
  stats: {
    totalGamesPlayed: 14,
    currentStreak: 4,
    bestStreak: 7,
    averageMathScore: 385.5,
  },
  recentScores: [
    {
      id: 's-1',
      userId: 'u-1',
      gameType: 'QUICK_ARITHMETIC',
      score: 420,
      accuracy: 94.0,
      timeSpent: 60,
      playedAt: new Date().toISOString(),
    },
    {
      id: 's-2',
      userId: 'u-1',
      gameType: 'ALGEBRA_BALANCE',
      score: 360,
      accuracy: 90.0,
      timeSpent: 55,
      playedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 's-3',
      userId: 'u-1',
      gameType: 'NUMBER_SEQUENCE',
      score: 450,
      accuracy: 100.0,
      timeSpent: 60,
      playedAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ],
  performanceByGame: [
    { gameType: 'QUICK_ARITHMETIC', avgScore: 420, avgAccuracy: 95, playedCount: 4 },
    { gameType: 'ALGEBRA_BALANCE', avgScore: 360, avgAccuracy: 90, playedCount: 3 },
    { gameType: 'NUMBER_SEQUENCE', avgScore: 450, avgAccuracy: 100, playedCount: 2 },
    { gameType: 'MISSING_OPERATOR', avgScore: 390, avgAccuracy: 92, playedCount: 2 },
    { gameType: 'MATRIX_MATH', avgScore: 310, avgAccuracy: 88, playedCount: 3 },
  ],
};

export const DashboardPage: React.FC = () => {
  const [data, setData] = useState<UserAnalyticsResponse>(defaultStats);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await gameService.getUserAnalytics();
      if (res && res.stats) {
        setData(res);
      }
    } catch {
      // offline preview
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Analisis Performa Matematika
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-2">
            Dashboard {data.profile?.username || 'Pengguna'} 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Pantau rata-rata skor, streak harian, dan ketepatan perhitungan dari 8 game kognitif.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/games/quick-arithmetic"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Mulai Latihan Baru</span>
          </Link>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Streak Harian</p>
            <h4 className="text-3xl font-extrabold text-white mt-1">
              {data.stats.currentStreak}{' '}
              <span className="text-sm font-semibold text-amber-400">Hari</span>
            </h4>
            <p className="text-xs text-amber-400/80 mt-1">
              Rekor terbaik: {data.stats.bestStreak} hari
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Flame className="w-6 h-6 text-amber-400 fill-amber-400" />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Rata-rata Skor Matematika</p>
            <h4 className="text-3xl font-extrabold text-white mt-1">
              {Math.round(data.stats.averageMathScore)}
            </h4>
            <p className="text-xs text-indigo-400 mt-1">Level: Math Strategist</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-indigo-400" />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Total Sesi Dimainkan</p>
            <h4 className="text-3xl font-extrabold text-white mt-1">
              {data.stats.totalGamesPlayed}
            </h4>
            <p className="text-xs text-slate-400 mt-1">Sesi latihan 60 detik</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-cyan-400" />
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-400">Game Dikuasai</p>
            <h4 className="text-3xl font-extrabold text-white mt-1">
              {data.performanceByGame.length} / 8
            </h4>
            <p className="text-xs text-emerald-400 mt-1">Variasi jenis game aktif</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Award className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Breakdown Performa Game Matematika */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4">
          Statistik Performa 8 Game Matematika
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.performanceByGame.map((item) => (
            <div
              key={item.gameType}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800"
            >
              <p className="text-xs font-semibold text-indigo-400">
                {item.gameType.replace('_', ' ')}
              </p>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white">{item.avgScore} XP</span>
                <span className="text-xs text-emerald-400 font-semibold">
                  {item.avgAccuracy}% Akurasi
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Dimainkan: {item.playedCount} kali</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Game Scores Table */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4">Riwayat Sesi Terakhir</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase bg-slate-800/60 text-slate-400 border-b border-slate-700/60">
              <tr>
                <th className="py-3 px-4">Jenis Game</th>
                <th className="py-3 px-4">Skor</th>
                <th className="py-3 px-4">Akurasi</th>
                <th className="py-3 px-4">Durasi</th>
                <th className="py-3 px-4">Waktu Bermain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {data.recentScores.map((score) => (
                <tr key={score.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-semibold text-white">
                    {score.gameType.replace('_', ' ')}
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-400">+{score.score} XP</td>
                  <td className="py-3 px-4">{score.accuracy}%</td>
                  <td className="py-3 px-4">{score.timeSpent}s</td>
                  <td className="py-3 px-4 text-xs text-slate-400">
                    {new Date(score.playedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
