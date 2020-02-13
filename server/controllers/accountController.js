import Account from '../models/Account';
import Database from '../database/database';
import errorHandle from '../helpers/errorHandler';

const account = new Account(); // initialise new user
const database = new Database(); // initialize database connection

// add account
export const createAccount = async (req, res) => {
  try {
    const { owner, type, status, accountName, balance } = req.body;
    const accountTable = await database.createAccountTable();
    if (accountTable) {
      account.setAccount(accountName, owner, type, status, balance);
      const newAccount = account.getAccount();
      await database.addAccount(newAccount);
      res.status(201).json({
        status: res.statusCode,
        data: newAccount
      });
    }
  } catch (err) {
    errorHandle(res, err);
  }
};
