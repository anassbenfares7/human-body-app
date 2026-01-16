/**
 * User types and interfaces
 */

export interface User {
  id: string;
  email: string;
  subscriptionTier: 'free' | 'premium';
  createdAt: string;
  updatedAt: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  organId: string;
  viewedAt: string;
  quizScore?: number;
}

export interface QuizResult {
  organId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
