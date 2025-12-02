// Parent class: Person
// Child class: Student
// inheritance by: extends
class Student extends Person {

    // Public fields: available on created object
    university = "XYZ University"; // Default value for all instances

    // Private fields: available only inside the class
    #studyhour = 0; // Private property to store student ID
    #course; // Private property to store grade

    // Static Public fields: available on the class itself
    static numSubjects = 10; // Static property

    constructor(name, age, startDate, course) {
        // Call the parent constructor with super() to initialize inherited properties
        super(name, age);
        // instance properties
        this.startDate = startDate; // Public property
        // Redefining the private property
        this.#course = course;
    }
    // Public method: available on created object
    introduce() {
        console.log(`Hello, my name is ${this.name}, I am ${this.age} years old, and I study at ${this.university}. My student ID is ${this.#course}.`);
    }

    study(h) {
        // Reference to the private method and field 
        this.#makeSnack();
        this.#studyhour += h;
    }
    // Private method: only available inside the class could use _ to instead of # to define private method
    #makeSnack() {
        console.log("Making a snack...");
    }

    // getter method
    get testScore() {
        return this._testScore;
    }
    // setter method use _ to set property with same name as method, and also add getter
    set testScore(score) {
        this._testScore = score <= 20 ? score : 20; // Set a maximum score of 20
    }
    // Static method: available on the class itself
    static printCurriculum() {
        console.log(`The curriculum consists of ${this.numSubjects} subjects.`);
    }
};

// Create new object with new operator
const chen = new Student("Chen", 25, "2019-06-31", "Computer Science");


// Classes are just "syntacic sugar" over constructor functions
// Classes are not hoisted, so we need to declare them before using them
// Classes are first-class citizens, so we can pass them as arguments to functions, return them from functions, and assign them to variables
// Classes body is always in strict mode, so we don't need to use "use strict" at the top of the class body