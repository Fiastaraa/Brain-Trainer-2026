import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { CognitiveStat, GameSession } from '../types';

interface DashboardChartsProps {
  cognitiveStats: CognitiveStat[];
  recentSessions: GameSession[];
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({
  cognitiveStats,
  recentSessions,
}) => {
  // Format data for 5 Pillars Radar Chart
  const radarData = cognitiveStats.map((stat) => ({
    pillar: stat.pillar,
    skor: stat.scoreIndex,
    fullMark: 100,
  }));

  // Format data for Progression Line Chart
  const lineData = recentSessions.map((session, index) => ({
    session: `#${index + 1} (${session.game?.title || 'Game'})`,
    score: session.score,
    accuracy: session.accuracyRate || 0,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 5 Cognitive Pillars Radar Chart */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100">
              5 Pilar Kognitif (Radar Analysis)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Distribusi kemampuan kognitif Anda berdasarkan skor performa
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Skala 0 - 100
          </span>
        </div>

        <div className="h-72 w-full flex items-center justify-center">
          {radarData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="pillar"
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: '#64748b', fontSize: 10 }}
                />
                <Radar
                  name="Index Kemampuan"
                  dataKey="skor"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.45}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-slate-500">Belum ada data pilar kognitif</p>
          )}
        </div>
      </div>

      {/* Progress History Line Chart */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100">
              Progres Skor Sesi Terakhir
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Tren perolehan skor dari 10 sesi latihan terakhir
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Riwayat Skor
          </span>
        </div>

        <div className="h-72 w-full">
          {lineData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="session"
                  tick={{ fill: '#64748b', fontSize: 11 }}
                  tickLine={false}
                />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-sm text-slate-500">
                Selesaikan minimal 1 game untuk melihat grafik progres!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
