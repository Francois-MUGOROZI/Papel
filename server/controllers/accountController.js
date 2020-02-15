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

// get accounts
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
    const { status } = req.params;
    const accounts = await database.getActiveAccount(status);
    res.status(200).json({
      status: res.statusCode,
      data: accounts.rows
    });
  } catch (err) {
    errorHandle(res, err);
  }
};

// get account for specific user
export const viewSpecAccount = async (req, res) => {
  try {
    const { owner } = req.params;
    const accounts = await database.getSpecAccount(owner);
    res.status(200).json({
      status: res.statusCode,
      data: accounts.rows
    });
  } catch (err) {
    errorHandle(res, err);
  }
};
