# Question is -> Explain prototypal inheritance

## Prototype Inheritance in JavaScript – simple & interview-ready

**Short professional answer (25–35 sec):**

> JavaScript uses **prototypal inheritance**, not classical class-based inheritance.  
> Every object has an internal link called `[[Prototype]]` (accessible as `__proto__`) that points to another object.  
> When you access a property, JavaScript first checks the object itself; if not found, it follows the `[[Prototype]]` link and keeps moving up the **prototype chain** until it finds the property or reaches `null`.  
> Functions used as constructors have a `prototype` property; objects created with `new` get their `[[Prototype]]` set to that `prototype`.  
> ES6 `class` syntax is just **syntactic sugar** over this same prototype system. 
***

## Core concepts (easy Hinglish)

### 1) `[[Prototype]]` / `__proto__` vs `prototype`

- **`[[Prototype]]`** (internal slot, dev tools mein `__proto__` dikhta hai):
  - Har **object instance** pe hota hai.
  - Ye batata hai ki ye object **kis se inherit** kar raha hai. 

- **`prototype`**:
  - Sirf **constructor functions / classes** pe hota hai.
  - Is object ke methods/properties define hote hain jo **sab instances share** karenge. 

Simple rule:

> `instance.__proto__ === Constructor.prototype` 

***

### 2) Prototype chain kaise kaam karta hai?

Jab tum likhte ho:

```js
const obj = { a: 1 };
console.log(obj.toString());
```

Toh engine:

1. `obj` pe `toString` dhundta hai → nahi mila.
2. `obj.__proto__` (jo `Object.prototype` hai) pe dhundta hai → mila.
3. Wahan se execute karta hai. 

Agar wahan bhi na mile, toh uske `__proto__` pe jayega, aur aise hi chain chalti rahegi jab tak:

- Property mil jaye, ya
- `__proto__` → `null` ho jaye (chain end). 

***

### 3) Constructor function + `new` example

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log('Hi, I am ' + this.name);
};

const p1 = new Person('Alice');
const p2 = new Person('Bob');

p1.greet(); // Hi, I am Alice
p2.greet(); // Hi, I am Bob
```

Yahan:

- `Person` ek constructor function hai.
- `Person.prototype` ek object hai jisme `greet` method hai.
- `new Person()` se jo object banta hai (`p1`, `p2`), uska `__proto__` → `Person.prototype` set hota hai. 

Isliye:

- `p1.greet()` call pe:
  - `p1` pe `greet` nahi hai.
  - Engine `p1.__proto__` → `Person.prototype` pe jata hai → wahan `greet` milta hai. 
***

### 4) `Object.create` se direct inheritance

```js
const parent = {
  greet() {
    console.log('Hello from parent');
  }
};

const child = Object.create(parent); // child.__proto__ = parent

child.greet(); // Hello from parent
```

- `Object.create(proto)` → naya object banata hai jiska `[[Prototype]]` seedha `proto` set hota hai.
- Ye sabse clear tareeka hai prototype-based inheritance samajhne ka. 
***

### 5) Class syntax = syntactic sugar over prototypes

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log('Hi, I am ' + this.name);
  }
}

const p = new Person('Carol');
p.greet();
```

Under the hood, ye roughly aisa hota hai:

```js
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  console.log('Hi, I am ' + this.name);
};
```

- `class` bas padhne mein clean syntax deta hai.
- Internally wahi **prototype chain** use hoti hai. 
***

### 6) Prototypal vs Classical inheritance (interview favorite)

- **Classical (Java, C++):**
  - Classes = blueprints.
  - Objects = instances of classes.
  - Inheritance = class se class extend hoti hai. 

- **Prototypal (JavaScript):**
  - Objects directly **other objects** se inherit karte hain via `[[Prototype]]` chain.
  - No real “class” in old JS; `class` keyword bas sugar hai. 
Interview line:

> “JavaScript is fundamentally prototype-based; classes are syntactic sugar over the prototype chain.” 

***

## Interview-ready explanation (bolne ka style)

Agar interviewer pooche: **“Explain prototype inheritance in JavaScript.”**

Tum bol sakte ho:

> JavaScript uses prototypal inheritance. Every object has an internal `[[Prototype]]` link (exposed as `__proto__`) that points to another object.  
> When we access a property, the engine first checks the object itself. If not found, it follows the `[[Prototype]]` link and keeps moving up the prototype chain until it finds the property or reaches `null`.  
> Constructor functions have a `prototype` property; objects created with `new` get their `[[Prototype]]` set to that `prototype`, so they share methods defined there.  
> ES6 `class` syntax is just syntactic sugar over this same prototype mechanism, so internally it’s still prototype-based inheritance. 

