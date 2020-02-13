import User from '../models/User';
import tokenGenerate from '../helpers/tokenGen';
import Database from '../database/database';

const user = new User(); // initialise new user
const database = new Database(); // initialize database connection

export const signup = (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      type,
      isAdmin,
      status,
      password
    } = req.body;

    const userTable = database.createUserTable();
    userTable.then(v => res.json({ v }));
  } catch (err) {
    if (err.routine === '_bt_check_unique') {
      res.status(409).json({
        status: res.statusCode,
        error: 'User Already exists'
      });
    } else {
      res.status(500).json({
        status: res.statusCode,
        err
      });
    }
  }
};
