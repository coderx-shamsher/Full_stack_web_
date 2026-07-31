## App Setup code 

```sh

## project setup npm command
npm create vite 

# for setup the requirements / node modules 
npm install --ignore-scripts && npm clean-install 

```

# <<<<<< --- Hooks in React js  ---- >>>>>>

- useState -> state ko manage krne k liye 

- useEffect -> side effects handle krne k liye (jaise API calls, DOM manipluation, event listener etc )

- useContext -> global state ko consume krne k liye wihout props drilling 

- useReducer -> complex state management k liye (redux jaisa chhota version )

- useRef  -> mutable values hold krne k liye jo re-render trigger na karein, ya DOM access krne k liye 

- useMemo & useCallback -> optimization k liye. unnecessary re-renders avoid krne k liye. 


React Hooks basically allow **function components** to do things that earlier only class components could do: manage state, side‑effects, context, refs, memoization, etc. [legacy.reactjs](https://legacy.reactjs.org/docs/hooks-overview.html)

You do **not** need to master all hooks. For modern frontend work, focus on: `useState`, `useEffect`, `useRef`, `useContext`, `useReducer`, `useMemo`, `useCallback`. [youtube](https://www.youtube.com/watch?v=LOH1l-MP_9k)

Below, for each hook I’ll give:
1) technical + easy definition  
2) important use cases (technical + easy words)  
3) small code examples  
4) what you must remember  

***

## 1. useState

### 1) Definition

- Technical: `useState` lets a component hold local **state** (a value that can change over time and causes re‑render when updated). [react](https://react.dev/reference/react/hooks)
- Easy: “Component ke andar variable jisko React track kare aur UI automatically update ho jab wo value change ho.”

### 2) Use cases

- Track things like: input value, toggles, counters, modal open/close, selected tab, etc. [medium](https://medium.com/@info_80576/react-hooks-explained-with-real-examples-2025-guide-171646f5749c)
- Simple UI state where update logic is not very complex.

### 3) Example

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // [value, setter]

  const increment = () => setCount((prev) => prev + 1);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}
```

### 4) What to remember

- Hooks top‑level pe call karo, loops/if ke andar nahi. [w3schools](https://www.w3schools.com/react/react_hooks.asp)
- Setter ke andar **function form** (`setX(prev => ...)`) use karo jab nayi value old value par depend karti ho.  
- `useState` mostly for simple / local UI state.

***

## 2. useEffect

### 1) Definition

- Technical: `useEffect` lets a component run **side effects** after render: sync with external systems (network, DOM, subscriptions, timers, etc.). [medium](https://medium.com/@info_80576/react-hooks-explained-with-real-examples-2025-guide-171646f5749c)
- Easy: “Jab UI render/update ho jaye, uske baad koi kaam karna ho (API call, event listener, timer), wo yahan likhte hai.”

### 2) Use cases

- Fetch data when component mounts.  
- Set up / clean up event listeners (`resize`, `scroll`).  
- Sync document title, localStorage, analytics, etc. [youtube](https://www.youtube.com/watch?v=6wf5dIrryoQ)

### 3) Examples

**Fetch on mount**

```jsx
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/users")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setUsers(data);
      });

    return () => {
      cancelled = true; // cleanup
    };
  }, []); // [] = only once on mount

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

**Effect on specific state change**

```jsx
useEffect(() => {
  document.title = `Count is ${count}`;
}, [count]); // jab count change ho
```

### 4) What to remember

