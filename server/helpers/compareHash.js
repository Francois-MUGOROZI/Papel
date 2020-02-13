import bcrypt from 'bcrypt';

const compareToHashed = (hashedPswd, pswd) =>
  bcrypt.compareSync(pswd, hashedPswd);

export default compareToHashed;
