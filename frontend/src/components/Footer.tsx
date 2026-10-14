import React from 'react';
import { Brain, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/60 py-10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
            <Brain className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-200">Brain Trainer</p>
            <p className="text-xs text-slate-500">
              Interactive Cognitive Training Platform • Portfolio Project
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs text-slate-400">
          <span>5 Pilar: Memori, Fokus, Kecepatan, Logika, Visual</span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1">
            Dibuat dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> untuk latihan kognitif harian
          </span>
        </div>

        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Brain Trainer. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
