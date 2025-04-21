const arr = [1, 2, 3, 4, 5, 6];
console.log(new Array(1, 2, 3, 4, 5, 6)); // 1 2 3 4 5 6

// Empty arrays + fill method
const x = new Array(7); // empty
// map can't use 
x.map(() => 5); // empty



// so we could use fill()

/* Array.prototype.fill() Method
----------------------------
The fill() method changes all elements in an array to a static value, from a start index to an end index (not including the end index).

Syntax:
array.fill(value[, start[, end]])

Parameters:
- value: Value to fill the array with
- start: (Optional) Start index, defaults to 0
- end: (Optional) End index, defaults to array.length

Characteristics:
1. Modifies the original array
2. Returns the modified array
3. If start is negative, it's treated as array.length + start
4. If end is negative, it's treated as array.length + end

Examples:
const numbers = [1, 2, 3, 4];
numbers.fill(0);         // [0, 0, 0, 0]
numbers.fill(1, 2);      // [0, 0, 1, 1]
numbers.fill(2, 1, 3);   // [0, 2, 2, 1]
numbers.fill(4, -3, -1); // [0, 4, 4, 1]
*/

x.fill(1, 3, 5); // fill 4-5 1
x.fill(1); // fill all 1
console.log(x); // [1,1,1,1,1,1,1]

arr.fill(23, 2, 6);
console.log(arr);


// Array.from()

/* Array.from() Method
------------------
Creates a new, shallow-copied Array instance from an array-like or iterable object.
like NodeList
Syntax:
Array.from(arrayLike[ , mapFn[ , thisArg]])

Parameters:
- arrayLike: An array-like or iterable object to convert to an array
- mapFn: (Optional) Map function to call on every element of the array
- thisArg: (Optional) Value to use as 'this' when executing mapFn

Key Features:
1. Creates a new array instance
2. Can convert array-like objects (e.g., String, Set, Map, arguments)
3. Supports optional mapping function
4. Provides proper array methods to array-like objects

Examples:
// From String
Array.from('hello');     // ['h', 'e', 'l', 'l', 'o']

// From Set
Array.from(new Set([1, 2, 3]));  // [1, 2, 3]

// With mapping function
Array.from([1, 2, 3], x => x * 2);  // [2, 4, 6]

// Create array with numbers
Array.from({length: 7}, (_, i) => i + 1);  // [1, 2, 3, 4, 5, 6, 7]
*/

const y = Array.from({ length: 7 }, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // [1, 2, 3, 4, 5, 6, 7]

// Random 100 disc
const disc = Array.from({ length: 100 }, (_, i) => Math.floor(Math.random(i) * 100) + 1);
console.log(disc, 'length ' + disc.length);

/* Math.random() Method
-------------------
Returns a floating-point, pseudo-random number between 0 (inclusive) and 1 (exclusive).

Syntax:
Math.random()

Key Features:
1. Returns a number between 0 (inclusive) and 1 (exclusive)
2. Cannot be seeded (each result is completely random)
3. Uses a uniform distribution

Common Use Cases:
1. Generate random number in range:
   Math.random() * (max - min) + min

2. Generate random integer in range:
   Math.floor(Math.random() * (max - min + 1)) + min

Examples:
// Random number between 0-1
Math.random()                    // 0.7249317064352671

// Random number between 1-10
Math.random() * 10              // 7.249317064352671

// Random integer between 1-10
Math.floor(Math.random() * 10) + 1  // 7
*/


// from() usage
labelArray.addEventListener('click', function () {
    // document.querySelectorAll('value') // ['120$', '50$', '70$', '30$', '90$', '60$', '40$']
    // Store value and change $ to ''
    const arraying = Array.from(
        document.querySelectorAll('value'),
        el => Number(el.textContent.replace('$', '')));
    console.log(arraying); // ['120', '50', '70', '30', '90', '60', '40']

    // Other way
    const arraying2 = [...document.querySelectorAll('value')];
    arraying2.map(el => el.textContent.replace('$', ''));
    console.log(arraying2);
})