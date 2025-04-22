console.log(23 === 23.0); // true

console.log(0.1 + 0.2); // 0.300000000004
console.log(0.1 + 0.2 === 0.3); // false 
//
//
// Conversion
console.log(Number('23'));
console.log(+'23');
//
//
// Parsing
console.log(Number.parseInt('30px', 10)); // 30
console.log(Number.parseInt('e23', 10)); // NaN

console.log(Number.parseInt('2.5rem'));  // 2
console.log(Number.parseFloat('2.5rem')); // 2.5 
//
//
// Checking if value is NaN
console.log(Number.isNaN(20));          // false
console.log(Number.isNaN('20'));        // false
console.log(Number.isNaN(+'20X'));      // true
console.log(Number.isNaN(23 / 0));      // false
//
//
// Checking if value is number
console.log(Number.isFinite(20));       // true
console.log(Number.isFinite('20'));     // false
console.log(Number.isFinite(+'20X'));   // false
console.log(Number.isFinite(23 / 0));   // false

console.log(Number.isInteger(23));      // ture
console.log(Number.isInteger(23.0));    // ture
console.log(Number.isInteger(23 / 0));  // ture
//
//
//
//
// Math、Rounding
//
// sqrt()
console.log(Math.squrt(25)); // 5
console.log(25 ** (1 / 2)); // 5
console.log(8 ** (1 / 3));  // 2
//
// max()、min()
console.log(Math.max(1, 10, 45, 3, 7, 9));  //  45
console.log(Math.max(1, 10, '45', 3, 7, 9));  //  45
console.log(Math.max(1, 10, '45px', 3, 7, 9));  //  NaN

console.log(Math.min(1, 10, 45, 3, 7, 9));  //  1

console.log(Math.PI * Number.parseFloat('10px' ** 2));
//
//
// random()
console.log(Math.trunc(Math.random() * 6) + 1);
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
console.log(randomInt(10, 20));
//
//
//
//
// Rounding integers positive number 
// round()、ceil()、floor()、trunc()
console.log(Math.round(23.3));  // 23
console.log(Math.round(23.9));  // 23

console.log(Math.ceil(23.3));   // 24
console.log(Math.ceil(23.9));   // 24

console.log(Math.floor(23.3));  // 23
console.log(Math.floor('23.9')); // 24

console.log(Math.trunc(23.3));  // 23

console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24
//
//
//
//
// Rounding decimails
console.log((2.7).toFixed(0)); // 3
console.log((2.7).toFixed(3)); // 2.700
console.log((2.356).toFixed(2)); // 2.36
console.log(+(2.356).toFixed(2)); // 2.36 <= number
//
//
//
//
// Remainder operator
console.log(5 % 2); // 1
console.log(5 / 2); // 5 =2*2+1

// use function
const isEven = n => n % 2 === 0;
isEven(8);      // ture
isEven(23);     // false
isEven(514);    // ture
//
//
// useage with project4 change list color with remainder
[...document.querySelectorAll('.transaction-item')].forEach(function (row, i) {
    // 0,2,4,6
    if (i % 2 === 0) row.style.backgroundColor = 'red';
    // 0,3,6,9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
});
//
//
//
//
// Numberic Separators _
const diameter = 211_000_450;
console.log(diameter); // 233000450
// Couldn't use
const PI = 3.1416;
console.log(Number('230_000'));     // NaN
console.log(parseInt('230_000'));   // 230
//
//
//
//
// Bight: n、BigInt() for large number like data id
console.log(Number.MAX_SAFE_INTEGER);   // 9007199254740991
console.log(2 ** 53 + 1);   // 9007199254740992

console.log(134235465645756875673535234234325435435353n); // 134235465645756875673535234234325435435353n
console.log(BigInt(134235465645756875673535234234325435435353)); // 134235465645756881628466181017966823342080n will have some deviation
//
// Operations
console.log(1000n + 1000n); // 2000n
console.log(134235465645756875673535234234325435435353n * 100n); // 13423546564575687567353523423432543543535300n
// Math.sqrt(16n); //error

const huge = 134235465645756875673535234234325435435353n
const num = 23;
console.log(huge * BigInt(num));  // 3087415709852408140491310387389485015013119n
//
//
// Exceptions
console.log(20n > 15);      // true
console.log(20n === 20);    // false
console.log(typeof 20n);    // bigint
console.log(20n == '20');   // ture

console.log(huge + ' is REALLY big!!!'); // 134235465645756875673535234234325435435353 is REALLY 
//
//
// Divisions
console.log(11n / 3n);  // 3n
console.log(10 / 3);    // 3.3333333333333335
//
//
//
//
//
//
// Date()
const now = new Date();
console.log(now);

console.log(new Date('Aug 02 2020 18:05:41'));
console.log(new Date('December 24, 2015'));

console.log(new Date(2037, 10, 19, 15, 23, 5));
// if over range like 35 it will auto jump to next month
console.log(new Date(2037, 10, 35));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days timesteps
//
//
// Usage dates
const future = new Date(2034, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());

// create by timesteps
console.log(new Date(2142258980000));
// Simple use now() to get now timesteps
console.log(Date.now());

future.setFullYear(2025); // set proptry
console.log(future);
//
//
//
// Dates Operations
const future1 = new Date(2039, 10, 19, 14, 24);
console.log(+future);

const clacDaysPassed = (date1, date2) =>
    Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = clacDaysPassed(new Date(2034, 3, 4), new Date(2034, 3, 14));
console.log(days1);
//
//
//
//
// Interantionalizing Dates(Intl)
const numBasic = 38888764.23;
// to customize format 
const options = {
    style: 'currency',
    unit: 'celsius',
    currency: 'EUR',
    // useGrouping: false,
}
// with different language code have different date clear
console.log('US: ', new Intl.DateTimeFormat('en-US', options).format(numBasic));
console.log('TW: ', new Intl.DateTimeFormat('zh-TW', options).format(numBasic));
// from browser
console.log('Browser: ' + navigator.language, new Intl.DateTimeFormat(navigator.language).format(numBasic));

