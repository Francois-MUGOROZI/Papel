import Database from '../database/database';
import errorHandle from '../helpers/errorHandler';

const database = new Database(); // initialize database connection

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
