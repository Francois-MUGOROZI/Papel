import faker from 'faker';

class FakeUser {
  constructor() {
    this.users = [];
  }

  generateFakeUser() {
    const password = faker.name.lastName();
    const user = {
      firstName: 'Test Name',
      lastName: 'Test Name second',
      email: 'test@gmail.com',
      password
    };
    this.users.push(user);
    return user;
  }
}
export default FakeUser;
