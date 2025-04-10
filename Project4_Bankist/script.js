'use strict';

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const labelWelcome = document.querySelector('.login-title');
const labelDate = document.querySelector('.balaance-time');
const labelBalance = document.querySelector('.balance');
const labelSumIn = document.querySelector('.cash-in-amount');
const labelSumOut = document.querySelector('.cash-out-amount');
const labelSumInterest = document.querySelector('.interest-amount');
const labelTimer = document.querySelector('.login-limit-time');

const containerApp = document.querySelector('.main-content');
const containerTransactions = document.querySelector('.transactions-list');

const btnLogin = document.querySelector('.login-btn');
const btnTransfer = document.querySelector('.transfer-btn');
const btnLoan = document.querySelector('.loan-btn');
const btnClose = document.querySelector('.confirm-btn');
const btnSort = document.querySelector('.sort-btn');

const inputLoginUsername = document.getElementById('user');
const inputLoginPin = document.getElementById('pin');
const inputTransferTo = document.getElementById('transfer-to');
const inputTransferAmount = document.getElementById('transfer-amount');
const inputLoanAmount = document.getElementById('loan-amount');
const inputCloseUsername = document.getElementById('confirm-User');
const inputClosePin = document.getElementById('confirm-btn');


const displayTransactions = function (transactions) {
    containerTransactions.innerHTML = '';
    transactions.forEach(function (mov, i) {
        const type = mov > 0 ? 'DESPOSIT' : 'WITHDRAWAL';
        const html = `
            <li class="transaction-item" id="transaction-item">
                <div class="transaction-item-type transaction-item-${type}">${i + 1} ${type}</div>
                <div class="transaction-item-date">2023-10-01</div>
                <div class="transaction-item-amount">${mov} $</div>
            </li>
        `
        containerTransactions.insertAdjacentHTML("afterbegin", html);
        // insertAdjacentHTML()
        //      <!-- beforebegin -->
        // <p>
        //      <!-- afterbegin -->
        //      foo
        //      <!-- beforeend -->
        // </p>
        //      <!-- afterend -->

    });
}
displayTransactions(account1.movements);