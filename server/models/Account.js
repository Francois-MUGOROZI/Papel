import generateId from 'uuid/v1';

class Account {
  constructor() {
    this.id = '';
    this.accountNumber = '';
    this.accountName = '';
    this.owner = '';
    this.type = '';
    this.status = '';
    this.balance = 0;
  }

  // set account
  setAccount(accountName, owner, type, status, balance) {
    this.id = generateId();
    this.accountName = accountName;
    this.type = type;
    this.status = status;
    this.owner = owner;
    this.balance = balance;
    this.accountNumber = 897986546;
  }

  // get account
  getAccount() {
    return {
      id: this.id,
      accountNumber: this.accountNumber,
      accountName: this.accountName,
      owner: this.owner,
      type: this.type,
      status: this.status,
      balance: this.balance
    };
  }
}

export default Account;
