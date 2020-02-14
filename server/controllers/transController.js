import Transaction from '../models/transaction';
import Database from '../database/database';
import errorHandle from '../helpers/errorHandler';

const trans = new Transaction(); // initialise new user
const database = new Database(); // initialize database connection

// add transaction
export const createTransaction = async (req, res) => {
  try {
    const { accountNumber, type, amount, cashier, userEmail } = req.body;
    const accountTable = await database.createTransactionTable();
    if (accountTable) {
      // get the old balance of axxount
      const old = await database.getSpecAccountDetail(accountNumber);
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
        cashier,
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
    }
  } catch (err) {
    errorHandle(res, err);
  }
};
