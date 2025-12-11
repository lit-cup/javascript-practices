// Coding Challenge 2 (map/filter/reduce)

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const dogsAge1 = [5, 2, 4, 1, 15, 8, 3];
const dogsAge2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (dogsAges) {
    /*  Simple way writing
        let dogsHumanAge = [];
        for-Each way
        dogsAges.forEach(dogsAge => {
            const humanAge = dogsAge <= 2 ? 2 * dogsAge : 16 + dogsAge * 4; // 1 work!
            if (humanAge >= 18) {       // 2 work!
                dogsHumanAge.push(Math.abs(humanAge));
            }
        });
        console.log('Total of dog\'\s HumanAge:', dogsHumanAge.reduce((perValue, currValue) => (perValue + currValue)));
        console.log('Arry length:', dogsHumanAge.length);
        return dogsHumanAge.reduce((perValue, currValue) => (perValue + currValue)) / dogsHumanAge.length; // 3 work!
    */

    // Map/Filter/Reduce way
    const humanAge = dogsAges.map(dogsAge => dogsAge <= 2 ? 2 * dogsAge : 16 + dogsAge * 4); // 1 work!
    const adult = humanAge.filter(dogsAge => dogsAge >= 18); // 2 work!
    const average = adult.reduce((per, curr) => (per + curr), 0) / adult.length;  // 3 work!
    console.log(`Dog's HumanAge: ${humanAge}\nAdult's Age: ${adult}\nTotal: ${average}`);
    return average;

}
console.log('==========TEST DATA 1==========');
console.log('Average:', calcAverageHumanAge(dogsAge1)); //4 work!\

console.log('==========TEST DATA 2==========');
console.log('Average:', calcAverageHumanAge(dogsAge2));