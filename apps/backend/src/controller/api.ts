import { Request, Response } from 'express';
import { updateUserData, fetchUserData, createMultipleUsersData } from '../repository/userCollection';

export const createUser = async (req: Request, res: Response) => {
  try {
    await createMultipleUsersData();
    res.status(200).json({ message: 'Users created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    await updateUserData(req.body.docId, req.body);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const user = await fetchUserData(req.query.lastVisible as string, Number(req.query.pageSize ?? 5));
  res.status(200).json(user);
};