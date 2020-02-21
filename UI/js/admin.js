const recordModel = document.getElementById('records-model');
const deleteModel = document.getElementById('delete-model');
const sidebar = document.getElementById('sidebar');
const createUserModel = document.getElementById('create-user-model');
const main = document.getElementById('admin-main-content');
const heading = document.getElementById('User-content-heading');
const accounts = document.getElementById('bank-accounts');
const users = document.getElementById('user-accounts');
const staff = document.getElementById('staff-accounts');
const createBtn = document.getElementById('create-user-btn');
const userProfile = document.getElementById('user-profile');
const deleteAccountForm = document.getElementById('delete-account-form');
const createUserForm = document.getElementById('create-user-form');

// menu
const bankAccMenu = document.getElementById('banks');
const userAccMenu = document.getElementById('users');
const staffAccMenu = document.getElementById('staffs');

// message elements
const msgTitle = document.getElementById('message-title');
const msgBody = document.getElementById('message-body');
const msgModel = document.getElementById('message-model');

// inital setup
const initialSetup = () => {
  // hide sidebar on mobile
  if (window.innerWidth < 768) {
    sidebar.classList.remove('sidebar');
    sidebar.classList.add('sidebar-hide');
    main.classList.remove('main-content');
    main.classList.add('main-full');
  }

  // show bank account by default
  accounts.style.display = 'block';
  users.style.display = 'none';
  staff.style.display = 'none';
  heading.innerHTML = 'Bank Accounts';
  createBtn.style.display = 'none';
  bankAccMenu.style.backgroundColor = '#1b98ac';
  userAccMenu.style.background = 'none';
  staffAccMenu.style.background = 'none';
};

// Handle model open and close events

const openRecordsModel = id => {
  recordModel.style.display = 'block';
};
const openDeleteModel = id => {
  deleteModel.style.display = 'block';
};

const cancelDelete = () => {
  deleteModel.style.display = 'none';
};

const closeRecordsModel = () => {
  recordModel.style.display = 'none';
};
const handleMenuBtn = () => {
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
};
const openCreateUserModel = () => {
  createUserModel.style.display = 'block';
};
const closeCreateUserModel = () => {
  createUserModel.style.display = 'none';
};

// menu selected handles
bankAccMenu.addEventListener('click', () => {
  accounts.style.display = 'block';
  users.style.display = 'none';
  staff.style.display = 'none';
  heading.innerHTML = 'Bank Accounts';
  createBtn.style.display = 'none';
  bankAccMenu.style.backgroundColor = '#1b98ac';
  userAccMenu.style.background = 'none';
  staffAccMenu.style.background = 'none';
});

userAccMenu.addEventListener('click', () => {
  accounts.style.display = 'none';
  users.style.display = 'block';
  staff.style.display = 'none';
  heading.innerHTML = 'User Accounts';
  createBtn.style.display = 'none';
  bankAccMenu.style.background = 'none';
  userAccMenu.style.background = '#1b98ac';
  staffAccMenu.style.background = 'none';
});

staffAccMenu.addEventListener('click', () => {
  accounts.style.display = 'none';
  users.style.display = 'none';
  staff.style.display = 'block';
  heading.innerHTML = 'Admin | Staff Accounts';
  createBtn.style.display = 'block';
  bankAccMenu.style.background = 'none';
  userAccMenu.style.background = 'none';
  staffAccMenu.style.background = '#1b98ac';
});

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

// messaging close
const closeMessageModel = () => {
  msgModel.style.display = 'none';
};

// handle create user account
createUserForm.addEventListener('submit', e => {
  e.preventDefault();
  // get user

  // add user to database

  // message back
  msgTitle.innerHTML = 'Creating New User';
  msgBody.innerHTML = 'New User Added Successfully!';
  msgModel.style.display = 'block';
  createUserModel.style.display = 'none';
});

// handle delete bank account
deleteAccountForm.addEventListener('submit', e => {
  e.preventDefault();
  msgTitle.innerHTML = 'Deleting Account';
  msgBody.innerHTML = 'Bank Account:78978465 Deleted Successfully';
  msgModel.style.display = 'block';
  deleteModel.style.display = 'none';
});

// handle activate account
const activateAccount = id => {
  // activate or deactivate account

  // feedback message
  msgTitle.innerHTML = 'Activating Account';
  msgBody.innerHTML = 'Bank Account:78978465 Activated Successfully';
  msgModel.style.display = 'block';
};
