import express from 'express';
import pool from './database/database';

const app = express();

// routes
app.get('/api/test', (req, res) => {
  pool.connect().then(value => {
    res.json({ conn: value });
  });
});

export default app;
