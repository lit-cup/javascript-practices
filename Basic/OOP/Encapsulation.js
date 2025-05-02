// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// 5) Static methods of 4

// using # to define private fields and methods

class Account {

    //1 public fields (instance properties)
    local = navigator.language; // default value for the class property
    bank = 'Bank of America'; // default value for the class property

    //2 private fields (instance properties) we don't want to expose to the outside calling 
    #movements = []; // private property
    #pin; // private property

    constructor(name, balance, pin) {
        this.name = name;
        this.balance = balance;
        this.#pin = pin;

        // set default values
        // this.movements = [];
        // this.local = navigator.language;

        console.log(`Account created for ${this.name}`);
    }
    //3 the public interface(API)
    getMovements() {
        return this.#movements; // we can access private properties inside the class
    }

    deposit(value) {
        this.#movements.push(value);
        this.balance += value;
        console.log(`Deposited ${value} to ${this.name}'s account`);
        return this; // return the instance of the class to allow chaining
    }
    withdraw(value) {
        this.#movements.push(-value);
        this.balance -= value;
        console.log(`Withdrew ${value} from ${this.name}'s account`);
        return this; // return the instance of the class to allow chaining
    }

    //4 private method same as static method
    #approveLoan(value) {
        // Fake method
        return true; // for simplicity, we approve all loans
    }
    requestLoan(value) {
        if (this.#approveLoan(value)) {
            this.deposit(value);
            console.log(`Loan of ${value} approved for ${this.name}`);
        }
        return this; // return the instance of the class to allow chaining
    }
}

const acc1 = new Account("John Doe", 1000, 1234);
acc1.deposit(100);
acc1.withdraw(50);
acc1.movements = []; // as we change the movements to #movements, we can't access it from outside the class
acc1.approveLoan(500); // this will not allow to call approveLoan method directly so we need to encapsulate it in requestLoan method
acc1.getMovements(); // this will return the movements array


//To using Chaining methods is simple just return the instance of the class in each method
const movements = acc1
    .deposit(100)
    .withdraw(50)
    .requestLoan(500)
    .withdraw(40)
    .getMovements() // this will return the movements array; to make chaining possible, we need to return the instance of the class in each method

console.log(movements); // [ 100, -50, 500, -40 ]