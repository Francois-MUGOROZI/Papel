import generateId from 'uuid/v1';
import passHash from '../helpers/passHash';

class User {
  // initialization
  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.type = '';
    this.isAdmin = '';
    this.status = '';
    this.password = '';
    this.id = 0;
  }

  // setting up user

  setUser(firstName, lastName, password, email, type, isAdmin, status) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.type = type;
    this.isAdmin = isAdmin;
    this.status = status;
    this.password = passHash(password);
    this.id = generateId();
  }

  // user getter
  getUser() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      type: this.type,
      isAdmin: this.isAdmin,
      status: this.status,
      password: this.password
    };
  }
}

export default User;
