import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { GameService } from '../services/game.service';
import { AuthenticatedRequest } from '../types';

const submitScoreSchema = z.object({
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
  score: z.number().int().nonnegative('Skor harus bernilai positif'),
  accuracy: z.number().min(0).max(100, 'Akurasi maksimal 100%'),
  timeSpent: z.number().int().positive('Waktu bermain harus lebih dari 0 detik'),
});

export class GameController {
  static getAllGames(req: Request, res: Response): void {
    const games = GameService.getGamesList();
    res.status(200).json({
      success: true,
      message: 'Daftar 8 game matematika berhasil dimuat',
      data: games,
    });
  }

  static getGameDetails(req: Request, res: Response, next: NextFunction): void {
    try {
      const { identifier } = req.params;
      const game = GameService.getGameBySlugOrType(identifier);
      res.status(200).json({
        success: true,
        message: 'Detail game berhasil dimuat',
        data: game,
      });
    } catch (error) {
      next(error);
    }
  }

  static async submitScore(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Silakan login terlebih dahulu' });
        return;
      }

      const validated = submitScoreSchema.parse(req.body);
      const result = await GameService.submitScore(userId, validated);

      res.status(201).json({
        success: true,
        message: 'Skor dan statistik performa berhasil disimpan',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserAnalytics(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Silakan login terlebih dahulu' });
        return;
      }

      const analytics = await GameService.getUserStatsAndHistory(userId);
      res.status(200).json({
        success: true,
        message: 'Statistik dan riwayat performa matematika berhasil dimuat',
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  }
}
