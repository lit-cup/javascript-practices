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


let currentAccount;

// Login Event handler
btnLogin.addEventListener('click', function (e) {
    e.preventDefault(); // keyboard Enter dector
    // find()
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    // ?. to handle if currentAccount is undefind
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;

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
    const amount = Number(inputTransferAmount.value);
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
        // UI Update
        updateUI(currentAccount);
    }
});

// updateUI handler
const updateUI = function (account) {
    // Display Transactions
    displayTransactions(account.movements);
    // Display Summary
    calcDisplaySummary(account);
    // Display Balance
    calcDisplayBalance(account);
}

const displayTransactions = function (transactions) {
    containerTransactions.innerHTML = '';
    transactions.forEach(function (mov, i) {
        const type = mov > 0 ? 'DEPOSIT' : 'WITHDRAWAL';
        const html = `
            <li class="transaction-item" id="transaction-item">
                <div class="transaction-item-type transaction-item-${type}">${i + 1} ${type}</div>
                <div class="transaction-item-date">2023-10-01</div>
                <div class="transaction-item-amount">${mov} $</div>
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
    labelSumIn.textContent = `${incomes}$`;

    const outcomes = account.movements
        .filter(mov => mov < 0)
        .reduce((pre, curr) => (pre + curr), 0);
    labelSumOut.textContent = `${Math.abs(outcomes)}$`;

    const interest = account.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * account.interestRate) / 100)
        .filter(money => money >= 1)
        .reduce((pre, curr) => pre + curr, 0);
    labelSumInterest.textContent = `${interest}$`;
}

const calcDisplayBalance = function (account) {
    account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
    labelBalance.textContent = `${account.balance}$`;
}


/* PIPELINE
const twdToUsd = 0.03;

const totalDepositsUSD = account1.movements
    .filter(tran => tran > 0)
    .map(tran => tran * twdToUsd)
    .reduce((pre, curr) => pre + curr, 0);
*/

/* The Filter method

    The Filter method for fliter mov > 0 then it is deposit
    const deposits = account1.movements.filter(trans => trans > 0);

    Is Like for of method
    const depositForOf = [];
    for (const tran of account1.movements) if (tran > 0) depositForOf.push(tran);

    The Filter method for fliter mov < 0 then it is withdrawals
    const withdrawals = account1.movements.filter(trans => trans < 0);

    Is Like this for of method
    const withdrawalsForOf = [];
    for (const tran of account1.movements) if (tran < 0) withdrawalsForOf.push(tran);
*/

/* The Reduce method
    accumulator
    const balance = account1.movements.reduce(
        function (acc, cur, i, arr) {
            console.log(`Iteration ${i}: ${acc}`);
            return acc + cur
        }, 0); // 0 is the started add value

    Arrow function version
    const balance = account1.movements.reduce(acc, cur => acc + cur, 0);

    for of version
    let balance2 = 0
    for(const tran of account1.movements) balance2 += tran;

    Find Maximum value
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    const max = account1.movements.reduce((acc, tran) => acc > tran ? acc : tran, account1.movements[0]);
    console.log(max);
*/

/* The map method

    return array and operator all element

    const twdToUsd = 0.03;
    const transactionsUSD = account1.movements.map(function (trans) {
        return trans * eurToUsd;
    });
    Arrow function
    const transactionsUSD = account1.movements.map(trans => trans * earToUsd);

    for of method
    const movementsUSDfor = [];
    for (const tran of transactions) movementsUSDfor.push(tran * twdToUsd);

    Map method with transate Ueser usage
    const transactionsDescriptions = account1.movements.map((mov, i) => `
            Transatoion ${i + 1}: You ${mov > 0 ? 'DESPOSIT' : 'WITHDRAWAL'} ${Math.abs(mov)}
    `);
*/

/*  The find Method
    const first Withdrawal = movements.find(mov => mov<0);
 
    const account =accounts.find(acc => acc.owner === 'Jessica Davis')
*/