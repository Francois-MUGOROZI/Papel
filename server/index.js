import app from './app';

// create server which listen to host or 8000
app.listen(process.env.PORT || 8000, () => {
  console.log('Papel Server is Listeneing');
});
