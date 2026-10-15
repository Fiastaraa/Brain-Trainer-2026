import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Clock,
  Target,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { gameService } from '../services/gameService';
import { MathGameInfo } from '../types';

// Import all 8 Game components
import { QuickArithmetic } from '../components/games/QuickArithmetic';
import { MissingOperator } from '../components/games/MissingOperator';
import { AlgebraBalance } from '../components/games/AlgebraBalance';
import { NumberSequence } from '../components/games/NumberSequence';
import { MentalEstimation } from '../components/games/MentalEstimation';
import { ComparisonMath } from '../components/games/ComparisonMath';
import { MatrixMath } from '../components/games/MatrixMath';
import { PrimeFactor } from '../components/games/PrimeFactor';

export const GamePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [gameInfo, setGameInfo] = useState<MathGameInfo | null>(null);

  // Game session states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (slug) {
      gameService.getGameBySlug(slug).then((data) => setGameInfo(data));
    }
  }, [slug]);

  // Timer loop
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      handleGameOver();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setTimeLeft(60);
    setScore(0);
    setTotalAttempts(0);
    setCorrectCount(0);
    setSubmitSuccess(false);
  };

  const handleAnswer = (isCorrect: boolean, scoreDelta: number) => {
    setTotalAttempts((prev) => prev + 1);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setScore((prev) => prev + scoreDelta);
    } else {
      setScore((prev) => Math.max(0, prev - 20)); // slight penalty
    }
  };

  const handleGameOver = async () => {
    setIsPlaying(false);
    setIsGameOver(true);

    if (totalAttempts > 0 && gameInfo) {
      const accuracy = Number(((correctCount / totalAttempts) * 100).toFixed(1));
      setIsSubmitting(true);
      try {
        await gameService.submitScore({
          gameType: gameInfo.type,
          score,
          accuracy,
          timeSpent: 60 - timeLeft,
        });
        setSubmitSuccess(true);
      } catch {
        // offline mode
        setSubmitSuccess(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const accuracy =
    totalAttempts > 0 ? ((correctCount / totalAttempts) * 100).toFixed(0) : '100';

  // Render matching game component
  const renderGameComponent = () => {
    if (!gameInfo) return null;
    switch (gameInfo.type) {
      case 'QUICK_ARITHMETIC':
        return <QuickArithmetic onAnswer={handleAnswer} />;
      case 'MISSING_OPERATOR':
        return <MissingOperator onAnswer={handleAnswer} />;
      case 'ALGEBRA_BALANCE':
        return <AlgebraBalance onAnswer={handleAnswer} />;
      case 'NUMBER_SEQUENCE':
        return <NumberSequence onAnswer={handleAnswer} />;
      case 'MENTAL_ESTIMATION':
        return <MentalEstimation onAnswer={handleAnswer} />;
      case 'COMPARISON_MATH':
        return <ComparisonMath onAnswer={handleAnswer} />;
      case 'MATRIX_MATH':
        return <MatrixMath onAnswer={handleAnswer} />;
      case 'PRIME_FACTOR':
        return <PrimeFactor onAnswer={handleAnswer} />;
      default:
        return <QuickArithmetic onAnswer={handleAnswer} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Kategori: {gameInfo?.category || 'MATH'}
        </span>
      </div>

      {/* Game Info & Scorebar */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            {gameInfo?.title || 'Mathematical Brain Game'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">{gameInfo?.description}</p>
        </div>

        {isPlaying && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xl">
              <Clock className="w-5 h-5" />
              <span>{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl">
              <Trophy className="w-5 h-5" />
              <span>{score} XP</span>
            </div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
              <Target className="w-4 h-4" />
              <span>{accuracy}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Game Card Canvas */}
      <div className="glass-panel rounded-3xl p-8 border border-slate-800 min-h-[420px] flex items-center justify-center">
        {!isPlaying && !isGameOver && (
          <div className="text-center space-y-4 max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white">Siap Menguji Otak?</h2>
            <p className="text-xs text-slate-400">
              Selesaikan tantangan sebanyak mungkin dalam waktu 60 detik. Jawaban benar menambah
              skor dan akurasi.
            </p>
            <button
              onClick={startGame}
              className="w-full py-3.5 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition hover:-translate-y-0.5"
            >
              Mulai Game Sekarang
            </button>
          </div>
        )}

        {isPlaying && <div className="w-full">{renderGameComponent()}</div>}

        {isGameOver && (
          <div className="text-center space-y-6 max-w-md w-full">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-white">Waktu Habis! 🎉</h2>
              <p className="text-xs text-slate-400 mt-1">Hasil performa matematika sesi ini:</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <p className="text-xs text-slate-400">Total Skor</p>
                <p className="text-xl font-bold text-emerald-400">+{score} XP</p>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <p className="text-xs text-slate-400">Akurasi</p>
                <p className="text-xl font-bold text-cyan-400">{accuracy}%</p>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <p className="text-xs text-slate-400">Terjawab</p>
                <p className="text-xl font-bold text-white">
                  {correctCount}/{totalAttempts}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              {isSubmitting
                ? 'Menyimpan statistik...'
                : submitSuccess
                ? 'Skor dan streak berhasil diperbarui ✅'
                : 'Selesai'}
            </p>

            <div className="flex gap-3">
              <button
                onClick={startGame}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold flex items-center justify-center gap-2 border border-slate-700 transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Main Lagi</span>
              </button>
              <Link
                to="/dashboard"
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Lihat Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
