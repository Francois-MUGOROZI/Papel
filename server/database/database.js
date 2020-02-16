import { Pool } from 'pg';

// creating a pool for database interaction
const isProduction = process.env.NODE_ENV === 'production'; // check if we are in production or development
const connStr = 'postgres://postgres:special@localhost:5432/postgres'; // local database connection string
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connStr
});

// creating database class to handle CRUD operations
class Database {
  constructor() {
    // setting up database for initial time

    // create user table for first time
    this.createUserOnFirst = `CREATE TABLE IF NOT EXISTS
    users(
      id UUID PRIMARY KEY,
     "firstName" VARCHAR(200) NOT NULL,
      "lastName" VARCHAR(200) NOT NULL,
      email VARCHAR(200) UNIQUE NOT NULL,
      password VARCHAR(200) NOT NULL,
     "isAdmin" BOOLEAN DEFAULT FALSE,
      type VARCHAR(50) NOT NULL DEFAULT '${'client'}',
      status VARCHAR(20) NOT NULL,
      "createdOn"  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    // create  bank account table for first time
    this.createBankAccountTable = `CREATE TABLE IF NOT EXISTS
      accounts(
        id UUID PRIMARY KEY,
        "accountNumber" INTEGER NOT NULL UNIQUE,
        "accountName" VARCHAR(50),
        "createdOn"  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        owner UUID NOT NULL,
        type VARCHAR(20) NOT NULL,
        status VARCHAR(20) NOT NULL,
        balance float
      )`;

    //  create transaction table on first run
    this.createTransTable = `CREATE TABLE IF NOT EXISTS
      transactions(
        id UUID PRIMARY KEY,
        "createdOn" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        type VARCHAR(20) NOT NULL,
        "accountNumber" INTEGER NOT NULL,
        cashier UUID NOT NULL,
        amount FLOAT NOT NULL,
        "oldBalance" FLOAT,
        "newBalance" FLOAT
      )`;
  }

  // create user table qury run
  async createUserTable() {
    return pool.query(this.createUserOnFirst);
  }

  // create bank account table qury run
  async createAccountTable() {
    return pool.query(this.createBankAccountTable);
  }

  // create transaction table qury run
  async createTransactionTable() {
    return pool.query(this.createTransTable);
  }

  // handling add user functionality
  async addUser(newUser) {
    this.addUserSql = `INSERT INTO 
    users( id,"firstName","lastName",email,password,type,"isAdmin",status)
    VALUES('${newUser.id}','${newUser.firstName}','${newUser.lastName}','${newUser.email}',
    '${newUser.password}','${newUser.type}','${newUser.isAdmin}','${newUser.status}')`;
    return pool.query(this.addUserSql);
  }

  // handle add bank account
  async addAccount(newAccount) {
    this.addAccountSql = `INSERT INTO 
    accounts( id,"accountNumber", owner,type,status,balance,"accountName")
    VALUES('${newAccount.id}','${newAccount.accountNumber}','${newAccount.owner}','${newAccount.type}',
    '${newAccount.status}','${newAccount.balance}','${newAccount.accountName}')`;
    return pool.query(this.addAccountSql);
  }

  // handle add transaction query
  async addTrans(newTrans) {
    this.addTransSql = `INSERT INTO 
    transactions(id, "accountNumber",type,cashier,amount,"oldBalance","newBalance")
    VALUES('${newTrans.id}','${newTrans.accountNumber}','${newTrans.type}',
    '${newTrans.cashier}','${newTrans.amount}','${newTrans.oldBalance}','${newTrans.newBalance}')`;
    return pool.query(this.addTransSql);
  }

  // handle get users
  async getUsers(type) {
    this.viewUserSql = `SELECT * FROM users WHERE type='${type}'`;
    return pool.query(this.viewUserSql);
  }

  // handle view bank accounts
  async getAccounts() {
    this.viewAccountsSql = `SELECT * FROM accounts`;
    return pool.query(this.viewAccountsSql);
  }

  // get specific account
  async getSpecAccount(owner) {
    this.viewSpecAccountSql = `SELECT * FROM accounts WHERE owner='${owner}' `;
    return pool.query(this.viewSpecAccountSql);
  }

  // get specific account details
  async getSpecAccountDetail(accountNumber) {
    this.viewSpecAccountDetSql = `SELECT * FROM accounts WHERE "accountNumber"='${accountNumber}' `;
    return pool.query(this.viewSpecAccountDetSql);
  }

  // get active accounts
  async getActiveAccount(status) {
    this.viewActiveAccountSql = `SELECT * FROM accounts WHERE status='${status}' `;
    return pool.query(this.viewActiveAccountSql);
  }

  async getActiveAccountForClient(userId, status) {
    this.viewActiveAccountSql = `SELECT * FROM accounts WHERE status='${status}'  AND owner='${userId}'`;
    return pool.query(this.viewActiveAccountSql);
  }

  // handle view transaction accounts
  async getTrans(accountNumber) {
    this.viewTransSql = `SELECT * FROM transactions WHERE "accountNumber"='${accountNumber}' `;
    return pool.query(this.viewTransSql);
  }

  // handle view all transaction
  async getAllTrans() {
    this.viewTransSql = `SELECT * FROM transactions`;
    return pool.query(this.viewTransSql);
  }

  // get specific transaction
  async getSpecTrans(id) {
    this.viewSpecTransSql = `SELECT * FROM transactions WHERE id='${id}' `;
    return pool.query(this.viewSpecTransSql);
  }

  // updating database functionality
  async updateAccount(accountNumber, amount) {
    this.updateAccountSql = `UPDATE accounts SET balance='${amount}' WHERE "accountNumber"='${accountNumber}'`;
    return pool.query(this.updateAccountSql);
  }

  // deleting bank account
  async deleteAccount(accountNumber) {
    this.deleteAccountSql = `DELETE FROM accounts WHERE "accountNumber"='${accountNumber}'`;
    return pool.query(this.deleteAccountSql);
  }

  // delete transaction
  async deleteTrans(accountNumber) {
    this.deleteTransSql = `DELETE FROM transactions WHERE "accountNumber"='${accountNumber}'`;
    return pool.query(this.deleteTransSql);
  }

  // activate / deactivate account
  async activateAccount(accountNumber, status) {
    this.activateSql = `UPDATE accounts SET status='${status}' WHERE "accountNumber"='${accountNumber}'`;
    return pool.query(this.activateSql);
  }

  // activate / deactivate a bank account
  async activateUser(email, status) {
    this.activateUserSql = `UPDATE users SET status='${status}' WHERE email='${email}'`;
    return pool.query(this.activateUserSql);
  }


  // find user for login verification
  async findAllUsers() {
    this.findUserSql = `SELECT * FROM users`;
    return pool.query(this.findUserSql);
  }

  // find user for login verification

  async findUser(email) {
    this.findUserReq = `SELECT * FROM 
      users where email = '${email}'`;
    return pool.query(this.findUserReq);
  }

  async findUserById(id) {
    this.findUserSql = `SELECT * FROM users WHERE id = '${id}'`;
    return pool.query(this.findUserSql);
  }
}

export default Database;
