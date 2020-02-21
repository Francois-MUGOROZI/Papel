const loginForm = document.getElementById('login-form');
const errLabel = document.getElementById('error-label');

// handle login
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = e.target['username'].value;
  const password = e.target['password'].value;
  console.log(username, password);
  axios
    .post('http://papel-andela.herokuapp.com/api/auth/login', {
      email: username,
      password: password
    })
    .then(res => {
      console.log(res);
    });
});
