export type GameType =
  | 'QUICK_ARITHMETIC'
  | 'MISSING_OPERATOR'
  | 'ALGEBRA_BALANCE'
  | 'NUMBER_SEQUENCE'
  | 'MENTAL_ESTIMATION'
  | 'COMPARISON_MATH'
  | 'MATRIX_MATH'
  | 'PRIME_FACTOR';

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface UserStats {
  id?: string;
  totalGamesPlayed: number;
  currentStreak: number;
  bestStreak: number;
  averageMathScore: number;
  lastPlayedDate?: string;
}

export interface MathGameInfo {
  type: GameType;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'SPEED' | 'LOGIC' | 'ANALYSIS' | 'ESTIMATION';
  icon: string;
}

export interface GameScore {
  id: string;
  userId: string;
  gameType: GameType;
  score: number;
  accuracy: number;
  timeSpent: number;
  playedAt: string;
}

export interface SubmitScorePayload {
  gameType: GameType;
  score: number;
  accuracy: number;
  timeSpent: number;
}

export interface UserAnalyticsResponse {
  profile?: User;
  stats: UserStats;
  recentScores: GameScore[];
  performanceByGame: {
    gameType: GameType;
    avgScore: number;
    avgAccuracy: number;
    playedCount: number;
  }[];
}export interface CognitiveStat {
  pillar: string;
  scoreIndex: number;
}

export interface GameSession {
  score: number;
  accuracyRate?: number;
  game?: {
    title: string;
  };
}
