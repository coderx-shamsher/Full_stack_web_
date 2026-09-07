# Question ->
### _Explain promises and async/await_

## js Promise

  - *JavaScript Promises make handling asynchronous operations like API calls, file loading, or time delays easier. Think of a Promise as a placeholder for a value that will be available in the future. It can be in one of three states*

  - *In JavaScript, a Promise is an object representing the eventual completion or failure of an asynchronous operation. It acts as a temporary placeholder for a value that is not available right away but will be delivered at some point in the future.Using promises allows you to write non-blocking asynchronous code (like API data fetches or file uploads) without falling into "callback hell," which consists of deeply nested, unreadable functions.*

  - **promise yan toh esi time resolved hoga (eventual completion) yan vo fail hojayega (failure of an asynchronous operation, keoki promises are async )**

### The Three Promise States

_A Promise always exists in one of three mutually exclusive states:_

- **Pending:** The initial state; the asynchronous operation is still running and has not finished yet.
- **Fulfilled:** The operation completed successfully, and the promise now holds the resulting value. 
- **Rejected:** The operation failed, and the promise holds a reason or error object explaining why.Once a promise is either fulfilled or rejected, it is considered settled and its state can never change again

---
## How to Create and Consume a Promise
- *You construct a promise using the new Promise constructor. It requires an "executor" function that takes two callback arguments: resolve (for success) and reject (for failure)*

```js 

// Creating a Promise
const checkServerStatus = new Promise((resolve, reject) => {
  let isServerUp = true; // Simulating a condition

  if (isServerUp) {
    resolve("Server is running smoothly!"); // Moves state to Fulfilled
  } else {
    reject("Server is down."); // Moves state to Rejected
  }
});

// Consuming the Promise
checkServerStatus
  .then((message) => {
    console.log("Success: " + message); // Runs if resolved
  })
  .catch((error) => {
    console.error("Error: " + error); // Runs if rejected
  })
  .finally(() => {
    console.log("Operation complete."); // Runs no matter what
  });

```

--- 

## 1) Promise kya hai?
*Promise = ek object jo represent karta hai:*

  - “Ek value abhi nahi, par future mein milegi (ya error aayega).”

**Promise ke 3 states hote hain:**

   - Pending – operation abhi chal raha hai (na resolve, na reject).

   - Fulfilled (Resolved) – operation successfully complete, ek value mili.

   - Rejected – operation fail, ek reason/error mila.

**Ek promise sirf ek baar state change karta hai:**
- pending → fulfilled ya pending → rejected. Phir state lock ho jati hai


--- 

## Promise kaise banate hain?

```js 
const p = new Promise((resolve, reject) => {
  // async kaam yahan
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('data mil gaya');
    } else {
      reject(new Error('kuch gadbad ho gayi'));
    }
  }, 1000);
});

```
- resolve(value) → promise fulfilled.

- reject(error) → promise rejected.

## Promise use kaise karte hain?

```js

p
.then((value) => {
    console.log('success:', value);
  })
  .catch((err) => {
    console.error('error:', err);
  })
  .finally(() => {
    console.log('ye hamesha chalega');
  });
```
- .then(onFulfilled) – success handle.

- .catch(onRejected) – error handle.

- .finally() – cleanup (hamesha chalta hai).

---

### 2) Promise + Event Loop (microtask queue)
*Jab promise settle (fulfilled/rejected) hota hai, toh uske .then / .catch callbacks turant nahi chalte.*
- Wo microtask queue mein jate hain.
- Jab call stack empty hota hai, event loop pehle saare microtasks drain karta hai, phir macrotasks (setTimeout, etc.).

Isliye:

``` js
console.log('1');

Promise.resolve()
  .then(() => console.log('2'));

console.log('3');

```
```text
Output: 1 3 2

1, 3 → sync (call stack).

2 → microtask (promise .then)
```

---
***

## Modern Alternative: 
> *Async/AwaitWhile .then() and .catch() work well, modern developers often consume promises using async and await keywords. This approach provides a syntax that reads like synchronous code while preserving non-blocking performance*

### Code Comparison
**Old Way: Promise Chaining**
```js
function getUserData() {
  fetch("https://example.com")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}
```

**New Way: Async / Awaitjavascript**

