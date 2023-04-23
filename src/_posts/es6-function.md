---
title: Function - ES6
author: Wen Zhu
date: '2017-06-24'
summary: Generally, there'no fundamental changes in ES6 in terms of `function` but a few minor improvements like parameters, introduction of arrow functions etc.
tags: JavaScript
---

### Summary

Generally, there'no fundamental changes in ES6 in terms of `function` but a few minor improvements like parameters, introduction of arrow functions etc.

### Default Parameters

In ES5, default parameters are not real supported, but we can use some tricks to mimic the behavior, for example:

```javascript
function func(url, timeout, callback) {
    timeout = timeout || 1000;
    callback = callback || function() {};
    // the rest of the function.
}
```

There are two major flaws for this pattern: 1) the code looks clumsy 2) what if the `timeout` value is 0?

In ES6, default parameters are natively supported, see following examples:
```javascript
function func(url, timeout=2000, callback=function() {}) {
    // the rest of the code
}
```
In this example, `url` will be considered as a required parameter, `timeout` and `callback` which have a default value are considered optional. In this way, we don't need any tricks to mimic default parameter behaviors.
Unlike other languages, e.g. Python, you don't have to specify default values for all tailing parameters, for example:
```javascript
    function func(url, timeout=2000, callback) {
        // it's not a good part of Javascript IMO
    }
```
    
##### How Default Parameters Affect arguments Object

In ES5 `non-strict` and `strict mode`, the `arguments` object have different behaviors in terms of if it will be updated inside the function body. For example:

```javascript
    function nonStrictFunc(first, second) {
        second = "updated";
        console.log(first === arguments[0]); // true
        console.log(second === arguments[1]); // true
    }
    
    function strictFunc(first, second) {
        'use strict';
        
        second = "updated";
        console.log(first === arguments[0]); // true
        console.log(second === arguments[1]); // false
    }
        
    nonStrictFunc('a', 'b');    
    strictFunc('a', 'b');    
```

From this example, we can see that, in `strict` mode, the `arguments` object will remain unchanged inside of the function body.

In ES6, this behavior has been unified to be the same as it is in ES5 `strict` mode. Even with default parameters given, the `arguments` object will remain unchanged, see the example below:

```javascript
    function func(first, second='updated') {
        console.log(arguments.length); // 1
        console.log(first === arguments[0]); // true
        console.log(second === arguments[1]); // false
    }
```

### Default Parameter Expression

One interesting feature added in ES6 is now you can now use a function expression to provide default parameter values, for example:

```javascript
    function getValue() {
        return 1;
    }
    
    function func(first, second=getValue()) {
        console.log(second); // 1
    }
    
    func('a');
```
Preceding arugments can be passed into the function expression to get the default value, but unseen parameters can not be used because they are still in `TDZ`, for example:

```javascript
    function getValue(val) {
        return val + 5;
    }
    
    function func1(first, second=getValue(first)) {
        console.log(first); // 1
        console.log(second); // 6
    }
    
    function func2(first=getValue(second), second) {
    console.log(first);
    console.log(second);
}

func1(1);
func2(undefined, 1); // ReferenceError
```
### Unnamed Parameters

In ES5, unnamed parameters could be accessed though `arguments` object, for example:
```javascript
function pick(object) {
    let result = Object.create(null);
    for(let i=1; i<arguments.length; i++) {
        result[arguments[i]] = object[arguments[i]];
    }
    return result;
}
let post = {
    'title': 'ES6 Fucntion',
    'author': 'Wen Zhu',
    'year': 2017
};

let postData = pick(post, 'title', 'author');
console.log(postData.title); // ES6 Function
console.log(postData.author); // Wen Zhu
```
In this `pick` function, we input an objet and a list of properties we want to get, the response is an object containing those properties and their values. This function works fine, however there are some disadvantages, the first one is it is unclear that this function could take any number of parameters from its function signature and the other one is that the for loop starts from index 1 instead of 0 makes it confusing and buggy-prone.

##### Rest Parameter
ES6 solves this problem elegantly using `rest parameters`, let's rewrite the `pick` function in ES6:
```javascript
function pick(object, ...keys) {
    let result = Object.create(null);
    for(let i=0; i<keys.length; i++) {
        result[keys[i]] = object[keys[i]];
    }
    return result;
}
let post = {
    'title': 'ES6 Fucntion',
    'author': 'Wen Zhu',
    'year': 2017
};

let postData = pick(post, 'title', 'author');
console.log(postData.title); // ES6 Function
console.log(postData.author); // Wen Zhu
```
##### Rest Parameter Restrictions
- It has to be last
- cannot be used in an object literal setter

See two examples here:
```javascript
function pick(object, ...keys, last) {} // SyntaxError
let object = {
    set name(...value) {} // SyntaxError: can't use rest params in setter
}
```
The second restriction exists because object literal setter only allows one single parameter.

