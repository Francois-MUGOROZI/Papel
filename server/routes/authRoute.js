import express from 'express';
import { signup } from '../controllers/authController';
import { validateSignup } from '../middleware/validator';

const authRouter = express.Router();
authRouter.post('/signup', validateSignup, signup);

export default authRouter;
