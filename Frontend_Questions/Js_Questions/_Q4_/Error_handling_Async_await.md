# Question -> 
   ##  How does async/await handle errors?

## How `async/await` handles errors – simple & interview-ready

**Short professional answer (20–30 sec):**

> In `async/await`, errors are handled using **`try/catch` blocks**, just like synchronous code.  
> When you `await` a promise that rejects, JavaScript **throws the rejection reason as an exception** at the `await` point, which can be caught by the nearest `catch` block.  
> Errors thrown inside an `async` function automatically become **rejected promises**, so callers can handle them with `try/catch` or `.catch()`.  
> Unhandled rejections in `async` functions become **unhandled promise rejections**, which should be caught at a higher boundary to avoid silent failures. [leyaa](https://leyaa.ai/codefly/learn/javascript/part-3/javascript-error-handling-with-async-and-await/deep)

***

## 1) Basic pattern: `try/catch` around `await`

```js
async function fetchUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    // handle error or rethrow
  }
}
```

Key points:

- `await` pe promise reject hua → wo exception ki tarah throw hota hai. [leyaa](https://leyaa.ai/codefly/learn/javascript/part-3/javascript-error-handling-with-async-and-await/deep)
- `try/catch` us exception ko catch kar leta hai, jaise sync code mein hota hai. [leyaa](https://leyaa.ai/codefly/learn/javascript/part-3/javascript-error-handling-with-async-and-await/deep)
- `async` function hamesha promise return karta hai; error bhi rejected promise ban ke caller tak jata hai. [leyaa](https://leyaa.ai/codefly/learn/javascript/part-3/javascript-error-handling-with-async-and-await/deep)

***

## 2) How errors propagate in `async` functions

### Case 1: Rejected promise via `await`

```js
async function getUser() {
  const res = await fetch('/api/user'); // reject ho sakta hai
  return res.json();
}

// Caller side
getUser()
  .then(user => console.log(user))
  .catch(err => console.error('Error:', err));
```

- Agar `fetch` reject hua → `await` us error ko throw karta hai.  
- `getUser` ke andar `try/catch` nahi hai → error automatically rejected promise ban ke caller tak propagate hota hai. [leyaa](https://leyaa.ai/codefly/learn/javascript/part-3/javascript-error-handling-with-async-and-await/deep)

### Case 2: Explicit `throw` inside `async`

```js
async function getUser(id) {
  if (!id) {
    throw new Error('ID is required');
  }
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}
```

- `throw` inside `async` function → returned promise reject ho jata hai us error se.  
- Caller waise hi handle karega jaise promise rejection handle karta hai. [leyaa](https://leyaa.ai/codefly/learn/javascript/part-3/javascript-error-handling-with-async-and-await/deep)

***

## 3) What `try/catch` actually catches (and what it doesn’t)

### Catches:

- Rejected promises jo **`await` kiye gaye hain** `try` block ke andar. [leyaa](https://leyaa.ai/codefly/learn/javascript/part-3/javascript-error-handling-with-async-and-await/deep)
- Synchronous errors jo `try` block ke andar hain (e.g., JSON parse error). [jsinterview](https://jsinterview.dev/concepts/js/async-await-error-handling)

```js
async function load() {
  try {
    const res = await fetch('/api/data');
    const json = await res.json(); // parse error bhi catch hoga
    return json;
  } catch (err) {
    console.error(err);
  }
}
```

### Does NOT catch:

- **Unawaited promises** jo `try` block ke andar start hui hain par `await` nahi ki gayi. [leyaa](https://leyaa.ai/codefly/learn/javascript/part-3/javascript-error-handling-with-async-and-await/deep)

```js
async function badExample() {
  try {
    fetch('/api/data'); // ❌ await nahi, rejection catch nahi hoga
  } catch (err) {
    console.error(err); // ye kabhi run nahi hoga for fetch rejection
  }
}
```

- Timers, event handlers, ya callbacks jo baad mein execute honge. [vectraops](https://vectraops.com/content/javascript-promise-error-handling-with-asyncawait/)

***

## 4) Common patterns

### 1) Local error handling (recover & continue)

```js
async function loadUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to load user, using fallback');
    return { id, name: 'Guest' }; // fallback value
  }
}
```

- Error locally handle, fallback return. [leyaa](https://leyaa.ai/codefly/learn/javascript/part-3/javascript-error-handling-with-async-and-await/deep)

### 2) Catch, log, and rethrow

```js
async function loadUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    return await res.json();
  } catch (err) {
    console.error('Load user error:', err);
    throw err; // caller ko decide karne do
  }
}
```

- Cleanup/logging yahan, decision upar chhod do. [illuminations-for-developers](https://illuminations-for-developers.com/2025/12/31/async-await-and-error-handling/)

### 3) Top-level boundary (centralized handling)

```js
async function main() {
  try {
    await loadUser(1);
    await loadPosts(1);
  } catch (err) {
    // centralized error handling
    console.error('App error:', err);
    showGlobalErrorUI();
  }
}
```

- Saare async operations ke errors ek jagah handle. [illuminations-for-developers](https://illuminations-for-developers.com/2025/12/31/async-await-and-error-handling/)

### 4) Multiple parallel promises

```js
async function loadAll() {
  try {
    const [users, posts] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json())
    ]);
    return { users, posts };
  } catch (err) {
    // koi ek bhi reject → pura Promise.all reject
    console.error('Failed to load all:', err);
    throw err;
  }
}
```

- `Promise.all` → ek bhi reject → turant reject. [frontprep](https://www.frontprep.com/conceptual/errors-in-async-operations)

Agar sab results chahiye (failures ke saath):

```js
async function loadAllSettled() {
  const results = await Promise.allSettled([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);

  results.forEach((res, i) => {
    if (res.status === 'fulfilled') {
      console.log('Success', i, res.value);
    } else {
      console.error('Failed', i, res.reason);
    }
  });
}
```

- `Promise.allSettled` → har promise ka result (success/failure) milta hai. [frontprep](https://www.frontprep.com/conceptual/errors-in-async-operations)

***

## 5) `async/await` vs Promise `.catch()`

### Promise style:

```js
fetch('/api/user')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### `async/await` style:

```js
async function load() {
  try {
    const res = await fetch('/api/user');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

- Dono same kaam karte hain; `async/await` zyada readable aur linear lagta hai. [jsinterview](https://jsinterview.dev/concepts/js/async-await-error-handling)
- `async/await` mein aap sync-style `try/catch` use kar sakte ho, jo complex chains se better hai. [jsinterview](https://jsinterview.dev/concepts/js/async-await-error-handling)

***

## 6) Common pitfalls (interview traps)

1. **Forgetting to `await`**

   ```js
   async function bad() {
     try {
       fetch('/api/data'); // ❌ no await
     } catch (e) {
       // never catches fetch rejection
     }
   }
   ```

   - `try/catch` sirf awaited promises ko catch karta hai. [leyaa](https://leyaa.ai/codefly/learn/javascript/part-3/javascript-error-handling-with-async-and-await/deep)

2. **Mixing `await` and `.catch()` incorrectly**

   ```js
   // okay, but be clear what you’re doing
   const data = await fetch('/api/data')
     .then(r => r.json())
     .catch(err => {
       console.error(err);
       return null;
     });
   ```

   - Ye valid hai, lekin logic clear honi chahiye. [jsinterview](https://jsinterview.dev/concepts/js/async-await-error-handling)

3. **Unhandled rejections at top level**

   ```js
   async function init() {
     await loadUser(1); // reject → unhandled if no catch
   }

   init(); // no .catch, no try/catch around call
   ```

   - Production mein `unhandledrejection` handler zaroor lagao. [jsinterview](https://jsinterview.dev/concepts/js/async-error-boundaries)

***

## 7) Interview-ready explanation (bolne ka style)

Agar interviewer pooche: **“How does async/await handle errors?”**

Tum bol sakte ho:

> In `async/await`, errors are handled using `try/catch` blocks, just like synchronous code.  
> When you `await` a promise that rejects, JavaScript throws the rejection reason as an exception at the `await` point, which can be caught by the nearest `catch` block.  
> Errors thrown inside an `async` function automatically become rejected promises, so callers can handle them with `try/catch` or `.catch()`.  
> It’s important to `await` promises inside `try/catch`; otherwise, rejections won’t be caught and can become unhandled promise rejections. For multiple parallel operations, we often use `Promise.all` wrapped in `try/catch`, or `Promise.allSettled` when we need every result regardless of failure. [leyaa](https://leyaa.ai/codefly/learn/javascript/part-3/javascript-error-handling-with-async-and-await/deep)

<!-- Agar chaho toh main next message mein ek chhota “async error handling patterns” cheat-sheet code de sakta hoon jo tum notes mein copy-paste kar sako. -->