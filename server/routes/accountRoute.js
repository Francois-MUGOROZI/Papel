import exporess from 'express';
import {
  createAccount,
  viewAccounts,
  viewActiveDormant,
  viewSpecAccount
} from '../controllers/accountController';
import { validateAccount } from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';

const accountRouter = exporess.Router();
accountRouter.post('/create', verifyToken, validateAccount, createAccount);
accountRouter.get('/', verifyToken, viewAccounts);
accountRouter.get('/:status', verifyToken, viewActiveDormant);
accountRouter.get('/user/:owner', verifyToken, viewSpecAccount);

export default accountRouter;
