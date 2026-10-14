import { Request } from 'express';

export type GameType =
  | 'QUICK_ARITHMETIC'
  | 'MISSING_OPERATOR'
  | 'ALGEBRA_BALANCE'
  | 'NUMBER_SEQUENCE'
  | 'MENTAL_ESTIMATION'
  | 'COMPARISON_MATH'
  | 'MATRIX_MATH'
  | 'PRIME_FACTOR';

export interface JwtPayload {
  userId: string;
  email: string;
  username: string;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown;
}

export interface SubmitScoreDto {
  gameType: GameType;
  score: number;
  accuracy: number;
  timeSpent: number;
}
