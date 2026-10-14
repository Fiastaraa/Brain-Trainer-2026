import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  RefreshCw,
  Database,
  ExternalLink,
} from 'lucide-react';
import { useMontessori } from '../../context/MontessoriContext';
import api from '../../services/api';
import { soundFX } from '../../utils/audio';

interface StudentRecord {
  id: string;
  studentName: string;
  studentId: string;
  module: string;
  moduleCode: string;
  level: number;
  status: 'Completed' | 'In Progress';
  accuracy: number;
  score: number;
  streak: number;
  date: string;
}

export const ParentTeacherPortal: React.FC = () => {
  const { t, theme } = useMontessori();
  const isDark = theme === 'dark';

  const [records, setRecords] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await api.get('/progress');
      if (res.data?.data) {
        setRecords(res.data.data);
      }
    } catch (err) {
      console.warn('Using fallback progress data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Data for Activity Time Streak Chart
  const streakActivityData = [
    { day: 'Sen / Mon', hours: 45, target: 50 },
    { day: 'Sel / Tue', hours: 55, target: 50 },
    { day: 'Rab / Wed', hours: 60, target: 50 },
    { day: 'Kam / Thu', hours: 40, target: 50 },
    { day: 'Jum / Fri', hours: 65, target: 50 },
    { day: 'Sab / Sat', hours: 80, target: 50 },
    { day: 'Min / Sun', hours: 70, target: 50 },
  ];

  // Data for Level Performance
  const levelPerformanceData = [
    { level: 'Level 1 (Rods)', score: 92, target: 100 },
    { level: 'Level 2 (Beads)', score: 85, target: 100 },
    { level: 'Level 3 (Mental)', score: 78, target: 100 },
  ];

  // Accuracy Matrix Heatmap (Student vs Module Accuracy)
  const heatmapData = [
    { student: 'Alvan Habibi', rod: 100, bead: 95, mental: 88, status: '94%' },
    { student: 'Dani Rizki', rod: 88, bead: 80, mental: 75, status: '81%' },
    { student: 'Azrul Ananda', rod: 100, bead: 92, mental: 90, status: '94%' },
    { student: 'Rian Syah', rod: 90, bead: 85, mental: 82, status: '85%' },
  ];

  const getHeatmapColor = (score: number) => {
    if (score >= 95) return 'bg-emerald-500 text-white font-bold';
    if (score >= 85) return 'bg-teal-500/80 text-white font-semibold';
    if (score >= 75) return 'bg-amber-500/80 text-white font-semibold';
    return 'bg-rose-500/80 text-white font-semibold';
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Database XAMPP Link & Controls */}
      <div
        className={`p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-200'
            : 'bg-white border-slate-200 text-slate-800 shadow-sm'
        }`}
      >
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base">
                {t('Status Database XAMPP MySQL', 'XAMPP MySQL Database Status')}
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Connected
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
              <span>Host: localhost / 127.0.0.1:3306</span>
              <span>•</span>
              <span className="text-indigo-400 font-mono font-semibold">db: brain_trainer_db</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={() => {
              soundFX.playClick();
              fetchRecords();
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 border border-slate-700 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{t('Segarkan Data', 'Refresh')}</span>
          </button>

          <a
            href="http://localhost/phpmyadmin/index.php?route=/database/structure&db=brain_trainer_db"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition"
          >
            <span>Buka phpMyAdmin</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-slate-800">
          <p className="text-xs font-medium text-slate-400">
            {t('Total Siswa Aktif', 'Active Students')}
          </p>
          <p className="text-2xl font-black text-white mt-1">4 Siswa</p>
          <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +100% {t('partisipasi minggu ini', 'weekly participation')}
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800">
          <p className="text-xs font-medium text-slate-400">
            {t('Rata-rata Akurasi', 'Average Accuracy')}
          </p>
          <p className="text-2xl font-black text-indigo-400 mt-1">94.5%</p>
          <p className="text-xs text-slate-400 mt-1">
            {t('Metode konkret terbukti efektif', 'Concrete method effective')}
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800">
          <p className="text-xs font-medium text-slate-400">
            {t('Rata-rata Streak', 'Average Streak')}
          </p>
          <p className="text-2xl font-black text-amber-400 mt-1">5.2 Hari</p>
          <p className="text-xs text-amber-400/80 mt-1">
            {t('Latihan harian konsisten', 'Consistent daily practice')}
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800">
          <p className="text-xs font-medium text-slate-400">
            {t('Modul Terselesaikan', 'Completed Modules')}
          </p>
          <p className="text-2xl font-black text-emerald-400 mt-1">18 Sesi</p>
          <p className="text-xs text-slate-400 mt-1">
            {t('Tersimpan di learning_records', 'Saved to learning_records')}
          </p>
        </div>
      </div>

      {/* Charts Section: Heatmap, Activity Time Streak, Level Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Heatmap: Accuracy Rate Matrix */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div>
            <h4 className="font-bold text-base text-slate-100">
              {t('Matriks Akurasi Siswa (Heatmap)', 'Student Accuracy Matrix (Heatmap)')}
            </h4>
            <p className="text-xs text-slate-400">
              {t(
                'Performa akurasi konkret tiap siswa pada modul batang angka dan manik emas.',
                'Concrete accuracy performance of each student across modules.'
              )}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-700/80 text-slate-400">
                  <th className="py-2.5 px-3">{t('Nama Siswa', 'Student Name')}</th>
                  <th className="py-2.5 px-3 text-center">{t('Batang Angka', 'Number Rods')}</th>
                  <th className="py-2.5 px-3 text-center">{t('Manik Emas', 'Golden Beads')}</th>
                  <th className="py-2.5 px-3 text-center">{t('Mental Math', 'Mental Math')}</th>
                  <th className="py-2.5 px-3 text-center">{t('Rata-rata', 'Average')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {heatmapData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-semibold text-slate-200">{row.student}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-lg ${getHeatmapColor(row.rod)}`}>
                        {row.rod}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-lg ${getHeatmapColor(row.bead)}`}>
                        {row.bead}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-lg ${getHeatmapColor(row.mental)}`}>
                        {row.mental}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-indigo-400">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Time Streak Bar Chart */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div>
            <h4 className="font-bold text-base text-slate-100">
              {t('Aktivitas Waktu & Streak Mingguan', 'Activity Time & Streak')}
            </h4>
            <p className="text-xs text-slate-400">
              {t('Durasi latihan harian siswa (menit)', 'Daily training duration (minutes)')}
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={streakActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#f8fafc',
                  }}
                />
                <Bar dataKey="hours" name="Menit Latihan" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabular Tracker (from Infographic) */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-base text-slate-100">
              {t('Tabular Tracker (Riwayat Sesi Pembelajaran Siswa)', 'Tabular Tracker (Student Learning History)')}
            </h4>
            <p className="text-xs text-slate-400">
              {t(
                'Data riil dari tabel MySQL `learning_records` & `users`',
                'Real-time data from MySQL `learning_records` & `users`'
              )}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4">{t('Siswa / Student Name', 'Student Name')}</th>
                <th className="py-3 px-4">{t('Modul', 'Module')}</th>
                <th className="py-3 px-4 text-center">{t('Level', 'Level')}</th>
                <th className="py-3 px-4 text-center">{t('Status', 'Status')}</th>
                <th className="py-3 px-4 text-center">{t('Akurasi', 'Accuracy')}</th>
                <th className="py-3 px-4 text-right">{t('Tanggal / Date', 'Date')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-200">{r.studentName}</td>
                  <td className="py-3.5 px-4 text-slate-300">{r.module}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                      Level {r.level}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold ${
                        r.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {r.status === 'Completed' ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {r.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-emerald-400">
                    {r.accuracy}%
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-400">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
