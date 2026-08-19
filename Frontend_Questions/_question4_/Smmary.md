## 1) “What is a Promise in JavaScript?”
- *A Promise in JavaScript is an object that represents the eventual result of an asynchronous operation. It has three states: pending, fulfilled, and rejected. Once a Promise is settled (fulfilled or rejected), its state becomes immutable.*

- *We attach handlers using .then() for success, .catch() for errors, and .finally() for cleanup. Each .then() or .catch() returns a new Promise, which allows chaining. Promises help avoid callback hell and provide a structured way to handle async operations like API calls, timers, and file I/O.*

---

## 2) “What is async/await and how is it related to Promises?”
**async/await is syntax built on top of Promises to make asynchronous code look and behave more like synchronous code.**
- *An async function always returns a Promise.*
- *Inside an async function, await pauses the execution of that function until the Promise settles, without blocking the main thread.*
- *If the Promise fulfills, await returns the resolved value; if it rejects, it throws an error that can be caught with try/catch.*
- *This makes error handling and control flow clearer compared to long Promise chains, while still using the same underlying Promise mechanism and event loop.*

---
## 3) “When would you use Promise chaining vs async/await?”
- *I use Promise chaining when I need fine-grained control over each step or when composing utilities that return Promises.*
- *I prefer async/await for most application-level code because it’s more readable, easier to debug, and works well with try/catch for error handling.*
- *For parallel operations, I often combine both: start multiple Promises without awaiting, then use await Promise.all([...]) inside an async function.*

---
