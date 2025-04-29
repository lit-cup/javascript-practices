# **JS OOP Basic:**

## Prototypes

```
Prototype <- Object
```

**Method:** Prototypal inheritance/delegation

**Prototype:** Contains methods
**Object:** Can access methods

**Description::**
- Objects are *linked* to a prototype object;
- Prototypal inheritance: The prototype contains methods(behavior) that are *accessible to all objects linked to that prototype*
- Behavior is *delegated* to the linked prototype/object

## Example: Array

```
const num = [1,2,3];
num.map(v=>v*2);
```

Array.prototype is the prototype of all array objects we create in JavaScript
ThereFore, all arrays have access to the map method!

# JS OOP 3 ways of Implementing Prototypal inheritance in JavaScript

## - 1. Constructor functions
- Technique to create objects from a function;
- This is how built-in objects like Arrays, Maps or Sets are actually implemented
  
## - 2. ES6 Classes
- Modern alternative to constructor function syntax;
- "Syntactic suger": behind the scenes, ES6 classes work *exactly* like constructor functions;
- ES6 classes do *NOT* like classes in "classical OOP".

## - 3. Object.create()
- The easiest and most straightForward way of linking an object to a prototype object

# how to implementing Abstraction/Encapsulation/Inheritance/Polymorphism
[jsOOP](./jsOOP.js)