---
title: Block Binding - ES6
author: Wen Zhu
date: '2017-05-24'
summary: One of the major Javascript feature or distinction from other C-based programming language is that there's no block level scope in Javascript. Things changed in ES6.
tags: JavaScript
---

### Summary
One of the major Javascript feature or distinction from other C-based programming language is that there's no block level scope in Javascript. Things changed in ES6.

### Problems in ES5
`var` is the only keyword used to declare a variable or function in Javascript before. When we declare a variable or function, the initialization of them be *moved* to the top of the current scoping or global environment, this is called `hoisting`. Let's take a look at an example.
```javascript
 function func(a) {
    console.log(b); // undefined
    var b = a;
    console.log(b); // a
 }
```
In most of other languages, first `console.log(b)` will throw a ReferenceError, but this is acceptable in Javascript because of hoisting. This function is equavalent to the following.
```javascript
 function func(a) {
    var b;
    console.log(b); // undefined
    b = a;
    console.log(b); // a
 }
```
This will explain why first console.log won't throw an error. `hoisting` in Javascript makes block level scoping become impossible. See following example.
```javascript
 function func(condition) {
   if (condition) {
     var value = 1;
     console.log(value); // 1 if condition=true
     function func1() {}
   } else {
     console.log(value); // expecting an error here if condition=false
   }
 }
```
Another famous example can clearly indicate the confusion that lack of block level scope introduces.
```javascript
 for(var i=0; i<10; i++) {
   // do something
 }
 console.log(i); // 10
```
Variables i defined inside the for-loop could still be accessible outside the for-loop.
If `var` is not used when declaring a variable, the variable will be added to the global environment, see example.
```javascript
function add(num1, num2) {
    sum = num1 + num2;
    return sum;
}
console.log(add(10, 20)); // 30
console.log(sum); // 30
console.log(window.sum === sum); // true
```
In this example, `sum` is not initialized with `var`, so it is added to the global enviroment.
To sum up, lack of block level scope introduces a lot of confusion and could easily lead to a lot of bugs if they are not well taken care of.

### Solutions in ES6
`let` and `const` are introduced to replace `var` in ES6. Although `var` is still supported in ES6, but it is highly recommeded to use `let` and `const` instead.
Both `let` and `const` are block level declaration which means the variables won't be accessible outside of the block level. Block level are created in two places:
- inside a function
- inside a curly braces ({})

##### let
`let` is used to declare a variable whose value might be changed later on and it has almost the same syntax as `var`, the only difference is that the variables declared with `let` will only be accessible in the block. See an example below.
```javascript
function func(condition) {
    console.log(value); // Throw a reference error
    if (condition) {
        console.log(value); // Throw a reference error
        let value = 1;
        console.log(value); // 1
        // do something
    } else {
        // do something else
        console.log(value); // throw a reference error
    }
    console.log(value); // throw a reference error
}
```
From this example, we can clearly see that the variable declared by `let` will only be accessible after the initialization inside that scope.
`let` also solves the problem in the for-loop.
```javascript
for(let i=0; i<10; i++) {
    // do something here
}
console.log(i); // throw a reference error
```

##### TDZ
Variables declared by `let` will be put into the `Temporal Dead Zone` a.k.a `TDZ` and it will be taken out the `TDZ` once the compiler comes to the line of variable declaration. If the program tries to access the variables in the `TDZ`, a `ReferenceError` will be thrown.

##### No Redeclaration
Remember in ES5, if we declare a variable twice with `var`, no errors will be thrown, but if an identifier has been declared and is declared again **inside the same scope**, a SyntaxError will be thrown, see example below.
```javascript
let a = 1;
let a = 2; // SyntaxError: Duplicate declaration "a"
```
but
```javascript
function func(condition) {
    let a = 1;
    if (condition) {
        let a = 2;
    } else {
        let a = 3;
    }
    console.log(a); // 1
}
```
works fine.

##### const
Apart from `let`, `const` is another keyword used to declare a variable but `const` will only used if the variable's value won't be modified later on, that is to say, variables declared by `const` are *constants*. Thus, every const variables must be initialzied on declaration. See example below.
```javascript
const MAXVALUE = 0;
MAXVALUE = 1; // A SyntaxError will be thrown
const MINVALUE; // A SyntaxError will be thrown.
```
If a const variable is initialzied with an object, the object can be modified. In theory, A const declaration prevents modification of the binding, not of the value. For example:
```javascript
const person = {
    name: 'Wen Zhu'
};
person.name = 'Zhu Wen'; // No problem!
// Throw a SyntaxError
person = {
    name: 'Another Person';
};
```
##### const in loops
`const` can not be used in normal for loop, but could be used in `for...in` and `for...of`, for example.
```javascript
// SyntaxError
for(const i=0; i<10; i++) {
    // do something
}
// Works
const obj = {
    prop1: 1,
    prop2: 2
};
for(const key in obj) {
    // do something
}
// Works
const arr = [1, 2, 3];
for(const item of arr) {
    // do something
}
```

##### Global Block Bindings
In ES5, if we use `var` in the global environment, then it will potentially overwritten the builtin glable variables, for example:
```javascript
var RegExp = 'Hello';
console.log(window.RegExp); // Hello
```
But with `let` and `const`, the global variables won't be overwritten but shadowed.
```javascript
let RegExp = 'Hello';
console.log(window.RegExp === RegExp); // false
```
Although the global variables won't be overwritten, but we should try out best to avoid those reserved keyword and builtin variable names.

##### When to use what
This is a hot topic in the community, but the emerging opinion is we should use `const` by default and use `let` when this variable will be modified later. The rationale behind is that most variables should be modified after initialization which is the same idea behind `Functional Programming`.
