const obj = {
    name: 'John',
    birthYear: 2000,
    city: 'New York',
    sayHello: function() {
        console.log('Hello, my name is ' + this.name);
    },
    calcAge: function(){
        this.age = 2025 - this.birthYear;
        return this.age;
    }
}

// Accessing properties
console.log(obj.name);
console.log(obj.birthYear);
console.log(obj.city);

// Adding new properties
obj.gender = 'Male';
console.log(obj);

// Calling methods
obj.sayHello();
// Calling methods
obj.calcAge(); //using funtion calc age to set age property
console.log(`John's age is ${obj.age}`); //get age property by funciton building in object

