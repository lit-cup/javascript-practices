//object literal
const jonas = {
    firstName: 'Jonas',
    lastName: 'Schmedtmann',
    age: 203,
    job: 'teacher',
    friends: ['Michael', 'Peter', 'Steven']
}


console.log(jonas);
// output:
// {
//     firstName: 'Jonas',
//     lastName: 'Schmedtmann',
//     age: 203,
//     job: 'teacher',
//     friends: ['Michael', 'Peter', 'Steven']
// }


//Get the property using object.property
console.log(jonas.firstName);
// output:
// Jonas


//Get the property using object['property']
console.log(jonas['firstName']);
// output:
// Jonas

//dot notation
// format: Object.key
// exmpale: jonas.firstName


//bracket notation
// format: Object[key]
// add new elemet to object
jonas['twitter'] = '@jonasschmedtman';
console.log(jonas);
// output:
// {
//     firstName: 'Jonas',
//     lastName: 'Schmedtmann',
//     age: 203,
//     job: 'teacher',
//     friends: ['Michael', 'Peter', 'Steven'],
//     twitter: '@jonasschmedtman'
// }


//dynamic properties with bracket notation
// use varible to control the same property
const nameKey = 'Name';
console.log(jonas['first'+nameKey]);
// output:  because this equal jonas['firstName']
// Jonas 