```js
async function getUserData() {
  try {
    // Execution pauses here until fetch resolves
    const response = await fetch("https://example.com"); 
    
    // Execution pauses here until json parses
    const data = await response.json(); 
    
    console.log(data);
  } catch (error) {
    // Catches network errors and json parsing errors
    console.error(error); 
  }
}

```

---


## async / await kya hai?
**async/await = Promises ke upar syntax sugar, taaki asynchronous code synchronous jaisa dikhe.**

**async function**
 - async keyword function ke aage lagta hai.
 - Har async function hamesha Promise return karta hai.

```js
async function getData() {
  return 'hello'; // internally: Promise.resolve('hello')
}

getData().then(console.log); // 'hello'
```

- Agar aap manually promise return karo, toh bhi wahi hota hai:

```js
async function getData() {
  return Promise.resolve('hello');
}

```
**await keyword**
- await sirf async function ke andar use hota hai (top-level await ES modules mein allowed hai).

 - await promise → us promise ke settle hone tak us async function ki execution pause ho jati hai, par poora JS thread block nahi hota.

- Promise fulfill hua → await uski value return karta hai.

 - Promise reject hua → await error throw karta hai (jo try/catch se handle karte hain).


---

```js 
async function fetchUser() {
  const res = await fetch('/user');       // pause till fetch resolves
  const data = await res.json();          // pause till json parses
  return data;
}

fetchUser()
  .then((user) => console.log(user))
  .catch((err) => console.error(err));

```
---
***
---

Chalo ekdum simple example se samajhte hain ki **har `.then()` / `.catch()` naya promise return karta hai**, isliye chain banti hai. [tech-interview](https://tech-interview.dev/tech/javascript/promises)

***

## 1) Basic promise

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('step 1 complete');
  }, 1000);
});
```

Ab isko use karte hain:

```js
p
  .then((value) => {
    console.log(value);          // 'step 1 complete'
    return 'step 2 complete';    // ye value naye promise ko resolve karegi
  })
  .then((value) => {
    console.log(value);          // 'step 2 complete'
    return 'step 3 complete';
  })
  .then((value) => {
    console.log(value);          // 'step 3 complete'
  });
```

Output (time ke saath):

- 1 sec baad: `step 1 complete`
- turant baad: `step 2 complete`
- turant baad: `step 3 complete`

Yahan:

- `p` → pehla promise.
- `p.then(...)` → **naya promise** return karta hai.
- Us naye promise pe `.then(...)` lagaya → aur naya promise.
- Aise hi chain banti gayi. [tech-interview](https://tech-interview.dev/tech/javascript/promises)

***

## 2) Har `.then()` naya promise kaise banata hai?

Socho:

```js
const p1 = new Promise((resolve) => {
  setTimeout(() => resolve(10), 1000);
});

const p2 = p1.then((value) => {
  console.log('p1 resolved:', value); // 10
  return value * 2;                   // 20
});

const p3 = p2.then((value) => {
  console.log('p2 resolved:', value); // 20
  return value + 5;                   // 25
});

p3.then((value) => {
  console.log('p3 resolved:', value); // 25
});
```

Yahan:

- `p1` → original promise (resolve hota hai `10` se).
- `p2 = p1.then(...)` → **naya promise** jo resolve hoga `20` se.
- `p3 = p2.then(...)` → **aur naya promise** jo resolve hoga `25` se.

Har `.then()` ek **naya promise** return karta hai, isliye hum `p1 → p2 → p3` chain bana pa rahe hain. [tech-interview](https://tech-interview.dev/tech/javascript/promises)

***

## 3) Agar `.then()` se kuch return na karein?

```js
const p = Promise.resolve(10);

p
  .then((value) => {
    console.log(value); // 10
    // kuch return nahi kiya → implicitly undefined return hota hai
  })
  .then((value) => {
    console.log(value); // undefined
  });
```

- Pehla `.then()` kuch return nahi karta → uska returned promise **`undefined`** se resolve hota hai.
- Dusra `.then()` ko `undefined` milta hai.

Toh har `.then()` hamesha **kisi na kisi value se resolve hone wala naya promise** return karta hai (chahe `undefined` ho). [tech-interview](https://tech-interview.dev/tech/javascript/promises)

***

## 4) Agar `.then()` se promise return karein?

```js
const p1 = Promise.resolve(10);

