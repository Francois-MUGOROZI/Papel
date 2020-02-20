import express from 'express';
import {
  createUser,
  actDeactAccount,
  viewUsers,
  viewClientUsers,
  updateUserRoles,
  createDefaultAdmin,
  deleteUserAccount
} from '../controllers/userController';
import { validateSignup } from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';

const userRouter = express.Router();

userRouter.post('/create-user', verifyToken, validateSignup, createUser);
userRouter.patch('/activation/:email', verifyToken, actDeactAccount);
userRouter.delete('/delete/:email', verifyToken, deleteUserAccount);
userRouter.get('/', verifyToken, viewUsers);
userRouter.get('/:role', verifyToken, viewClientUsers);
userRouter.patch('/update-role', verifyToken, updateUserRoles);
userRouter.post('/init', createDefaultAdmin);

export default userRouter;
