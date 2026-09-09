## Generators in JavaScript – simple & interview-ready

**Short professional answer (20–30 sec):**

> A generator in JavaScript is a special function that can **pause its execution** and later **resume from where it left off**, producing a sequence of values over time.  
> It’s declared with `function*` and uses the `yield` keyword to yield values one by one.  
> Calling a generator function returns a **generator object**, which is an iterator with a `next()` method. Each `next()` call resumes execution until the next `yield` and returns `{ value, done }`.  
> Generators enable lazy evaluation, custom iterators, infinite sequences, and were historically used to manage async flows before `async/await`. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

***

## 1) Basic syntax

```js
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

- `function*` → generator function declaration. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- `yield` → execution pause karta hai aur ek value return karta hai. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)
- `gen.next()` → next value nikalne ke liye call karte hain. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

***

## 2) Key properties

- **Pausable & resumable:**  
  Function beech mein ruk jati hai (`yield` pe), aur next `next()` call pe wahan se continue hoti hai. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

- **State retention:**  
  Local variables, scope, execution position sab preserve rehta hai across `yield`s. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

- **Iterator protocol:**  
  Generator object automatically iterator hota hai:  
  `next()` → `{ value: ..., done: true/false }`. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

- **Lazy evaluation:**  
  Values tab generate hote hain jab `next()` call hota hai, pehle se array nahi banta. [xjavascript](https://www.xjavascript.com/blog/difference-between-async-await-and-es6-yield-with-generators/)

***

## 3) Infinite sequence example

```js
function* infiniteNumbers() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const nums = infiniteNumbers();

console.log(nums.next().value); // 0
console.log(nums.next().value); // 1
console.log(nums.next().value); // 2
// ... can go on forever
```

- Yahan poori infinite list memory mein nahi banti; values on-demand generate hote hain. [blog.openreplay](https://blog.openreplay.com/10-js-interview-questions-testing/)

***

## 4) Using `for...of` with generators

Generators iterable bhi hote hain, isliye `for...of` use kar sakte hain:

```js
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const n of range(1, 5)) {
  console.log(n); // 1,2,3,4,5
}
```

- `for...of` internally `next()` call karta hai jab tak `done: true` na ho jaye. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

***

## 5) Two-way communication (`next(value)`)

`next()` mein value pass karke `yield` expression ko resume kar sakte hain:

```js
function* echo() {
  const a = yield 'first';
  const b = yield 'second: ' + a;
  return 'final: ' + b;
}

const g = echo();

console.log(g.next());          // { value: 'first', done: false }
console.log(g.next('hello'));   // { value: 'second: hello', done: false }
console.log(g.next('world'));   // { value: 'final: world', done: true }
```

- Pehla `next()` → `yield 'first'` tak execute, `value = 'first'`.  
- Dusra `next('hello')` → `a = 'hello'` set hota hai, phir next `yield` tak.  
- Aise hi caller aur generator ke beech data exchange hota hai. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

***

## 6) `yield*` – delegating to another generator

```js
function* inner() {
  yield 1;
  yield 2;
}

function* outer() {
  yield* inner(); // delegate
  yield 3;
}

console.log([...outer()]); // [1, 2, 3]
```

- `yield*` se ek generator dusre generator ko delegate kar sakta hai. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

***

## 7) Generators vs async/await (interview favorite)

- **Generators (`function*`, `yield`):**
  - Execution externally control hoti hai (`next()` caller ke haath mein).  
  - Custom iterators, lazy sequences, infinite streams, pausable workflows ke liye.  
  - Historically promises ke saath use hote the async control ke liye (e.g., `redux-saga`). [blog.openreplay](https://blog.openreplay.com/10-js-interview-questions-testing/)

- **Async/await (`async`, `await`):**
  - Promises pe built, I/O aur async operations ke liye.  
  - Execution internally promise chain se control hoti hai.  
  - Zyadatar async code ke liye preferred. [blog.openreplay](https://blog.openreplay.com/10-js-interview-questions-testing/)

Simple rule:

> Use **async/await** for async I/O.  
> Use **generators** for custom iterators, lazy/infinite sequences, and externally controlled flows. [blog.openreplay](https://blog.openreplay.com/10-js-interview-questions-testing/)

***

## 8) Interview-ready explanation (bolne ka style)

Agar interviewer pooche: **“What are generators in JavaScript?”**

Tum bol sakte ho:

> A generator is a special function declared with `function*` that can pause its execution at each `yield` and resume later.  
> Calling a generator function returns a generator object, which is an iterator with a `next()` method. Each `next()` call runs the function until the next `yield` and returns an object with `value` and `done`.  
> This allows lazy evaluation, custom iteration protocols, infinite sequences, and fine-grained control over execution.  
> Before `async/await`, generators were also used with promises to manage async flows, but today they’re mainly used for iterators and lazy sequences. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

Agar chaho toh main next message mein ek chhota “generator cheat-sheet” code snippet de sakta hoon jisme basic, infinite, `yield*`, aur two-way communication examples ek saath ho.

---
***

## `yield*` – delegating to another generator (easy theory + code)

### 1) Pehle basic idea: `yield` kya karta hai?

```js
function* counter() {
  yield 1;
  yield 2;
  yield 3;
}

const g = counter();

