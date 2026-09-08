## Higher-Order Functions (HOF) – simple & interview-ready

**Short professional answer (20–30 sec):**

> A higher-order function in JavaScript is a function that either **takes another function as an argument**, **returns a function**, or both.  
> This is possible because functions in JavaScript are **first-class values** – they can be passed around like numbers or strings.  
> Common examples are `map`, `filter`, `reduce`, `setTimeout`, event listeners, and function factories.  
> Higher-order functions enable patterns like callbacks, composition, currying, and decorators, which make code more reusable and modular. 

***

## Core idea (easy Hinglish)

- **Higher-Order Function (HOF):**  
  Wo function jo:
  - Kisi aur function ko **argument** mein le, ya
  - Koi function **return** kare. 

- **Callback Function:**  
  Wo function jo HOF ke andar **argument** ke taur pe pass kiya jata hai aur baad mein execute hota hai. 

Simple rule:

> HOF = “boss” jo function ko control karta hai.  
> Callback = “worker” function jo baad mein run hota hai. 

***

## 1) Function as argument (most common case)

```js
function greet(name) {
  console.log('Hello, ' + name);
}

function executeCallback(fn, value) {
  fn(value); // callback call
}

executeCallback(greet, 'Alice'); // Hello, Alice
```

Yahan:

- `executeCallback` → **higher-order function** (kyunki ye ek function `fn` ko argument le raha hai).  
- `greet` → **callback function** (jo baad mein call ho raha hai). 
***

## 2) Built-in HOFs: `map`, `filter`, `reduce`

### `map` – transform array

```js
const nums = [1, 2, 3];

const doubled = nums.map(function (n) {
  return n * 2;
});

console.log(doubled); // [2, 4, 6]
```

- `map` ek HOF hai jo har element pe callback apply karta hai aur **naya array** return karta hai. 

```js
const nums = [1, 2, 3, 4];

const evens = nums.filter(function (n) {
  return n % 2 === 0;
});

console.log(evens); // [2, 4]
```

- `filter` callback ke return value ke basis pe elements select karta hai. 

### `reduce` – combine into one value

```js
const nums = [1, 2, 3, 4];

const sum = nums.reduce(function (acc, n) {
  return acc + n;
}, 0);

console.log(sum); // 10
```

- `reduce` pure array ko ek single value mein combine karta hai using callback. 
***

## 3) Function return karne wala HOF (function factory)

```js
function makeMultiplier(factor) {
  return function (x) {
    return x * factor;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

Yahan:

- `makeMultiplier` → higher-order function (kyunki ye **function return** kar raha hai).  
- `double`, `triple` → returned functions jo baad mein use ho rahe hain. 

***

## 4) Real-world examples

- `setTimeout`, `setInterval`:

```js
setTimeout(function () {
  console.log('2 seconds baad');
}, 2000);
```

- `setTimeout` ek HOF hai jo callback function leta hai. 

- Event listeners:

```js
button.addEventListener('click', function () {
  console.log('Button clicked');
});
```

- `addEventListener` bhi HOF hai. 

***

## 5) Why HOFs are important (interview angle)

- **Reusability:** Logic ko separate karke generic functions banate hain (jaise `map`, `filter`). 
- **Abstraction:** “Kya karna hai” callback se decide hota hai, “kaise karna hai” HOF handle karta hai. 
- **Functional patterns:** Composition, currying, decorators, middleware – sab HOF pe based hain. 
***

## Interview-ready explanation (bolne ka style)

Agar interviewer pooche: **“What are higher-order functions?”**

Tum bol sakte ho:

> A higher-order function is a function that either takes another function as an argument, returns a function, or both.  
> In JavaScript, functions are first-class values, so we can pass them around like any other data.  
> Common examples are `map`, `filter`, `reduce`, `setTimeout`, and event listeners.  
> The function that is passed in is called a callback.  
> Higher-order functions help us write more reusable and modular code by separating the “what” (callback logic) from the “how” (iteration, timing, event handling, etc.). 

---

## HOF vs Callbacks – simple difference

**Short professional answer (15–20 sec):**

> A **higher-order function (HOF)** is a function that **takes another function as an argument**, **returns a function**, or both.  
> A **callback** is the **function that is passed into** a higher-order function and is **called later**.  
> So: HOF is the “receiver/manager”, callback is the “worker function” it uses. 

***

## Clear distinction

- **Higher-Order Function (HOF):**
  - Definition: Function that:
    - Accepts a function as argument, **or**
    - Returns a function, **or**
    - Both. 
  - Examples:
    - `map`, `filter`, `reduce`
    - `setTimeout`, `setInterval`
    - `addEventListener`
    - Custom functions like `executeCallback(fn, value)` 

- **Callback Function:**
  - Definition: The **function passed as an argument** to a HOF, which is **invoked later**. 
  - Examples:
    - `nums.map(n => n * 2)` → `n => n * 2` is the callback.
    - `setTimeout(() => {}, 1000)` → arrow function is the callback.
    - `button.addEventListener('click', handler)` → `handler` is the callback. 

***

## Example side-by-side

```js
// Higher-Order Function
function executeTask(task, value) {
  return task(value); // calling the callback
}

// Callback function
function double(x) {
  return x * 2;
}

// Using them
const result = executeTask(double, 5);
console.log(result); // 10
```

- `executeTask` → **HOF** (kyunki ye ek function `task` ko argument le raha hai).  
- `double` → **callback** (jo HOF ke andar use ho raha hai). 

***

## Interview-ready one-liner

Agar interviewer pooche: **“Difference between HOF and callback?”**

Tum bol sakte ho:

> A higher-order function is a function that takes or returns other functions. A callback is the specific function that we pass into a higher-order function to be executed later. In other words, HOF is the container/manager, and the callback is the function it calls. 