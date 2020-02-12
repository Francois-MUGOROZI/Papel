import User from '../models/User';
import tokenGenerate from '../helpers/tokenGen';
import Database from '../database/database';

const user = new User(); // initialise new user
const database = new Database(); // initialize database connection

export const signup = async (req, res) => {
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

    const userTable = await database.createUserTable();
    if (userTable) {
      user.setUser(firstName, lastName, password, email, type, isAdmin, status);
      const newUser = user.getUser();
      await database.addUser(newUser);
      const { userId } = newUser;
      const newToken = tokenGenerate({ userId });
      res.status(201).json({
        status: res.statusCode,
        message: 'User created successfully',
        data: {
          token: newToken,
          userDetails: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user.id
          }
        }
      });
    }
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

export default { signup };
