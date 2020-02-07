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
};

// Handle model open and close events

const openRecordsModel = () => {
  recordModel.style.display = 'block';
};
const openDeleteModel = () => {
  deleteModel.style.display = 'block';
};
const cancelDelete = () => {
  deleteModel.style.display = 'none';
};

const closeRecordsModel = () => {
  recordModel.style.display = 'none';
};
const handleMenuBtn = () => {
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
};
const openCreateUserModel = () => {
  createUserModel.style.display = 'block';
};
const closeCreateUserModel = () => {
  createUserModel.style.display = 'none';
};

// menu selected handles
const bankAccountMenu = () => {
  accounts.style.display = 'block';
  users.style.display = 'none';
  staff.style.display = 'none';
  heading.innerHTML = 'Bank Accounts';
  createBtn.style.display = 'none';
};
const userAccountMenu = () => {
  accounts.style.display = 'none';
  users.style.display = 'block';
  staff.style.display = 'none';
  heading.innerHTML = 'User Accounts';
  createBtn.style.display = 'none';
};
const staffMenu = () => {
  accounts.style.display = 'none';
  users.style.display = 'none';
  staff.style.display = 'block';
  heading.innerHTML = 'Admin | Staff Accounts';
  createBtn.style.display = 'block';
};