const p2 = p1.then((value) => {
  console.log('p1:', value); // 10
  // naya promise return kar rahe hain
  return new Promise((resolve) => {
    setTimeout(() => resolve(value * 2), 1000);
  });
});

p2.then((value) => {
  console.log('p2:', value); // 20 (1 sec baad)
});
```

Yahan:

- `p1` → `10` se resolve.
- `p1.then(...)` ke andar hum **naya promise** return kar rahe hain.
- `p2` us **naye promise** ko “wait” karta hai, phir resolve hota hai `20` se.

Isi wajah se hum async operations ko chain kar sakte hain:  
`fetch → json → process → save` sab `.then()` chain mein. [tech-interview](https://tech-interview.dev/tech/javascript/promises)

***

## 5) `.catch()` bhi naya promise return karta hai

```js
Promise.reject(new Error('kuch gadbad'))
  .catch((err) => {
    console.log('error pakda gaya:', err.message);
    return 'default value'; // error handle karke normal value return
  })
  .then((value) => {
    console.log('ab sab theek:', value); // 'default value'
  });
```

- `Promise.reject(...)` → rejected promise.
- `.catch(...)` → error handle karta hai aur **naya (fulfilled) promise** return karta hai (`'default value'` se).
- Uske baad `.then()` chain normal tarike se chalti hai. 
***

## 6) Simple analogy

- Har `.then()` / `.catch()` = ek **naya dabba** (naya promise) jo agle step ke liye value taiyar karta hai.
- Tum ek dabbe se dusre dabbe tak value pass karte jaate ho → yahi **chain** hai. 

---

## Sequential vs Parallel execution (bahut important interview topic)

## 1) Real-life analogy pehle

Socho tumhe 2 kaam karne hain:

- **Kaam A:** Pani ubaalna (5 min)
- **Kaam B:** Chai patti daal ke chai banana (2 min)

### Sequential (ek ke baad ek)

1. Pehle pani ubaalo → 5 min
2. Phir chai banao → 2 min  
**Total = 7 min**

### Parallel (ek saath)

Agar tumhare paas 2 stove ho:

- Ek stove pe pani ubaal rahe ho
- Dusre stove pe kuch aur kaam chal raha ho  
Toh dono kaam **ek saath** chal sakte hain.

JS mein bhi aisa hi hota hai:  
- **Sequential** = ek request complete hone ka wait, phir next start.  
- **Parallel** = dono requests ek saath start, dono ka result baad mein use. 
***

## 2) Fake API calls se example

Maan lo ye do function hain jo “fake API call” simulate karte hain:

```js
function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('✅ User fetched');
      resolve({ id: 1, name: 'Alice' });
    }, 1000); // 1 second
  });
}

function fetchPosts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('✅ Posts fetched');
      resolve(['post1', 'post2', 'post3']);
    }, 1000); // 1 second
  });
}
```

Dono ko 1 second lagta hai.

***

## 3) Sequential execution (ek ke baad ek)

```js
async function getDataSequential() {
  console.log('⏳ Sequential start');

  const user = await fetchUser();   // 1 sec wait
  const posts = await fetchPosts(); // phir 1 sec wait

  console.log('User:', user);
  console.log('Posts:', posts);
  console.log('⏳ Sequential end');
}

getDataSequential();
```

**Kya ho raha hai?**

1. `fetchUser()` call → 1 sec wait → `user` milta hai.
2. Uske baad `fetchPosts()` call → 1 sec wait → `posts` milte hain.

**Total time ≈ 2 seconds**

Console output (roughly):

```text
⏳ Sequential start
✅ User fetched
✅ Posts fetched
User: { id: 1, name: 'Alice' }
Posts: ['post1', 'post2', 'post3']
⏳ Sequential end
```

Yahan `fetchPosts()` tab start hua jab `fetchUser()` already complete ho chuka tha. [frontendprep](https://www.frontendprep.io/questions/javascript/async-await)

***

## 4) Parallel execution (ek saath)

```js
async function getDataParallel() {
  console.log('⏳ Parallel start');

  const userPromise = fetchUser();   // start now
  const postsPromise = fetchPosts(); // start now (don’t await yet)

  const user = await userPromise;    // wait for user
  const posts = await postsPromise;  // wait for posts

  console.log('User:', user);
  console.log('Posts:', posts);
  console.log('⏳ Parallel end');
}

