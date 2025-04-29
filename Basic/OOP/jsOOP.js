'use strict';


// Example of a constructor function for OOP
const Person = function (name, brith) {
    // console.log(this); // Person {}

    // Instance properties
    this.name = name;
    this.brith = brith;
    // Never to this should be used like line 38
    // this.calcAge = function () {
    //     console.log(2025 - this.brith);
    // };

}

const john = new Person('John', 1990);
console.log(john);  // Person { name: 'John', brith: 1990 }

// LOGIC
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

// Person is like a blueprint for creating objects
// we could make house for example, and we could make many houses with the same blueprint
const chen = new Person('Chen', 1995);
console.log(chen);  // Person { name: 'Chen', brith: 1995 }
const jane = new Person('Jane', 1992);
console.log(jane);  // Person { name: 'Jane', brith: 1992 }

console.log(chen instanceof Person); // true for using any constructor function


// Prototypes
console.log(Person.prototype); // Person { constructor: [Function: Person] }

// A way we don't have to create a new function for each instance of the object
Person.prototype.calcAge = function () {
    console.log(2025 - this.brith);
}

john.calcAge(); // 35
chen.calcAge(); // 30

console.log(john.__proto__); // Person { constructor: [Function: Person], calcAge: [Function] }
console.log(john.__proto__ === Person.prototype); // true

console.log(Person.prototype.isPrototypeOf(john)); // true
console.log(Person.prototype.isPrototypeOf(chen)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// .prototypeOfLinkedObjects

// Prototypes logical
Person.prototype.species = 'Human'; // adding a property to the prototype
console.log(john.species); // Human inherited from Person.prototype

console.log(chen.hasOwnProperty('name')); // true
console.log(chen.hasOwnProperty('species')); // false because species is on the prototype not chen object prototype