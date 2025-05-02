// Inheritance between classes in JavaScript using constructor functions and prototypes
// example of Person and Student classes, where Student inherits from Person to make prototype chain and fix point error

const Person = function (name, age) {
    this.name = name;
    this.age = age;
};

Person.prototype.greet = function () {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
};

const Student = function (name, age, studentId) {
    // this.name = name;
    // this.age = age;
    Person.call(this, name, age); // Call the Person constructor with the current context (this
    this.studentId = studentId;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype); // Set the prototype of Student to be an instance of Person

// we don't use this line because we will not end up with a prototype chain that we need
// this line show that Person and student get the exact same object
// Student.prototype = Person.prototype;

// (like line 17) what we want is the person's prototype object to be the prototype of student dot prototype


Student.prototype.introduce = function () {
    console.log(`Hello, my name is ${this.name}, I am ${this.age} years old, and my student ID is ${this.studentId}.`)
};


const chen = new Student('Chen', 25, 'S12345');
chen.introduce(); // Hello, my name is Chen, I am 20 years old, and my student ID is S12345.
chen.greet(); // Hello, my name is Chen and I am 20 years old.

console.log(chen.__proto__); // Student { introduce: [Function] }
console.log(chen.__proto__.__proto__); // Person { greet: [Function] }
console.log(chen.__proto__.__proto__.__proto__); // Object { constructor: [Function: Object], __defineGetter__: [Function], __defineSetter__: [Function], hasOwnProperty: [Function], __lookupGetter__: [Function], ... }

// Check the prototype chain
console.log(chen instanceof Student); // true
console.log(chen instanceof Person); // true
console.log(chen instanceof Object); // true

// to fix the constructor property of Student's prototype to point to Student itself from person
Student.prototype.constructor = Student; // Set the constructor property of Student's prototype to point to Student itself
console.dir(Student.prototype.constructor); // [Function: Student]