import { prisma } from '../config/prisma';
import { AppError } from '../middleware/error.middleware';
import { GameType, SubmitScoreDto } from '../types';

export interface MathGameMetadata {
  type: GameType;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'SPEED' | 'LOGIC' | 'ANALYSIS' | 'ESTIMATION';
  icon: string;
}

export const MATH_GAMES_METADATA: MathGameMetadata[] = [
  {
    type: 'QUICK_ARITHMETIC',
    slug: 'quick-arithmetic',
    title: 'Hitung Cepat',
    subtitle: 'Quick Arithmetic Blitz',
    description: 'Selesaikan operasi aritmatika dasar (+, -, *, /) secepat mungkin sebelum waktu habis.',
    category: 'SPEED',
    icon: 'zap',
  },
  {
    type: 'MISSING_OPERATOR',
    slug: 'missing-operator',
    title: 'Cari Operator',
    subtitle: 'Missing Operator Puzzle',
    description: 'Tentukan simbol matematika (+, -, *, /) yang hilang untuk melengkapi persamaan yang benar.',
    category: 'LOGIC',
    icon: 'help-circle',
  },
  {
    type: 'ALGEBRA_BALANCE',
    slug: 'algebra-balance',
    title: 'Persamaan Aljabar',
    subtitle: 'Algebra Balance Quest',
    description: 'Pecahkan nilai variabel x dalam timbangan persamaan linear sederhana.',
    category: 'LOGIC',
    icon: 'scale',
  },
  {
    type: 'NUMBER_SEQUENCE',
    slug: 'number-sequence',
    title: 'Pola & Deret Angka',
    subtitle: 'Arithmetic & Geometric Sequences',
    description: 'Identifikasi pola logika bilangan aritmatika atau geometri dan temukan angka berikutnya.',
    category: 'LOGIC',
    icon: 'trending-up',
  },
  {
    type: 'MENTAL_ESTIMATION',
    slug: 'mental-estimation',
    title: 'Estimasi Cepat',
    subtitle: 'Mental Estimation Challenge',
    description: 'Perkirakan hasil perkalian atau pembagian besar dengan cepat dan pilih opsi terdekat.',
    category: 'ESTIMATION',
    icon: 'target',
  },
  {
    type: 'COMPARISON_MATH',
    slug: 'comparison-math',
    title: 'Tanda Perbandingan',
    subtitle: 'Greater Than or Less Than',
    description: 'Evaluasi dua ekspresi matematika dalam hitungan detik dan tentukan relasi (<, >, =).',
    category: 'SPEED',
    icon: 'git-compare',
  },
  {
    type: 'MATRIX_MATH',
    slug: 'matrix-math',
    title: 'Matriks Angka',
    subtitle: 'Magic Square & Matrix Math',
    description: 'Isi angka yang kosong pada grid matriks agar jumlah baris dan kolom sesuai target.',
    category: 'ANALYSIS',
    icon: 'grid',
  },
  {
    type: 'PRIME_FACTOR',
    slug: 'prime-factor',
    title: 'Bilangan Prima & Faktor',
    subtitle: 'Prime & Factor Sieve',
    description: 'Kategorikan bilangan prima vs komposit, serta identifikasi faktor pembagi dengan tepat.',
    category: 'ANALYSIS',
    icon: 'hash',
  },
];

export class GameService {
  static getGamesList() {
    return MATH_GAMES_METADATA;
  }

  static getGameBySlugOrType(identifier: string) {
    const game = MATH_GAMES_METADATA.find(
      (g) => g.slug === identifier || g.type === identifier
    );
    if (!game) {
      throw new AppError('Game matematika tidak ditemukan', 404);
    }
    return game;
  }

  static async submitScore(userId: string, dto: SubmitScoreDto) {
    // 1. Simpan sesi GameScore
    const newScore = await prisma.gameScore.create({
      data: {
        userId,
        gameType: dto.gameType,
        score: dto.score,
        accuracy: dto.accuracy,
        timeSpent: dto.timeSpent,
      },
    });

    // 2. Ambil atau inisialisasi UserStats
    let stats = await prisma.userStats.findUnique({
      where: { userId },
    });

    if (!stats) {
      stats = await prisma.userStats.create({
        data: {
          userId,
          totalGamesPlayed: 0,
          currentStreak: 0,
          bestStreak: 0,
          averageMathScore: 0.0,
        },
      });
    }

    // 3. Kalkulasi Streak Harian
    const now = new Date();
    let currentStreak = stats.currentStreak;

    if (!stats.lastPlayedDate) {
      currentStreak = 1;
    } else {
      const lastDate = new Date(stats.lastPlayedDate).toDateString();
      const todayDate = now.toDateString();
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);

      if (lastDate === yesterday.toDateString()) {
        currentStreak += 1;
      } else if (lastDate !== todayDate) {
        currentStreak = 1; // streak reset
      }
    }

    const bestStreak = Math.max(stats.bestStreak, currentStreak);

    // 4. Hitung rerata skor matematika secara agregat
    const aggregate = await prisma.gameScore.aggregate({
      where: { userId },
      _avg: { score: true },
      _count: { id: true },
    });

    const totalGames = aggregate._count.id;
    const avgScore = Number((aggregate._avg.score || dto.score).toFixed(2));

    const updatedStats = await prisma.userStats.update({
      where: { userId },
      data: {
        totalGamesPlayed: totalGames,
        currentStreak,
        bestStreak,
        averageMathScore: avgScore,
        lastPlayedDate: now,
      },
    });

    return {
      scoreRecord: newScore,
      userStats: updatedStats,
    };
  }

  static async getUserStatsAndHistory(userId: string) {
    const stats = await prisma.userStats.findUnique({
      where: { userId },
    });

    const recentScores = await prisma.gameScore.findMany({
      where: { userId },
      take: 10,
      orderBy: { playedAt: 'desc' },
    });

    // Rata-rata per tipe game untuk radar/chart
    const scoresByGame = await prisma.gameScore.groupBy({
      by: ['gameType'],
      where: { userId },
      _avg: { score: true, accuracy: true },
      _count: { id: true },
    });

    return {
      stats: stats || {
        totalGamesPlayed: 0,
        currentStreak: 0,
        bestStreak: 0,
        averageMathScore: 0,
      },
      recentScores,
      performanceByGame: scoresByGame.map((item) => ({
        gameType: item.gameType,
        avgScore: Math.round(item._avg.score || 0),
        avgAccuracy: Math.round(item._avg.accuracy || 0),
        playedCount: item._count.id,
      })),
    };
  }

  static async getUserHistory(userId: string, limit: number = 20) {
    return prisma.gameScore.findMany({
      where: { userId },
      take: limit,
      orderBy: { playedAt: 'desc' },
    });
  }
}
