import { Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { AuthenticatedRequest } from '../types';

export class UserController {
  static async getDashboard(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const analytics = await UserService.getDashboardAnalytics(userId);

      res.status(200).json({
        success: true,
        message: 'Dashboard analytics retrieved successfully',
        data: analytics,
      });
    } catch (error) {
      next(error);
    }
  }
}
