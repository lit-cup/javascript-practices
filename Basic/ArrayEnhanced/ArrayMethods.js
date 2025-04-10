// Slice method
let arr = ['a', 'b', 'c', 'd', 'e'];
arr.slice(1, 4); // ['b', 'c', 'd']
arr.slince(-1); // ['e']
arr.slice(-2); // ['d', 'e']
arr.slice(); // ['a', 'b', 'c', 'd', 'e']
console.log([...arr]); // ['a', 'b', 'c', 'd', 'e']

////////////////////////////////////////////////////////////////////

// Splice method 
// remove from start index, and deletCount element then insert items
// Syntax:
// splice(start)
// splice(start, deleteCount)
// splice(start, deleteCount, item1)
// splice(start, deleteCount, item1, item2)
// splice(start, deleteCount, item1, item2, /* …, */ itemN)



// extracted from original array
arr.splice(1, 2);   // ['b', 'c'] arr = ['a', 'd', 'e'] remove 2 element [b, c] at index 1
arr.splice(1, 2, 'x', 'y'); // remove 2 elements at index 1 and insert x, y ['a', 'x', 'y', 'd', 'e']
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