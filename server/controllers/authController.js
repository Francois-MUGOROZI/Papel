import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import keys from '../config/keys';
import Database from '../database/database';
import compareToHashed from '../helpers/compareHash';
import sendEmail from '../utils/email';
import errorHandle from '../helpers/errorHandler';
import passHash from '../helpers/passHash';

const user = new User(); // initialise new user
const database = new Database(); // initialize database connection

// sinup controller
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userTable = await database.createUserTable();
    if (userTable) {
      user.setUser(firstName, lastName, email, 'client', password);
      const newUser = user.getUser();
      await database.addUser(newUser);
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        keys.JWT_SECRETE,
        {
          expiresIn: '24h'
        }
      );

      res.cookie('token', token, {
        expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
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
            role: newUser.role
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
      // check if user is active
      const isActive = matches.rows[0].status;
      if (isActive === 'active') {
        const hashedPass = matches.rows[0].password;
        const areMatched = compareToHashed(hashedPass, password);
        if (areMatched) {
          const { firstName, lastName, id, role } = matches.rows[0];
          const token = jwt.sign({ id, email }, keys.JWT_SECRETE, {
            expiresIn: '24h'
          });
          res.cookie('token', token, {
            expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000),
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true
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
                role
              }
            }
          });
        } else {
          res.status(401).json({
            status: res.statusCode,
            error: 'Invalid credentials'
          });
        }
      } else {
        res.status(401).json({
          status: res.statusCode,
          error: 'Unauthorized Access',
          message: 'Your account is disabled'
        });
      }
    } else {
      res.status(401).json({
        status: res.statusCode,
        error: 'Invalid credentials'
      });
    }
  } catch (err) {
    res.status(500).json({
      status: res.statusCode,
      error: err.message
    });
  }
};

export const forgotPassword = async (req, res) => {
  // get user based on email
  const { email } = req.body;
  const resetUser = await database.findUser(email);
  const found = resetUser.rows[0].email;
  if (!found) {
    res.status(404).json({ status: res.statusCode, error: 'User not found' });
  }
  // generate random toke
  else {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const passExpires = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    // insert into databse
    const resetTable = await database.createResetPassTable();
    if (resetTable) {
      const inserted = await database.addResetPassword(
        hashToken,
        passExpires,
        email
      );
      if (inserted) {
        // send token as email
        const resetURL = `${req.protocol}://${req.get(
          'host'
        )}/api/auth/reset-password/${resetToken}`;

        const message = `Forgot password? submit a PATCH request with your new password to: ${resetURL}
        \n If you didn't forget your password, ignore this message.`;

        try {
          await sendEmail({
            email,
            subject: 'Your password reset token (valid for 2hours)',
            message
          });

          res.status(200).json({
            status: res.statusCode,
            message: 'Token sent to your email'
          });
        } catch (err) {
          // delete the token from databse
          await database.deleteResetToken(resetToken);
          res.status(500).json({
            status: res.statusCode,
            error: 'Error sending email, try again later!'
          });
        }
      }
    }
  }
};
// reset password
export const resetPassword = async (req, res) => {
  try {
    // get user based on token
    const hashToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    const userFind = await database.getResetToken(hashToken);
    const found = userFind.rows[0].expires;
    const email = userFind.rows[0].userEmail;
    if (found) {
      const expired = Date.parse(found) > new Date();
      if (expired) {
        res.status(403).json({
          status: res.statusCode,
          error: 'Your Token has expired!'
        });
      } else {
        // get a new password
        const { newPass } = req.body;
        await database.deleteResetToken(hashToken);
        const pass = passHash(newPass);
        const updated = await database.updatePassword(email, pass);
        if (updated) {
          res.status(200).json({
            status: res.statusCode,
            message: 'Password chande successfully'
          });
        } else {
          res.status(500).json({
            status: res.statusCode,
            error: 'Something went wrong, try again later!'
          });
        }
      }
    }
  } catch (err) {
    errorHandle(res, err);
  }
};

// logout user
export const logout = (req, res) => {
  res.cookie('token', 'tokendestroyed', {
    expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  });
  res.status(200).json({
    status: res.statusCode,
    message: 'User logged out successfully',
    loggedOut: true
  });
};
