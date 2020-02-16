import faker from 'faker';
// import generateId from 'uuid/v1';

class FakeAccount {
  constructor() {
    this.accounts = [];
  }

  //   "id": "",
  //     "accountNumber": "",
  //     "accountName": "",
  //     "owner": "",
  //     "type": "",
  //     "status": "",
  //     "balance": ""

  generateFakeAccount() {
    const account = {
      owner: faker.random.uuid(),
      type: 'loan',
      status: 'active',
      balance: faker.random.number()
    };
    this.accounts.push(account);
    return account;
  }
}
export default FakeAccount;
