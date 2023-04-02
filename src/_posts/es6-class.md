---
title: Class - ES6
author: Wen Zhu
date: '2017-07-02'
summary: As we all know JavaScript is a prototype based language and unlike other object-oriented programming languages, it does not support classes and classical inheritance in ES5 and previous ECMAScript versions. class-like structure has been requested by many developers and now it is introduced in ES6.
tags: JavaScript
---

# Class in ES6

### Summary
As we all know Javascript is a prototype based language and unlike other object-oriented programming languages, it does not support classes and classical inheritance in ES5 and previous ECMAScript versions. class-like structure has been requested by many developers and now it is introduced in ES6. Many developers(including me) feel strongly that the language doesn't need classes, because essentially it is not a class-based language and adding classes will obscure the `prototype` principle behind Javascript, but `class` does lead to a much more concise syntax and organize the code in a more structured way. IMHO, even though we have the class syntax, we still need to understand that class structure in Javascript is only a syntax sugar and it is essential to understand the prototype principle behind the language.

### Syntax
##### class structure in ES5
Let's use an example to illustrate how we define a custom type:
```javascript
/** Constructor **/
function Square(length) {
    this.length = length;
}

// functions are usually defined in its prototype
Square.prototype.getArea = function() {
    return this.length * this.length;
}
```
In this example, we define a constructor in a normal function way and add a method `getArea` to its prototype. 

##### Class declaration
In ES6, a new keyword `class` is introduced, we can rewrite the above example like this:
```javascript
class Square {
    constructor(length) {
        this.length = length;
    }
    
    getArea() {
        return this.length * this.length;
    }
}
```
In this way, we get rid of the prototype on the surface and make the syntax cleaner, but again we need to keep in mind that this is only a syntax sugar and the methods are still defined in the prototype.

##### Why use the Class Syntax
We need to keep some important differences between ES5 and ES6 syntax in mind:
  - Class declarations, unlike function declarations, are not hoisted, just like `let` and `const`.
  - All code inside class declarations runs in strict mode automatically and there's no way to opt out of strict mode.
  - All methods defined inside class are nonenumerable while methods defined in function declarations are all numerable.
  - Attempting to overwrite a class name inside a method throws an error.
  - Calling a class constructor without `new` throws an error.
  - Class declaration will not be hoisted!!!

With those differences in mind, we can rewrite the ES6 class in ES5:
```javascript
let Square = (function() {
    'use strict';
    const Square = function(length) {
        if (typeof new.target === 'undefined') {
            throw new Error('Constructor must be called with new.');
        }
        this.length = length;
    }
    
    Object.defineProperty(Square.prototype, 'getArea', {
        value: function() {
            // make sure this function is not called with new
            if (typeof new.target !== 'undefined') {
                throw new Error('Method cannot be called with new');
            }
            return this.length * this.length;
        },
        enumerable: false,
        writable: true,
        configurable: true,
    });
    
    return Square;
}());
```
In this example, we use `let` in the outmost scope and `const` inside to declare `Square`, the reason behind this is because class name is not allowed to modify by class methods while could be modified outside the class. We also use the `Object.defineProperty` to define the `getArea()` method to make it nonenumerable. The final step returns the constructor.

##### Class Expression
Except from class declaration, we can also use class expression to define a class:
```javascript
const Square = class {
    constructor(length) {
        this.length = length;
    }
    
    getArea() {
        return this.length * this.length;
    }
}
```
And of course we can also use named class declaration:
```javascript
const Square = class Square2 {
    // rest of the code
}
```
##### Class as First-Class Citizens
What is `First-Class Citizens` in programming? If a value can be passed as a parameter in a function, returned from a function and assigned to a variable, then it is a First-Class Citizen. `Class` in ES6 is a first-class citizen just like functions. For example:
```javascript
function createObj(classDef) {
    return new classDef();
}

// pass class definition to a function
const squareObj = createObj(class {
    // class body
});

// return a class definition
function returnSquareClass() {
    return class {
        // class body
    };
}

// assign to a variable, class expression is an example
const Square = class {
    // class body
}
```

##### Accessor Properties & Computed Member Names
Just like functions, we can define accessor properties in class:
```javascript
let propertyName = \"parentNode\";
class CustomElement {
    constructor(element) {
        this.element = element;
    }
    
    get html() {
        return this.element.innerHTML;
    }
    
    set html(value) {
        this.element.innerHTML = value;
    }
    
    [propertyName]() {
        return this.element.parentNode;
    }
}
```
We use `get` and `set` to define a accessor property in CustomElement class definition as well as computed values enclosed by square brackets.

##### Static Members
We can use `static` before a method name to make it a `static` method in class. For static variables, we can use the similar way as ES5 syntax.
```javascript
class Square {
    // static method
    static create() {
        return new Square();
    }
}
// static variable
Square.name = 'SQUARE';
```

### Inheritance
##### Inheritance in ES5
Let's use an example to illustrate the expensive process to implement inheritance in ES5.
```javascript
function Rectangle(length, width) {
    this.length = length;
    this.width = width;
}

Rectangle.prototype.getArea = function() {
    return this.length * this.width;
}

function Square(length) {
    Rectangle.call(this, length, length);
    // we can define extra variables here
    this.name = 'SQUARE';
}

// let Square inherits all methods defined in Rectangle.prototype
Square.prototype = Object.create(Rectangle.prototype);

// Set Square.prototype.constructor points to Square constructor, otherwise it will point to Rectangle which is problematic.
Square.prototype.constructor = Square;

// Optionally, we can define extra methods in Square.prototype
Square.prototype.getName = function() {
    return this.name;
}
```
##### Inheritance in ES6
In ES6, we can use keyword `extends` to make the process much easier and here is the equivalent of the preceding example.
```javascript
class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
    
    getArea() {
        return this.length * this.width;
    }
    // static method
    static create(length, width) {
        return new Rectangle(length, width);
    }
}

Rectangle.staticProp = \"Rectangle\";

class Square extends Rectangle {
    constructor(length) {
        super(length, length);
        this.name = \"SQUARE\";
    }
    // overwrite super class method
    getArea() {
        // some strange definition to get area
    }
    
    // extra methods defined in subcalss
    getName() {
        return this.name;
    }
}

const squareObj = new Square(5);
console.log(squareObj.getArea());  // 25
console.log(squareObj.getName());  // SQUARE

const rect = Square.create(3, 4);
console.log(rect.strangeProp);  // Rectangle
```
In ES6 syntax, we use `extends` to explicitly inherits from `Rectangle` and calling `super()` in the constructor to invoke parent class constructor. There's one thing we need to bear in mind that if we specify the constructor in derived class, `super()` is required inside the constructor.
In terms of the static members in super class, they are all available to subclasses, but we probably want to overwrite them if we want to have subclass specific properties.

