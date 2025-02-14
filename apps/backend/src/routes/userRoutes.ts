import express from 'express';
import { updateUser, getUser, createUser } from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/update-user-data', authMiddleware, updateUser);
router.get('/fetch-user-data', authMiddleware, getUser);
router.post('/create-user-data', authMiddleware, createUser);

export default router;