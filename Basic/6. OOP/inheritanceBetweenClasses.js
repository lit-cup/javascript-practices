'use strict';
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

///////////////////////////////////////////////////////////////////////////////////////
// ES6 inheritance example

class PersonCL {
    constructor(name, birth) {
        this.name = name;
        this.birth = birth;
    }
    // Instance methods
    // Methods will be added to .prototype property
    calcAge() {
        console.log(2025 - this.birth);
    }
    // it is same as line 27
    greet() {
        console.log(`Hey ${this.name}`);
    }

    get age() {
        return 2025 - this.birth;
    }
    // set property that already exists
    set fullName(name) {
        console.log(name)
        // _name is for same name as name
        if (name.includes(' ')) this._name = name;
        else console.log('Not a full name!');
    }
    get fullName() {
        return this._name;
    }
    // Static method only available on the class itself, not on the instance
    static hey() {
        console.log('Hey there! 👋');
        console.log(this);
    }
}
// Student class have a method that share all the properities with the parent class
// and make prototype chain by extending the parent class
class StudentCL extends PersonCL {
    constructor(name, birth, studentId) {
        // Always needs to happen first in the constructor
        super(name, birth); // Call the parent class constructor    
        this.studentId = studentId;
    };
    introduce() {
        console.log(`Hello, my name is ${this.name}, I am ${this.age} years old, and my student ID is ${this.studentId}.`)
    }
    // overriding the calcAge method from the parent class
    calcAge() {
        console.log(`I'm ${2025 - this.birth} years old, but as a student, I am feel like ${this.age + 10} years old.`);
    }
};
const chenYI = new StudentCL('Chen', 2000, 'S12345');
console.log(chenYI); // PersonCL { name: 'Chen', birth: 2000, studentId: 'S12345' }
chenYI.introduce(); // Hello, my name is Chen, I am 25 years old, and my student ID is S12345.
chenYI.calcAge(); // I'm 25 years old, but as a student, I am feel like 35 years old.

// And if we using
// class StudentCL extends PersonCL { };

// const chenYI = new StudentCL('Chen', 25);
// we still get the same result from student parent class PersonCl

// so we don't need to write same future methods in both classes


///////////////////////////////////////////////////////////////////////////////////////
// Object.create() inheritance example basic linking object

const PersonProto = {
    calcAge() {
        console.log(2025 - this.birth);
    },
    init(name, birth) {
        this.name = name;
        this.birth = birth;
    }
};

const steven = Object.create(PersonProto); // create a new object with PersonProto as prototype

// linking the prototype chain PersonProto -> StudentProto -> jay
const StudentProto = Object.create(PersonProto); // create a new object with PersonProto as prototype

// overwrite the init method of StudentProto to call the init method of PersonProto
StudentProto.init = function (name, birth, studentId) {
    PersonProto.init.call(this, name, birth); // Call the init method of PersonProto
    this.studentId = studentId;
}

StudentProto.introduce = function () {
    console.log(`Hello, my name is ${this.name}, I am ${2025 - this.birth} years old, and my student ID is ${this.studentId}.`)
}

const jay = Object.create(StudentProto); // create a new object with StudentProto as prototype
jay.init('Jay', 2000, 'S12345'); // add properties to jay object
jay.introduce(); // Hello, my name is Jay, I am 25 years old, and my student ID is S12345.
jay.calcAge(); // 25