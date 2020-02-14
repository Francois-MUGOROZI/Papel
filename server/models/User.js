import generateId from 'uuid/v1';
import passHash from '../helpers/passHash';

class User {
  // initialization
  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.type = '';
    this.isAdmin = '';
    this.status = '';
    this.password = '';
  }

  // setting up user

  setUser(firstName, lastName, email, type, isAdmin, status, password) {
    this.id = generateId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.type = type;
    this.isAdmin = isAdmin;
    this.status = status;
    this.password = passHash(password);
  }

  // user getter
  getUser() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      type: this.type,
      isAdmin: this.isAdmin,
      status: this.status,
      password: this.password,
      id: this.id
    };
  }
}

export default User;
