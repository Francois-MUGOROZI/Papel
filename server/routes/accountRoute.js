import exporess from 'express';
import {
  createAccount,
  viewAccounts,
  viewActiveDormant,
  viewSpecAccount,
  deleteAccount
} from '../controllers/accountController';
import { validateAccount } from '../middleware/validator';
import verifyToken from '../middleware/verifyToken';

const accountRouter = exporess.Router();
accountRouter.post('/create', verifyToken, validateAccount, createAccount); // creating account
accountRouter.get('/', verifyToken, viewAccounts); // get all accounts
accountRouter.get('/:status', verifyToken, viewActiveDormant); // get account by status
accountRouter.get('/user/:owner', verifyToken, viewSpecAccount); // get account by owner id
accountRouter.delete('/delete/:accountNumber', verifyToken, deleteAccount); // get account by owner id

export default accountRouter;
