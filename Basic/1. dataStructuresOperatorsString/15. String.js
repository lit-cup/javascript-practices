// String Section: 
    // indexOf()、lastIndexOf()
    // slice()
    // toLowerCase()、toUpperCase()
    // Replacing: replace()、replaceAll()、 / /g
    // Booleans: includes()、startWith()、endWith()
    // split()、join()
    // Padding: fill string, padStart()、padEnd()
    // Repeat: repeat()

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]); // A
console.log(plane[1])  // 3
console.log(plane[2]); // 2
console.log('B733'[0]); // B

console.log(airline.length); // 16
console.log('B733'.length) // 4


// indexOf()、lastIndexOf()
// const airline = 'TAP Ai_r_ Portugal';
console.log(airline.indexOf('r')) // 6
// const airline = 'TAP Air Po_r_tugal';
console.log(airline.lastIndexOf('r'))// 10
console.log(airline.indexOf('portugal')) // -1


// slice()
// const airline = 'TAP _Air Portugal';
console.log(airline.slice(4));  // Air Portugal
// const airline = 'TAP _Air_ Portugal';
console.log(airline.slice(4,7)) // Air

console.log(airline.slice(0,airline.indexOf(' '))); // TAP
console.log(airline.slice(airline.lastIndexOf(' ')+1)); // Portugal

console.log(airline.slice(-2)); // al
console.log(airline.slice(1,-1)); // AP Air Portuga

const checkMiddleSeat = function(seat){
    //B and E are middle seats
    const s = seat.slice(-1); // The last word
    if(s === 'B' || s ==='E') console.log('middle seat');
    else console.log('Lucky');
}
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('Shou')); // String{"Shou"}
console.log(typeof new String('Shou')) // Object
console.log(typeof new String('Shou').slice(1)); // string


// toLowerCase()、toUpperCase()
// fix capitalization in name
const passenger = 'jOnAs';
const passengerLower = passenger.toLowerCase(); // 'jonas'
const passengerCorrect = passengerLower[0].toUpperCase()+passenger.slice(1); // Jonas

// Comparing email
const email = 'hello@jonas.io';
const loginEmail = ' Hello@Jonas.Io \n';

const lowerEmail = loginEmail.toLowerCase().trim();
console.log(email === lowerEmail); // true

// Replacing: replace()、replaceAll()、 / /g global type
const priceGB = '233, 97U';
const priceUS = priceGB.replace('U','$').replace(',','.'); // 233.97$

// replace() limits using global type
const announcement = 'All door and door';
announcement.replace('door', 'get'); // only replace first value
// All get and door
announcement.replace(/door/g, 'get'); // global type to replace all
// All get and get


// Booleans: includes()、startWith()、endWith()
const answer = 'Yes';
answer.includes('Y'); // true
answer.includes('N'); // false
answer.startsWith('Ye'); //true

// use startWith()、endWith() to check if is right
if(answer.startsWith('Y') && answer.endsWith('s')){ // true

}

// Example
const checkBagger = function(items){
    const Bagger = items.toLowerCase(); // to give string all lower and more easy to compare
    if(Bagger.includes('knif') || Bagger.includes('gun')) console.log('Error')
    else console.log('Welcome');
}
checkBagger('I have laptop, some food Knif'); // Error
checkBagger('I have laptop'); // Welcome
checkBagger('I have gun lamo'); // Error

// split()
'a+very+nice+string'.split('+'); // ["a", "very", "nice", "string"]
'Chen shou'.split(' '); // ["Chen", "shou"]

// use case 1: with join()
const [firstname, lastname] = 'Chen shou'.split(' '); // firstname = Chen, lastname = shou
['Mr.',firstname,lastname.toUpperCase()].join(' '); // Mr. Chen SHOU

// use case 2: to change the special value 

const capitalizeName = function(name){
    const names = name.split(' ');
    const nameUpper = [];
    for(const n of names){
        // nameUpper.push(n[0].toUpperCase()+n.slice(1));
        nameUpper.push(n.replace(n[0],n[0].toUpperCase()));
    }
    nameUpper.join(' ');
}
capitalizeName('jessica ann smith devis') // Jessica Ann Smith Devis
capitalizeName('chen shou') // Chen Shou

// Padding: fill string, padStart()、padEnd()
const message = '12345';
message.padStart(7,'+') // ++12345
message.padStart(7,'+').padEnd(9,'+') // ++12345++

// Eample: mask without last four number
const MaskNumber = function(number){
    const str = number+''; // let number become string
    const last = str.slice(-4); // to get last four number
    return last.padStart(str.length,'*');
}
MaskNumber(9777727); // ***7727
MaskNumber('89333332')// ****3332

// Repeat: repeat()
const advice = 'I miss';
advice.repeat(5); // I missI missI missI missI miss

// Using function
const  planeInLine = function(n){
    `There are ${n} plane in Line ${'O'.repeat(n)}`
}
planeInLine(2); // There are 2 plane in Line OO
planeInLine(5); // There are 5 plane in Line OOOOO