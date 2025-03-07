//object literal
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    age: 203,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven']
}

console.log(jonas);

//Get the property using object.property, property type object
console.log(jonas.firstName);
//Get the property using object['property'],property type string
console.log(jonas['firstName']);

//dot notation
console.log(jonas);

//bracket notation
jonas['twitter'] = '@jonasschmedtman';
console.log(jonas);

//computed properties
const nameKey = 'Name';
console.log(jonas['first'+nameKey]);






