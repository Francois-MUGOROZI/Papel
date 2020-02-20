import faker from 'faker';

class FakeUser {
  constructor() {
    this.users = [];
  }

  generateFakeUser() {
    const password = faker.name.lastName();
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password
    };
    this.users.push(user);
    return user;
  }

  generateAdmin() {
    const user = {
      email: 'francoismugorozi@gmail.com',
      password: 'pass123'
    };
    this.admin = user;
    return user;
  }
}
export default FakeUser;
