---
title: final in Java
author: Wen Zhu
date: '2018-05-29'
summary: There are 3 final keyword use cases in Java, for data field, method and class.
tags: Java
---

# final in Java

There are 3 `final` keyword use cases in Java, for data field, method and class. Below is the notes I took after reading Thinking in Java.

## `final` for data

1. primitive: value cannot be changed.
2. object: reference cannot be re-assigned.
3. used together with `static` to make it compile-time constant.
4. can declare a blank final but have to initialize it in constructor.
5. final arguments: cannot be changed inside the method.

## `final` for method

1. make this method non-overridden.
2. in earlier java versions, put a final for small-size method could turn any calls to that method into inline calls，which is copy the code directly to the place where the call happens. But now, it is discouraged to do so.
3. private method are implicitly final, so no need to put a final before a private method.

## `final` for class

1. make the class non-subclassing. Usually it means you don't want to inherit or anyone else to inherit this class.

## Reference

- [Thinking in Java (4th Edition) - Bruce Eckel](https://www.amazon.com/Thinking-Java-4th-Bruce-Eckel/dp/0131872486/ref=sr_1_1?ie=UTF8&qid=1527581039&sr=8-1&keywords=thinking+in+java)