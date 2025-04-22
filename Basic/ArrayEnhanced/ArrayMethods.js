// Slice method
let arr = ['a', 'b', 'c', 'd', 'e'];
arr.slice(1, 4); // ['b', 'c', 'd']
arr.slince(-1); // ['e']
arr.slice(-2); // ['d', 'e']
arr.slice(); // ['a', 'b', 'c', 'd', 'e']
console.log([...arr]); // ['a', 'b', 'c', 'd', 'e']

////////////////////////////////////////////////////////////////////

// Splice method 
// extracted from original array
arr.splice(1, 2);   // ['b', 'c'] arr = ['a', 'd', 'e']
arr.splice(1, 2, 'x', 'y'); // ['b', 'c', 'x', 'y']
// To remove element 
arr.splice(-1);   // ['a', 'b', 'c', 'd'] arr = ['a', 'b', 'c']

////////////////////////////////////////////////////////////////////

// Reverse method original array will be reversed
arr.reverse(); // ['e', 'd', 'c', 'b', 'a'] arr = ['e', 'd', 'c', 'b', 'a']

////////////////////////////////////////////////////////////////////

// Concat method
let arr2 = ['d', 'e', 'f'];
const letter = arr.concat(arr2);  // ['a', 'b', 'c', 'd', 'e', 'f']
// also can use spread operator
console.log([...arr, ...arr2]); // ['a', 'b', 'c', 'd', 'e', 'f']

////////////////////////////////////////////////////////////////////

// Join method
letter.join('-'); // 'a-b-c-d-e-f'

////////////////////////////////////////////////////////////////////

// at method
// arr[0]; ==== arr.at(0); // 'a'

// Usage: getting last array element
arr[arr.length - 1]; // 'e'
arr.slice(-1)[0]; // 'e'
arr.at(-1); // 'e'

// at method is also available for string
const str = 'Hello World';
str.at(0); // 'H'
str.at(-1); // 'd'

////////////////////////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130];

// for of loop
for (const movement of movements) {
    if (movement > 0)
        console.log(`You deposited ${movement}`);
    else
        console.log(`You withdrew ${Math.abs(movement)}`);
}

// for of loop with index
// for (let i = 0; i < movements.length; i++) {
for (const [i, movement] of movements.entries()) {
    if (movement > 0)
        console.log(`Movement ${i + 1}: You deposited ${movement}`);
    else
        console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
}


// forEach method
movements.forEach(function (mov) {
    if (mov > 0)
        console.log(`You deposited ${mov}`);
    else
        console.log(`You withdrew ${Math.abs(mov)}`);
});
// forEach method with index
// forEach method first one is the current element, second one is the index, third one is the array itself
movements.forEach(function (mov, i, arr) {
    if (mov > 0)
        console.log(`Movement ${i + 1}: You deposited ${mov}`);
    else
        console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
})

// when should you use the for of loop.

// forEach cannot break out, continue and break do not work too
// if we have personal perference, we should using for of loop

////////////////////////////////////////////////////////////////////

// Map 
const current = new Map([
    ['a', 'b'],
    ['c', 'd'],
    ['e', 'f']
]);

// Map-forEach 
current.forEach(function (values, key, map) {
    console.log(`${key}: ${values}`);
})

// Set
const currentSet = new Set(['a', 'b', 'c', 'd', 'd']); // Set(4) { 'a', 'b', 'c', 'd' }
currentSet.forEach(function (values, _, map) {
    console.log(`${values}: ${values}`); // 'a: a' 'b: b' 'c: c' 'd: d'
})


// Based on project4 data
/* PIPELINE USAGE
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

/* The findLast method
        movements: [200, 450, -400, 3000, -650, -130, 70, 1300]
        const lastWithdrawal = movements.findLast(mov => mov<0); // -130
        
    The findLastIndex method
        const lastesLargeMovementIndex = movements.findLastIndex(mov => Math.abs(mov)>1000)
        console.log(lastesLargeMovementIndex) // <2000 is 3000 is index 3

    console.log(`Your latest large movement was ${movements.length - latestLargeMovementIndex} movements ago`)
 */

/* The some() method // CONDITION
    includes() could check if value is availalbe // EQUALITY
    
    some() could check ranage of value like this:
    // if have bigger than 1500 element. 
    // in this case it is ture 
    // because movements array have 3000 which bigger than 15000
    const anyDeposits = movements.some(mov => mov > 1500)  // true
    
    // EVERY method to check every condition
    movements.every(mov=>mov>0); // false
    account4.movements.every(mov => mov >0); true

    // Separate callback
    const deposit = mov => mov > 0;
    movements.some(deposit);
    movements.every(deposit);
    movements.filiter(deposit);
 */

/*  flat() method
    const arr = [[1,2,3],[4,5,6],7, 8]
    arr.flat() // [1,2,3,4,5,6,7,8]

    const arrDeep = [[1,2],3],[4,[5,6],7,8]
    arrDeep.flat(1) // [[1,2],3,4,[5,6],7,8]
    arrDeep.flat(2) // [1,2,3,4,5,6,7,8]

    // usage
    const accountMove = accounts.map(acc => acc.movements);
    const allMove = accountMovements.flat() conbine all movements
    const overalBaleance = allMove.reduce((acc,move) => acc+mov,0);

    // flat() method Chaing
    const overalBalance = accounts
        .map(acc => acc.movements)  // find accounts movements
        .flat()                     // combine together
        .reduce((acc,move)=>acc+mov,0) // Add together
    
    // flatMap()
    const overalBalance2 = accounts
        .flatMap(acc=> acc.movements)
        .reduce((acc,mov)=> acc+mov,0)
 */

/* The sort method
    // sort first String
        const owners = ['Jonas','Zach','Adam','Martha']
        owners.sort() // A-Z ['Adam', 'Jonas', 'Martha', 'Zach']

    // sort Numbers

        // Ascending
            // movements.sort((a,b))=>{
                
            //     // return > 0, A, B (switch order)
            //     if (a>b) return 1;
                
            //     // return < 0, A, B (keep order)
            //     if(a<b) return -1;
            // });
        // more Simple way
        movements.sort((a,b)=> a-b);

            // Descending
            // movements.sort((a,b))=>{
            //     // return > 0, A, B (switch order)
            //     if (a>b) return -1;
            //     // return < 0, A, B (keep order)
            //     if(a<b) return 1;    
            // });

        // more Simple way
        movements.sort((a,b)=> b-a);
 */