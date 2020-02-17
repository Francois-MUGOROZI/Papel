import Transaction from '../models/transaction';
import Database from '../database/database';
import errorHandle from '../helpers/errorHandler';

const trans = new Transaction();
const database = new Database(); // initialize database connection

// add transaction
export const createTransaction = async (req, res) => {
  try {
    const { accountNumber, type, amount, userId, userEmail } = req.body;
    const accountTable = await database.createTransactionTable();
    if (accountTable) {
      // get the old balance of axxount
      const old = await database.getSpecAccountDetail(accountNumber);
      // first check if account is active or not
      const isActive = old.rows[0].status;
      if (isActive === 'active') {
        const oldBalance = old.rows[0].balance;
        let newBalnce;
        if (type === 'debit') {
          newBalnce = oldBalance - amount;
        } else {
          newBalnce = oldBalance + amount;
        }
        trans.setTransaction(
          type,
          accountNumber,
          userId,
          amount,
          oldBalance,
          newBalnce
        );
        const newTrans = trans.getTransaction();
        // check if userId is allowed to perform this
        const user = await database.findUser(userEmail);
        const found = user.rows[0].type;
        if (found === 'staff') {
          await database.addTrans(newTrans);
          await database.updateAccount(accountNumber, newBalnce);
          res.status(201).json({
            status: res.statusCode,
            data: newTrans
          });
        } else {
          res.status(401).json({
            status: res.statusCode,
            error: 'Unauthorized Access'
          });
        }
      } else {
        res.status(403).json({
          status: res.statusCode,
          error: 'Invalid request',
          message: 'This account is not active'
        });
      }
    }
  } catch (err) {
    errorHandle(res, err);
  }
};

// get account transaction history
export const viewTransaction = async (req, res) => {
  try {
    const { accountNumber } = req.params;
    const { userEmail, userId } = req.body;
    // check if userId is allowed to perform this
    const user = await database.findUser(userEmail);
    const found = user.rows[0].type;
    if (found === 'client') {
      const userAcc = await database.getAccountForClient(userId);
      const foundUserAcc = userAcc.rows;
      const accExist = foundUserAcc.map(val => {
        return val.accountNumber;
      });
      const match = accExist.indexOf(accountNumber);
      if (match) {
        const transac = await database.getTrans(accountNumber);
        res.status(200).json({
          status: res.statusCode,
          data: transac.rows
        });
      } else {
        res.status(401).json({
          status: res.statusCode,
          error: 'Unauthorized Access'
        });
      }
    } else if (found === 'admin' || found === 'staff') {
      const transac = await database.getTrans(accountNumber);
      res.status(200).json({
        status: res.statusCode,
        data: transac.rows
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

// get account transaction history
export const viewAllTransactions = async (req, res) => {
  try {
    const { userEmail } = req.body;
    // check if userId is allowed to perform this
    const user = await database.findUser(userEmail);
    const found = user.rows[0].type;
    if (found === 'admin' || found === 'staff') {
      const transac = await database.getAllTrans();
      res.status(200).json({
        status: res.statusCode,
        data: transac.rows
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
