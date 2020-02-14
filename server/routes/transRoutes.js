import exporess from 'express';
import { createTransaction } from '../controllers/transController';
import { validateTrans } from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';

const transRouter = exporess.Router();
transRouter.post('/create', verifyToken, validateTrans, createTransaction);

export default transRouter;
