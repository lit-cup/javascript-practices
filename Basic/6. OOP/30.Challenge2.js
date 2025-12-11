// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// 1. work!
class Car {

    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }
    // 2. work!
    get speedUS() {
        return this.speed / 1.6;
    }
    // 3. work!
    set speedUS(speed) {
        this.speed = speed * 1.6;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed} km/h`);
    }
    brake() {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/h`);
    }
};

// 4. work!
const ford = new Car('Ford', 120);
console.log(ford.speedUS); // get speed 75 mi/h
ford.accelerate(); // Ford is going at 130 km/h
ford.brake(); // Ford is going at 125 km/h
ford.speedUS = 100; // set speed in mi/h
console.log(ford.speedUS); // get speed 100 mi/h
console.log(ford); // Car { make: 'Ford', speed: 160 }