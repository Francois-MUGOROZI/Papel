import faker from 'faker';

class FakeAccount {
  constructor() {
    this.accounts = [];
  }

  generateFakeAccount() {
    const account = {
      accountName: faker.name.title(),
      type: 'loan'
    };
    this.accounts.push(account);
    return account;
  }
}
export default FakeAccount;
