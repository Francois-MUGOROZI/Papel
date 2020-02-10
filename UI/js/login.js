const loginForm = document.getElementById('login-form');
const errLabel = document.getElementById('error-label');

// handle login
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = e.target['username'].value;
  const password = e.target['password'].value;

  // Validate the data and check if user exisist in database

  // route to apropriate page depending on user type
  window.location.replace('../pages/client.html');
});