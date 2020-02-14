import exporess from 'express';
import {
  createTransaction,
  viewTransaction
} from '../controllers/transController';
import { validateTrans } from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';

const transRouter = exporess.Router();
transRouter.post('/create', verifyToken, validateTrans, createTransaction);
transRouter.get('/:account', verifyToken, viewTransaction);

export default transRouter;
