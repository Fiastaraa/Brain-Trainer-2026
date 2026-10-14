import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Zap, HelpCircle, Scale, TrendingUp, Target, GitCompare, Grid, Hash, Sparkles } from 'lucide-react';
import { MathGameInfo } from '../types';

interface GameCardProps {
  game: MathGameInfo;
}

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

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:shadow-xl hover:shadow-indigo-500/10 border border-slate-800">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
            {getIcon(game.type)}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border bg-gradient-to-r ${
              categoryColor[game.category]
            }`}
          >
            {game.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
          {game.title}
        </h3>
        <p className="text-xs text-indigo-400/80 font-medium mt-0.5">{game.subtitle}</p>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-3">
          {game.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">Sesi ~60 Detik</span>
        <Link
          to={`/games/${game.slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white text-sm font-semibold shadow-md shadow-indigo-600/20 group-hover:translate-x-0.5 transition-all"
        >
          <span>Mainkan</span>
          <Play className="w-3.5 h-3.5 fill-white" />
        </Link>
      </div>
    </div>
  );
};
