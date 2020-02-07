const debitModel = document.getElementById('debit-model');
const creditModel = document.getElementById('credit-model');
const recordModel = document.getElementById('records-model');
const deleteModel = document.getElementById('delete-model');
const sidebar = document.getElementById('sidebar');

// inital setup
const initialSetup = () => {};

// Handle model open and close events
const openDebitModel = ev => {
  debitModel.style.display = 'block';
  console.log(ev.target.id);
};
const openCreditModel = () => {
  creditModel.style.display = 'block';
};
const openRecordsModel = () => {
  recordModel.style.display = 'block';
};
const openDeleteModel = () => {
  deleteModel.style.display = 'block';
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
