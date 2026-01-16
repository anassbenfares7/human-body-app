import express from 'express';
import { organController } from '../controllers/organController';

const router = express.Router();

router.get('/', organController.getAll);
router.get('/:id', organController.getById);
router.get('/system/:systemId', organController.getBySystem);
router.get('/search', organController.search);

export default router;
