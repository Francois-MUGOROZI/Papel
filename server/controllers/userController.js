import User from '../models/User';
import Database from '../database/database';

const user = new User(); // initialise new user
const database = new Database(); // initialize database connection

// sinup controller
export const createUser = async (req, res) => {
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
      // verify if the logged in is admin
      const { userEmail } = req.body;
      const admin = await database.findUser(userEmail);
      const found = admin.rows[0].type;
      if (found === 'admin') {
        user.setUser(
          firstName,
          lastName,
          email,
          type,
          isAdmin,
          status,
          password
        );
        const newUser = user.getUser();
        await database.addUser(newUser);

        res.status(201).json({
          status: res.statusCode,
          message: 'User Created Successfully',
          data: {
            userProfile: {
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              id: newUser.id
            }
          }
        });
      } else {
        res.status(401).json({
          status: res.statusCode,
          error: 'Unauthorized Access'
        });
      }
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
        error: err.message
      });
    }
  }
};
