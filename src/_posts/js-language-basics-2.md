---
title: JavaScript Language Basics (2)
author: Wen Zhu
date: '2017-05-14'
summary: In JavaScript, there are 5 simple data types...
tags: JavaScript
---

### Data Types

In JavaScript, there are 5 simple data types in JavaScript: *String*, *Number*, *Boolean* and two special types *Null*, *Undefined*. They are also called primitive types. There's also one complex data type: *Object*.

We can use `typeof` to get the data type of a variable, see following examples.

```JavaScript
var msg = 'this is a string';
alert(typeof msg); // "string"
alert(typeof(msg)); // "string", also legal, but not recommended
alert(typeof 25); // "number";
```

However, there a special case here, `typeof null` will return `object` as `null` is considered to be an empty object.

##### The undefined Type

This type has only one value `undefined`. We already know in previous example, when we declare a variable without initializing it, a special value `undefined` will be assigned to this variable. Note, an `undefined` variable is different from a variable that hasn't been declared. See example below.

```JavaScript
var msg;
alert(msg); // undefined
alert(msg_1); // msg_1 is not declared, so throw an error
```

##### The Null Type

The Null type is the second special data type which only holds one value `null`. As we mentioned above, `null` type can be considered as an empty object pointer. So we usually initialize a variable to be `null` when this variable is meant to later hold an object.
The reason we do this is we can check if the variable equals `null` to determine if the object has been filled, see example below.

```JavaScript
var car = null;
alert(typeof car); // object

if (car != null) {
    doSomething();
}
```

The value `undefined` is a derivative of `null`, so following statement holds true.

```JavaScript
alert(null == undefined); // true
```

### The Boolean Type

There are two values: `true` and `false` for Boolean type. Note JavaScript is a case-sensitive language, that is to say `True` or `False` is not valid for Boolean values.

Though there are only two values in Boolean type, but all the variables have its equivalent boolean values. We can use `Boolean()` to convert any type of data to boolean values. See following table for conversion rule.
    
    | DATA TYPE | VALUES CONVERTED TO TRUE | VALUES CONVERTED TO FALSE |
    | --------- | ------------------------ | ------------------------- |
    | Boolean   |         true             |          false            |
    | String    |   Any nonempty string    |           ''              |
    | Number    |   Any nonzero values     |            0              |
    | Object    |   Any object             |           null            |
    | Undefined |      N/A                 |          undefined        |

### The Number Type

Unlike other languages, e.g. Java, JavaScript uses a unified type to represent various types of number (integer, floating number, oct, hex, etc). 

```JavaScript
 var int = 25;
```
Integers can also be represented as octal and hexadecimal literals. For an octal literal, the first number must be zero(0) followed by a sequence of octal numbers (0-7), for hexadecimal literal, we must make the the first two characters `0x` followed by a sequence of hexadecimal numbers. See example below.

```JavaScript
var oct1 = 070; // octal for 56
var oct2 = 079; // invalid octal, interpreted as 79
var oct3 = 08; // invalid octal, interpreted as 8

var hex1 = 0xA; // hex for 10
var hex2 = 0x1f; // hex for 31
```

Note, in *strict mode*, octal literals are not allowed, thus all numbers followed by a leading zero will result in an error.

##### Floating-Pointing Values

In order to form a floating-point value in JavaScript, we should include one decimal point and at least one number after the decimal point. See example below.

```JavaScript
var f1 = 1.1; // 1.1
var f2 = 0.1; // 0.1
var f3 = .1; // legal, but not recommended
var f4 = 1.0; // whole number, will be interpreted as 1
var f5 = 1.; // will be interpreted as 1
```

In the example above, variables `f4` and `f5` are interesting enough, since floating-point number needs as twice memory as integer, JavaScript always try to optimize the value to be integers if necessary.

For very large or very small floating numbers, we can use *e-notation* to represent the numbers.

```JavaScript
var e1 = 1.6e5; // 160000
var e2 = 1.6e-5; // 0.000016
```

Another thing needs our attention is rounding errors. If we open our browser console and try next example, we will find the result quite surprising.

```JavaScript
var a = 0.1, b = 0.2;
if (a + b == 0.3) {
    alert('oh yea!');
} else {
    alert('what???');
}
alert(a+b); // 0.30000000000000004
```

This is caused due to how JavaScript stores floating values. In JS, floating-point values are accurate up to 17 decimal places but far less accurate in arithmatic computations than whole numbers. Keep those traps in mind and don't try to test for special floating-point values in JS.
