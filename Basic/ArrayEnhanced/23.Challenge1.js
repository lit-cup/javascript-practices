///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). 
For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, 
    and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const JuliaData = [9, 16, 6, 8, 3]; // JuliaData[0], JuliaData[3], JuliaData[4] = cat so we need to selected index 1 ,2 element
const KateData = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {

    // const newDogsJulia = dogsJulia.slice(1, 3);  // 1 work!
    const newDogsJulia = dogsJulia.slice();
    newDogsJulia.splice(0, 1);
    newDogsJulia.splice(-2);

    // const allData = newDogsJulia.concat(dogsKate);
    const allData = [...newDogsJulia, ...dogsKate]; // 2 work!

    // 3 work!
    allData.forEach(function (ages, i) {
        const growthType = ages >= 3 ? 'adult' : 'puppy'
        console.log(`Dog number ${i + 1} is an ${growthType}, and is ${ages} years old`)
    });
}
// 4 work!
checkDogs(JuliaData, KateData)