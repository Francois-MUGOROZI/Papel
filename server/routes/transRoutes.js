import exporess from 'express';
import {
  createTransaction,
  viewTransaction,
  viewAllTransactions
} from '../controllers/transController';
import { validateTrans } from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';

const transRouter = exporess.Router();
transRouter.post('/create', verifyToken, validateTrans, createTransaction);
transRouter.get('/:account', verifyToken, viewTransaction);
transRouter.get('/', verifyToken, viewAllTransactions);

export default transRouter;
