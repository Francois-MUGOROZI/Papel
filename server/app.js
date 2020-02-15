import express from 'express';
import bodyParser from 'body-parser';
import dontenv from 'dotenv';
import authRouter from './routes/authRoute';
import accountRouter from './routes/accountRoute';
import transRouter from './routes/transRoutes';
import createUserRouter from './routes/userRoutes';

dontenv.config();

const app = express(); // create express application

// routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/transactions', transRouter);
app.use('/api/users', createUserRouter);

export default app;
