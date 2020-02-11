import express from 'express';
import pool from './config/db';

const app = express();

app.get('/api/test', (req, res) => {
  pool
    .query('CREATE TABLE ccounts(ID PRIMARY KEY')
    .then(() => {
      res.json({ meassage: 'Connected' });
    })
    .catch(err => {
      res.json({ error: 'Failed to connect', err });
    });
});

app.listen(5000);
