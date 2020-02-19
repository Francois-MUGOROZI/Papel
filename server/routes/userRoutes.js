import express from 'express';
import {
  createUser,
  actDeactAccount,
  viewUsers,
  viewClientUsers,
  updateUserRoles,
  createDefaultAdmin
} from '../controllers/userController';
import { validateSignup } from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';

const userRouter = express.Router();

userRouter.post('/create-user', verifyToken, validateSignup, createUser);
userRouter.patch('/activation/:email', verifyToken, actDeactAccount); // get account by owner id
userRouter.get('/', verifyToken, viewUsers); // get account by owner id
userRouter.get('/:role', verifyToken, viewClientUsers); // get account by owner id
userRouter.patch('/update-role', verifyToken, updateUserRoles);
userRouter.post('/init', createDefaultAdmin); //

export default userRouter;
