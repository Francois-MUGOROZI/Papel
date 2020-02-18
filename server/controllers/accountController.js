import Account from '../models/Account';
import Database from '../database/database';
import errorHandle from '../helpers/errorHandler';

const account = new Account(); // initialise new user
const database = new Database(); // initialize database connection

// format result for a client
const formatClientRes = (email, data) => {
  return data.map(val => ({
    createdOn: val.createdOn,
    accountNumber: val.accountNumber,
    ownerEmail: email,
    type: val.type,
    status: val.status,
    balance: val.balance
  }));
};

const findUserEmail = (id, users) => {
  const { email } = users.find(val => {
    if (val.id === id) {
      return val.email;
    }
    return null;
  });
  return email;
};

// add account
export const createAccount = async (req, res) => {
  try {
    const { userId, type, accountName, userEmail } = req.body;
    const accountTable = await database.createAccountTable();
    if (accountTable) {
      account.setAccount(accountName, userId, type);
      const newAccount = account.getAccount();
      // check if userId is allowed to perform this
      const user = await database.findUser(userEmail);
      const found = user.rows[0].role;
      if (found) {
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
    const { userEmail, userId } = req.body;
    const user = await database.findUser(userEmail);
    const found = user.rows[0].role;
    if (found === 'client') {
      accounts = await database.getSpecAccount(userId);

      res.status(200).json({
        status: res.statusCode,
        data: formatClientRes(userEmail, accounts.rows)
      });
    } else if (found === 'admin' || found === 'staff') {
      accounts = await database.getAccounts();
      const users = await database.findAllUsers();
      const foundUsers = users.rows;
      res.status(200).json({
        status: res.statusCode,
        data: accounts.rows.map(val => ({
          createdOn: val.createdOn,
          accountNumber: val.accountNumber,
          type: val.type,
          status: val.status,
          balance: val.balance,
          ownerEmail: findUserEmail(val.owner, foundUsers)
        }))
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
    const found = user.rows[0].role;
    if (found === 'client') {
      accounts = await database.getActiveAccountForClient(userId, status);
      res.status(200).json({
        status: res.statusCode,
        data: formatClientRes(userEmail, accounts.rows)
      });
    } else if (found === 'admin' || found === 'staff') {
      accounts = await database.getActiveAccount(status);
      const users = await database.findAllUsers();
      const foundUsers = users.rows;
      res.status(200).json({
        status: res.statusCode,
        data: accounts.rows.map(val => ({
          createdOn: val.createdOn,
          accountNumber: val.accountNumber,
          type: val.type,
          status: val.status,
          balance: val.balance,
          ownerEmail: findUserEmail(val.owner, foundUsers)
        }))
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
    const found = user.rows[0].role;
    if (found === 'client') {
      accounts = await database.getSpecAccount(userId);
      res.status(200).json({
        status: res.statusCode,
        data: formatClientRes(userEmail, accounts.rows)
      });
    } else if (found === 'admin' || found === 'staff') {
      const { email } = req.params;
      const accId = await database.findUser(email);
      const foundId = accId.rows[0].id;
      if (foundId) {
        accounts = await database.getSpecAccount(foundId);
        const users = await database.findAllUsers();
        const foundUsers = users.rows;
        res.status(200).json({
          status: res.statusCode,
          data: accounts.rows.map(val => ({
            createdOn: val.createdOn,
            accountNumber: val.accountNumber,
            type: val.type,
            status: val.status,
            balance: val.balance,
            ownerEmail: findUserEmail(val.owner, foundUsers)
          }))
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

export const actDeactAccount = async (req, res) => {
  try {
    const { userEmail, status } = req.body;
    const { accountNumber } = req.params;

    // check if userId is allowed to perform this
    const user = await database.findUser(userEmail);
    const found = user.rows[0].role;
    if (found === 'admin' || found === 'staff') {
      const updated = await database.activateAccount(accountNumber, status);
      if (updated) {
        const acc = await database.getSpecAccountDetail(accountNumber);
        const row = acc.rows[0];
        res.status(200).json({
          status: res.statusCode,
          message: `Account ${
            status === 'active'
              ? ' Activeted successfully'
              : ' Deactivated successfully'
          }`,
          data: {
            accountNumber: row.accountNumber,
            status: row.status
          }
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

// delete bank account
export const deleteAccount = async (req, res) => {
  try {
    const { accountNumber } = req.params;
    // check if userId is allowed to perform this
    const user = await database.findUser(req.body.userEmail);
    const found = user.rows[0].role;
    if (found === 'admin' || found === 'staff') {
      const delAccount = await database.deleteAccount(accountNumber);
      if (delAccount) {
        await database.createTransactionTable();
        const transExist = await database.getTrans(accountNumber);
        const foundTrans = transExist.rows;
        if (foundTrans) {
          await database.deleteTrans(accountNumber);
        }
        res.status(200).json({
          status: res.statusCode,
          message: 'Account deleted successfully'
        });
      } else {
        res.status(404).json({
          status: res.statusCode,
          error: 'Not Found!'
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
