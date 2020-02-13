import generateId from 'uuid/v1';

class Transaction {
  constructor() {
    this.id = '';
    this.type = '';
    this.accountNumber = '';
    this.cashier = '';
    this.amount = '';
    this.oldBalance = '';
    this.newBalance = '';
  }

  setTransaction(type, accountNumber, cashier, amount, oldBalance, newBalance) {
    this.id = generateId();
    this.type = type;
    this.accountNumber = accountNumber;
    this.cashier = cashier;
    this.amount = amount;
    this.oldBalance = oldBalance;
    this.newBalance = newBalance;
  }

  getTransaction() {
    return {
      id: this.id,
      type: this.type,
      accountNumber: this.accountNumber,
      cashier: this.cashier,
      amount: this.amount,
      oldBalance: this.oldBalance,
      newBalance: this.newBalance
    };
  }
}

export default Transaction;
