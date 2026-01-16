import { Request, Response } from 'express';
import { organService } from '../services/organService';

export const organController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const organs = await organService.getAll();
      res.json(organs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch organs' });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const organ = await organService.getById(id);
      if (!organ) {
        return res.status(404).json({ error: 'Organ not found' });
      }
      res.json(organ);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch organ' });
    }
  },

  getBySystem: async (req: Request, res: Response) => {
    try {
      const { systemId } = req.params;
      const organs = await organService.getBySystem(systemId);
      res.json(organs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch organs by system' });
    }
  },

  search: async (req: Request, res: Response) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: 'Query parameter required' });
      }
      const organs = await organService.search(q);
      res.json(organs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search organs' });
    }
  }
};
