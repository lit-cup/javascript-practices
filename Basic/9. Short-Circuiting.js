
// OR: returned first ture value/the last value if all of them are falsy
// to set default valuse

// Use ANY date type, return ANY data type, short-circuiting
console.log(2 || 'Shou'); // 2
// The firt is default by true boolean and || find true value 
// and second operand will not calc

console.log('' || 'Shou') // Shou
// first operand value is falsy and Second operand have value
// Which mean OR operator doesn't have to be a boolean
// simple return true value

console.log(true || 0); // true
// like beginning example, when operand true it return

console.log(undefined || null); // null
// undefined is falsy value, second operand is not short-circuiting so it will be return

console.log(undefined || 0 || ''|| 'Result' || 22|| null); // Result
// because Result is firt true value in this chain of OR operations
// if OR operator get true value it will not watch more 

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // 10 
// because restaurant.numGuests is undefined
restaurant.numGuests = 23;
// if restaurant.numGuests be defined the reasult will be 23
// Same logical to {
// 
// restaurant.numGuests || 10
// 
// } sitution if restaurant.numGuests not defined value is 10 than the defined


// AND: returned first falsy value/ the last value if all of them are truthy
// execute code in the second operand if the first one is true

console.log(0 && 'Shou'); // 0
// because 0 is falsy which mean false than js even need to look any value
 
console.log(7 && 'Shou'); // Shou
// truthy than evaluation continues the last value returned 

console.log('Rea' && 23 && null && 'Shou'); // null
// 'Rea': truthy, 23: truthy, null: falsy 
// so of the end operation is gonna be false anyway at the end
// so null become the value that's gonna be returned

//case 1
if(restaurant.oderPizza){
    restaurant.oderPizza('mushrooms', 'spinach');
}
// also can write like this:
restaurant.oderPizza && restaurant.oderPizza('mushrooms', 'spinach');
// if restaurant.oderPizza is not exist undefined it will then short circuit the evaluation nothing happans
// if restaurant.oderPizza is truthy value the second part will be evaluated then we can call funtion
// if(true) watched_second_part
// if(false) donothing_and_leave_out


// ES2020 Nullish Coalescing 
// to fix the error about 0 situation
// when restaurant.numGuests = 0 it is falsy so OR continue look than default be set 10.
restaurant.numGuests = 0;
const nc = restaurant.numGuests || 10;
console.log(nc); // 10

// Nullish Coalescing fixed error
const ncCorrect = restaurant.numGuests ?? 10;
console.log(ncCorrect); // 0
// if restaurant.numGuests undefined result is 10

// How it work:
// Nullish value instead of falsy values: 
// Is only null and undefined (NOT 0 or '')

// which mean: 
// if Nullish value is not null/undefined it will short circuited 
// if Nullish value is null/undefined it will continue evaluation meet none-nullish value and returned