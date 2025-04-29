# **JS OOP Basic:**

## Prototypes

```
Prototype <- Object
```

- **Method:** Prototypal inheritance/delegation

- **Prototype:** Contains methods
- **Object:** Can access methods

**Description:**
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

**1. Constructor functions**
- Technique to create objects from a function;
- This is how built-in objects like Arrays, Maps or Sets are actually implemented
  
**2. ES6 Classes**
- Modern alternative to constructor function syntax;
- "Syntactic suger": behind the scenes, ES6 classes work *exactly* like constructor functions;
- ES6 classes do *NOT* like classes in "classical OOP".

**3. Object.create()**
- The easiest and most straightForward way of linking an object to a prototype object

## Usage
[jsOOP](./jsOOP.js)

# How Prototypal Inheritance / Delegation works, base on jsOOP construct function

## 1.How Prototypal Inheritance work with function constructors and ES6 classes

- So we create a Constructor function call Person 

```
const Person = function (name, brith) {
    this.name = name;
    this.brith = brith;
}
```
- background => [Person()];
this time Person() has .prototype property

```
Person.prototype.calcAge = function () {
    console.log(2025 - this.brith);
}
```
- background =>Person.prototype = [Person.prototype]{ calcAge: function }; => Person.constructor

***
*Person.prototype is Not the prototype of Person, but object created through by Person*
***

It is like = Person => prototype have {calcAge: funciton}; not person
but we create a object from person it will through prototype then inhered the prototype function

# 2.Example about new Person();

```
const chen = new Person('Chen', 2000);

chen.calcAge();
```

## The new operator

- **An empty object is crated**
=> Object[chen]

- **this. from Person(name, brith) keywro call is set to the new object**
=> object[chen]{name: 'chen', birth: '2000'};

- **The new object is linked(__proto__ property) to the constructor function's prototype property ( here is [Person.prototype]{calcAge: funciton} )**
=> object[chen]{name: 'chen', birth: '2000', __proto__: Person.prototype};

*__proto__:* always points to an object's prototype

- **The new object is returned from the constructor function call**

*but how chen.calcAge(); work? It can't find in the object[chen], but because of prototypal inheritance/deleagtion we can get callbck function. so the chen object inherited the calcAge method then we could simplely use calcAge() form Person.prototype.calcAge() without calling Person*

**And whole pass is call prototype chain**
- look deep into prototype chain

**we have basic Constuctor function**
```
[Person()]
```

**it have .prototype**
```
[Person.prototype]{__proto__: Object.prototype}
```

**Then we have Object [chen]**
```
[Person.prototypes] <- [chen]{__proto__: Person.prototype}
```

**And how about the Object.prototype from Person.prototype come from**
basically because of there have Consturctor function call
```
[Object()]
```

**This Object also have prototype**
```
[Object.prototype]{__proto__: null};
```

**so to rewatching the all chain it beccomes**
```
                   null
                    |
[Object()] -> [Object.prototype]{__proto__: null};
                        |
[Person()] -> [Person.prototype]{__proto__: Object.prototype}
                                    |
           -> [chen]{__proto__: Person.prototype}
```
it's like chen inheritance all from object & person
so with a example we use chen.hasOwnProerty('name');
.hasOwnProerty() method is not in chen either person, it is from Object() method, they linked through prototypes to use
method like inheritance. 

```
chen.hasOwnProerty('name'); // true
```
