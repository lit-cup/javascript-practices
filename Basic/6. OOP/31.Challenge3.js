/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. 
Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, 
    and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). 
    Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/


/**
 * The steps:
 * create a constructor function for the car class
 * create a constructor function for the electric car class (EV) that inherits from the car class by call()
 * link the prototypes of the two classes using Object.create()
 * implement the methods for the car class (accelerate and brake)
 * implement the methods for the electric car class (chargeBattery and overwriting accelerate)
 * create an instance of the electric car class and test the methods
 * should be notice linking the prototypes and the constructor property and how polymorphism works
 */

// 1 work!
const car = function (make, speed) {
    this.make = make;
    this.speed = speed;
};


const EV = function (make, speed, charge) {
    car.call(this, make, speed); // Call the car constructor with the current context (this)
    this.charge = charge; // Set the charge property
};

// ***Linking prototypes
EV.prototype = Object.create(car.prototype);


car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

car.prototype.brake = function () {
    this.speed -= 5; // Decrease the speed by 5
    console.log(`${this.make} going at ${this.speed} km/h`); // Log the current message
};

// 2 work!
EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo; // Set the charge property to the specified value
};

// 3 work!
EV.prototype.accelerate = function () {
    this.speed += 20; // Increase the speed by 20
    this.charge -= 1; // Decrease the charge by 1%
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`); // Log the current message
};

// 4 work!
const tesla = new EV('Tesla', 120, 23); // Create a new electric car object

console.log(tesla); // Log the electric car object
tesla.chargeBattery(90); // Call the chargeBattery method to set the charge to 90%
tesla.accelerate(); // Call the accelerate method to increase the speed and decrease the charge
tesla.brake(); // Call the brake method to decrease the speed

