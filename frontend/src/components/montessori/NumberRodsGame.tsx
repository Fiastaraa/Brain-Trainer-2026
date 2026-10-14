import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Volume2,
  Trophy,
  Flame,
} from 'lucide-react';
import { useMontessori } from '../../context/MontessoriContext';
import { soundFX } from '../../utils/audio';
import api from '../../services/api';

interface Question {
  id: number;
  rodA: number; // Jumlah segmen batang A
  rodB: number; // Jumlah segmen batang B
  options: number[];
}

const generateDynamicRods = (): Question[] => {
  const result: Question[] = [];
  for (let i = 1; i <= 5; i++) {
    const rodA = Math.floor(Math.random() * 6) + 1; // 1 to 6
    const rodB = Math.floor(Math.random() * 5) + 1; // 1 to 5
    const sum = rodA + rodB;

    const distSet = new Set<number>([sum]);
    while (distSet.size < 4) {
      const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      distSet.add(Math.max(2, sum + delta));
    }

    result.push({
      id: i,
      rodA,
      rodB,
      options: Array.from(distSet).sort((a, b) => a - b),
    });
  }
  return result;
};

export const NumberRodsGame: React.FC = () => {
  const { t, theme } = useMontessori();
  const isDark = theme === 'dark';

  const [questions, setQuestions] = useState<Question[]>(() => generateDynamicRods());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];
  const correctAnswer = currentQ.rodA + currentQ.rodB;

  // Render Montessori Rod (Alternating Red and Blue Segments)
  const renderMontessoriRod = (units: number, label: string) => {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>{label}</span>
          <span className="text-indigo-400">{units} {t('Satuan', 'Units')}</span>
        </div>
        <div className="flex rounded-md overflow-hidden shadow-md border border-slate-700/50 h-8 sm:h-10">
          {Array.from({ length: units }).map((_, i) => {
            const isRed = i % 2 === 0;
            return (
              <div
                key={i}
                className={`flex-1 flex items-center justify-center text-[10px] font-black text-white/90 border-r border-black/20 ${
                  isRed
                    ? 'bg-gradient-to-b from-rose-500 to-rose-600'
                    : 'bg-gradient-to-b from-blue-500 to-blue-600'
                }`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Golden Beads Cluster
  const renderGoldenBeads = (count: number) => {
    return (
      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {t('Manik Emas Representasi', 'Golden Beads Representation')}
          </span>
          <span className="text-xs font-semibold text-amber-300">
            {count} {t('Butir', 'Beads')}
          </span>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 shadow-sm shadow-amber-500/40 border border-amber-300 animate-pulse"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>
    );
  };

  const handleSelectOption = (val: number) => {
    soundFX.playClick();
    setSelectedAnswer(val);
    setFeedback('idle');
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;
    setIsSubmitting(true);

    if (selectedAnswer === correctAnswer) {
      soundFX.playSuccess();
      setFeedback('correct');
      setScore((prev) => prev + 100);
      setStreak((prev) => prev + 1);

      // Save record to backend MySQL database
      try {
        await api.post('/records', {
          moduleId: 'mod-1',
          score: score + 100,
          accuracy: 100,
          streak: streak + 1,
          timeSpent: 45,
          status: 'completed',
        });
      } catch (e) {
        // Handled gracefully
      }
    } else {
      soundFX.playWrong();
      setFeedback('wrong');
      setStreak(1);
    }
    setIsSubmitting(false);
  };

  const handleNext = () => {
    soundFX.playClick();
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setFeedback('idle');
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    soundFX.playClick();
    setQuestions(generateDynamicRods());
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setFeedback('idle');
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto p-8 rounded-2xl glass-panel border border-slate-700 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40">
          <Trophy className="w-10 h-10 animate-bounce" />
        </div>
        <h3 className="text-2xl font-black text-white">
          {t('Luar Biasa! Modul Selesai', 'Awesome! Module Completed')}
        </h3>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          {t(
            'Kamu berhasil menyelesaikan latihan batang angka Montessori dengan pemahaman konkret!',
            'You completed the Montessori number rods exercise with concrete mathematical intuition!'
          )}
        </p>
        <div className="flex justify-center gap-4">
          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 min-w-32">
            <p className="text-xs text-slate-400">{t('Total Skor', 'Total Score')}</p>
            <p className="text-2xl font-black text-indigo-400">{score} XP</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 min-w-32">
            <p className="text-xs text-slate-400">{t('Akurasi', 'Accuracy')}</p>
            <p className="text-2xl font-black text-emerald-400">100%</p>
          </div>
        </div>
        <button
          onClick={handleRestart}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-2 mx-auto shadow-lg shadow-indigo-600/30 transition"
        >
          <RotateCcw className="w-4 h-4" />
          {t('Ulangi Latihan', 'Restart Training')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Game Bar: Progress, Streak, Score */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {t('Soal', 'Question')} {currentIndex + 1} / {QUESTIONS.length}
          </span>
          <span className="text-xs font-medium text-slate-400">
            {t('Batang Angka - Penjumlahan', 'Number Rods - Addition')}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>{streak} Streak</span>
          </div>
          <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-300">
            <Trophy className="w-4 h-4 text-indigo-400" />
            <span>{score} XP</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Game Wireframe Canvas */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800 shadow-sm'
        }`}
      >
        <div className="text-center mb-6">
          <h3 className="text-lg font-black tracking-tight">
            {t('Hitung Gabungan Kedua Batang Angka', 'Count the Combined Number Rods')}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {t(
              'Perhatikan segmen merah-biru bergantian untuk menemukan jumlah total.',
              'Observe the alternating red-blue segments to find the total sum.'
            )}
          </p>
        </div>

        {/* Rods Comparison & Equation Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center my-8">
          {/* Left: Rod A & Rod B */}
          <div className="md:col-span-5 space-y-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            {renderMontessoriRod(currentQ.rodA, t('Batang A', 'Rod A'))}
            <div className="flex justify-center text-indigo-400 font-extrabold text-lg">+</div>
            {renderMontessoriRod(currentQ.rodB, t('Batang B', 'Rod B'))}
          </div>

          {/* Middle: Arrow */}
          <div className="md:col-span-1 flex justify-center">
            <div className="w-10 h-10 rounded-full bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* Right: Concrete Golden Beads Representation */}
          <div className="md:col-span-5">
            {renderGoldenBeads(correctAnswer)}
          </div>
        </div>

        {/* Interactive Number Choice Buttons */}
        <div className="mt-8 space-y-4">
          <p className="text-xs font-bold text-center text-slate-400 uppercase tracking-wider">
            {t('Pilih Hasil Penjumlahan:', 'Select the Addition Result:')}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {currentQ.options.map((option) => {
              const isSelected = selectedAnswer === option;
              return (
                <button
                  key={option}
                  onClick={() => handleSelectOption(option)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl font-black text-xl sm:text-2xl transition-all shadow-md active:scale-95 ${
                    isSelected
                      ? 'bg-indigo-600 text-white ring-4 ring-indigo-400/40 scale-105 shadow-indigo-600/40'
                      : isDark
                      ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {/* Submit Action Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null || isSubmitting}
              className={`px-8 py-3.5 rounded-xl font-extrabold text-sm sm:text-base flex items-center gap-2 transition-all shadow-lg ${
                selectedAnswer === null
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/30 active:scale-95'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('Periksa / Submit', 'Check / Submit')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual & Audio Feedback Modal / Toast (as seen in wireframe) */}
      {feedback !== 'idle' && (
        <div
          className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-200 ${
            feedback === 'correct'
              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                feedback === 'correct' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {feedback === 'correct' ? (
                <CheckCircle2 className="w-8 h-8" />
              ) : (
                <XCircle className="w-8 h-8" />
              )}
            </div>
            <div>
              <h4 className="font-bold text-base">
                {feedback === 'correct'
                  ? t('Bagus Sekali! Jawabanmu Benar (+100 XP)', 'Awesome! Correct Answer (+100 XP)')
                  : t('Coba Periksa Kembali!', 'Oops! Try Again!')}
              </h4>
              <p className="text-xs opacity-80 mt-0.5">
                {feedback === 'correct'
                  ? t(
                      `Batang ${currentQ.rodA} + Batang ${currentQ.rodB} = ${correctAnswer} segmen konkret.`,
                      `Rod ${currentQ.rodA} + Rod ${currentQ.rodB} = ${correctAnswer} concrete segments.`
                    )
                  : t(
                      `Hitung kembali kotak merah dan biru dengan teliti!`,
                      `Count the red and blue blocks carefully!`
                    )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {feedback === 'correct' ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/30 transition active:scale-95 flex items-center gap-1.5"
              >
                <span>{t('Soal Berikutnya', 'Next Question')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setFeedback('idle')}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-md shadow-rose-600/30 transition active:scale-95"
              >
                {t('Coba Lagi', 'Try Again')}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
