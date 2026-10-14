import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma';
import { AppError } from '../middleware/error.middleware';

export class AuthService {
  static async register(username: string, email: string, password: string) {
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingEmail) {
      throw new AppError('Email sudah terdaftar', 400);
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      throw new AppError('Username sudah digunakan', 400);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Buat User dan inisialisasi UserStats
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        stats: {
          create: {
            totalGamesPlayed: 0,
            currentStreak: 0,
            bestStreak: 0,
            averageMathScore: 0.0,
          },
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        stats: true,
      },
    });

    const token = this.generateToken(user.id, user.email, user.username);
    return { user, token };
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        stats: true,
      },
    });

    if (!user) {
      throw new AppError('Email atau kata sandi salah', 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Email atau kata sandi salah', 401);
    }

    const token = this.generateToken(user.id, user.email, user.username);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        stats: user.stats,
      },
      token,
    };
  }

  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        stats: true,
        scores: {
          take: 10,
          orderBy: { playedAt: 'desc' },
        },
      },
    });

    if (!user) {
      throw new AppError('Pengguna tidak ditemukan', 404);
    }

    return user;
  }

  private static generateToken(userId: string, email: string, username: string): string {
    const secret = process.env.JWT_SECRET || 'default_jwt_secret';
    return jwt.sign({ userId, email, username }, secret, {
      expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'],
    });
  }
}
