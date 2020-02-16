import User from '../models/User';
import Database from '../database/database';
import errorHandle from '../helpers/errorHandler';

const userModel = new User(); // initialise new user
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
        userModel.setUser(
          firstName,
          lastName,
          email,
          type,
          isAdmin,
          status,
          password
        );
        const newUser = userModel.getUser();
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

export const actDeactAccount = async (req, res) => {
  try {
    const { userEmail, status } = req.body;
    const { email } = req.params;

    // check if userId is allowed to perform this
    const user = await database.findUser(userEmail);
    const found = user.rows[0].type;
    if (found === 'admin') {
      const updated = await database.activateUser(email, status);
      if (updated) {
        const row = (await database.findUser(email)).rows;
        res.status(200).json({
          status: res.statusCode,
          message: `Account ${
            status === 'active'
              ? ' Activeted successfully'
              : ' Deactivated successfully'
          }`,
          data: {
            userEmail: row[0].email,
            status: row[0].status,
            type: row[0].type
          }
        });
      }
    } else {
      res.status(401).json({
        status: res.statusCode,
        error: 'Unauthorized Access'
      });
    }
  } catch (err) {
    errorHandle(res, err);
  }
};

// view all user accounts
export const viewUsers = async (req, res) => {
  try {
    const { userEmail } = req.body;

    // check if userId is allowed to perform this
    const user = await database.findUser(userEmail);
    const found = user.rows[0].type;
    if (found === 'admin') {
      const users = await database.findAllUsers();
      const foundUsers = users.rows;
      res.status(200).json({
        status: res.statusCode,
        data: foundUsers.map(val => ({
          firstName: val.firstName,
          lastName: val.lastName,
          email: val.email,
          type: val.type,
          status: val.status,
          isAdmin: val.isAdmin
        }))
      });
    } else {
      res.status(401).json({
        status: res.statusCode,
        error: 'Unauthorized Access'
      });
    }
  } catch (err) {
    errorHandle(res, err);
  }
};

// view client user accounts
export const viewClientUsers = async (req, res) => {
  try {
    const { userEmail } = req.body;

    // check if userId is allowed to perform this
    const user = await database.findUser(userEmail);
    const found = user.rows[0].type;
    const { type } = req.params;
    if (found === 'admin') {
      const users = await database.findClientUsers(type);
      const foundUsers = users.rows;
      res.status(200).json({
        status: res.statusCode,
        data: foundUsers.map(val => ({
          firstName: val.firstName,
          lastName: val.lastName,
          email: val.email,
          type: val.type,
          status: val.status,
          isAdmin: val.isAdmin
        }))
      });
    } else {
      res.status(401).json({
        status: res.statusCode,
        error: 'Unauthorized Access'
      });
    }
  } catch (err) {
    errorHandle(res, err);
  }
};
