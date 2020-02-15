import express from 'express';
import { createUser } from '../controllers/userController';
import { validateSignup } from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';

const createUserRouter = express.Router();
createUserRouter.post('/createuser', verifyToken, validateSignup, createUser);

export default createUserRouter;