console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: false }
```

- `yield` = “abhi ke liye ruk jao, ye value do, aur jab next `next()` call ho tab se continue karo.” [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

***

### 2) `yield*` ka simple meaning

**`yield*` = “saare values jo ye dusra generator dega, ek-ek karke forward kar do.”**

Matlab: ek generator ke andar dusre generator ko **delegate** kar dete ho. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

***

## 3) Without `yield*` (manual way)

```js
function* inner() {
  yield 1;
  yield 2;
  yield 3;
}

function* outerManual() {
  // manually inner ke saare values nikal kar yield karna
  for (const value of inner()) {
    yield value;
  }
  yield 4;
}

const g = outerManual();

console.log([...g]); // [1, 2, 3, 4]
```

- `inner()` ek generator hai.  
- `outerManual` uske saare values ko `for...of` se iterate karke ek-ek karke `yield` kar raha hai.  
- Kaam ho raha hai, par code thoda zyada hai. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

***

## 4) With `yield*` (short & clean)

```js
function* inner() {
  yield 1;
  yield 2;
  yield 3;
}

function* outerWithStar() {
  yield* inner(); // inner ke saare values auto-forward
  yield 4;
}

const g = outerWithStar();

console.log([...g]); // [1, 2, 3, 4]
```

- `yield* inner()` likhne se:
  - Jab `outerWithStar` run hota hai, `inner()` start hota hai.
  - `inner` ke har `yield` ka value directly `outerWithStar` ke caller tak pahunchta hai.
  - Jab `inner` finish (`done: true`) hota hai, tab `outerWithStar` aage badhta hai (`yield 4`). [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

Output same hai, par code clean aur clear hai.

***

## 5) Step-by-step `next()` ke saath dekho

```js
function* inner() {
  console.log('inner start');
  yield 1;
  yield 2;
  console.log('inner end');
}

function* outer() {
  console.log('outer start');
  yield* inner();
  console.log('outer end');
  yield 100;
}

const g = outer();

console.log('--- call 1 ---');
console.log(g.next()); 
// outer start
// inner start
// { value: 1, done: false }

console.log('--- call 2 ---');
console.log(g.next()); 
// { value: 2, done: false }

console.log('--- call 3 ---');
console.log(g.next()); 
// inner end
// outer end
// { value: 100, done: false }

console.log('--- call 4 ---');
console.log(g.next()); 
// { value: undefined, done: true }
```

- `yield* inner()` ke baad:
  - Pehle `outer` start.
  - Phir `inner` start, uske `yield` values aate hain.
  - `inner` finish → `outer` resume → `yield 100`. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

***

## 6) Realistic example: tree traversal

Maan lo tumhare paas nested structure hai (jaise folder → subfolders):

```js
const tree = {
  name: 'root',
  children: [
    { name: 'A' },
    {
      name: 'B',
      children: [
        { name: 'B1' },
        { name: 'B2' }
      ]
    },
    { name: 'C' }
  ]
};

// Generator jo tree ko flat list mein convert kare
function* traverse(node) {
  yield node.name;
  if (node.children) {
    for (const child of node.children) {
      yield* traverse(child); // delegate to child generator
    }
  }
}

console.log([...traverse(tree)]);
// ['root', 'A', 'B', 'B1', 'B2', 'C']
```

- `traverse` khud ko recursively call kar raha hai.  
- `yield* traverse(child)` se har child ke saare values automatically outer generator mein aa jate hain.  
- Bina `yield*` ke tumhe manually `for...of` ya recursion handle karna padta, code zyada complex hota. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

***

## 7) Why do we need generators at all?

Generators ka main use:

1. **Custom iterators banana**  
   - Apna iteration logic define karna (e.g., custom data structures, trees, graphs).  
   - `for...of` ke saath clean syntax milta hai. [medium](https://medium.com/@contactmanoharbatra/generator-functions-vs-async-await-24270dc7bee0)

2. **Lazy evaluation / on-demand values**  
   - Values tab generate hote hain jab zaroorat ho.  
   - Memory bachti hai, especially large ya infinite sequences ke liye. [medium](https://medium.com/@contactmanoharbatra/generator-functions-vs-async-await-24270dc7bee0)

3. **Infinite sequences**  
   - Example: infinite numbers, Fibonacci stream, etc.  
   - Array bana ke rakhna impossible hota, generator on-demand deta hai. [medium](https://medium.com/@contactmanoharbatra/generator-functions-vs-async-await-24270dc7bee0)

4. **Externally controlled execution**  
   - Execution ko step-by-step control karna (pause/resume).  
   - Historically async control (promises + generators) ke liye use hota tha (e.g., `redux-saga`). [medium](https://medium.com/@contactmanoharbatra/generator-functions-vs-async-await-24270dc7bee0)

5. **Clean composition with `yield*`**  
   - Complex iteration logic ko chhote-chhote generators mein tod kar compose karna.  
   - `yield*` se ek generator dusre ko delegate kar sakta hai, code modular rehta hai. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

***

## 8) Interview-style short answer

Agar interviewer pooche:  
**“What is `yield*` and why do we use generators?”**

Tum bol sakte ho:

> `yield*` is used to delegate iteration to another generator. It automatically yields all values from the inner generator to the outer generator’s caller, without writing an explicit loop.  
> We use generators to create custom iterators, implement lazy or infinite sequences, and have fine-grained, pausable control over execution. They’re useful for complex iteration logic (like tree traversal) and were historically used to manage async flows before `async/await`. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

Agar chaho toh main next message mein ek chhota “generator + yield* cheat-sheet” code block de sakta hoon jo tum notes mein copy-paste kar sako.