### The Spreator Operator
The spreator operator works closely with rest parameters, however rest parameters allow you to specify multiple arguments that should be combined into an array, the spreator operator allows you to split an array into separament arguments passing into the functions. Let's take builtin function `Math.max` as an exmaple.
In ES5, we usually utilize the function `apply` to pass an array of values into the function:
```javascript
let values = [12, 42, 1, 43];
console.log(Math.max.apply(Math, values)); // 43
```
In ES6, the spreator operator makes it easier and more elegantly to pass an array into a function:
```javascript
let values = [12, 42, 1, 43];
console.log(Math.max.(...values)); // 43
```
We can also mix the sperator operator with other parameters, for example:
```javascript
let values = [12, 42, 1, 43];
console.log(Math.max.(...values, 100)); // 100
```

### Arrow Functions
We've discussed the ES6 block-level function in last post. *Arrow Functions* is a great weapon introduced in ES6 to deal with block-level functions. As the name suggests, *Arrow Functions* are defined in a new syntax by using an arrow(=>). The arrow functions work differently from the traditional Javasctipt functions in a number of important ways.
- **No `this`, `super`, `arguments` and `new.target` bindings** &nbsp;&nbsp;&nbsp;&nbsp; those binds are defined by the cloeset containing non-arrow function.
- **Cannot be called with `new`** &nbsp;&nbsp;&nbsp;&nbsp; Arrow fuction does not have an internal method `[[Construct]]`, therefore, it cannot be used as an constructor.
- **No prototype**&nbsp;&nbsp;&nbsp;&nbsp; Because you cannot use `new` with arrow functions, so there's no need for a protype.
- **Cannot change `this`**&nbsp;&nbsp;&nbsp;&nbsp; You cannot use `bind` to change `this` value in arrow functions.
- **No `arguments` object**&nbsp;&nbsp;&nbsp;&nbsp; As mentioned in the first point, we can see we cannot reply on `arguments` to get the passed parameters.
- **No duplicate named parameters**&nbsp;&nbsp;&nbsp;&nbsp; Arrow functions cannot have duplicate named parameters in both strict and non-strict mode, as opposed to non arrow functions can have duplicate named parameters in non-strict mode.

Those differences make arrow function more concise and less buggy, because `this` binding is a major source of bugs in Javascript, it is very easy to lose track of `this` value inside a function which can result in unintended behaviors. Another advatange of arrow functions is that the Javascript engine could utilize it to optimize the operations, because unlike regular Javascript functions, arrow functions will not be used as a constructor or otherwise modified.
##### Arrow Function Syntax
Let's first look at an example:
```javascript
let add = (value1, values) => {
    let sum = value1 + value2;
    return sum;
};
```
From this example, basic syntax of arrow function is it begins with functions parameters, followed by arrow, followed by the function body. The parameters are wrapped by parenthese and the function body is wrapped by curly brace. However, if the function only has one parameter we can eliminate the parenthese and similarly we can remove the curly brace and keyword `return` if there's only one return line inside the function body, for example:
```javascript
let addOne = value => value+1;
```
But if there's no parameters passed in, we need to keep the parenthese and we also need to keep the curly brace if nothing inside the function body.
```javascript
let getValue = () => {};
```
One special case about the return value is when we want to return an object literal, we need the returned object wrapped in a parenthese, for example:
```javascript
let getItem = id => ({id: id, name: 'Temp'});
```
##### Creating IIFE
We can use arrow functions to easily create immediately invoked function expression (IIFE) by wrapping arrow function in parentheses. for example:
```javascript
let person = ((name) => {
    return {
        getName: function() {
            return name;
        }
    };
})('Wen');
console.log(person.getName()); // Wen
```
Note one difference here is that parentheses can only wrap the arrow function definition, not around ('Wen'), as opposed to non arrow function can include the parameters as well.

### Tail Call Optimization
This is an internal change to the functions in ES6. A `tail call` is when a function is called as the last statement in another function, like this:
```javascript
function doSomething() {
    return doSomethingElse(); // tail call
}
```
In ES5, tail call is handled just like normal function calls: A new stack frame will be created and pushed onto the call stack to represent the function call. That means all previous function calls are kept in memory, which is problematic when the call stack gets too large.
ES6 makes some optimization to tail call in strict mode (no change in non-stricy mode): Instead of creating a new stack frame for tail call, current stack frame will be cleared and reused as long as the following conditions are met:
- The tail call does not require access to variables in current stack (no closure)
- The function making the tail call has no further work to do after the tail call returns.
- The result of the tail call is returned as the function value.

For a better understanding how the optimization works, [this][tail call] is an excellent blog.

[tail call]: <http://2ality.com/2015/06/tail-call-optimization.html>

