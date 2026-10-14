import api from './api';
import { MathGameInfo, SubmitScorePayload, UserAnalyticsResponse, GameType } from '../types';

export const MATH_GAMES: MathGameInfo[] = [
  {
    type: 'QUICK_ARITHMETIC',
    slug: 'quick-arithmetic',
    title: 'Hitung Cepat',
    subtitle: 'Quick Arithmetic Blitz',
    description: 'Operasi dasar (+, -, *, /) berkecepatan tinggi dengan hitungan mundur.',
    category: 'SPEED',
    icon: 'zap',
  },
  {
    type: 'MISSING_OPERATOR',
    slug: 'missing-operator',
    title: 'Cari Operator',
    subtitle: 'Missing Operator Puzzle',
    description: 'Temukan simbol matematika yang hilang untuk membuat persamaan menjadi tepat.',
    category: 'LOGIC',
    icon: 'help-circle',
  },
  {
    type: 'ALGEBRA_BALANCE',
    slug: 'algebra-balance',
    title: 'Persamaan Aljabar',
    subtitle: 'Algebra Balance Quest',
    description: 'Temukan nilai x pada timbangan persamaan linear sederhana.',
    category: 'LOGIC',
    icon: 'scale',
  },
  {
    type: 'NUMBER_SEQUENCE',
    slug: 'number-sequence',
    title: 'Pola & Deret Angka',
    subtitle: 'Arithmetic & Geometric Sequences',
    description: 'Pecahkan deret logika pola bilangan aritmatika dan geometri.',
    category: 'LOGIC',
    icon: 'trending-up',
  },
  {
    type: 'MENTAL_ESTIMATION',
    slug: 'mental-estimation',
    title: 'Estimasi Cepat',
    subtitle: 'Mental Estimation Challenge',
    description: 'Tebak pendekatan nilai perhitungan perkalian dan pembagian dalam waktu singkat.',
    category: 'ESTIMATION',
    icon: 'target',
  },
  {
    type: 'COMPARISON_MATH',
    slug: 'comparison-math',
    title: 'Tanda Perbandingan',
    subtitle: 'Greater Than or Less Than',
    description: 'Bandingkan nilai dua ekspresi matematika secara cepat (<, >, =).',
    category: 'SPEED',
    icon: 'git-compare',
  },
  {
    type: 'MATRIX_MATH',
    slug: 'matrix-math',
    title: 'Matriks Angka',
    subtitle: 'Magic Square & Matrix Math',
    description: 'Isi angka kotak puzzle grid agar jumlah baris dan kolom cocok.',
    category: 'ANALYSIS',
    icon: 'grid',
  },
  {
    type: 'PRIME_FACTOR',
    slug: 'prime-factor',
    title: 'Bilangan Prima & Faktor',
    subtitle: 'Prime & Factor Sieve',
    description: 'Tentukan bilangan prima dan faktor pembagi angka dengan cepat dan akurat.',
    category: 'ANALYSIS',
    icon: 'hash',
  },
];

export const gameService = {
  async getGames(): Promise<MathGameInfo[]> {
    try {
      const response = await api.get('/games');
      return response.data.data;
    } catch {
      return MATH_GAMES;
    }
  },

  async getGameBySlug(slug: string): Promise<MathGameInfo> {
    try {
      const response = await api.get(`/games/${slug}`);
      return response.data.data;
    } catch {
      const found = MATH_GAMES.find((g) => g.slug === slug || g.type === slug);
      if (found) return found;
      return MATH_GAMES[0];
    }
  },

  async submitScore(payload: SubmitScorePayload) {
    const response = await api.post('/games/score', payload);
    return response.data.data;
  },

  async getUserAnalytics(): Promise<UserAnalyticsResponse> {
    const response = await api.get('/games/analytics/me');
    return response.data.data;
  },
};
