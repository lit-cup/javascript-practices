// Clousers

// A function always has access to the variable environment
// of the execution context in which it was created
// even after that execution context is gone.
// then basically this variable environment
// attached to the function exactly as it was at the time
// and place that the function was created.

// * A closure is the closed-over variable environment of the context in which a function was created, even when the function is executed outside that context.
// * A closure gives a function access to all the variables of its parent function, even after that parent function has returned.
//   The function keeps a reference to its outer scope, which preserves the scope chain throughout time.
// * A closure makes sure that a function doesn't lose connection to variables that existed at the function's birth place.
//   (function -> connection -> Parent scope -> variables)
// * A closure is like a backpack that a function carries around wherever it goes. This backpack has all the variables that were present in the environment where the function was created.
//   (function -> closure -> variables)

const secureBooking = function () {
    let passengerCount = 0;
    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
}

const booker = secureBooking(); // booker is a function that can access passengerCount variable

booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers

console.dir(booker); // to see the closure of booker function at web dev tools


// Example 1

let f;
const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2); // 46
    };
}
const h = function () {
    const b = 777;
    f = function () {
        console.log(b * 2); // 1554
    };
}

g(); // g function is executed and f function is created with closure
f(); // 46
console.log(f);

h(); // Re-assign f function to new function with new closure
f(); // 1554
console.log(f);

// Example 2

const boardPassengers = function (n, wait) {
    const perGroup = n / 3; // 3 is the group size
    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000); // wait is in seconds
    console.log(`Will start boarding in ${wait} seconds`);
}
// disclosure even has priority
const perGroup = 1000;

boardPassengers(180, 3); // We are now boarding all 180 passengers, There are 3 groups, each with 60 passengers, Will start boarding in 3 seconds