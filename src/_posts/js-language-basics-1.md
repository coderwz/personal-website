---
title: JavaScript Language Basics (1)
author: Wen Zhu
date: '2017-05-05'
summary: JavaScript, when you first time see this word, you may think there must be some relationship with another popular programming language, Java...
tags: JavaScript
---

# Language Basics

JavaScript, when you first time see this word, you may think there must be some relationship with another popular programming language, Java. To some extent, I agree with you, but the origin of JavaScript had nothing to do with Java. When you get to know some syntax of JavaScript, you may believe it even more about the presumed relationship. Indeed, many of the syntax of JavaScript look very alike with Java, because JavaScript borrowed a lot of stuff from existing languages, including Java. Ok let's begin with basic JavaScript syntax.

### Syntax

##### Case-sensitivity

Everything in JavaScript is case-sensitive, i.e. variable name `test` is different from `Test`, see the example below.

```javascript
var test = 'this is test';
alert(test); // this is test
alert(Test); // an syntax error will be thrown
```

##### Identifier

An *identifier* is the name of a variable, function, property or function arguments. In JavaScript, an *identifier* has to follow the rules below.

* The first character must be a letter, an underscore (_) or a dollar sign ($). Numbers(0-9) are not allowed.
* All other characters could be letters, underscores, dollar signs or numbers.

The recommended naming convention is camel case just like many other languages, meaning that the first letter is lower case and each additional word is offset by a capital letter, see the example below.

    testMachine
    deletedNode
    saveAnotherWord

##### Comments

There are two kinds of comment style in JavaScript, inline(//) and asterisk(/*).
```javascript
// This is inline comment, often used to comment a single line of code

/*
 * This is Asterisk style comment, often used as docString (not sure if JavaScript
 * has similar concept or not). This style is used to comment multiple lines.
 */
```

##### Strict Mode

There are two kinds of mode in JavaScript, *Strict Mode* and *Unstrict Mode*, if we put string 'strict mode' on top of the javascript file, the JS parser (e.g. browser) will apply a more strict syntax check on the js code. We can also put the string on top of a function body, in that case, the strict mode only exist inside that function, e.g.

```javascript
function test() {
    'strict mode';
    doSomething();
}
```

Note the default mode will be *Unstrict Mode* if we do not explicitly put the string there.

##### Statement & Variable

In JavaScript, each line ending with a semicolon is a statement, though semicolon is not required.

```javascript
var name;
alert(name); // undefined
name = 'Wen Zhu';
var age = 25;
```

In the example above, we used a keyword `var` here to declare variables. The first line, we declared a variable called `name`, but it was not initialized, JavaScript will give a default value `undefined`(we will talk about it later). Later on we assigned a string 'Wen Zhu' to variable `name`. We also declared a variable `age` and this time we initialized it with value 25 at the same time.

If we declare a variable with `var` in the front, that means this is a local variable and the variable won't exist out of the code block (scope). See the example below.

```javascript
function foo() {
    var localVar = "I'm local.";
    alert(localVar); // I'm local.
}
alert(localVar); // A syntax error thrown, Uncaught ReferenceError: localVar is not defined.
```

If we omit the `var` keyword when declaring a variable, the varible will automatically become a global variable (window). See example.

```javascript
function foo() {
    globalVar = "I'm global.";
    alert(globalVar); // I'm global.
}
alert(globalVar); // I'm global.
alert(window.globalVar); // I'm global.
```

JavaScript variables are loosely typed, meaning that a variable can hold any type of data. This is different from Java, in Java you have to declare the variable with a certain data type beforehand and cannot change its type later on.

```javascript
var msg = 'string';
alert(msg); // string
msg = 25;
alert(msg); // 25
```

From the example above, we can clearly see we can change variable from a String to a Number. Although it is legally to do so in JavaScript, but it's not recommended, this will make yourself very confusing and make the code unreadable.

We can define multiple variables using a single statement.

```javascript
var name = 'Wen Zhu',
    age = 25,
    nationality = 'China';
var color = 'yellow', 'red', 'blue';
alert(color); // blue
```
