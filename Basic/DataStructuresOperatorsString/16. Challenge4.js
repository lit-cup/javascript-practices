// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

*/
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function(){
    const text = document.querySelector('textarea').value;
    const arrayText = text.split('\n');
    console.log(arrayText);
    for(const [i, text] of arrayText.entries()){
        const [first, last]= text.toLowerCase().trim().split('_');
        const rewrite = first + last.replace(last[0], last[0].toUpperCase());
        console.log(`${rewrite.padEnd(20,' ')} ${'👍'.repeat(i+1)}`);
    }
})
// Test Data
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';


  // String Method Pratice
const getCode = str => str.slice(0, 3).toUpperCase();
for(const flight of flights.split('+')){
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🛑' : ''} ${type.replace('_',' ')} ${getCode(from)} ${getCode(to)} (${time.replace(':','h')})`.padStart(40, ' ');
  console.log(output);
}

