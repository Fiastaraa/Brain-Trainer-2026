import { Router } from 'express';
import { ScoreController } from '../controllers/score.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Semua rute skor memerlukan otentikasi JWT
router.use(authenticateToken);

// POST /api/scores -> Menyimpan skor game baru
router.post('/', ScoreController.createScore);

// GET /api/scores -> Mengambil riwayat skor game pengguna
router.get('/', ScoreController.getHistory);

// GET /api/scores/stats -> Mengambil statistik agregasi untuk visualisasi chart
router.get('/stats', ScoreController.getStats);

export default router;
