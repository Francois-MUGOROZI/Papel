// this module is used to generate a user for testing purpose
import faker from 'faker'; // faker library

class FakeUser {
  constructor() {
    this.users = [];
  }

  // generate a fake user
  generateUser() {
    const password = faker.name.firstName();
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password
    };

    // add new user to users array
    this.users.push(user);
    return user; // return generated user
  }
}

export default FakeUser;
