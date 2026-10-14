import { Router } from 'express';
import { GameController } from '../controllers/game.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Endpoint publik: Ambil daftar 8 game matematika & detailnya
router.get('/', GameController.getAllGames);
router.get('/:identifier', GameController.getGameDetails);

// Endpoint terproteksi: Simpan skor game & ambil statistik pengguna
router.post('/score', authenticateToken, GameController.submitScore);
router.get('/analytics/me', authenticateToken, GameController.getUserAnalytics);

export default router;
