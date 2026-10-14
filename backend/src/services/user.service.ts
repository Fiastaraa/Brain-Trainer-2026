import { prisma } from '../config/prisma';
import { AppError } from '../middleware/error.middleware';

export class UserService {
  static async getDashboardAnalytics(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        stats: true,
      },
    });

    if (!user) {
      throw new AppError('Pengguna tidak ditemukan', 404);
    }

    // 10 Sesi game terakhir
    const recentScores = await prisma.gameScore.findMany({
      where: { userId },
      take: 10,
      orderBy: { playedAt: 'desc' },
    });

    // Breakdown per jenis dari 8 game matematika
    const scoresByGame = await prisma.gameScore.groupBy({
      by: ['gameType'],
      where: { userId },
      _avg: { score: true, accuracy: true },
      _count: { id: true },
    });

    return {
      profile: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
      stats: user.stats || {
        totalGamesPlayed: 0,
        currentStreak: 0,
        bestStreak: 0,
        averageMathScore: 0.0,
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
}
