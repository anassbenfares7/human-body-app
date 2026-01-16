import { Request, Response } from 'express';
import { quizService } from '../services/quizService';

export const quizController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const quizzes = await quizService.getAll(userId);
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
  },

  getByOrgan: async (req: Request, res: Response) => {
    try {
      const { organId } = req.params;
      const userId = (req as any).userId;
      const quiz = await quizService.getByOrgan(userId, organId);
      res.json(quiz);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch quiz' });
    }
  },

  submitResult: async (req: Request, res: Response) => {
    try {
      const { organId, score, totalQuestions } = req.body;
      const userId = (req as any).userId;
      const result = await quizService.submitResult(userId, organId, score, totalQuestions);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit quiz result' });
    }
  }
};
