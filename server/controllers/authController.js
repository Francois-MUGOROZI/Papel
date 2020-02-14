import jwt from 'jsonwebtoken';
import User from '../models/User';
import keys from '../config/keys';
import Database from '../database/database';
import compareToHashed from '../helpers/compareHash';

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
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        keys.JWT_SECRETE,
        {
          expiresIn: '24h'
        }
      );

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
    const matches = await database.findUser(email);
    if (matches.rows.length) {
      const hashedPass = matches.rows[0].password;
      const areMatched = compareToHashed(hashedPass, password);
      if (areMatched) {
        const { firstName, lastName, id } = matches.rows[0];
        const token = jwt.sign({ id, email }, keys.JWT_SECRETE, {
          expiresIn: '24h'
        });
        res.status(200).json({
          status: res.statusCode,
          message: 'User logged in successfully',
          data: {
            token,
            userDetails: {
              firstName,
              lastName,
              email,
              id
            }
          }
        });
      }
    }
    res.status(401).json({
      status: res.statusCode,
      error: 'Invalid credentials'
    });
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      error: err.message
    });
  }
};
