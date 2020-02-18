import generateId from 'uuid/v1';

class Account {
  constructor() {
    this.id = '';
    this.accountNumber = '';
    this.accountName = '';
    this.owner = '';
    this.type = '';
    this.status = 'active';
    this.balance = 0;
  }

  // set account
  setAccount(accountName, owner, type) {
    this.id = generateId();
    this.accountName = accountName;
    this.type = type;
    this.owner = owner;
    const dt = new Date();
    const val =
      dt.getFullYear() +
      dt.getDay() +
      dt.getMonth() +
      dt.getHours() +
      dt.getMinutes() +
      dt.getSeconds();
    const numStr = `777${val}`;
    this.accountNumber = Number.parseInt(numStr, 10);
  }

  // get account
  getAccount() {
    return {
      accountNumber: this.accountNumber,
      accountName: this.accountName,
      owner: this.owner,
      type: this.type,
      status: this.status,
      balance: this.balance,
      id: this.id
    };
  }
}

export default Account;
