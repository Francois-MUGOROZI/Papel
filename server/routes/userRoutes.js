import exporess from 'express';
import { actDeactAccount } from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';

const userRouter = exporess.Router();
userRouter.patch('/activation/:email', verifyToken, actDeactAccount); // get account by owner id

export default userRouter;
