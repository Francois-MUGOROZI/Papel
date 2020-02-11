import express from 'express';
import pool from './database/database';

const app = express(); // create express application

// routes
app.get('/api', (req, res) => {
  res.status(200).json({ message: 'You can now start consuming papel Apis' });
});
app.get('/api/test', (req, res) => {
  pool.connect().then(value => {
    res.json({
      database: value.database,
      port: value.port,
      host: value.host
    });
  });
});

export default app;
