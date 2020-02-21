const signupForm = document.getElementById('signup-form');
const errLabel = document.getElementById('error-label');
// handle signup
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const firstName = e.target['firstname'].value;
  const lastName = e.target['lastname'].value;
  const email = e.target['email'].value;
  const password = e.target['password'].value;
  const Confirmpassword = e.target['repassword'].value;
  if (password !== Confirmpassword) {
    errLabel.innerHTML = 'Password must match!';
    errLabel.style.color = 'red';
  } else {
    // Add user into the database
    errLabel.innerHTML = 'Sending request Please wait';
    axios
      .post('https://papel-andela.herokuapp.com/api/auth/signup', {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      })
      .then(res => {
        console.log(res);
        if (res.data.data.token) {
          const userName = res.data.data.userProfile.lastName;
          const userRole = res.data.data.userProfile.role;
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
        }
      })
      .catch(err => {
        if (err.message.includes('409'))
          errLabel.innerHTML = 'User email already exist';
        else errLabel.innerHTML = err.message;
        errLabel.style.color = 'red';
      });
  }
  return false;
});
