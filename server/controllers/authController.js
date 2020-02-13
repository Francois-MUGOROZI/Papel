import jwt from 'jsonwebtoken';
import User from '../models/User';
import keys from '../config/keys';
import Database from '../database/database';

const user = new User(); // initialise new user
const database = new Database(); // initialize database connection

// sinup controller
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
      user.setUser(firstName, lastName, email, type, isAdmin, status, password);
      const newUser = user.getUser();
      await database.addUser(newUser);
      const token = jwt.sign({ id: newUser.id }, keys.JWT_SECRETE, {
        expiresIn: '24h'
      });

      res.status(201).json({
        status: res.statusCode,
        message: 'User Created Successfully',
        data: {
          token,
          userProfile: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            id: newUser.id
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
        error: err.message
      });
    }
  }
};

// login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      error: err.message
    });
  }
};
