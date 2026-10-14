import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/dashboard', authenticateToken, UserController.getDashboard);

export default router;
