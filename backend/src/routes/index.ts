import { Router } from 'express';
import authRoutes from './auth.routes';
import gameRoutes from './game.routes';
import scoreRoutes from './score.routes';
import userRoutes from './user.routes';

import montessoriRoutes from './montessori.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/games', gameRoutes);
router.use('/scores', scoreRoutes);
router.use('/users', userRoutes);
// Montessori Brain Trainer blueprint routes
router.use('/', montessoriRoutes);

export default router;
