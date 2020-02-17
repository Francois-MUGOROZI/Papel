import faker from 'faker';
// import generateId from 'uuid/v1';

class FakeTrans {
  constructor() {
    this.transactions = [];
  }

  generateFakeTrans() {
    const trans = {
      accountNumber: faker.random.number(),
      cashier: faker.random.uuid(),
      type: 'debit',
      amount: faker.random.number()
    };
    this.transactions.push(trans);
    return trans;
  }
}
export default FakeTrans;
