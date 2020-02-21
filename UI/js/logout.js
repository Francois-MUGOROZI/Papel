const logout = document.getElementById('logout');
const logout2 = document.getElementById('logout2');
logout.addEventListener('click', userId => {
  // destroy user jwt and logout

  // redirect to home page
  window.location.replace('../pages/index.html');
});

logout2.addEventListener('click', userId => {
  // destroy user jwt and logout

  // redirect to home page
  window.location.replace('../pages/index.html');
});
