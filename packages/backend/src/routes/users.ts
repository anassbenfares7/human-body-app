import express from 'express';
import { userController } from '../controllers/userController';

const router = express.Router();

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

export default router;
