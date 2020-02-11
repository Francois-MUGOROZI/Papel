import app from './app';

// create server
app.listen(process.env.PORT || 5000, () => {
  console.log('Papel Server is Listeneing');
});
