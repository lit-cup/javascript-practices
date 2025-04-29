
// class expression 
// const Person = class { }

//class declaration Not recommded
/**
 * class className{
 *  constructor(){} // constructor function
 *  methodName(){} // instance method
 *  static methodName(){} // static method is only available on the class itself, not on the instance
 *  get propertyName(){} // getter method
 *  set propertyName(value){} // setter method
 * }
 */
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
const john = new PersonCL('John', 1990);
console.log(john); // PersonCL { name: 'John', birth: 1990 }
john.calcAge(); // 35

console.log(john.__proto__ === PersonCL.prototype); // true

PersonCL.prototype.greet = function () {
    console.log(`Hey ${this.name}`);
}
john.greet(); // Hey John


// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

// getters and setters

const chen = new PersonCL('Chen', 1995);
console.log(chen.age); // 30
chen.fullName = 'yi ting chen'; // set fullName
console.log(chen.fullName); // yi ting chen
console.log(chen); // PersonCL { name: 'Chen', birth: 1995, _name: 'yi ting chen' }


const account = {
    owner: 'John',
    movements: [200, 450, -400, 3000, -650, -130],

    get latest() {
        return this.movements.slice(-1).pop();
    },
    set latest(mov) {
        this.movements.push(mov);
    },
}

console.log(account.latest); // -130
account.latest = 500; // add 500 to movements array
console.log(account.latest); // 500
console.log(account.movements); // [ 200, 450, -400, 3000, -650, -130, 500 ]

// static method
PersonCL.hey(); // Hey there! 👋 and hey is not available in chen class is because hey() is PersonCL property
// chen.hey(); // TypeError: chen.hey is not a function



// Object.create
/**
 * const className = {
 *   methodName(){}, // instance method
 *   init(index1, index2...){} // constructor function
 * }
 * const instance = Object.create(className); // create a new object with className as prototype
 * instance.propertyName = value; // add properties to instance object
 * instance.methodName(); // call method from className
 */
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
steven.name = 'Steven';
steven.birth = 2002; // add properties to steven object
steven.calcAge(); // 23
console.log(steven.__proto__); // PersonProto { calcAge: [Function: calcAge] }
console.log(steven.__proto__ === PersonProto); // true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1990); // add properties to sarah object
sarah.calcAge(); // 35
console.log(sarah.__proto__); // PersonProto { calcAge: [Function: calcAge] }