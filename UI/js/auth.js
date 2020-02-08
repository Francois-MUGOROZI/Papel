// login auth
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = e.target['username'].value;
  const password = e.target['password'].value;

  // Validate the data and check if user exisist in database

  // route to apropriate page depending on user type
  window.location.replace('../pages/client.html');
});
