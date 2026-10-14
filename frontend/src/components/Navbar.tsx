import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, Flame, Trophy, LogOut, User as UserIcon, Home } from 'lucide-react';
import { authService } from '../services/authService';

interface NavbarProps {
  streak?: number;
  score?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ streak = 0, score = 0 }) => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800 bg-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-300">
              Brain Trainer
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              v1.0
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-300">
          <Link
            to="/"
            className="p-2 rounded-lg text-slate-300 hover:text-indigo-400 hover:bg-slate-800/60 transition-colors flex items-center justify-center"
            title="Beranda"
            aria-label="Beranda"
          >
            <Home className="w-5 h-5" />
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="hover:text-indigo-400 transition-colors">
              Analitik & Progres
            </Link>
          )}
        </nav>

        {/* Right Section: Gamification Badges & Auth */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              {/* Daily Streak Indicator */}
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold">
                <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{streak} Hari</span>
              </div>

              {/* Total Score Indicator */}
              <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold">
                <Trophy className="w-4 h-4 text-indigo-400" />
                <span>{score.toLocaleString()} XP</span>
              </div>

              {/* Dashboard & Logout */}
              <Link
                to="/dashboard"
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                title="Profil & Dashboard"
              >
                <UserIcon className="w-4 h-4" />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-slate-800 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition"
                title="Keluar"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-600/30 transition"
              >
                Mulai Latihan
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
