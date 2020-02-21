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
const userProfile = document.getElementById('user-profile');
const Notif = document.getElementById('notificationIcon');
const msgTitle = document.getElementById('message-title');
const msgBody = document.getElementById('message-body');
const msgModel = document.getElementById('message-model');
const createAccountForm = document.getElementById('create-account-form');

// first setups when document loaded
initialSetup = () => {
  if (window.innerWidth < 768) {
    sidebar.classList.remove('sidebar');
    sidebar.classList.add('sidebar-hide');
    main.classList.remove('main-content');
    main.classList.add('main-full');
  }
  // Get the accounts from database
  // getAccount();

  // display the account div
  userMenuHeading.innerHTML = 'Accounts';
  accounts.style.display = 'block';
  transaction.style.display = 'none';
  userSideAccountItem.style.backgroundColor = '#1b98ac';
  userSideTransactionItem.style.background = 'none';
};

// handle the menu button sidebar
menu.addEventListener('click', ev => {
  if (sidebar.className === 'sidebar') {
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
  // Get the accounts from database

  // populate the account div

  // display the account div
  userMenuHeading.innerHTML = 'Accounts';
  accounts.style.display = 'block';
  transaction.style.display = 'none';
  userSideAccountItem.style.backgroundColor = '#1b98ac';
  userSideTransactionItem.style.background = 'none';
});
userSideTransactionItem.addEventListener('click', ev => {
  // Get the transaction from database

  // populate the transaction div

  // display the account div
  userMenuHeading.innerHTML = 'Transactions';
  accounts.style.display = 'none';
  transaction.style.display = 'block';
  userSideAccountItem.style.background = 'none';
  userSideTransactionItem.style.backgroundColor = '#1b98ac';
  Notif.innerHTML = '';
});
Notif.addEventListener('click', () => {
  // Get the transaction from database

  // populate the transaction div

  // display the account div
  userMenuHeading.innerHTML = 'Transactions';
  accounts.style.display = 'none';
  transaction.style.display = 'block';
  userSideAccountItem.style.background = 'none';
  userSideTransactionItem.style.backgroundColor = '#1b98ac';
  Notif.innerHTML = '';
});

// Create account model handle
const openCreateAccountModel = () => {
  createAccountModel.style.display = 'block';
};

const openDetailModel = id => {
  // get id of the bank  and qury its details
  accountDetailModel.style.display = 'block';
};

const closeDetailModel = () => {
  accountDetailModel.style.display = 'none';
};
const closeCreateAccountModel = () => {
  createAccountModel.style.display = 'none';
};

// user profile open
const openUser = () => {
  if (userProfile.className === 'user-profile') {
    userProfile.classList.remove('user-profile');
    userProfile.classList.add('user-profile-hide');
  } else {
    userProfile.classList.remove('user-profile-hide');
    userProfile.classList.add('user-profile');
  }
};

// creating a bank account handler
createAccountForm.addEventListener('submit', ev => {
  ev.preventDefault();
  const accountName = ev.target['name'].value;
  const type = ev.target['type'].value;
  console.log(accountName, type);
  // add account to database
  axios
    .post('https://papel-andela.herokuapp.com/api/accounts/create', {
      accountName: accountName,
      type: type
    })
    .then(res => {
      console.log(res);
    });

  // Notify the user and route back to page
  msgTitle.innerHTML = 'Creating Account';
  msgBody.innerHTML =
    'Your Bank Account Created Successfully\nYour Account Number: 1546565465';
  msgModel.style.display = 'block';
  return false;
});

const closeMessageModel = () => {
  msgModel.style.display = 'none';
};

// getting account
const getAccount = () => {
  let userAccounts = '';
  axios
    .get('https://papel-andela.herokuapp.com/api/accounts')
    .then(res => {
      console.log(res);
      if (res.data.data.data) {
        userAccounts = res.data.data.data;
        populateAccount(userAccounts);
      }
    })
    .catch(err => {
      accounts.innerHTML = 'Something went wrong reload the page';
    });
};

// const pulate account div
const populateAccount = accs => {
  accounts.innerHTML = accs
    .map(val => {
      `
      <div class="content-row" id="model-1" onclick="openDetailModel(${val.accountNumber})">
        <h5>Account Name: ${val.accountName}</h4>
        <h5> Type: ${val.type}</h5>
        <h5> Number: ${val.accountNumber}</h5>
        <h5>Status: ${val.status}</h5>
        <h4>Balance: $${val.balance}</h4>
    </div>
  `;
    })
    .join('');
};
