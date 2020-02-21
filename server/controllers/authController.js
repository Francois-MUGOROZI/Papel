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
        )}/api/auth/reset/${resetToken}`;

        const message = `Forgot password? submit a PATCH request with your new password to: ${resetURL}
        \n If you didn't forget your password, ignore this message.`;
        const html = `<p>Flow the link to reset: ${resetURL}</p>`;

        try {
          await sendEmail({
            email,
            subject: 'Your password reset token (valid for 2hours)',
            message,
            html
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

// build reset page
export const buildResetPage = async (req, res) => {
  // get user based on token
  const resetToken = req.params.token;
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/auth/reset-password/${resetToken}`;

  res.send(`
      <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset Password for Papel</title>
        <style>
          @import url('https://fonts.googleapis.com/css?family=Arvo&display=swap');
          body {
            margin: 0;
            font-family: 'Arvo', serif;
          }
          h5 {
            text-align: center;
            font-size: 1.5em;
            color: rgb(211, 227, 230);
          }
          .container {
            background-color: rgb(56, 152, 165);
            width: max-content;
            padding: 20px;
            margin: 5% auto;
          }
          .login-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            margin: auto;
            margin-top: 40px;
            border-radius: 10px;
            width: max-content;
          }
          .login-container input {
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          .login-container #login-btn {
            background-color: rgb(53, 138, 138);
            color: rgb(209, 209, 209);
            width: 97%;
          }
          .login-container #login-btn:hover {
            background-color: rgb(64, 133, 138);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h5>Password Reset</h5>
          <form action="${resetURL}" method="POST" class="login-container">
            <input
              type="password"
              id="newPass"
              name="newPass"
              placeholder="Enter your new password"
            />
            <input type="submit" value="Submit" id="login-btn" />
          </form>
        </div>
      </body>
    </html>
  `);
};
// reset password
export const resetPassword = async (req, res) => {
  try {
    // get user based on token
    const hashToken = crypto
      .createHash('sha256')
      .update(req.params.tokenback)
      .digest('hex');
    const userFind = await database.getResetToken(hashToken);
    console.log(hashToken);
    console.log(userFind.rows[0].resetToken);
    const found = userFind.rows[0].expires;
    const email = userFind.rows[0].userEmail;
    console.log(email);
    if (found) {
      const expired = Date.parse(found) < new Date();
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
          res.redirect(
            'https://francois-mugorozi.github.io/Papel/UI/pages/login.html'
          );
          res.status(200).json({
            status: res.statusCode,
            message: 'Password changed successfully'
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
