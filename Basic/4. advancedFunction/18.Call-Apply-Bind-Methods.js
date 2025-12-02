// Exapmle 
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function ()
    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    }
}

lufthansa.book(239, 'Chen Stonk'); // Chen Stonk booked a seat on Lufthansa flight LH239
lufthansa.book(635, 'John Smith'); // John Smith booked a seat on Lufthansa flight LH635
console.log(lufthansa); // { airline: 'Lufthansa', iataCode: 'LH', bookings: [ [Object], [Object] ] }

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

const book = lufthansa.book; // book is a function, so we can store it in variable
// book(23, 'Sarah Williams'); // undefined

// How to save undefined error speratedly?
// Use call/apply/bind method

// Call method
book.call(eurowings, 23, 'Sarah Williams'); // Sarah Williams booked a seat on Eurowings flight EW23
console.log(eurowings); // { airline: 'Eurowings', iataCode: 'EW', bookings: [ [Object] ] }

book.call(lufthansa, 239, 'Mary Cooper'); // Mary Cooper booked a seat on Lufthansa flight LH239
console.log(lufthansa) // { airline: 'Lufthansa', iataCode: 'LH', bookings: [ [Object], [Object], [Object] ] }

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};

book.call(swiss, 583, 'Mary Cooper'); // Mary Cooper booked a seat on Swiss Air Lines flight LX583
console.log(swiss); // { name: 'Swiss Air Lines', iataCode: 'LX', bookings: [ [Object] ] }



// Apply method
const flightData = [583, 'George Cooper']; // flightData is an array of flight number and name
book.apply(swiss, flightData); // George Cooper booked a seat on Swiss Air Lines flight LX583
console.log(swiss); // { name: 'Swiss Air Lines', iataCode: 'LX', bookings: [ [Object], [Object] ] }
// But
// Morden use way to using apply method is using spread operator
book.call(swiss, ...flightData); // George Cooper booked a seat on Swiss Air Lines flight LX583
console.log(swiss); // { name: 'Swiss Air Lines', iataCode: 'LX', bookings: [ [Object], [Object] ] }


// Bind Method :
// Basic use:
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
// set flightNum and name
bookEW(23, 'Steven Williams'); // Steven Williams booked a seat on Eurowings flight EW23

// Often used:
// pre Set number etc. 23
const bookEW23 = book.bind(eurowings, 23);
// give the name to the bookEW23 function
bookEW23('Steven Williams'); // Steven Williams booked a seat on Eurowings flight EW23
bookEW23('John Doe'); // John Doe booked a seat on Eurowings flight EW23




// Bind usage with event listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this); // this is lufthansa object

    this.planes++;
    console.log(this.planes);
};
document
    .querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // 301 if want want to use lufthansa object in buyPlane function using bind method


// Bind usage with partial application

const addTax = (rate, value) => value + value * rate; // addTax is a function that takes rate and value as arguments
console.log(addTax(0.1, 200)); // 220

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23; // addVAT is a function that takes value as argument and rate is fixed to 0.23

console.log(addVAT(100)); // 123
console.log(addVAT(23)); // 28.29 


// if we are not using bind method then we need to using return functions
const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    }
}
const addVAT2 = addTaxRate(0.23); // addTaxRate is a function that takes rate as argument and return a function that takes value as argument
console.log(addVAT2(100)); // 123
console.log(addVAT2(23)); // 28.29