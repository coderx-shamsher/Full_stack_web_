## `call`, `apply`, `bind` – simple & interview-ready

**Short professional answer (20–30 sec):**

> `call`, `apply`, and `bind` are methods used to **explicitly set the value of `this`** inside a function.  
> - `call` and `apply` **invoke the function immediately** with a given `this` value.  
> - `bind` **does not call the function**; instead, it **returns a new function** with `this` permanently set, which can be called later.  
> The only difference between `call` and `apply` is how arguments are passed: `call` takes them **individually**, `apply` takes them as an **array**. [wohotech](https://wohotech.in/subjects/javascript-complete-guide/advanced-javascript/call-vs-apply-vs-bind)

***

## 1) `call` – immediate call, individual arguments

```js
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: 'Alice' };

greet.call(person, 'Hello', '!'); 
// "Hello, Alice!"
```

- `fn.call(thisArg, arg1, arg2, ...)`  
- Function **turant execute** hoti hai.  
- `this` → `thisArg` set ho jata hai.  
- Arguments **comma-separated** (individual) pass hote hain. [wohotech](https://wohotech.in/subjects/javascript-complete-guide/advanced-javascript/call-vs-apply-vs-bind)

***

## 2) `apply` – immediate call, array of arguments

```js
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: 'Bob' };
const args = ['Hi', '?'];

greet.apply(person, args);
// "Hi, Bob?"
```

- `fn.apply(thisArg, [arg1, arg2, ...])`  
- Function **turant execute** hoti hai.  
- `this` → `thisArg`.  
- Arguments **array** mein pass hote hain. [wohotech](https://wohotech.in/subjects/javascript-complete-guide/advanced-javascript/call-vs-apply-vs-bind)

Common use: jab arguments pehle se array / array-like (`arguments`, `split` result) mein hon. [wohotech](https://wohotech.in/subjects/javascript-complete-guide/advanced-javascript/call-vs-apply-vs-bind)

***

## 3) `bind` – returns new function, `this` fixed

```js
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: 'Carol' };

const boundGreet = greet.bind(person, 'Hey');
// function return hua, abhi call nahi hua

boundGreet('!!!'); 
// "Hey, Carol!!!"
```

- `fn.bind(thisArg, arg1, arg2, ...)`  
- Function **turant execute nahi** hoti.  
- Ek **naya function** return hota hai jiska `this` permanently `thisArg` se lock ho jata hai.  
- Baad mein jab us naye function ko call karte hain, toh `this` wahi rehta hai.  
- Pehle arguments bhi “pre-fill” (partial application) ho sakte hain. [wohotech](https://wohotech.in/subjects/javascript-complete-guide/advanced-javascript/call-vs-apply-vs-bind)

Common use:

- Event handlers mein `this` fix rakhna.
- Callbacks jahan context lose ho sakta hai.
- Reusable functions with fixed context banana. [dev](https://dev.to/satyasootar/the-magic-of-this-call-apply-and-bind-e0e)

***

## Side-by-side comparison

| Method  | Kab call hota hai? | Arguments kaise? | Return kya? | Typical use |
|--------|-------------------|------------------|-------------|-------------|
| `call`  | Immediately       | Individual (`a, b, c`) | Function ka result | One-off call with specific `this` |
| `apply` | Immediately       | Array (`[a, b, c]`)    | Function ka result | Jab arguments array mein hon |
| `bind`  | Later (returned fn) | Individual (pre-fill possible) | New bound function | Fixed `this` for callbacks, event handlers |

 [wohotech](https://wohotech.in/subjects/javascript-complete-guide/advanced-javascript/call-vs-apply-vs-bind)

***

## Practical examples

### 1) Method borrowing with `call` / `apply`

```js
const obj1 = {
  name: 'Alice',
  greet() {
    console.log('Hi, ' + this.name);
  }
};

const obj2 = { name: 'Bob' };

obj1.greet.call(obj2);   // Hi, Bob
obj1.greet.apply(obj2);  // Hi, Bob
```

- `obj1.greet` ko `obj2` ke context mein call kiya. [dev](https://dev.to/janmejaisingh/mastering-this-call-apply-and-bind-in-javascript-with-real-examples-54o5)

### 2) `bind` with event handler

```js
const button = document.querySelector('button');

const handler = {
  name: 'MyButton',
  handleClick() {
    console.log(this.name + ' clicked');
  }
};

button.addEventListener('click', handler.handleClick.bind(handler));
// `this` hamesha `handler` rahega
```

- Bina `bind` ke, `this` element pe chala jata; `bind` se fix ho jata hai. [dev](https://dev.to/satyasootar/the-magic-of-this-call-apply-and-bind-e0e)

***

## Interview-ready explanation (bolne ka style)

Agar interviewer pooche: **“Explain `call`, `apply`, and `bind`.”**

Tum bol sakte ho:

> All three methods are used to explicitly set the `this` value of a function.  
> `call` and `apply` invoke the function immediately with a given `this`. The only difference is that `call` takes arguments individually, while `apply` takes them as an array.  
> `bind` does not call the function; instead, it returns a new function with `this` permanently bound, which can be used later. This is very useful for event handlers and callbacks where the original `this` context might be lost. [wohotech](https://wohotech.in/subjects/javascript-complete-guide/advanced-javascript/call-vs-apply-vs-bind)

<!-- Agar chaho toh main next message mein 4–5 chhote “output guess” questions de sakta hoon jo exactly `call`/`apply`/`bind` + `this` wale interview traps hote hain. -->