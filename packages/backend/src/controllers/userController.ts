import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const userController = {
  getProfile: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const user = await userService.getProfile(userId);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user profile' });
    }
  },

  updateProfile: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).userId;
      const updates = req.body;
      const user = await userService.updateProfile(userId, updates);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user profile' });
    }
  }
};
