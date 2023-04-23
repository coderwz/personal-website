---
title: Iteration in JavaScript
author: Wen Zhu
date: '2019-08-11'
summary: A summary of syntax on how to iterate Array, Object, Map, Set in JavaScript
tags: JavaScript
---

# Iterate an Array

## ES5

### forEach

```javascript
var nums = [2, 3, 6, 7];
nums.forEach(function(value, opt_index, opt_array) {
  console.log(value, opt_index, opt_array);
});
// Output
// 2, 0, [2, 3, 6, 6]
// 3, 1, [2, 3, 6, 6]
// 6, 2, [2, 3, 6, 6]
// 7, 3, [2, 3, 6, 6]
```

Note: You can't break `forEach`.

### for loop

```javascript
var nums = [2, 3, 6, 7];
for (var idx = 0; idx < nums.length; idx++) {
  console.log(nums[idx], idx);
}
// Output
// 2, 0
// 3, 1
// 6, 2
// 7, 3

```

## ES6

### forEach

Same as ES5 syntax

### for...of

```javascript
const nums = [2, 3, 6, 6];
for (const value of nums) {
  console.log(value);
}
// Output
// 2
// 3
// 6
// 7
```

# Iterate an Object

## ES5

### for...in

```javascript
var values = {"a": 0, "b": 1};
for (var key in values) {
  console.log(key, values[key]);
}
// Output
// "a", 0
// "b", 1
```

## ES6

### for...in

Same as ES5 syntax.

### for...of

```javascript
const values = {"a": 0, "b": 1};
for (const [key, value] of Object.entries(values)) {
  console.log(key, value);
}
// Output
// "a", 0
// "b", 1
```

# Iterate an Map

Only available in ES6

### forEach

```javascript
const map = new Map([["a", 0], ["b", 1]]);
map.forEach((value, key, this_map) => {
  console.log(value, key, this_map);
});
// Output
// 0 "a" Map(2) {"a" => 0, "b" => 1}
// 1 "b" Map(2) {"a" => 0, "b" => 1}
```

### for...of

```javascript
const map = new Map([["a", 0], ["b", 1]]);
for (const [key, value] of map) {
  console.log(key, value);
}
// Output
// "a", 0
// "b", 1
```

### Map.prototype.keys()

```javascript
const map = new Map([["a", 0], ["b", 1]]);
for (const key of map.keys()) {
  console.log(key, map.get(key));
}
// Output
// "a", 0
// "b", 1
```
### Map.prototype.entries()

```javascript
const map = new Map([["a", 0], ["b", 1]]);
for (const [key, value] of map.entries()) {
  console.log(key, value);
}
// Output
// "a", 0
// "b", 1
```

# Iterate a Set

Only available in ES6

### for...of
```javascript
const set = new Set(["a", "b"]);
for (const value of set) {
  console.log(value);
}
// Output
// "a"
// "b"
```
### Set.prototype.keys()
```javascript
const set = new Set(["a", "b"]);
for (const key of set.keys()) {
  console.log(key);
}
// Output
// "a"
// "b"
```
### Set.prototype.values()

```javascript
const set = new Set(["a", "b"]);
for (const value of set.values()) {
  console.log(value);
}
// Output
// "a"
// "b"
```
### Set.prototype.entries()
```javascript
const set = new Set(["a", "b"]);
for (const [key, value] of set.entries()) {
  console.log(key, value);
}
// Output
// "a" "a"
// "b" "b"
```