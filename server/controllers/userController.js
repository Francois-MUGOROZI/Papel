import Database from '../database/database';
import errorHandle from '../helpers/errorHandler';

const database = new Database(); // initialize database connection

// activate or diactive user account
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
