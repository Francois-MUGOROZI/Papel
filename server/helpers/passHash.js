import bcrypt from 'bcrypt';

const passHash = pswd => bcrypt.hashSync(pswd, bcrypt.genSaltSync(5));
export default passHash;
