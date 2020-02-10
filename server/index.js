const app = require('express')();
const { pool } = require('./config/dbConnection'); // get the connection to database
// routes

// test
app.get('/api/test', (req, res) => {
  pool.query('CREATE TABLE users(ID SERIAL PRIMARY KEY)', (err, result) => {
    if (err) res.status(501).json({ error: 'Connection Failed' });
    else res.status(200).json({ status: 'Connection a OK' });
  });
});
// start the server
app.listen(process.env.PORT || 5000);
