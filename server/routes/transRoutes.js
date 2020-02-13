import exporess from 'express';
import { createTransaction } from '../controllers/transController';
import { validateTrans } from '../middleware/validator';

const transRouter = exporess.Router();
transRouter.post('/create', validateTrans, createTransaction);

export default transRouter;
