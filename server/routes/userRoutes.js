import exporess from 'express';
import {
  actDeactAccount,
  viewUsers,
  viewClientUsers
} from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';

const userRouter = exporess.Router();
userRouter.patch('/activation/:email', verifyToken, actDeactAccount); // get account by owner id
userRouter.get('/', verifyToken, viewUsers); // get account by owner id
userRouter.get('/:type', verifyToken, viewClientUsers); // get account by owner id

export default userRouter;
