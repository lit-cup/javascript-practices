const rest = new Map();
rest.set('name', 'Location');
rest.set(1, 'TW');
rest.set(2, 'US');

// set() with mulit kind of values
rest
    .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
    .set('open', 11)
    .set('close', 23)
    .set(true, 'We are open :D')
    .set(false, 'We are closed :(');

// get() with values
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

// Example
// const time = 21;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
// if(time > rest.get('open') && time < rest.get('close')){
//     rest.get(true)  // 'We are open :D'
// }else{
//     rest.get(false) // 'We are closed :('
// }

// has()
console.log(rest.has('categories'));

// delete()
rest.delete(2);
console.log(rest);

// size of length
console.log(rest.size);

// clear()
//rest.clear();

//write by array
const arr =[1,2];
rest.set(arr, 'Test');
console.log(rest.get(arr));

// Also can select html elemets
//rest.set(document.querySelector('h1'), 'Heading');
//console.log(rest);


// Maps: Iteration

const weather = {
    Chiayi: {
        Cold: 12,
        HOT: 22,
    },
    Taipei: {
        Cold: 15,
        HOT: 26,
    },
    Yunlin: {
        Cold: 17,
        HOT: 21,
    },
};

const question = new Map([
    ['question', "What is the best programming language in the world?"],
    [1, 'C++'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['Correct', 3],
    [true, 'Correct 👍'],
    [false, 'Try Again'],
]);
console.log(question);

// we could do same thing with object 
// with convert object to map
console.log(Object.entries(weather));
const weatherMap = new Map(Object.entries(weather));
console.log(weatherMap);


// Example with Quiz Application
for(const [key, value] of question){
    if(typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

console.log(question.get(question.get('Correct') === answer));


// Convert map to array [...target]
console.log([...question]);
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);
