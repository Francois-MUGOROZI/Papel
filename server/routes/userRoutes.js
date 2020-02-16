import express from 'express';
import { createUser,actDeactAccount } from '../controllers/userController';
import { validateSignup } from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';

const userRouter = express.Router();
userRouter.post('/createuser', verifyToken, validateSignup, createUser);
userRouter.patch('/activation/:email', verifyToken, actDeactAccount); // get account by owner id

export default userRouter;