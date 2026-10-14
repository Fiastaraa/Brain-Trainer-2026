import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { GameService } from '../services/game.service';
import { AuthenticatedRequest } from '../types';

// Validasi input skor game menggunakan Zod
const createScoreSchema = z.object({
  gameType: z.enum([
    'QUICK_ARITHMETIC',
    'MISSING_OPERATOR',
    'ALGEBRA_BALANCE',
    'NUMBER_SEQUENCE',
    'MENTAL_ESTIMATION',
    'COMPARISON_MATH',
    'MATRIX_MATH',
    'PRIME_FACTOR',
  ]),
  score: z.number().int().nonnegative('Skor harus berupa bilangan bulat positif'),
  accuracy: z.number().min(0, 'Akurasi minimal 0%').max(100, 'Akurasi maksimal 100%'),
  timeSpent: z.number().int().positive('Waktu bermain harus lebih dari 0 detik').default(60),
});

export class ScoreController {
  /**
   * POST /api/scores
   * Menyimpan skor permainan baru dan memperbarui agregat user stats & daily streak
   */
  static async createScore(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Silakan login terlebih dahulu untuk menyimpan skor',
        });
        return;
      }

      const validated = createScoreSchema.parse(req.body);
      const result = await GameService.submitScore(userId, validated);

      res.status(201).json({
        success: true,
        message: 'Skor sesi permainan berhasil disimpan',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/scores
   * Mengambil riwayat skor game pengguna
   */
  static async getHistory(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Silakan login terlebih dahulu',
        });
        return;
      }

      const limit = parseInt(req.query.limit as string) || 20;
      const history = await GameService.getUserHistory(userId, limit);

      res.status(200).json({
        success: true,
        message: 'Riwayat skor pengguna berhasil dimuat',
        data: history,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/scores/stats
   * Mengambil statistik performa agregat untuk visualisasi chart/radar
   */
  static async getStats(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Silakan login terlebih dahulu',
        });
        return;
      }

      const analytics = await GameService.getUserStatsAndHistory(userId);

      res.status(200).json({
        success: true,
        message: 'Statistik agregat skor berhasil dimuat',
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  }
}
