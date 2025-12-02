// Challenge #4

/*
 * This time, Julia and Kate are studying the activity levels of different dog breeds
    
    Task:
    1. Stroe the average weight of "Husky" in a variable "huskyWeight"
    2. Find the name of the only breed that like both "running" and "fetch" ("dogBothActivities" variable)
    3. Create an array "allActivities" of all the activities of all the dog breeds
    4. Create an array "uniqueActivities" that contains only the unique activities
       (no activity repetitions). HINT: Use a technique with a special data structure 
       that we studied a few sections ago.
    5. Many dog breed like to swim. What other activities do these dogs like? Stroe
       all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent"
    6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
    7. Are there any breeds that are "active"? "Active" means that the dog ahs 3 or more activities.
       Log to the conosle whether "true" or "false".
    
    BONUS: What's the average weight of the heaviest breed that likes to fetch?
    HINT: Use the "Math.max" method along with the ... operator.

    TEST DATA:

    const breeds = [
        {
            breed: 'German Shepherd',
            averageWeight: 23,
            activities: ['fetch', 'swimming'],
        },
                {
            breed: 'Dalmation',
            averageWeight: 24,
            activities: ['running', 'fetch', 'agility'],
        },
                {
            breed: 'Labrador',
            averageWeight: 28,
            activities: ['swimming', 'fetch'],
        },
                {
            breed: 'Beagle',
            averageWeight: 12,
            activities: ['digging', 'fetch'],
        },
        {
            breed: 'Husky',
            averageWeight: 26,
            activities: ['running', 'agility', 'swimming'],
        },
        {
            breed: 'Bulldog',
            averageWeight: 36,
            activities: ['sleeping'],
        },
        {
            breed: 'Poodle',
            averageWeight: 18,
            activities: ['agility', 'fetch'],
        },
    
    ]
*/
const breeds = [
    {
        breed: 'German Shepherd',
        averageWeight: 23,
        activities: ['fetch', 'swimming'],
    },
    {
        breed: 'Dalmation',
        averageWeight: 24,
        activities: ['running', 'fetch', 'agility'],
    },
    {
        breed: 'Labrador',
        averageWeight: 28,
        activities: ['swimming', 'fetch'],
    },
    {
        breed: 'Beagle',
        averageWeight: 12,
        activities: ['digging', 'fetch'],
    },
    {
        breed: 'Husky',
        averageWeight: 26,
        activities: ['running', 'agility', 'swimming'],
    },
    {
        breed: 'Bulldog',
        averageWeight: 36,
        activities: ['sleeping'],
    },
    {
        breed: 'Poodle',
        averageWeight: 18,
        activities: ['agility', 'fetch'],
    }
]
// 1 work!
const huskyWeight = breeds
    .find(info => info.breed === 'Husky')
    .averageWeight;
console.log('husky weight is ' + huskyWeight);

// 2 work! 
// find the activitites include running and fetch and select the breed
const dogBothActivities = breeds
    .find((info) => info.activities.includes('fetch') && info.activities.includes('running')).breed;
console.log(`${dogBothActivities} have Activities both running and fetch`);


// 3 work
// const allActivities = breeds.map(info => info.activities).flat();
// console.log('All Activites: ' + allActivities);
const allActivities = breeds.flatMap(info => info.activities);
console.log('All Activites: ' + allActivities);

// 4 work!
const uniqueActivities = [...new Set(allActivities)];
console.log('Uniqu Activities: ' + uniqueActivities);

// 5 work!
const swimmingAdjacent = [...new Set(breeds
    .filter(info => info.activities.includes('swimming'))
    .flatMap(info => info.activities)
    .filter(info => info !== 'swimming'))]
console.log(swimmingAdjacent);


// 6 work!
// breeds.map(info => {
//     info.limit = info.averageWeight >= 10 ? 'true' : 'false';
//     console.log(`${info.breed}\nhave average Weight of 10 kg or more ${info.limit}`);
// });
console.log('if every average Weight have average Weight of 10 kg or more: ' +
    breeds.every(info => info.averageWeight >= 10));


// 7 work!
// breeds.map(info => {
//     info.active = info.activities.length >= 3 ? 'true' : 'false';
//     if (info.active)
//         console.log(info.breed + 'breed is ' + info.active + ' Active');
// })
console.log('if some breed Active have 3 or more: ' +
    breeds.some(info => info.averageWeight >= 3));

// BONUS work!
const heaviestFetch = breeds
    .filter(info => info.activities.includes('fetch'))
    .map(info => info.averageWeight)
console.log(Math.max(...heaviestFetch));