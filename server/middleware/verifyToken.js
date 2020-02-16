import jwt from 'jsonwebtoken';
import keys from '../config/keys';

const verifyToken = async (req, res, next) => {
  try {
    let token;
    if (process.env.NODE_ENV === 'test') {
      token = req.body.headerAuth;
    } else {
      token = req.headers.token;
    }
    if (!token) {
      res.status(401).json({
        status: 401,
        error: 'no token provided!'
      });
      return;
    }
    const decoded = await jwt.verify(token, keys.JWT_SECRETE);
    if (!decoded) {
      res.status(401).json({
        status: res.statusCode,
        error: 'Unauthorized Access'
      });
    }
    req.body.userId = decoded.id;
    req.body.userEmail = decoded.email;
    next();
  } catch (err) {
    res.status(401).json({
      status: res.statusCode,
      error: err.message
    });
  }
};
export default verifyToken;
