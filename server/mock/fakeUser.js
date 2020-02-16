import faker from 'faker';
// import generateId from 'uuid/v1';

class FakeUser {
  constructor() {
    this.users = [];
  }

  // "firstName": "",
  // "lastName": "",
  // "email": "",
  // "type": "",
  // "isAdmin": "",
  // "status": "",
  // "password": "",
  // "id": ""

  generateFakeUser() {
    const password = faker.name.lastName();
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      type: 'client',
      isAdmin: false,
      status: 'active',
      password
    };
    this.users.push(user);
    return user;
  }
}
export default FakeUser;
