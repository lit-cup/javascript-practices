const ben = {
    firstName: 'ben',
    lastName: 'Williams',
    age: 24,
};

//use same references object varible
const marriedben = ben;
marriedben.lastName = 'cool';

// this not allow
//ben = {x:23};

//use same references object varible
function marryPerson(person, newLastName){
    person.lastName = newLastName;
    return person;
}

const marriedben = marryPerson(ben, 'Eva');

/////////////////////////////////////////////////

const ben2 = {
    firstName: 'ben',
    lastName: 'Williams',
    age: 24,
    familiy: ['John', 'Bob'],
};

//Shallow copy
//use this will just change copy object varible
const ben2copy = {...ben2}; //this copy object
ben2copy.lastName = 'Eva';
//So when push the both will change because familiy is a object in the new heap
//So push will into the new familiy heap
//can let copy object change same and diff result but object will change same.
ben2.familiy.push('Mary');
ben2.familiy.push('Alice');

//Deep copy/clone
//Too soulation the shadow copy problem use structuredClone() drive deep than object can change also
const benClone = structuredClone(ben2);
benClone.familiy.push('Mary');
benClone.familiy.push('Eve');

