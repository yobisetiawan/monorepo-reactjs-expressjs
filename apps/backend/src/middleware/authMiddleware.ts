import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token!);
    req.body.userId = decodedToken.uid;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
    return
  }
};