getDataParallel();
```

**Kya ho raha hai?**

1. `fetchUser()` call → turant start (1 sec timer chal gaya).
2. Turant `fetchPosts()` call → ye bhi turant start (dusra 1 sec timer chal gaya).
3. Ab dono promises ek saath chal rahe hain.
4. `await userPromise` → jab user ready, use karo.
5. `await postsPromise` → jab posts ready, use karo.

**Total time ≈ 1 second** (kyunki dono ek saath chal rahe hain)

Console output (roughly):

```text
⏳ Parallel start
✅ User fetched
✅ Posts fetched
User: { id: 1, name: 'Alice' }
Posts: ['post1', 'post2', 'post3']
⏳ Parallel end
```

Yahan dono API calls **ek saath start** hui, isliye time bacha. [thetshaped](https://thetshaped.dev/p/javascript-interview-questions-promises-async-await-event-loop-demystified)

***

## 5) `Promise.all` se parallel + ek saath wait

```js
async function getDataParallelWithAll() {
  console.log('⏳ Parallel with Promise.all start');

  const userPromise = fetchUser();
  const postsPromise = fetchPosts();

  const [user, posts] = await Promise.all([userPromise, postsPromise]);

  console.log('User:', user);
  console.log('Posts:', posts);
  console.log('⏳ Parallel with Promise.all end');
}

getDataParallelWithAll();
```

- `Promise.all([...])` → saare promises ek saath chalenge.
- Jab **sab** fulfill ho jayenge, tab `await` resolve hoga.
- Koi ek bhi reject → `Promise.all` reject ho jayega. [yashkapure](https://www.yashkapure.com/en/blog/javascript-promises-async-await-microtasks/)

Time phir bhi ≈ 1 second.

***

## 6) Kab sequential use karein, kab parallel?

### Sequential use karo jab:

- Dusri request **pehli request ke result pe depend** karti ho.

Example:

```js
async function getUserPosts(userId) {
  // Pehle user details chahiye, phir uske posts
  const user = await fetch(`/users/${userId}`).then((r) => r.json());
  const posts = await fetch(`/posts?authorId=${user.id}`).then((r) => r.json());
  return { user, posts };
}
```

Yahan `posts` fetch karne ke liye `user.id` chahiye, toh **sequential** hi hoga. [frontendprep](https://www.frontendprep.io/questions/javascript/async-await)

### Parallel use karo jab:

- Requests **independent** hon (ek dusre pe depend na karti hon).

Example:

```js
async function getDashboardData() {
  const userPromise = fetch('/user').then((r) => r.json());
  const postsPromise = fetch('/posts').then((r) => r.json());
  const statsPromise = fetch('/stats').then((r) => r.json());

  const [user, posts, stats] = await Promise.all([
    userPromise,
    postsPromise,
    statsPromise,
  ]);

  return { user, posts, stats };
}
```

Teen alag endpoints, kisi ko kisi ki value nahi chahiye → **parallel** best hai. [thetshaped](https://thetshaped.dev/p/javascript-interview-questions-promises-async-await-event-loop-demystified)

***

## 7) Interview-style short explanation

Agar interviewer pooche:

> “Sequential vs Parallel execution in async/await?”

Tum bol sakte ho:

- **Sequential:**  
  `await` ek ke baad ek likhne se pehla operation complete hone ka wait karta hai, phir next start hota hai. Total time = sum of all times. Use karte hain jab next call previous result pe depend kare. [frontendprep](https://www.frontendprep.io/questions/javascript/async-await)

- **Parallel:**  
  Pehle saare promises ko bina `await` ke start karo, phir `await Promise.all([...])` ya alag-alag `await` use karo. Sab operations ek saath chalenge. Total time ≈ max of all times. Use karte hain jab calls independent hon. [thetshaped](https://thetshaped.dev/p/javascript-interview-questions-promises-async-await-event-loop-demystified)

Agar chaho toh main next message mein ek chhota “time diagram” text mein bana ke de sakta hoon:  
`0s ---- 1s ---- 2s` wale format mein, taaki sequential vs parallel visually clear ho jaye.

