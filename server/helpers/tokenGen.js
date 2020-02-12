import jwt from 'jsonwebtoken';

export const tokenGenerate = payload =>
  jwt.sign(payload, process.env.SECRETE_KEY, {
    expiresIn: '24h'
  });
