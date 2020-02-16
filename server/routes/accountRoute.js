import exporess from 'express';
import { createAccount } from '../controllers/accountController';
import { validateAccount } from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';

const accountRouter = exporess.Router();
accountRouter.post('/create', verifyToken, validateAccount, createAccount);

export default accountRouter;
