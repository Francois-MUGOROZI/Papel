import Account from '../models/Account';
import Database from '../database/database';
import errorHandle from '../helpers/errorHandler';

const account = new Account(); // initialise new user
const database = new Database(); // initialize database connection

// add account
export const createAccount = async (req, res) => {
  try {
    const { userId, type, status, accountName, balance, userEmail } = req.body;
    const accountTable = await database.createAccountTable();
    if (accountTable) {
      account.setAccount(accountName, userId, type, status, balance);
      const newAccount = account.getAccount();
      // check if userId is allowed to perform this
      const user = await database.findUser(userEmail);
      const found = user.rows[0].type;
      if (found === 'client') {
        await database.addAccount(newAccount);
        res.status(201).json({
          status: res.statusCode,
          data: {
            accountNumber: newAccount.accountNumber,
            firstName: user.rows[0].firstName,
            lastName: user.rows[0].lastName,
            email: user.rows[0].email,
            type: newAccount.type,
            openingBalance: newAccount.balance
          }
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

// get all accounts
export const viewAccounts = async (req, res) => {
  try {
    // check if userId is allowed to perform this
    let accounts;
    const user = await database.findUser(req.body.userEmail);
    const found = user.rows[0].type;
    if (found === 'client') {
      accounts = await database.getSpecAccount(req.body.userId);
      res.status(200).json({
        status: res.statusCode,
        data: accounts.rows
      });
    } else if (found === 'admin' || found === 'staff') {
      accounts = await database.getAccounts();
      res.status(200).json({
        status: res.statusCode,
        data: accounts.rows
      });
    } else {
      res.status(401).json({
        status: res.statusCode,
        error: 'Unauthorized Access'
      });
    }
  } catch (err) {
    errorHandle(res, err);
  }
};

// get active and dormant accounts
export const viewActiveDormant = async (req, res) => {
  try {
    // check if userId is allowed to perform this
    let accounts;
    const { userEmail, userId } = req.body;
    const { status } = req.params;
    const user = await database.findUser(userEmail);
    const found = user.rows[0].type;
    if (found === 'client') {
      accounts = await database.getActiveAccountForClient(userId, status);
      res.status(200).json({
        status: res.statusCode,
        data: formatAccRes(accounts.rows)
      });
    } else if (found === 'admin' || found === 'staff') {
      accounts = await database.getAccounts();
      res.status(200).json({
        status: res.statusCode,
        data: formatAccRes(accounts.rows)
      });
    } else {
      res.status(401).json({
        status: res.statusCode,
        error: 'Unauthorized Access'
      });
    }
  } catch (err) {
    errorHandle(res, err);
  }
};

// get account for specific user
export const viewSpecAccount = async (req, res) => {
  try {
    // check if userId is allowed to perform this
    let accounts;
    const { userEmail, userId } = req.body;
    const user = await database.findUser(userEmail);
    const found = user.rows[0].type;
    if (found === 'client') {
      accounts = await database.getSpecAccount(userId);
      res.status(200).json({
        status: res.statusCode,
        data: formatRes(accounts.rows)
      });
    } else if (found === 'admin' || found === 'staff') {
      const { email } = req.params;
      const accId = await database.findUser(email);
      const foundId = accId.rows[0].id;
      if (foundId) {
        accounts = await database.getSpecAccount(foundId);
        res.status(200).json({
          status: res.statusCode,
          data: formatRes(accounts.rows)
        });
      } else {
        res.status(404).json({
          status: res.statusCode,
          error: 'Not found'
        });
      }
    } else {
      res.status(401).json({
        status: res.statusCode,
        error: 'Unauthorized Access'
      });
    }
  } catch (err) {
    errorHandle(res, err);
  }
};
