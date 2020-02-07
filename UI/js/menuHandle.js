// All the DOM elements needed
const menu = document.getElementById('menu');
const sidebar = document.getElementById('sidebar');
const main = document.getElementById('main');
const userSideAccountItem = document.getElementById('user-side-account');
const accounts = document.getElementById('accounts');
const transaction = document.getElementById('transactions');
const userSideTransactionItem = document.getElementById(
  'user-side-transaction'
);
const userMenuHeading = document.getElementById('User-content-heading');
const createAccountModel = document.getElementById('create-account-model');
const accountDetailModel = document.getElementById('account-detail-model');

// first setups when document loaded
initialSetup = () => {
  //Get the accounts from database

  //populate the account div

  // display the account div
  userMenuHeading.innerHTML = 'Accounts';
  accounts.style.display = 'block';
  transaction.style.display = 'none';
};

// handle the menu button sidebar
menu.addEventListener('click', ev => {
  if (sidebar.className == 'sidebar') {
    sidebar.classList.remove('sidebar');
    sidebar.classList.add('sidebar-hide');
    main.classList.remove('main-content');
    main.classList.add('main-full');
  } else {
    sidebar.classList.remove('sidebar-hide');
    sidebar.classList.add('sidebar');
    main.classList.remove('main-full');
    main.classList.add('main-content');
  }
});

// Handle List item click fo user menu
userSideAccountItem.addEventListener('click', ev => {
  //Get the accounts from database

  //populate the account div

  // display the account div
  userMenuHeading.innerHTML = 'Accounts';
  accounts.style.display = 'block';
  transaction.style.display = 'none';
});
userSideTransactionItem.addEventListener('click', ev => {
  //Get the transaction from database

  //populate the transaction div

  // display the account div
  userMenuHeading.innerHTML = 'Transactions';
  accounts.style.display = 'none';
  transaction.style.display = 'block';
});

// Create account model handle
openCreateAccountModel = () => {
  createAccountModel.style.display = 'block';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = event => {
  if (event.target == createAccountModel) {
    createAccountModel.style.display = 'none';
  }
  if (event.target == accountDetailModel) {
    accountDetailModel.style.display = 'none';
  }
};

openDetailModel = () => {
  accountDetailModel.style.display = 'block';
};