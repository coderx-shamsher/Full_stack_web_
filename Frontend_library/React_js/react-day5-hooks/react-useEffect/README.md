`useEffect` wo hook hai jisse React component ke andar **side effects** handle kiye jaate hain – jaise API call, `setTimeout`, event listeners, console logs, DOM change, etc. [legacy.reactjs](https://legacy.reactjs.org/docs/hooks-effect.html)

UseEffect ko samajhne ke 4 main parts hain:  
1) useEffect kya hai (technical + easy words)  
2) Dependency array ka matlab (3 main patterns)  
3) Cleanup function (return wala part)  
4) Typical use cases + patterns + kya yaad rakhna hai  

***

## 1. useEffect kya hai?

### Technical

- Signature: `useEffect(effectFn, dependencyArray?)`  
- `effectFn` ek function hai jo **render ke baad** chalega. [w3schools](https://www.w3schools.com/react/react_useeffect.asp)
- Dependency array se decide hota hai **kab** chalega.  

React docs: “`useEffect` lets you synchronize your component with an external system.” [react](https://react.dev/reference/react/useEffect)

“External system” ka matlab kuch bhi jo React state/JS ke bahar hai:

- Browser DOM (document title change, `addEventListener`)  
- Network (fetch/axios request)  
- Timers (`setTimeout`, `setInterval`)  
- LocalStorage / SessionStorage, etc. [dmitripavlutin](https://dmitripavlutin.com/react-useeffect-explanation/)

### Easy (Hinglish) explanation

Socho tumhara component 2 kaam karta hai:

1. **UI banana** – JSX/HTML return karna (ye normal render part hai)  
2. **Side ka kaam** – API se data lana, log karna, timer lagana… ye sab useEffect me jaata hai  

Matlab:

- “UI draw karne ke baad, mujhe yeh extra kaam karna hai” → yehi useEffect hai.  

***

## 2. Dependency array – kab run hota hai?

Syntax:

```js
useEffect(() => {
  // effect code
}, [/* dependencies */]);
```

Second argument ke basis par 3 main behaviors hote hain. [stackoverflow](https://stackoverflow.com/questions/77009292/what-is-useeffect-in-react)

### 2.1 No dependency array → har render pe

```js
useEffect(() => {
  console.log("Runs on every render");
});
```

- Component jab bhi render ho (mount + har state/prop change) → effect chalega. [w3schools](https://www.w3schools.com/react/react_useeffect.asp)
- Real projects me ye pattern kam use hota hai, kyunki easily performance issue / infinite loop ban sakta hai.

### 2.2 Empty array `[]` → sirf mount (1 baar)

```js
useEffect(() => {
  console.log("Runs only on first render");
}, []);
```

- Component mount hote hi 1 baar chalega.  
- Unmount hote time sirf cleanup chalega (agar return diya ho to). [stackoverflow](https://stackoverflow.com/questions/77009292/what-is-useeffect-in-react)
- Typically:
  - initial fetch  
  - event listener add (and cleanup me remove)  
  - initial timer setup

### 2.3 Dependencies wala array `[a, b, ...]` → mount + jab-jab ye values badle

```js
useEffect(() => {
  console.log("Runs on first render and whenever count changes");
}, [count]);
```

- Pehli baar jab component banega (mount) → chalega  
- Jab-jab `count` change hoga → dobara chalega [react](https://react.dev/reference/react/useEffect)
- Agar multiple dependencies:

```js
useEffect(() => {
  // runs when searchTerm or page changes
}, [searchTerm, page]);
```

Rule of thumb:

- Har wo state/prop jis par effect depend karta hai, usko dependency array me daalna chahiye. [dmitripavlutin](https://dmitripavlutin.com/react-useeffect-explanation/)

***

## 3. Cleanup function (return inside useEffect)

Kuch effects ko “saaf” karna padta hai, nahi to memory leak / multiple listeners ho sakte hain. [legacy.reactjs](https://legacy.reactjs.org/docs/hooks-effect.html)

Examples:  
- `addEventListener` → later `removeEventListener`  
- `setInterval` → later `clearInterval`  
- WebSocket / subscription → later unsubscribe  

Pattern:

```js
useEffect(() => {
  console.log("Effect run");

  return () => {
    console.log("Cleanup run");
  };
}, [deps]);
```

Behavior:

- Mount:
  - effect chalega  
- Jab dependency change ho:
  - pehle **purane effect ka cleanup** chalega  
  - phir naya effect chalega  
- Jab component unmount ho:
  - last cleanup chalega. [legacy.reactjs](https://legacy.reactjs.org/docs/hooks-effect.html)

Example – event listener:

```js
useEffect(() => {
  const handleResize = () => {
    console.log(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

Isse:

- Mount: listener add,  
- Unmount: listener remove → memory leak nahi.

***

## 4. Most important real-world use cases

### 4.1 API call (fetch/axios) – on mount

```jsx
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        if (!cancelled) setUsers(data);
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    };

    load();

    return () => {
      cancelled = true; // simple cleanup flag
    };
  }, []); // sirf mount par

  if (error) return <p>Error: {error}</p>;
  if (!users.length) return <p>Loading...</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

Pattern yaad rakho:

- `useEffect(() => { async fn(); }, [])`  
- `try/catch` + state update  
- optional cancellation flag.

***

### 4.2 Value change par kuch sync karna (dependency array)

Example – document title update with count:

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]); // jab-jab count change ho
```

Yahan:

- Title hamesha latest `count` ke sath sync rehta hai. [w3schools](https://www.w3schools.com/react/react_useeffect.asp)

***

### 4.3 Timer / interval

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => clearInterval(id); // cleanup
}, []);
```

- Mount → interval start  
- Unmount → clear interval  
- Infinite loop / multiple intervals se bachne ke liye cleanup zaroori.

***

### 4.4 Subscriptions / websockets

```jsx
useEffect(() => {
  const socket = new WebSocket("wss://example.com");

  socket.onmessage = (event) => {
    console.log(event.data);
  };

  return () => {
    socket.close();
  };
}, []);
```

***

## 5. Common mistakes / infinite loop ka reason

### 5.1 Effect ke andar state set karna bina dhyaan ke

Example (galat pattern):

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1);
}, [count]);
```

Flow:

- count = 0 → effect chalta → `setCount(1)`  
- re-render with count = 1 → effect chalta → `setCount(2)`  
- … infinite loop.  

Isliye:

- Effect ke andar `setState` tab hi karo jab logically zaroori ho, aur dependency array carefully socho.

### 5.2 Dependencies ignore karna

Example:

```js
useEffect(() => {
  // using someVar but not in deps
  console.log(someVar);
}, []); // someVar is missing dep
```

- ESLint React hooks rule (`react-hooks/exhaustive-deps`) isliye hota hai ki ye galti pakdi ja sake.  
- Ideal: jitni values effect me use ho rahi hain aur time ke sath change sakti hain, unko dependency me daalo. [react](https://react.dev/reference/react/useEffect)

***

## 6. useEffect vs useLayoutEffect (bas naam se confuse mat ho)

Short note:

- `useEffect` → render ho chuka, browser ne paint kar diya, uske baad chalega.  
- `useLayoutEffect` → render ke turant baad, paint se pehle (zyaada advanced cases ke liye).  

Beginner / normal apps me **useEffect hi kaafi** hai.

***

## 7. What you really need to remember (for interviews + projects)

1. **Definition (1 line)**  
   - `useEffect` = “run side effects after render (API calls, subscriptions, timers, DOM updates), optionally cleanup on change/unmount.”

2. **3 dependency patterns** (yaad rakhlo):

   ```js
   // 1) Har render
   useEffect(() => {
     // ...
   });

   // 2) Sirf mount/unmount
   useEffect(() => {
     // ...
   }, []);

   // 3) Mount + jab dependencies change ho
   useEffect(() => {
     // ...
   }, [value1, value2]);
   ```

3. **Cleanup pattern**

   ```js
   useEffect(() => {
     // subscribe / add listener / start timer

     return () => {
       // unsubscribe / remove listener / clear timer
     };
   }, [deps]);
   ```

4. **Typical React usage**

   - `useEffect + []` → initial data fetch, 1‑time setup  
   - `useEffect + [state]` → state change pe external system sync (title, storage, API refetch)  
   - Always guard against infinite loops when `setState` useEffect ke andar ho.

5. **Mindset**

   - Render function sirf **UI describe** kare.  
   - useEffect sirf **side ka kaam (side-effects)** rakhe.  
   - Dono alag rakhoge to code clean aur predictable rahega.

***

Agar tum chaho, next message me main tumhe:

- 3–4 **practice questions** de sakta hoon (small tasks) jahan tum khud `useEffect` likhoge:  
  - API call,  
  - timer based counter,  
  - window resize listener,  
  - document title sync.


---

In React, **mount** means the component is being created and shown on the screen for the first time. **Unmount** means the component is being removed from the screen and destroyed. [legacy.reactjs](https://legacy.reactjs.org/docs/hooks-effect.html)
## Easy meaning
Think of a component like a guest entering and leaving a room:

- **Mount** = guest enters the room for the first time.
- **Unmount** = guest leaves the room and is no longer there.

So in React:

- When a component appears in the UI, it is **mounted**.
- When it disappears from the UI, it is **unmounted**. [legacy.reactjs](https://legacy.reactjs.org/docs/hooks-effect.html)
## How `useEffect` connects to mount and unmount
`useEffect` is the place where you run code after the component appears, and where you clean things up before it leaves. React docs describe effects as code that runs after render, and cleanup as the function you return from the effect. [legacy.reactjs](https://legacy.reactjs.org/docs/hooks-effect.html)

Basic pattern:

```jsx
useEffect(() => {
  // runs when component mounts

  return () => {
    // runs when component unmounts
  };
}, []);
```
## Deep but simple explanation
### 1) Mount
When a component mounts:

- React creates the component.
- React puts it into the DOM.
- The screen shows it.
- `useEffect(() => {}, [])` runs after that first render. [legacy.reactjs](https://legacy.reactjs.org/docs/hooks-effect.html)

Example:

```jsx
useEffect(() => {
  console.log("Component mounted");
}, []);
```

This means:  
“Run this code once when the component appears.”
### 2) Unmount
When a component unmounts:

- React removes it from the DOM.
- The UI element disappears.
- If your effect returned a cleanup function, React runs that cleanup first. [legacy.reactjs](https://legacy.reactjs.org/docs/hooks-effect.html)

Example:

```jsx
useEffect(() => {
  console.log("Mounted");

  return () => {
    console.log("Unmounted");
  };
}, []);
```

This means:

- first show component → `Mounted`
- later remove component → `Unmounted`
## Real life example
Suppose you add a window resize listener:

```jsx
useEffect(() => {
  const handleResize = () => {
    console.log(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

What happens:

- **Mount**: listener is added.
- **Unmount**: listener is removed.

Why remove it?  
Because if you don’t, the listener stays active even after the component is gone, which can cause memory leaks or bugs. [legacy.reactjs](https://legacy.reactjs.org/docs/hooks-effect.html)
## Very simple timeline
```text
Component appears  -> mount
useEffect runs     -> after mount
Component disappears -> unmount
cleanup runs       -> before unmount finishes
```

If dependencies change, cleanup can also run **before the effect runs again**, not only on final unmount. [dev](https://dev.to/prototyp/react-useeffect-explained-with-lifecycle-methods-296n)
## Important note about `[]`
When you write:

```jsx
useEffect(() => {
  console.log("run once");
}, []);
```

You are telling React:

- run this effect after the first mount
- do not rerun it on updates
- cleanup only when component unmounts [legacy.reactjs](https://legacy.reactjs.org/docs/hooks-effect.html)
## Common confusion
Many beginners think `useEffect` cleanup only means unmount. That is not fully correct. Cleanup runs:

- when the component unmounts, and
- before the effect runs again if dependencies change. [dev](https://dev.to/prototyp/react-useeffect-explained-with-lifecycle-methods-296n)
## Summary in easy words
- **Mount** = component comes on screen for first time.
- **Unmount** = component is removed from screen.
- `useEffect(..., [])` = run once after mount.
- `return () => {}` inside `useEffect` = cleanup when unmount happens. [legacy.reactjs](https://legacy.reactjs.org/docs/hooks-effect.html)

A good way to remember it:

- **Mount = start**
- **Unmount = stop**
- **Cleanup = clean the room before leaving**

Would you like a small React code example with a button that mounts/unmounts a component so you can see it visually?