- Dependencies array:
  - `[]` → sirf mount/unmount pe.  
  - `[value]` → jab wo value change ho.  
  - no array → har render pe (usually avoid). [legacy.reactjs](https://legacy.reactjs.org/docs/hooks-overview.html)
- Cleanup function `return () => { ... }` for removing listeners, cancelling timers, etc.  
- Avoid putting every logic in `useEffect`; many cheezein direct render / event handlers me ho sakti hain.

***

## 3. useRef

### 1) Definition

- Technical: `useRef` returns a mutable `.current` object that **persists across renders** but **does not trigger re‑render** when changed. [react](https://react.dev/reference/react/hooks)
- Easy: “Aisi value ya DOM element jisko yaad rakhna hai, par jiske change par UI dobara render nahi chahiye.”

### 2) Use cases

- Access DOM node (focus input, measure size, etc.).  
- Store mutable values like timer ID, previous values, counters that shouldn’t re‑render. [medium](https://medium.com/@info_80576/react-hooks-explained-with-real-examples-2025-guide-171646f5749c)

### 3) Examples

**Focus input**

```jsx
import { useRef } from "react";

function FocusInput() {
  const inputRef = useRef(null);

  const focus = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focus}>Focus</button>
    </>
  );
}
```

**Store previous value**

```jsx
import { useEffect, useRef } from "react";

function Example({ value }) {
  const prevValueRef = useRef(value);

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  return (
    <div>
      <p>Current: {value}</p>
      <p>Previous: {prevValueRef.current}</p>
    </div>
  );
}
```

### 4) What to remember

- `.current` change se re‑render nahi hota.  
- DOM access ke liye `ref` + `ref={inputRef}`.  
- Don’t overuse `useRef` for state that actually affects UI; uske liye `useState` hi use karo.

***

## 4. useContext

### 1) Definition

- Technical: `useContext` lets a component read and subscribe to a **context value** without prop drilling. [react](https://react.dev/reference/react/hooks)
- Easy: “Global data (theme, current user, language, config) jo deep children ko chahiye, props chain ke bina directly provide karna.”

### 2) Use cases

- Theme (light/dark).  
- Authenticated user / token.  
- Global settings, feature flags, locale. [medium](https://medium.com/@info_80576/react-hooks-explained-with-real-examples-2025-guide-171646f5749c)

### 3) Example

**Create context + provider**

```jsx
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const toggle = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

**Use context in child**

```jsx
function ThemeButton() {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <button onClick={toggle}>
      Current theme: {theme}
    </button>
  );
}
```

### 4) What to remember

- 2 steps: `createContext` + `Provider`, phir `useContext` se read. [react](https://react.dev/reference/react/hooks)
- Context ko sirf truly shared/global cheezon ke liye use karo, har cheez context me mat daalo.  
- Large apps me context ke saath `useReducer` ya dedicated state libraries bhi use hote hain.

***

## 5. useReducer

### 1) Definition

- Technical: `useReducer` is an alternative to `useState` for **complex state logic**, where state updates are described by a reducer `(state, action) => newState`. [medium](https://medium.com/@info_80576/react-hooks-explained-with-real-examples-2025-guide-171646f5749c)
- Easy: “Jab state complicated ho (like form, cart), to saari update logic ek function me likh dete ho, aur usse actions ke through state change hota hai.”

### 2) Use cases

- Complex forms, multiple fields.  
- Shopping cart, wizards, multi‑step UI flows.  
- When state transitions are important and you want a clear log of actions.

### 3) Example

```jsx
import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>
        +
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>
    </div>
  );
}
```

### 4) What to remember

- Same pattern as Redux: **state + action + reducer**.  
- Prefer `useReducer` over `useState` when:
  - multiple related state values ho,
  - or state update logic complex ho. [react](https://react.dev/reference/react/hooks)

***

## 6. useMemo

### 1) Definition

- Technical: `useMemo` memoizes (caches) the **result of a computation** until its dependencies change. [react](https://react.dev/reference/react/hooks)
- Easy: “Koi heavy calculation hai, har render pe dubara calculate nahi karna; sirf jab inputs change ho tab hi dobara compute karo.”

### 2) Use cases

- Expensive calculations (filtering/aggregating huge arrays).  
- Derived data from props/state jise bar‑bar compute karna costly ho. [medium](https://medium.com/@info_80576/react-hooks-explained-with-real-examples-2025-guide-171646f5749c)

### 3) Example

```jsx
import { useMemo, useState } from "react";

function FilteredList({ items }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    console.log("Filtering...");
    return items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filtered.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </>
  );
}
```

### 4) What to remember

- `useMemo(() => expensiveThing, [deps])`.  
- Sirf tab use karo jab performance issue ho ya future me ho sakta ho; unnecessary memoization code clutter create karta hai. [medium](https://medium.com/@info_80576/react-hooks-explained-with-real-examples-2025-guide-171646f5749c)

***

## 7. useCallback

### 1) Definition

- Technical: `useCallback` memoizes a **function reference** so that its identity stays stable as long as dependencies don’t change. [react](https://react.dev/reference/react/hooks)
- Easy: “Function ko bar‑bar naya create nahi karna, same function instance reuse karna (usually child component optimization ke liye).”

### 2) Use cases

- Jab memoized child components (`React.memo`) ya expensive effects iss function par depend karte hain.  
- Event handlers jo children ko props ke through pass ho rahe hain. [medium](https://medium.com/@info_80576/react-hooks-explained-with-real-examples-2025-guide-171646f5749c)

### 3) Example

```jsx
import { useCallback, useState } from "react";

const List = React.memo(function List({ items, onItemClick }) {
  console.log("List render");
  return items.map((item) => (
    <button key={item} onClick={() => onItemClick(item)}>
      {item}
    </button>
  ));
});

function Parent() {
  const [selected, setSelected] = useState(null);
  const items = ["a", "b", "c"];

  const handleItemClick = useCallback((item) => {
    setSelected(item);
  }, []);

  return (
    <>
      <p>Selected: {selected}</p>
      <List items={items} onItemClick={handleItemClick} />
    </>
  );
}
```

Without `useCallback`, `handleItemClick` har render me naya function hota, jisse `List` unnecessary re‑render karta. [react](https://react.dev/reference/react/hooks)

### 4) What to remember

- `useCallback(fn, deps)` ≈ `useMemo(() => fn, deps)`.  
- Performance optimization tool hai, pehle problem measure karo, phir use karo; har function ko `useCallback` me lapetna zaroori nahi. [medium](https://medium.com/@info_80576/react-hooks-explained-with-real-examples-2025-guide-171646f5749c)

***

## 8. Other useful hooks (quick view)

Short description only — learn deeply later when needed. [react](https://react.dev/reference/react/hooks)

- **`useLayoutEffect`**  
  DOM change ke turant baad sync run hota (paint se pehle); rarely needed, specific layout measurement cases ke liye.  
- **`useTransition`, `useDeferredValue`**  
  Concurrent features: heavy updates ko low‑priority bana dena (e.g. typing vs expensive list render).  
- **`useId`**  
  Unique IDs generate karne ke liye (accessibility, label‑for, etc.).  
- **Custom hooks**  
  Apne hooks: `function useSomething() { ... }` jo multiple components me logic share karte hain. [youtube](https://www.youtube.com/watch?v=6wf5dIrryoQ)

***

## 9. Kitne hooks realistically master karne hain?

For a modern React / Next.js dev, **priority list**:

### Must‑know (daily use)

1. **`useState`** – local state, most common.  
2. **`useEffect`** – side effects: API/fetch, listeners, timers, syncing.  
3. **`useRef`** – DOM refs + non‑reactive values.  
4. **`useContext`** – global info (auth, theme, settings).  
5. **`useReducer`** – complex state (forms, carts, wizards). [medium](https://medium.com/@info_80576/react-hooks-explained-with-real-examples-2025-guide-171646f5749c)

### Nice‑to‑know (performance & patterns)

6. **`useMemo`** – expensive calculations.  
7. **`useCallback`** – stable function identity for optimized children. [react](https://react.dev/reference/react/hooks)

### Later / on‑demand

- `useLayoutEffect`, `useTransition`, `useDeferredValue`, `useId`, `useSyncExternalStore`, custom hooks. [youtube](https://www.youtube.com/watch?v=LOH1l-MP_9k)

***

## 10. What you must remember for your next journey

1. **Hooks are just functions** that give function components superpowers (state, side‑effects, context, refs). [w3schools](https://www.w3schools.com/react/react_hooks.asp)
2. **Rules of hooks** (very important):
   - Only call hooks:
     - inside React function components or custom hooks,  
     - at the top level (no loops, no conditions). [w3schools](https://www.w3schools.com/react/react_hooks.asp)
3. **Mental model**:
   - `useState` → “what is my UI showing / holding?”  
   - `useEffect` → “kya external world se connect/sync karna hai?”  
   - `useRef` → “kya mujhe DOM ya non‑render value store karni hai?”  
   - `useContext` → “kya mujhe global shared value chahiye bina prop drilling ke?”  
   - `useReducer` → “kya state logic complex/branchy hai?”  
   - `useMemo` / `useCallback` → “kya performance issue aa raha hai jisko memoization se solve kar sakte hain?” [medium](https://medium.com/@info_80576/react-hooks-explained-with-real-examples-2025-guide-171646f5749c)

If you want, next step me main tumhare liye **mini React app** ka example bana sakta hoon jisme ye saare core hooks ek sath use hon:  
- `useState` + `useReducer` for state,  
- `useEffect` for API call,  
- `useContext` for theme,  
- `useRef` for focus,  
- `useMemo` / `useCallback` for filter list performance.