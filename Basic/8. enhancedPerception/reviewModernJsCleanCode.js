// READABLE CODE

// Write code so that others can understand it
// Write code so that you can understand it in 1 year
// Avoid too "clever" and overcomplicated solutions
// Use descriptive variable names: what they contain
// Use descriptive function names: what they do

// GENERAL

// Use DRY principle (refactor your code)
// Don't pollute global namespace, encapsulate instead
// Don't use var
// Use strong type checks ( === and !== )

// FUNCTIONS

// Generally, functions should do only one thing
// Don't use more than 3 function parameters
// Use default parameters whenever possible
// Generally, return same data type as received
// Use arrow functions when they make code more readable

// OOP

// Use ES6 classes
// Encapsulate data and don't mutate it from outside the class
// Implement method chaining
// Do not use arrow functions as methods (in regular objects)

// AVOID NESTED CODE

// Use early return (guard clauses)
// Use ternary (conditional) or logical operators instead of if
// Use multiple if instead of if/else-if
// Avoid for loops, use array methods instead
// Avoid callback-based asynchronous APIs

// ASYNCHRONOUS CODE

// Consume promises with async/await for best readability
// Whenever possible, run promises in parallel (Promise.all)
// Handle errors and promise rejections


// Example

// var -> const/let
// var users = [ 
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' },
//     { id: 3, name: 'Charlie' },
// ];
// const users = [
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' },
//     { id: 3, name: 'Charlie' },
// ];

// clean if statement with opterator optional chaining
// let userName;
// if (users && users.length > 0) {
//     userName = users[0].name;
// } else {
//     userName = 'Guest';
// }

// cleaned up using ternary operator
// const userName = (users && users.length > 0) ? users[0].name : 'Guest';
// cleaned up using optional chaining and logical OR

// const userName = users?.[0]?.name || 'Guest';

// function optional chaining example
// if users is null or undefined, users?.[0] will short-circuit to undefined

// const checkedUserName = user => users?.[0]?.name || 'Guest';
// then use checkedUserName(users) to get the name or 'Guest'

// const name = checkedUserName(users);

//// or in the boolean context
// if (checkedUserName(users) === 'Guest') {
//     console.log('No users found, defaulting to Guest');
// } else {
//     console.log(`First user is: ${checkedUserName(users)}`);
// }


//// default function parameters
// const addUser = (id, name = 'chen yi ting') => {...};

//// if push same object varible
// users.push({ id: 4, name: name });
// change to simpified version
// users.push({ id: 4, name});

//// use ${} for string interpolation
// output = 'User added: ' + name + ' with ID: ' + id;
// change to template literal
// outpout = `User added: ${name} with ID: ${id}`;

///////////////////////////////////////////////////////////////////////

// imperative vs declarative, two different programming paradigms

// imperative: how to do things step by step

// example: for loop to filter array we tell the computer how to do it step by step
// const numbers = [1, 2, 3, 4, 5, 6];
// imperative approach: how to do it
// const evenNumbers = [];
// for (let i = 0; i < numbers.length; i++) {
//     if (numbers[i] % 2 === 0) {
//         evenNumbers.push(numbers[i]);
//     }
// }
// reuslt: evenNumbers = [2, 4, 6];


// declarative: what to do, focus on the outcome, Descripton of the desired result

// example: using array filter method to get even numbers
// const evenNumbers = numbers.filter(num => num % 2 === 0);
// result: evenNumbers = [2, 4, 6];

// declarative code is generally more readable and concise
// it abstracts away the implementation details and focuses on the logic of what we want to achieve

///////////////////////////////////////////////////////////////////////

// functional programming
// - pure functions: given the same input, always return the same output, no side effects, not depending on external.
// functional programming: focus on pure functions and immutability
// - declarative progromming paradigm
// - combine pure functions, avoid side effects and mutable state
// - side effects: modifying external state, changing global variables, I/O operations
// - immutability: data cannot be changed after creation, instead create new copies with changes, state is copied and the copy is mutated and returned.
// Example: react, redux

// functional programming techniques:

// Try to avoid data mutations
// Use built-in methods that don't produce side effects
// Do data transformations with methods such
// as .map(), .filter() and .reduce()
// Try to avoid side effects in functions: this is of course not always possible!

// DECLARATIVE SYNTAX

// Use array and object destructuring
// Use the spread operator ( ... )
// Use the ternary (conditional) operator
// Use template literals


// Example:

// Object.freeze() to make object immutable
const userList = Object.freeze([
    { age: 18, description:'young wonman ❤️', name: 'Alice' },
    { age: 20, description:'teenage 🤞', name: 'josh'},
]);
// user.name = 'Bob'; // This will not change the name property

// it is not deep freeze, we could change properties of nested objects
// const user = Object.freeze({ id: 1, name: 'Alice', preferences: { theme: 'dark' } });
// user.preferences.theme = 'light'; // This will change the theme property

// when object is freeze, how do we push new properties or change existing ones? 
const checkedUserName = (ageLimit, user) => ageLimit?.[user] ?? 0;

// Pure function no side effect
const addUser = function(
    state,
    ageLimit,
    age,
    description,
    user ='josh'){
    
    const cleanedUser = user.toLowerCase(); // make name alwasy LowerCase();

    return user <= checkedUser(ageLimit, user) 
    ? [...state, {age, description, user: cleanedUser }] // Answer: using two object combine method then return all
    : state; // if user not equal josh it will not add 
};

const newUserList = addUser(userList, 20, 18, 'young boy ✅', 'bob');
// when we need to keep add object we are using perious one to chaining
const newUserList2 = addUser(newUserList, 20, 26, 'old man 🔃', 'juily');
const newUserList3 = addUser(newUserList2, 20,  33, 'old womman 👇', 'ashes');

// to composing create one function to impove above chain

// Another case
// const checkAge = function(userList, ageLimit){
//     for(const entry of newUserDData3){
//         if(entry.age < checkedUserName(ageLimit, userList)) entry.flag = 'limit';
//     }
// }

// Pure function
// this function check age in the list is adult if is add limit flag
// const checkAge = function(userList, ageLimit){
//     return user.map(entry => {
//         return entry.age < checkedUserName(ageLimit, userList) ? {...entry, flag: 'limit'} : entry;
//     });
// }

// to Arrowr function maker more clear
const checkAge = (userList, ageLimit) => 
    userList.map(entry => // map create new array
        entry.age < checkedUserName(ageLimit, user) 
        ? {...entry, flag: 'limit'} // copy
        : entry);
const finalUser = checkAge(newUserList3, 20); // if user age > 10 it will have flag: limit


// another case 
// this function custom output 
const logBigUser = function(user, ageLimit){
    // let output = '';
    // for(const entry of newUserData3){
    //     output += entry.age <= ageLimit ? `${entry.description.slice(2)}` : '';
    // }
    // output = output.slice(0,-2);
    // console.log(output);

    // change to more clear impure way 
    const bigUser = user
                .filter(entry => entry.age <= ageLimit ) // filter the age below we want
                .map(entry=>entry.description.slice(-2)) // then get last two char emoji
                .join(' / '); // combine together
    console.log(bigUser); // I/O here become impure
}
logBigUser(finalUser, 18);


///////////////////////////////////////////////////////////////////////
