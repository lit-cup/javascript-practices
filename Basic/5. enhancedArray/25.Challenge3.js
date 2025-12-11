// Coding Challenge #3 arrow function chaining pracitices

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, 
and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const dogsAge1 = [5, 2, 4, 1, 15, 8, 3];
const dogsAge2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAgeChain =
    dogsAges => dogsAges
        .map(dogsAge => dogsAge <= 2 ? 2 * dogsAge : 16 + dogsAge * 4)
        .filter(dogsAge => dogsAge >= 18)
        .reduce((per, curr, i, arr) => per + curr / arr.length, 0);

console.log('==========Chain TEST DATA 1==========');
console.log('Average:', calcAverageHumanAgeChain(dogsAge1)); //4 work!\

console.log('==========Chain TEST DATA 2==========');
console.log('Average:', calcAverageHumanAgeChain(dogsAge2));