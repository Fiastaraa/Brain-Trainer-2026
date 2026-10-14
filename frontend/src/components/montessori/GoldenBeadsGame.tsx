import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, Trophy, ArrowRight } from 'lucide-react';
import { useMontessori } from '../../context/MontessoriContext';
import { soundFX } from '../../utils/audio';

export const GoldenBeadsGame: React.FC = () => {
  const { t, theme } = useMontessori();
  const isDark = theme === 'dark';

  const getRandomTarget = () => {
    const h = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const t = Math.floor(Math.random() * 8) + 1; // 1 to 8
    const u = Math.floor(Math.random() * 9) + 1; // 1 to 9
    return h * 100 + t * 10 + u;
  };

  const [targetNumber, setTargetNumber] = useState<number>(() => getRandomTarget());
  const [thousands, setThousands] = useState(0);
  const [hundreds, setHundreds] = useState(0);
  const [tens, setTens] = useState(0);
  const [units, setUnits] = useState(0);

  const [feedback, setFeedback] = useState<string | null>(null);

  const currentTotal = thousands * 1000 + hundreds * 100 + tens * 10 + units;

  const nextChallenge = () => {
    soundFX.playClick();
    setTargetNumber(getRandomTarget());
    setHundreds(0);
    setTens(0);
    setUnits(0);
    setFeedback(null);
  };

  const handleAdjust = (type: 'thousands' | 'hundreds' | 'tens' | 'units', delta: number) => {
    soundFX.playClick();
    if (type === 'thousands') setThousands((prev) => Math.max(0, Math.min(9, prev + delta)));
    if (type === 'hundreds') setHundreds((prev) => Math.max(0, Math.min(9, prev + delta)));
    if (type === 'tens') setTens((prev) => Math.max(0, Math.min(9, prev + delta)));
    if (type === 'units') setUnits((prev) => Math.max(0, Math.min(9, prev + delta)));
    setFeedback(null);
  };

  const handleCheck = () => {
    if (currentTotal === targetNumber) {
      soundFX.playSuccess();
      setFeedback('correct');
    } else {
      soundFX.playWrong();
      setFeedback('wrong');
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`p-6 sm:p-8 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800 shadow-sm'
        }`}
      >
        <div className="text-center mb-6">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {t('Modul Nilai Tempat Montessori', 'Montessori Place Value Module')}
          </span>
          <h3 className="text-xl font-black mt-2">
            {t('Bentuk Angka Target dengan Manik Emas:', 'Form the Target Number with Golden Beads:')}{' '}
            <span className="text-amber-400 font-extrabold text-2xl">{targetNumber}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {t(
              'Sesuaikan jumlah Ratusan, Puluhan, dan Satuan menggunakan manik-manik konkret.',
              'Adjust the number of Hundreds, Tens, and Units using concrete beads.'
            )}
          </p>
        </div>

        {/* Place Value Manipulatives Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto my-6">
          {/* Hundreds Square */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 text-center space-y-3">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {t('Ratusan (100)', 'Hundreds (100)')}
            </p>
            <div className="h-28 flex items-center justify-center">
              <div className="grid grid-cols-5 gap-1 p-2 rounded-lg bg-amber-500/20 border border-amber-500/40">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleAdjust('hundreds', -1)}
                className="w-8 h-8 rounded-lg bg-slate-700 font-bold hover:bg-slate-600 text-white"
              >
                -
              </button>
              <span className="text-lg font-black w-6 text-center">{hundreds}</span>
              <button
                onClick={() => handleAdjust('hundreds', 1)}
                className="w-8 h-8 rounded-lg bg-slate-700 font-bold hover:bg-slate-600 text-white"
              >
                +
              </button>
            </div>
            <p className="text-xs text-slate-400">= {hundreds * 100}</p>
          </div>

          {/* Tens Bars */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 text-center space-y-3">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {t('Puluhan (10)', 'Tens (10)')}
            </p>
            <div className="h-28 flex items-center justify-center gap-1.5">
              {Array.from({ length: Math.min(5, tens) }).map((_, barIdx) => (
                <div
                  key={barIdx}
                  className="flex flex-col gap-0.5 p-1 rounded bg-amber-500/20 border border-amber-500/40"
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-amber-400" />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleAdjust('tens', -1)}
                className="w-8 h-8 rounded-lg bg-slate-700 font-bold hover:bg-slate-600 text-white"
              >
                -
              </button>
              <span className="text-lg font-black w-6 text-center">{tens}</span>
              <button
                onClick={() => handleAdjust('tens', 1)}
                className="w-8 h-8 rounded-lg bg-slate-700 font-bold hover:bg-slate-600 text-white"
              >
                +
              </button>
            </div>
            <p className="text-xs text-slate-400">= {tens * 10}</p>
          </div>

          {/* Units Beads */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 text-center space-y-3">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {t('Satuan (1)', 'Units (1)')}
            </p>
            <div className="h-28 flex items-center justify-center">
              <div className="flex flex-wrap gap-1.5 max-w-28 justify-center">
                {Array.from({ length: units }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 shadow border border-amber-200"
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => handleAdjust('units', -1)}
                className="w-8 h-8 rounded-lg bg-slate-700 font-bold hover:bg-slate-600 text-white"
              >
                -
              </button>
              <span className="text-lg font-black w-6 text-center">{units}</span>
              <button
                onClick={() => handleAdjust('units', 1)}
                className="w-8 h-8 rounded-lg bg-slate-700 font-bold hover:bg-slate-600 text-white"
              >
                +
              </button>
            </div>
            <p className="text-xs text-slate-400">= {units}</p>
          </div>
        </div>

        {/* Current Total Display & Submit Button */}
        <div className="text-center pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            {t('Total Terbentuk:', 'Formed Total:')}{' '}
            <span className="font-extrabold text-xl text-indigo-400">{currentTotal}</span>
          </p>

          <button
            onClick={handleCheck}
            className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black shadow-lg shadow-amber-500/20 active:scale-95 transition"
          >
            {t('Periksa Jawaban', 'Check Answer')}
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback === 'correct' && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">
                  {t(
                    `Sempurna! ${hundreds} Ratusan + ${tens} Puluhan + ${units} Satuan = ${targetNumber}`,
                    `Perfect! ${hundreds} Hundreds + ${tens} Tens + ${units} Units = ${targetNumber}`
                  )}
                </p>
                <p className="text-xs opacity-75">
                  {t('Kamu menguasai nilai tempat konkret desimal.', 'You mastered concrete place value structure.')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-emerald-400 text-sm">+100 XP</span>
              <button
                onClick={nextChallenge}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-emerald-600/30"
              >
                <span>{t('Soal Target Baru', 'Next Target')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
