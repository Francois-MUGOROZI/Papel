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
      role VARCHAR(50) NOT NULL DEFAULT '${'client'}',
      status VARCHAR(20) NOT NULL,
      "createdOn"  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`;
    // create  bank account table for first time
    this.createBankAccountTable = `CREATE TABLE IF NOT EXISTS
      accounts(
        id UUID PRIMARY KEY,
        "accountNumber" BIGINT NOT NULL UNIQUE,
        "accountName" VARCHAR(50) UNIQUE,
        "createdOn"  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        owner UUID NOT NULL,
        type VARCHAR(20) NOT NULL,
        status VARCHAR(20) NOT NULL,
        balance float
      )`;

    //  create transaction table on first run
    this.createTransTable = `CREATE TABLE IF NOT EXISTS
      transactions(
        id UUID PRIMARY KEY,
        "createdOn" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        type VARCHAR(20) NOT NULL,
        "accountNumber" BIGINT NOT NULL,
        cashier UUID NOT NULL,
        amount FLOAT NOT NULL,
        "oldBalance" FLOAT,
        "newBalance" FLOAT
      )`;

    //  reset password table
    this.createResetPassTableSql = `CREATE TABLE IF NOT EXISTS
      resetpass(
        "resetToken" TEXT,
        expires TEXT,
        "userEmail" VARCHAR(200)
      )`;
  }

  // create user table qury run
  async createResetPassTable() {
    return pool.query(this.createResetPassTableSql);
  }

  // add reset password
  async addResetPassword(token, expires, userEmail) {
    this.addRestSql = `INSERT INTO resetpass("resetToken",expires,"userEmail")
    VALUES('${token}','${expires}','${userEmail}')`;
    return pool.query(this.addRestSql);
  }

  // reset token
  async getResetToken(token) {
    this.addRestSql = `SELECT * FROM resetpass WHERE "resetToken"='${token}'`;
    return pool.query(this.addRestSql);
  }

  // delete token
  async deleteResetToken(token) {
    this.addRestSql = `DELETE FROM resetpass WHERE "resetToken"='${token}'`;
    return pool.query(this.addRestSql);
  }

  // update user password
  async updatePassword(user, password) {
    this.updatePasswordSql = `UPDATE users SET password='${password}' WHERE email='${user}'`;
    return pool.query(this.updatePasswordSql);
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
    users( id,"firstName","lastName",email,password,role,"isAdmin",status)
    VALUES('${newUser.id}','${newUser.firstName}','${newUser.lastName}','${newUser.email}',
    '${newUser.password}','${newUser.role}','${newUser.isAdmin}','${newUser.status}')`;
    return pool.query(this.addUserSql);
  }

  // handle add bank account
  async addAccount(newAccount) {
    this.addAccountSql = `INSERT INTO 
    accounts( id,"accountNumber", owner,type,status,"accountName",balance)
    VALUES('${newAccount.id}','${newAccount.accountNumber}','${newAccount.owner}','${newAccount.type}','${newAccount.status}','${newAccount.accountName}','${newAccount.balance}')`;
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
  async getUsers(role) {
    this.viewUserSql = `SELECT * FROM users WHERE type='${role}'`;
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

  async getAccountForClient(userId) {
    this.viewActiveAccountSql = `SELECT * FROM accounts WHERE  owner='${userId}'`;
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
    this.updateAccountSql = `UPDATE accounts SET balance='${amount}' WHERE "accountNumber"='${accountNumber}' RETURNING *`;
    return pool.query(this.updateAccountSql);
  }

  // deleting bank account
  async deleteAccount(accountNumber) {
    this.deleteAccountSql = `DELETE FROM accounts WHERE "accountNumber"='${accountNumber}' RETURNING *`;
    return pool.query(this.deleteAccountSql);
  }

  // delete transaction
  async deleteTrans(accountNumber) {
    this.deleteTransSql = `DELETE FROM transactions WHERE "accountNumber"='${accountNumber}' RETURNING *`;
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

  // find all users
  async findAllUsers() {
    this.findUserSql = `SELECT * FROM users`;
    return pool.query(this.findUserSql);
  }

  // find all client  users
  async findClientUsers(role) {
    this.findUserSql = `SELECT * FROM users WHERE role='${role}'`;
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

  // update user role
  async updateUserRole(userEmail, role) {
    const isAdmin = role === 'admin';
    this.updateUserRoleSql = `UPDATE users SET role='${role}',"isAdmin"='${isAdmin}' WHERE email='${userEmail}' RETURNING *`;
    return pool.query(this.updateUserRoleSql);
  }

  // create default admin users
  async createDefaultAdmin(defaultAdmin) {
    this.addUserSql = `INSERT INTO 
    users( id,"firstName","lastName",email,password,role,"isAdmin",status)
    VALUES('${defaultAdmin.id}','${defaultAdmin.firstName}','${
      defaultAdmin.lastName
    }','${defaultAdmin.email}',
    '${defaultAdmin.password}','admin','${true}','active')`;
    return pool.query(this.addUserSql);
  }

  // delete user account
  async deleteUser(email) {
    this.deleteSql = `DELETE FROM users  WHERE email='${email}'`;
    return pool.query(this.deleteSql);
  }
}

export default Database;
