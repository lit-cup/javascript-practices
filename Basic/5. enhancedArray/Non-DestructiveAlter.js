// Does not mutate the original array, non-destruective array method

/* Array.prototype.toReversed() Method
-----------------------------------
The toReversed() method returns a new array with the elements in reversed order, leaving the original array unchanged.

Syntax:
array.toReversed()

Key Features:
1. Does not mutate the original array (unlike reverse())
2. Returns a new array with elements in reverse order

Examples:
const arr = [1, 2, 3];
const reversed = arr.toReversed();   // [3, 2, 1]
console.log(arr);                    // [1, 2, 3] (original unchanged)
*/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);
// const nomarlreversed = movements.reverse(); // destroy the original movements array by destructive
// movements.slice().reverse(); slice() copy array then array
const reversedMov = movements.toReversed(); // toReverse() combine slice() reverse() method to non-destruective array
// console.log(movements);
console.log(reversedMov);
// console.log(nomarlreversed);


/* Array.prototype.toSorted() Method
---------------------------------
The toSorted() method returns a new array with the elements sorted, leaving the original array unchanged.

Syntax:
array.toSorted([compareFunction])

Parameters:
- compareFunction: (Optional) Specifies a function that defines the sort order. If omitted, elements are sorted as strings in ascending order.

Key Features:
1. Does not mutate the original array (unlike sort())
2. Returns a new sorted array
3. Accepts the same compare function as Array.prototype.sort()

Examples:
const arr = [3, 1, 4, 2];
const sorted = arr.toSorted();           // [1, 2, 3, 4]
console.log(arr);                        // [3, 1, 4, 2] (original unchanged)

const desc = arr.toSorted((a, b) => b - a); // [4, 3, 2, 1]
*/
const sortMov = movements.toSorted();
console.log(sortMov);

/* Array.prototype.toSpliced() Method
----------------------------------
The toSpliced() method returns a new array with some elements removed and/or replaced, without modifying the original array.

Syntax:
array.toSpliced(start, deleteCount[, ...items])

Parameters:
- start: The index at which to start changing the array.
- deleteCount: The number of elements to remove.
- items: (Optional) Elements to add to the array, beginning at start.

Key Features:
1. Does not mutate the original array (unlike splice())
2. Returns a new array with the changes applied
3. Accepts the same arguments as Array.prototype.splice()

Examples:
*/
const arr = [1, 2, 3, 4, 5];
const result = arr.toSpliced(1, 2);         // [1, 4, 5]
console.log(arr);                           // [1, 2, 3, 4, 5] (original unchanged)

const added = arr.toSpliced(2, 0, 99);      // [1, 2, 99, 3, 4, 5]
const replaced = arr.toSpliced(2, 1, 99);   // [1, 2, 99, 4, 5]


/* Array.prototype.with() Method
-----------------------------
The with() method returns a new array with the element at the given index replaced with a new value, leaving the original array unchanged.

Syntax:
array.with(index, value)

Parameters:
- index: The index of the element to replace.
- value: The value to insert at the specified index.

Key Features:
1. Does not mutate the original array (unlike direct assignment)
2. Returns a new array with the specified change

Examples:
const arr = [1, 2, 3];
const newArr = arr.with(1, 99);   // [1, 99, 3]
console.log(arr);                 // [1, 2, 3] (original unchanged)
*/

// use with() to movements[1] = 2000;
const newMovements = movements.with(1, 2000);
console.log(newMovements);
console.log(movements);