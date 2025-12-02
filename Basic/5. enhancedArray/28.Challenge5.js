/* 
Julia and Kate are still studying dogs. and this time they are want to figure out if the dogs in their are eating too much or too little food.

- Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).


1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. 
   Do NOT create a new array, simply loop over the array. 
2. Find Sarah's dog and log to the console whether it's eating too much or too little. 
   HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little'. based on whether they are 
    eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of weners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to Not mutate the original array

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: OKEY which means being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). 
        Basically, the current portion should be between 90% and 110% of the recommended portion.
 
TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
*/
const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
    { weight: 18, curFood: 244, owners: ['Joe'] },
    { weight: 32, curFood: 340, owners: ['Michael'] }
];
// 1 work!
dogs.map(info => info.recommendedFood = Math.floor((info.weight) ** 0.75 * 28)); // grams
console.log(dogs);

// 2 work!
const dogSarah = dogs.find(info => info.owners.includes('Sarah'));
console.log(`Sarah's dog eat too ${dogSarah.curFood > dogSarah.recommendedFood ? 'much' : 'little'}`);
// 3 work!
// const ownersEatTooMuch = [];
// const ownersEatTooLittle = [];
// dogs.map(info => info.curFood < info.recommendedFood ? ownersEatTooLittle.push(...info.owners) : ownersEatTooMuch.push(...info.owners));
// console.log('Eat too little: ', ownersEatTooLittle);
// console.log('Eat too Much: ', ownersEatTooMuch);
const ownersEatTooMuch = dogs
    .filter(dog => dog.curFood > dog.recommendedFood)
    .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
    .filter(dog => dog.curFood < dog.recommendedFood)
    .flatMap(dog => dog.owners);
console.log('Eat too little: ', ownersEatTooLittle);
console.log('Eat too Much: ', ownersEatTooMuch);


// 4 "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!" work!
// const convertString = function (str) {
//     return str.map((Name, i, arr) => i + 1 !== arr.length ? Name : `${Name}'s`).join(' and ');
// };
// console.log(convertString(ownersEatTooMuch) + ' dogs eat too much!');
// console.log(convertString(ownersEatTooLittle) + ' dogs eat too little!');
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs are eating too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs are eating too little`);


// 5 work!
console.log('Do some dogs eat exactly the amount of food that is recommended? ' +
    dogs.some(info => info.curFood === info.recommendedFood));

// 6 work!
// console.log('Do some dogs eat okay the amount of food that is recommended? ' +
//     dogs.some(info => info.curFood >= info.recommendedFood));
const checkEatOkay = info =>
    info.curFood >= info.recommendedFood * 1.1 && info.curFood >= info.recommendedFood * 0.9;
console.log('Do some dogs eat okay the amount of food that is recommended? ' +
    dogs.every(checkEatOkay));

// 7 work! 
// dogs.map(info => { info.curFood >= info.recommendedFood ? eatOkay.push(info) : '' });
// console.log(eatOkay);
const dogsEatingOkay = dogs.filter(checkEatOkay);
console.log(dogsEatingOkay);

// 8 work!
const dogsGroupedByPortion = Object.groupBy(dogs, info => {
    if (info.curFood > info.recommendedFood) return 'too-much';
    if (info.curFood < info.recommendedFood) return 'too-little';
    if (checkEatOkay) return 'exact';
});
console.log(dogsGroupedByPortion);


// 9 
const dogsGroupedByNumbers = Object.groupBy(dogs, info =>
    `${info.owners.length}-owners`);
console.log(dogsGroupedByNumbers);

// 10 ascending && descending = b-a
const dogsSorted = dogs.toSorted((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsSorted)