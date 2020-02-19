import express from 'express';
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout
} from '../controllers/authController';
import { validateSignup, validateLogin } from '../middleware/validator';

const authRouter = express.Router();
authRouter.post('/signup', validateSignup, signup);
authRouter.post('/login', validateLogin, login);
authRouter.get('/logout', logout);
authRouter.post('/forgot-password', forgotPassword);
authRouter.patch('/reset-password/:token', resetPassword);

export default authRouter;
