const loginForm = document.getElementById('login-form');
const errLabel = document.getElementById('error-label');

// handle login
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = e.target['username'].value;
  const password = e.target['password'].value;
  errLabel.innerHTML = 'Sending request Please wait';
  errLabel.style.color = 'blue';

  axios
    .post('https://papel-andela.herokuapp.com/api/auth/login', {
      email: username,
      password: password
    })
    .then(res => {
      if (res.data.data.token) {
        const userName = res.data.data.userDetails.lastName;
        const userRole = res.data.data.userDetails.role;
        localStorage.setItem('user', userName);
        localStorage.setItem('role', userRole);

        if (userRole === 'client') {
          window.location.replace('../pages/client.html');
        } else if (userRole === 'staff') {
          window.location.replace('../pages/staff.html');
        } else if (userRole === 'admin') {
          window.location.replace('../pages/admin.html');
        } else {
          window.location.replace('../pages/index.html');
        }
      } else if (res.data.data.error) {
        errLabel.innerHTML = ress.data.data.error;
      } else {
        errLabel.innerHTML = 'Something went wrong';
        errLabel.style.color = 'red';
      }
    });
});
