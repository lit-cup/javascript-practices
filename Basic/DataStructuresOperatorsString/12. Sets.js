// Sets
const weatherSet = new Set([
    'Cloud',
    'Cold',
    'Hot',
    'Rainy',
    'Sunny',
])
console.log(weatherSet);

//slipt vocabuary
console.log(new Set('Shou')); // 'S' 'h' 'o' 'u'

//size check length
console.log(weatherSet.size);  // 5

//has() check if exsit
console.log(weatherSet.has('Cloud')); // true

// add() once time
weatherSet.add('Bad-weather'); // 'Cloud','Cold','Hot','Rainy','Sunny','Bad-weather'
weatherSet.add('Bad-weather'); // 'Cloud','Cold','Hot','Rainy','Sunny','Bad-weather'

weatherSet.delete('Bad-weather')// 'Cloud','Cold','Hot','Rainy','Sunny'
// clear all set
// weatherSet.clear();

for(const weather of weatherSet) console.log(weather); //list all sets

// Example
const city = ['Chiayi', 'Taipei', 'Yunlin', 'Zhou', 'Tokyo', 'Chen'];
// put new array
const cityUnique = [...new Set(city)];
console.log(cityUnique);

// Count value
console.log(
    new Set(['Chiayi', 'Taipei', 'Yunlin', 'Zhou', 'Tokyo', 'Chen']).size // 6
);

// Count length diffrent
console.log(new Set('iiiiiaiii').size); // 2


// New Operations to Make Sets Useful
// Example

const italianFoods = new Set([
    'pasta',
    'gnocchi',
    'tomatoes',
    'olive oil',
    'garlic',
    'basil',
]);

const mexicanFoods = new Set([
    'tortillas',
    'beans',
    'rice',
    'tomatoes',
    'avocado',
    'garlic',
]);
// intersection() to find same value
const commonFoods = italianFoods.intersection(mexicanFoods); // Set(2) {'tomatoes', 'garlic'}
console.log('Intersection: ', commonFoods);
// set to array
console.log([...commonFoods]); // ['tomatoes', 'garlic']

// union() to combine two arrays (italian、Mexican)
const italianMexicanFusion = italianFoods.union(mexicanFoods);
console.log('Union:', italianMexicanFusion);

// alert way
console.log([...new Set([...italianFoods, ...mexicanFoods])]);

// difference();
const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
console.log('Difference with italian food', uniqueItalianFoods);

const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);
console.log('Difference mexican', uniqueMexicanFoods);

// symmetricDifference()
const uniqueItalianAndMexicanFoods = italianFoods.symmetricDifference(mexicanFoods);
console.log(uniqueItalianAndMexicanFoods);

// isDisjointFrom() check whether these sets are completely different
console.log(italianFoods.isDisjointFrom(mexicanFoods));