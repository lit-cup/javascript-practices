// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/


class CarCL {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed} km/h`);
    };
    brake() {
        this.speed -= 5; // Decrease the speed by 5
        console.log(`${this.make} going at ${this.speed} km/h`); // Log the current message
        return this; // Return the current instance for chaining
    };

    get speedUS() {
        return this.speed / 1.6;
    }

    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}
// 1 work!
class EVCL extends CarCL {
    // 2 work!
    #charge; // Private field for charge

    constructor(make, speed, charge) {
        super(make, speed); // Call the parent constructor with the current context (this)
        this.#charge = charge; // Set the charge property
    }

    chargeBattery(chargeTo) {
        this.#charge = chargeTo; // Set the charge property to the specified value
        return this; // Return the current instance for chaining
    }

    accelerate() {
        this.speed += 20; // Increase the speed by 20
        this.#charge -= 1; // Decrease the charge by 1%
        console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.#charge}%`); // Log the current message
        return this; // Return the current instance for chaining
    }
}

const rivian = new EVCL('Rivian', 120, 23); // Create a new instance of the EVCL class
console.log(rivian); // Log the instance to the console
// console.log(rivian.#charge);
// 3 work!
rivian
    .accelerate()
    .accelerate()
    .accelerate()
    .brake()
    .chargeBattery(90)
    .accelerate()
    .brake(); // Call the chargeBattery, accelerate, and brake methods in a chain

console.log(rivian.speedUS); // Log the speed in miles per hour