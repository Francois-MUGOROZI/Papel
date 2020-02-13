import exporess from 'express';
import createAccount from '../controllers/accountController';
import validateAccount from '../middleware/validator';

const accountRouter = exporess.Router();
accountRouter.post('/create', validateAccount, createAccount);

export default accountRouter;
