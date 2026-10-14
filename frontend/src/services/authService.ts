import api from './api';
import { User } from '../types';

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/register', { username, email, password });
    if (response.data.data?.token) {
      localStorage.setItem('brain_trainer_token', response.data.data.token);
    }
    return response.data.data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.data?.token) {
      localStorage.setItem('brain_trainer_token', response.data.data.token);
    }
    return response.data.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data.data;
  },

  logout(): void {
    localStorage.removeItem('brain_trainer_token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('brain_trainer_token');
  },
};
