const app = require('express')();

// routes

// test
app.get('/api/test', (req, res) => {
  res.status(200).json({ data: 'Welcome to Papel server' });
});
// start the server
app.listen(process.env.PORT || 5000);
