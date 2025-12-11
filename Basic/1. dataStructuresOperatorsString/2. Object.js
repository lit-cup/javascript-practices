const obj = {
    name: 'John',
    birthYear: 2000,
    city: 'New York',
    sayHello: function() {
        console.log('Hello, my name is ' + this.name);
    },
    calcAge: function(){
        // new properties for age
        this.age = 2025 - this.birthYear;
        return this.age;
    }
}

// Accessing properties
console.log(obj.name);  // John
console.log(obj.birthYear); // 2000
console.log(obj.city); // New York

// Adding new properties
// obj.newproperties = value;
obj.gender = 'Male';
console.log(obj.gender); // Male

// Calling methods
obj.sayHello(); // Hello, my name is John.

// Calling methods
//using funtion calc age to set age property
obj.calcAge(); // return this.age

//get age property by funciton building in object
console.log(`John's age is ${obj.age}`); // John's age is 25

