import express from 'express';
import { signup, login } from '../controllers/authController';
import { validateSignup, validateLogin } from '../middleware/validator';

const authRouter = express.Router();
authRouter.post('/signup', validateSignup, signup);
authRouter.post('/login', validateLogin, login);

export default authRouter;
