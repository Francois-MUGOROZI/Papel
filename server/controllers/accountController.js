import Account from '../models/Account';
import Database from '../database/database';
import errorHandle from '../helpers/errorHandler';

const account = new Account(); // initialise new user
const database = new Database(); // initialize database connection

// add account
export const createAccount = async (req, res) => {
  try {
    const { owner, type, status, accountName, balance, userEmail } = req.body;
    const accountTable = await database.createAccountTable();
    if (accountTable) {
      account.setAccount(accountName, owner, type, status, balance);
      const newAccount = account.getAccount();
      // check if userId is allowed to perform this
      const user = await database.findUser(userEmail);
      const found = user.rows[0].type;
      if (found === 'admin' || found === 'client') {
        await database.addAccount(newAccount);
        res.status(201).json({
          status: res.statusCode,
          data: newAccount
        });
      } else {
        res.status(401).json({
          status: res.statusCode,
          error: 'Unauthorized Access'
        });
      }
    }
  } catch (err) {
    errorHandle(res, err);
  }
};
