## `this` keyword in JavaScript – simple & interview-ready

**Short professional answer:**

> In JavaScript, `this` is a special keyword that refers to the **execution context** of a function – basically, the object that is **calling** the function at that moment.  
> The value of `this` is **not fixed**; it depends on **how the function is called**: as a method, as a plain function, with `new`, or with `call`/`apply`/`bind`.  
> Arrow functions are different: they don’t have their own `this`; they inherit it from the surrounding lexical scope. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

***

## Core rule (yaad rakhne wali line)

> **`this` depends on *how* the function is called, not *where* it is written.** [articles.shadecoder](https://articles.shadecoder.com/the-this-keyword-interview-questions-complete-guide-for-2026)

***

## Main cases (with simple examples)

### 1) Global scope

```js
console.log(this); // browser: window, Node: global
```

- Non-strict mode: `this` → global object (`window` / `global`).  
- Strict mode / modules: `this` → `undefined`. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

***

### 2) Plain function call

```js
function foo() {
  console.log(this);
}

foo(); // strict mode: undefined, non-strict: global object
```

- Jab function ko directly call karte ho (kisi object ke method ke taur pe nahi), toh `this` default binding follow karta hai. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

***

### 3) Object method (implicit binding)

```js
const obj = {
  name: 'Alice',
  greet() {
    console.log('Hello, ' + this.name);
  }
};

obj.greet(); // "Hello, Alice" → this = obj
```

- Jab function ko **method** ki tarah call karte ho (`obj.greet()`), toh `this` us object ko point karta hai jo dot ke left side hai. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

**Lost `this` trap:**

```js
const fn = obj.greet;
fn(); // this = undefined (strict) / global (non-strict)
```

- Method ko alag variable mein assign karke call karne se `this` “lose” ho jata hai. [code-js](https://code-js.in/js/javascript-this-keyword-binding-rules/)

***

### 4) Constructor / `new` binding

```js
function Person(name) {
  this.name = name;
}

const p = new Person('Bob');
console.log(p.name); // 'Bob'
```

- Jab function ko `new` ke saath call karte ho, toh `this` → newly created object instance. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

***

### 5) Explicit binding: `call`, `apply`, `bind`

```js
function greet() {
  console.log('Hi, ' + this.name);
}

const user = { name: 'Carol' };

greet.call(user);   // Hi, Carol
greet.apply(user);  // Hi, Carol
const boundGreet = greet.bind(user);
boundGreet();       // Hi, Carol
```

- `call` / `apply` → function ko turant call karte hain, `this` set karke.  
- `bind` → naya function return karta hai jiska `this` permanently fix ho jata hai. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

***

### 6) Arrow functions (lexical `this`)

```js
const obj = {
  name: 'Dave',
  regular() {
    console.log(this.name); // 'Dave'
  },
  arrow() {
    const fn = () => {
      console.log(this.name); // inherits this from arrow()
    };
    fn();
  }
};

obj.regular(); // 'Dave'
obj.arrow();   // 'Dave'
```

- Arrow functions ka apna `this` nahi hota.  
- Wo `this` ko **lexical scope** se inherit karti hain (jahan define hui hain). [learncodewithdurgesh](https://learncodewithdurgesh.com/tutorials/javascript-handbook/this-keyword-in-javascript-objects)

**Common use:**

```js
function Counter() {
  this.count = 0;
  setInterval(() => {
    this.count++; // arrow inherits this from Counter constructor
  }, 1000);
}
```

- Yahan arrow function use karne se `this` sahi object (instance) pe rehta hai. [sourcetrail](https://www.sourcetrail.com/javascript/arrow-functions-and-the-this-keyword-in-javascript/)

***

## Interview-ready summary (bolne ka style)

Agar interviewer pooche: **“What is `this` in JavaScript?”**

Tum bol sakte ho:

> `this` is a dynamic reference that points to the object that is currently calling the function. Its value is decided by the call site:  
> - In a plain function call, it follows default binding (global object or `undefined` in strict mode).  
> - In a method call like `obj.fn()`, it refers to `obj`.  
> - With `new`, it refers to the newly created instance.  
> - With `call`, `apply`, or `bind`, we explicitly set its value.  
> - Arrow functions don’t have their own `this`; they inherit it lexically from the surrounding scope.  
> Because of this, I always check how a function is being invoked before assuming what `this` refers to. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

Agar chaho toh main next message mein 4–5 chhote “output guess” questions de sakta hoon jo exactly `this` + arrow + method loss wale interview traps hote hain.