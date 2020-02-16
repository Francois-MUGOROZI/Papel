import exporess from 'express';
import {
  actDeactAccount,
  viewUsers,
  viewClientUsers,
  createUser
} from '../controllers/userController';
import { validateSignup } from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';

const userRouter = express.Router();
userRouter.post('/createuser', verifyToken, validateSignup, createUser);
userRouter.patch('/activation/:email', verifyToken, actDeactAccount); // get account by owner id
userRouter.get('/', verifyToken, viewUsers); // get account by owner id
userRouter.get('/:type', verifyToken, viewClientUsers); // get account by owner id

export default userRouter;