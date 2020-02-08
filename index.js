/* This is the entry point of Papel application,
we create our server here */
const express = require('express');

const app = express();
app.use(express.static('public')); // Enable express to use our static files (html,css,images)

// Routes
app.get('/', (req, res) => {
  res.render(`${__dirname}/index.html`);
});
// run our server to the port specified
app.listen(process.env.PORT || 5000);
