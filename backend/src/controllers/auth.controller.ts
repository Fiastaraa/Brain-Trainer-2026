import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest } from '../types';

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username minimal 3 karakter')
    .max(20, 'Username maksimal 20 karakter')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username hanya boleh huruf, angka, dan underscore'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Kata sandi minimal 6 karakter'),
});

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(1, 'Kata sandi wajib diisi'),
});

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validated = registerSchema.parse(req.body);
      const result = await AuthService.register(
        validated.username,
        validated.email,
        validated.password
      );

      res.status(201).json({
        success: true,
        message: 'Registrasi berhasil',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validated = loginSchema.parse(req.body);
      const result = await AuthService.login(validated.email, validated.password);

      res.status(200).json({
        success: true,
        message: 'Login berhasil',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async me(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Tidak terautentikasi' });
        return;
      }

      const profile = await AuthService.getProfile(userId);
      res.status(200).json({
        success: true,
        message: 'Profil berhasil diambil',
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  }
}
