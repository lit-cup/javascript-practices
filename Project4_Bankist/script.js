'use strict';

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
        '2023-01-01T10:15:30.123Z',
        '2023-02-01T12:20:45.456Z',
        '2023-03-01T14:25:50.789Z',
        '2023-04-01T16:30:55.012Z',
        '2023-05-01T18:35:00.345Z',
        '2023-06-01T20:40:05.678Z',
        '2023-07-01T22:45:10.901Z',
        '2023-08-01T23:50:15.234Z'
    ],
    currency: 'USD',
    locale: 'en-Us',
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        '2023-09-01T10:15:30.123Z',
        '2023-10-01T12:20:45.456Z',
        '2023-11-01T14:25:50.789Z',
        '2023-12-01T16:30:55.012Z',
        '2024-01-01T18:35:00.345Z',
        '2024-02-01T20:40:05.678Z',
        '2024-03-01T22:45:10.901Z',
        '2024-04-01T23:50:15.234Z'
    ],
    currency: 'USD',
    locale: 'en-Us',
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [300, -150, 500, -400, 100, 250, -50, 600],
    interestRate: 0.8,
    pin: 3333,
    movementsDates: [
        '2023-08-15T09:10:20.123Z',
        '2023-09-15T11:25:35.456Z',
        '2023-10-15T13:40:50.789Z',
        '2023-11-15T15:55:05.012Z',
        '2023-12-15T17:10:20.345Z',
        '2024-01-15T19:25:35.678Z',
        '2024-02-15T21:40:50.901Z',
        '2024-03-15T23:55:05.234Z'
    ],
    currency: 'USD',
    locale: 'en-Us',
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        '2023-09-05T10:15:30.123Z',
        '2023-10-10T12:20:45.456Z',
        '2023-11-15T14:25:50.789Z',
        '2023-12-20T16:30:55.012Z',
        '2024-01-25T18:35:00.345Z'
    ],
    currency: 'USD',
    locale: 'en-Us',
};

const accounts = [account1, account2, account3, account4];

const labelWelcome = document.querySelector('.login-title');
const labelDate = document.querySelector('.balance-time');
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
const inputClosePin = document.getElementById('confirm-Pin');

const displayTransactions = function (acc, sort = false) {

    containerTransactions.innerHTML = '';

    const combineMovsDates = acc.movements.map((mov, i) => ({
        movement: mov,
        movementDate: acc.movementsDates.at(i),
    }));

    if (sort) combineMovsDates.sort((a, b) => a.movement - b.movement);
    // const trans = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

    combineMovsDates.forEach(function (obj, i) {
        const { movement, movementDate } = obj;
        const type = movement > 0 ? 'DEPOSIT' : 'WITHDRAWAL';

        const date = new Date(movementDate);
        const day = `${date.getDate()}`.padStart(2, 0);
        const month = `${date.getMonth() + 1}`.padStart(2, 0);
        const year = date.getFullYear();
        const displayDate = `${day}/${month}/${year}`;

        const html = `
            <li class="transaction-item" id="transaction-item">
                <div class="transaction-item-type transaction-item-${type}">${i + 1} ${type}</div>
                <div class="transaction-item-date">${displayDate}</div>
                <div class="transaction-item-amount">${movement.toFixed(2)} $</div>
            </li>
        `
        containerTransactions.insertAdjacentHTML("afterbegin", html);
        // insertAdjacentHTML(){
        //      <!-- beforebegin -->
        // <p>
        //      <!-- afterbegin -->
        //      foo
        //      <!-- beforeend -->
        // </p>
        //      <!-- afterend -->
        //}

    });
}


const createUsernames = function (accs) { // Map method application
    // create Username for each accounts
    accs.forEach(
        acc =>
            acc.username =
            acc.owner
                .toLowerCase()
                .split(' ')
                .map(name => name[0])
                .join(''));
};
createUsernames(accounts);

const calcDisplaySummary = function (account) {
    const incomes = account.movements
        .filter(mov => mov > 0)
        .reduce((pre, curr) => (pre + curr), 0);
    labelSumIn.textContent = `${incomes.toFixed(2)}$`;

    const outcomes = account.movements
        .filter(mov => mov < 0)
        .reduce((pre, curr) => (pre + curr), 0);
    labelSumOut.textContent = `${Math.abs(outcomes).toFixed(2)}$`;

    const interest = account.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * account.interestRate) / 100)
        .filter(money => money >= 1)
        .reduce((pre, curr) => pre + curr, 0);
    labelSumInterest.textContent = `${interest.toFixed(2)}$`;
}

const calcDisplayBalance = function (account) {
    account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
    labelBalance.textContent = `${account.balance.toFixed(2)}$`;
}

// updateUI handler
const updateUI = function (account) {
    // Display Transactions
    displayTransactions(account);
    // Display Summary
    calcDisplaySummary(account);
    // Display Balance
    calcDisplayBalance(account);
}


let currentAccount;

// // test's value
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;



// Login Event handler
btnLogin.addEventListener('click', function (e) {
    e.preventDefault(); // keyboard Enter dector
    // find()
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    // ?. to handle if currentAccount is undefind
    if (currentAccount?.pin === Math.floor(inputLoginPin.value)) {
        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;

        // Create current date and time
        const now = new Date();
        const day = `${now.getDate()}`.padStart(2, 0);
        const month = `${now.getMonth() + 1}`.padStart(2, 0);
        const year = now.getFullYear();
        const hour = `${now.getHours()}`.padStart(2, 0);
        const min = `${now.getMinutes()}`.padStart(2, 0);
        labelDate.textContent = `As of ${day}/${month}/${year}, ${hour}:${min}`;

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        // UI Update
        updateUI(currentAccount)
    }
});

// TrasferTo Event handler
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Math.floor(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

    // Clear input field
    inputTransferAmount.value = inputTransferTo.value = '';

    // Check if enough money...
    if (amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username) {
        // TranferTo
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // Add transfer date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());

        // UI Update
        updateUI(currentAccount);
    }
});

// Loan Event handler
btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Math.floor(inputLoanAmount.value);
    if (amount > 0 && currentAccount.movements.some(move => move >= amount * 0.1)) {
        // add transations
        currentAccount.movements.push(amount)

        // Add Loan date
        currentAccount.movementsDates.push(new Date().toISOString());

        //UI update
        updateUI(currentAccount);
        inputLoanAmount.value = '';
    }
});

// Closs Acount Event Handler
btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    if (currentAccount.username === inputCloseUsername.value &&
        currentAccount.pin === Math.floor(inputClosePin.value)
    ) {
        // like indexof()
        const indexed = accounts.findIndex(account => account.username === currentAccount.username)

        // Delete account
        accounts.splice(indexed, 1);

        // Hide UI
        labelWelcome.textContent = `Log in to get started`
        containerApp.style.opacity = 0;
    }
    // Clear input field
    inputCloseUsername.value = inputClosePin.value = '';
});

// Sort Event Handler
// method for false true change
let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayTransactions(currentAccount, !sorted);
    sorted = !sorted;
});


