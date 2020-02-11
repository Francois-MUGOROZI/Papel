import express from 'express';

const app = express();

app.get('/api/test', (req, res) => {
  res.json({ status: 'Mocha configured' });
});

app.listen(process.env.PORT || 5000);
