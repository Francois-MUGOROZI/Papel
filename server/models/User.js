import generateId from 'uuid/v1';
import passHash from '../helpers/passHash';

class User {
  // initialization
  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.role = '';
    this.isAdmin = '';
    this.status = '';
    this.password = '';
  }

  // setting up user

  setUser(firstName, lastName, email, role, password) {
    this.id = generateId();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.isAdmin = role === 'admin';
    this.status = 'active';
    this.password = passHash(password);
  }

  // user getter
  getUser() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
      isAdmin: this.isAdmin,
      status: this.status,
      password: this.password
    };
  }
}

export default User;
