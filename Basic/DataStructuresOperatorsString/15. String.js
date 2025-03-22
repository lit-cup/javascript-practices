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