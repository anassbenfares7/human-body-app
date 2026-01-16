import express from 'express';
import { quizController } from '../controllers/quizController';

const router = express.Router();

router.get('/', quizController.getAll);
router.get('/:organId', quizController.getByOrgan);
router.post('/:organId', quizController.submitResult);

export default router;
