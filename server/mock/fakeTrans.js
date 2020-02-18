import faker from 'faker';

class FakeTrans {
  constructor() {
    this.transactions = [];
  }

  generateFakeTrans() {
    const trans = {
      accountNumber: faker.random.number(),
      type: 'debit',
      amount: faker.random.number()
    };
    this.transactions.push(trans);
    return trans;
  }
}
export default FakeTrans;
