import bcrypt from 'bcrypt';

export const passHash = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
