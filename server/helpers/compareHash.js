import bcrypt from 'bcrypt';

export const compareToHashed = (hashed, pswd) =>
  bcrypt.compareSync(hashed, pswd);
