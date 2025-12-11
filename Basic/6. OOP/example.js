// set default values for the class properties if we want
// create public interface for the class with better encapsulation

class Account {
    constructor(name, balance, pin) {
        this.name = name;
        this.balance = balance;
        this.pin = pin;

        //set default values
        this.movements = [];
        this.local = navigator.language;

        console.log(`Account created for ${this.name}`);
    }
    // the public interface of the class
    deposit(value) {
        this.movements.push(value);
        this.balance += value;
        console.log(`Deposited ${value} to ${this.name}'s account`);
    }
    withdraw(value) {
        this.movements.push(-value);
        this.balance -= value;
        console.log(`Withdrew ${value} from ${this.name}'s account`);
    }

    approveLoan(value) {
        return true; // for simplicity, we approve all loans
    }
    requestLoan(value) {
        if (this.approveLoan(value)) {
            this.deposit(value);
            console.log(`Loan of ${value} approved for ${this.name}`);
        }
    }
}
const acc1 = new Account("John Doe", 1000, 1234);

// although we could use push() to add movements to the array
// acc1.movements.push(100, -50, 200, -100);
// but the better way is to create a method in class to handle add movements

acc1.deposit(100);
acc1.withdraw(50);
// the reason we should use Encapsulation
// approveLoan method is public and can be called from outside the class, it should only call by the requestLoan method
acc1.requestLoan(500); // this will not allow to call approveLoan method directly so we need to encapsulate it in requestLoan method
acc1.approveLoan(1000); // this will be called from requestLoan method

console.log(acc1); // Account { name: 'John Doe', balance: 1050, pin: 1234, movements: [ 100, -50 ], local: 'en-US' }

console.log(acc1);
console.log(acc1.pin);