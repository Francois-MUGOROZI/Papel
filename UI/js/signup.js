const signupForm = document.getElementById('signup-form');
const errLabel = document.getElementById('error-label');
// handle signup
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const firstName = e.target['firstname'].value;
  const lastName = e.target['lastname'].value;
  const email = e.target['email'].value;
  const username = e.target['username'].value;
  const password = e.target['password'].value;
  const Confirmpassword = e.target['repassword'].value;
  if (password !== Confirmpassword) {
    errLabel.innerHTML = 'Password must match!';
    errLabel.style.color = 'red';
  }

  // Add user into the database

  // redirect to dashboard
  window.location.replace('../pages/client.html');
});
