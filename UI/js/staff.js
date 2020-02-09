const debitModel = document.getElementById('debit-model');
const creditModel = document.getElementById('credit-model');
const recordModel = document.getElementById('records-model');
const deleteModel = document.getElementById('delete-model');
const sidebar = document.getElementById('sidebar');
const userProfile = document.getElementById('user-profile');

// forms
const debitForm = document.getElementById('debit-form');
const creditForm = document.getElementById('credit-form');
const deleteForm = document.getElementById('delete-form');

// message elements
const msgTitle = document.getElementById('message-title');
const msgBody = document.getElementById('message-body');
const msgModel = document.getElementById('message-model');

// variables for models interaction with data
let recordsId;
let deleteId;
let debitId;
let creditId;

// inital setup
const initialSetup = () => {
  if (window.innerWidth < 768) {
    sidebar.classList.remove('sidebar');
    sidebar.classList.add('sidebar-hide');
    main.classList.remove('main-content');
    main.classList.add('main-full');
  }
};

// Handle model open and close events
const openDebitModel = id => {
  debitModel.style.display = 'block';
  debitId = id;
};
const openCreditModel = id => {
  creditModel.style.display = 'block';
  creditId = id;
};
const openRecordsModel = id => {
  recordModel.style.display = 'block';
  recordsId = id;
};
const openDeleteModel = id => {
  deleteModel.style.display = 'block';
  deleteId = id;
};
const cancelDelete = () => {
  deleteModel.style.display = 'none';
};
const closeCreditModel = () => {
  creditModel.style.display = 'none';
};

const closeDebitModel = () => {
  debitModel.style.display = 'none';
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

// handle the form submition
deleteForm.addEventListener('submit', e => {
  e.preventDefault();
  // delete record from database

  // notify the user
  msgTitle.innerHTML = 'Deleting Account';
  msgBody.innerHTML = 'Bank Account:78978465 Deleted Successfully';
  deleteModel.style.display = 'none';
  msgModel.style.display = 'block';
});

// handle debiting account
debitForm.addEventListener('submit', e => {
  e.preventDefault();
  // debit account

  // notify
  msgTitle.innerHTML = 'Debiting Account';
  msgBody.innerHTML = 'Bank Account:78978465 Debited Successfully';
  deleteModel.style.display = 'none';
  msgModel.style.display = 'block';
  debitModel.style.display = 'none';
});

// handle crediting account
creditForm.addEventListener('submit', e => {
  e.preventDefault();
  // credit account

  // notify
  msgTitle.innerHTML = 'Crediting Account';
  msgBody.innerHTML = 'Bank Account:78978465 Credited Successfully';
  deleteModel.style.display = 'none';
  msgModel.style.display = 'block';
  creditModel.style.display = 'none';
});

// messaging close
const closeMessageModel = () => {
  msgModel.style.display = 'none';
};
