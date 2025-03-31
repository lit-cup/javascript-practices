// Case 1 [ default value of function arguments ]
// if we don't pass the argument in function, it will take the default value of function arguments
// if we pass the argument in function, it will take the value of function arguments
// if we set the default value of function arguments to undefined, it will take the default value of function arguments

const bookings = [];
const createbooking = function (flightNum, numPassengers = 1, price = 199 * numPassengers) {
    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    bookings.push(booking);
}
createbooking('LH123'); // LH123 1 199
createbooking('LH123', 2); // LH123 2 398
createbooking('LH123', 5); // LH123 5 995
createbooking('LH123', 2, 800); // LH123 2 800
// if want to skip the price default value using undefined at prious value than it will keep the price value we set
createbooking('LH123', undefined, 1000); // LH123 1 1000

// Case 2 [ value could be changed in function with object reference ]
// if we pass primitive value to function, it will not change the value of primitive value in function
// Each function with same object may get wrong, which mean object could be changed in other function
// So, we need to be careful when passing object as argument in function
// because it will be passed by reference, not by value
// if we change the object in one function, it will be changed in other function too

const flight = 'LH123';
const chen = {
    name: 'Chen',
    passport: 123456789,
};
const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999'; // flightNum is not change because it is primitive value
    passenger.name = 'Mr. ' + passenger.name; // passenger is object reference so it will change the name of object
    if (passenger.passport === 123456789) {
        console.log('Checked in');
    } else {
        console.log('Wrong passport!');
    }
}
checkIn(flight, chen); // LH123 Mr. Chen Checked in

// so today if we changes object in function it is work
const newPassport = function (person) {
    person.passport = Math.trunc(Math.random() * 1000000000); // create new passport number
}
newPassport(chen); // change the passport number of chen object
checkIn(flight, chen); // LH123 Mr. Chen Wrong passport! 
// passport number is changed now, because it is the object reference in function not primitive value



// Case 3 [ first-class function vs higher-order function ]

// first-class function: [The ability to store, pass, and return functions.]
// * javascript treat function as first-class citizen, which mean function is treated as SIMPLE VALUE
// * Function are just another "type" of object

// EXAMPLE:
// ** Store function in variable/ properties:
const add = ( a , b ) => a + b; // function expression
const counter = {
    variable: 23,
    inc: function(){ this.variable++;}
} 
// ** Pass function as argument to OTHER function:
const greet = () => console.log('Hello!');
btnClose.addEventListener('click', greet); // addEventListener is a function that takes a function as an argument

// ** Return function FROM another function:
const add2 = (a) => (b) => a + b; // a get closure of b

// ** Call methods on functions:
counter.inc().bind(someOtherObject); // call bind method on inc function in counter object


// high-order function: [Functions that take or return other functions.]
// * A function that receives another function as an argument, returns a function, or does both
// * This is only possible because functions are first-class citizens in JavaScript

//EXAMPLE:
// ** Function that receives another function as an argument:
    const greet2 = () => console.log('Hello!');
    btnClose.addEventListener('click', greet2);
    // addEventListener is a Higher-order function
    // greet2 is a callback function

// ** Function that returns new function:
    function count(){
        let counter = 0;
        return function(){counter++;}
    }
    // count() is a higher-order function
    // function() is a callback function


// Why we need first-class functions?
// ✅ Code reuse (no unnecessary duplication)
// ✅ More flexible, dynamic functions
// ✅ Better readability & maintainability
// ✅ Functional programming features
// ✅ Simpler async handling (callbacks, promises, etc.)

// EXAPLE:
// without first-class function:
function greetAlice() {
    return "Hello, Alice!";
}

function greetBob() {
    return "Hello, Bob!";
}

console.log(greetAlice()); // Hello, Alice!
console.log(greetBob());   // Hello, Bob!


// with first-class function: become generic, reusable, flexible
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("Alice")); // Hello, Alice!
console.log(greet("Bob"));   // Hello, Bob!


