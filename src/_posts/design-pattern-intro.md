---
title: Introduction to Design Pattern
author: Wen Zhu
date: '2017-08-20'
summary: '"Change is the constant in software development". We have to prepare our code to be changeable or maintainable in the future, that is the whole point to apply those well-proven design patterns into our applications.'
tags: "Design Pattern"
---

## Summary
This is a new blog series talking about design patterns. After I started my new job at Google, I noticed that Object Oriented Design is heavily used there, even in the client side programming, which compelled me to have a better understanding of Design Patterns/OOP. [Head First Design Pattern](https://www.amazon.com/Head-First-Design-Patterns-Brain-Friendly/dp/0596007124) is the major reference book used in my blogs.

## Why do we need Design Pattern
As a software engineer, we not only want our code working as expected, but also maintainable, scalable and readable. If our code can have such qualities, then we can call them "good code". But how can we make our code "good code", especially in OOP world? There are a lot of proven patterns we can leverage to achieve that. That is why we need to learn design patterns.

## Example
Let's have an example to illustrate how the design patterns can help us solve real problems. Jim is a software engineer working for a car company, which of course has different kinds of models, sedan, SUV, truck, etc. All of those models share some similar functionalities, like drive, park, refuel, etc. So we have a superclass `Car` here and all models are the subclasses of it.
```java
class Car {
    void drive() {}
    void park() {}
    void refuel() {}
}
```
However, it is a different era now, regular cars are not that popular any more, self-driving car becomes more attractive, in order to survive in the market, Jim's company wants to launch new models that have self drive capability. Therefore, jim added a method `selfDrive()` to the superclass `Car`, problems show up immediately, now all the models can self drive, the company clearly doesn't want to do that because they want to have different models that could satisfy different market needs. 
Jim has to step back and come up with another idea, he created an interface `selfDrivable` for the models to implement if this model needs to have self driving capability. That could solve company's need without upgrading all existing models. However it becomes very tedious that all new models have to implement this interface if they want to have this new functionality which clearly violates the code reuse principle in OOP.
Is there a strategy could help Jim solve this problem? Design pattern now could step in to offer some help.
### Design Principle #1
**Identify the aspects of your application that vary and separate them from what stays the same.**
Put it in another way: take the parts that vary and encapsulate them, so that later you can alter and extend the parts that vary without affecting those they don't.
It forms the basis for almost every design pattern. In Jim's case, all car models need to have park, drive, refuel functionality, that is the part stays the same, but not all cars need to have self driving capability, that is the part will vary among different models. We can extract this part and encapsulate it in a new class called `SelfDriveAbility`. Furthermore, we can make it as an interface and have different concrete classes implementing this interface to indicate if the car can drive himself. The class will be included in the superclass `Car`, see the example:
```java
public interface SelfDriveAbility {
    public void selfDrive() {}
}

public class SelfDrive implements SelfDrivable {
    public void selfDrive() {
        System.out.println("I can drive myself!");
    }
} 

public class NonSelfDrive implements SelfDrivable {
    public void selfDrive() {
        System.out.println("I can not drive myself :(");
    }
} 
```
And we can modify our superclass `Car`:
```java
class Car {
    // changing part
    SelfDriveAbility selfDriveAbility;
    void performSelfDrive() {
        selfDriveAbility.selfDrive();
    }
    // non-changing part
    void park() {}
    void drive() {}
    void refuel() {}
}
```
Ok, now we can create a new model called MagicCar and non-self-drivable car called OldSchoolCar:
```java
class MagicCar extends Car {
    public MagicCar() {
        selfDriveAbility = new SelfDrive();
    }
}

class OldSchoolCar extends Car {
    public OldSchoolCar() {
        selfDriveAbility = new NonSelfDrive();
    }
}
```
Now we send those two models to test factory before shipping to the market:
```java
public class CarTestingFactory {
    public static void main(String[] args) {
        Car magicCar = new MagicCar();
        Car oldCar = new OldSchoolCar();
        magicCar.performSelfDrive(); // I can drive myself!
        oldCar.performSelfDrive(); // I can not drive myself :(
    }
}
```
In this example, we **delegate** the self driving capability to `selfDriveAbility` instead of putting it in the **client** code. 
We can make it even better by adding a method `setSelfDriveAbility()` in the  superclass `Car`. With the method we can easily change the self drive capability or add new self drive capability dynamically, which means make our code **flexible**. How do we achieve that? that leads to our 2nd design principle.

### Design Principle #2
**Program to an interface, not an implementation.**
Looking our example, we are using the interface `SelfDriveAbility` to define the self-driven behavior instead of concrete classes `SelfDrive` or `NonSelfDrive`.
Another interesting thing here is we are delegating the self drive behavior to `SelfDriveAbility` and includes it in the superclass instead of defining a method `selfDrive` in the superclass. This technique is called `Composition` which is widely used in OOP world.

### Design Principle #3
**Favor Composition over inheritance.**
`Composition` is a `HAS-A` relationship while `Inheritance` is a `IS-A` relationship. Using `Composition` gives more flexibility to the application, it delegates (or decouples) that part responsibility to a certain set of classes and allows us to change the behavior at **runtime**.

## Strategy Pattern
We have unlocked the first design pattern - `Strategy Pattern`!
The `Strategy Pattern` defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

## Conclusion
"**Change** is the constant in software development". We have to prepare our code to be changeable or maintainable in the future, that is the whole point to apply those well-proven design patterns into our applications.
Also, we should think at the pattern level. Design patterns don’t go directly into your code, they first go into your BRAIN. So it should happen when we design our application.

## References
- [Head First Design Pattern](https://www.amazon.com/Head-First-Design-Patterns-Brain-Friendly/dp/0596007124)