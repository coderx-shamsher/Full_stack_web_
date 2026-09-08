## Debouncing vs Throttling – simple & interview-ready

**Short professional answer (20–30 sec):**

> Debouncing and throttling are two techniques to **control how often a function runs** when it’s attached to high-frequency events like `input`, `scroll`, `resize`, or `mousemove`.  
> - **Debounce:** Delays execution until there’s a **pause** in events; the function runs **once after the last event**.  
> - **Throttle:** Ensures the function runs **at most once per fixed interval**, no matter how many events fire.  
> Both improve performance and reduce unnecessary work, but they’re used in different scenarios. [iocombats](https://iocombats.com/interview-questions/javascript/advanced-concepts/debouncing-and-throttling)

***

## 1) Debouncing – “wait till activity stops”

**Idea:**  
Jab events bahut tezi se aa rahe hon (jaise typing), toh har event pe function mat chalao.  
Instead, har event pe timer reset karo, aur jab events **ruk jayein** for `delay` ms, tab function chalao. [iocombats](https://iocombats.com/interview-questions/javascript/advanced-concepts/debouncing-and-throttling)

**Use cases:**

- Search input (API call sirf jab user type karna band kare).  
- Window resize (layout calculation sirf resize end pe).  
- Button double-click prevention. [iocombats](https://iocombats.com/interview-questions/javascript/advanced-concepts/debouncing-and-throttling)

### Basic debounce implementation

```js
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId); // purana timer cancel
    timeoutId = setTimeout(() => {
      fn.apply(this, args);  // original function call
    }, delay);
  };
}
```

**Usage example (search input):**

```js
const input = document.querySelector('#search');

function handleSearch(e) {
  console.log('Search for:', e.target.value);
  // API call yahan
}

const debouncedSearch = debounce(handleSearch, 300);

input.addEventListener('input', debouncedSearch);
```

- Har keystroke pe `debouncedSearch` call hota hai.  
- Lekin `handleSearch` sirf tab chalega jab 300ms tak koi naya event na aaye. [iocombats](https://iocombats.com/interview-questions/javascript/advanced-concepts/debouncing-and-throttling)

***

## 2) Throttling – “fixed interval pe chalao”

**Idea:**  
Events kitne bhi tezi se aayein, function ko **har `interval` ms mein max ek baar** hi chalao.  
Beech ke events ignore ho jate hain. [iocombats](https://iocombats.com/interview-questions/javascript/advanced-concepts/debouncing-and-throttling)

**Use cases:**

- Scroll events (analytics, lazy loading).  
- Resize events (continuous updates).  
- Mouse move (drag, parallax). [iocombats](https://iocombats.com/interview-questions/javascript/advanced-concepts/debouncing-and-throttling)

### Basic throttle implementation (timestamp-based)

```js
function throttle(fn, interval) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCall >= interval) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}
```

**Usage example (scroll):**

```js
const scrollHandler = () => {
  console.log('Scroll at:', window.scrollY);
  // Analytics / lazy load logic
};

const throttledScroll = throttle(scrollHandler, 200);

window.addEventListener('scroll', throttledScroll);
```

- Scroll event har pixel pe fire ho sakta hai.  
- Lekin `scrollHandler` max har 200ms mein ek baar chalega. [iocombats](https://iocombats.com/interview-questions/javascript/advanced-concepts/debouncing-and-throttling)

***

## 3) Side-by-side comparison

| Aspect        | Debounce                              | Throttle                              |
|---------------|----------------------------------------|----------------------------------------|
| Kab run hota? | Events **rukne ke baad** (end pe)     | Events ke **dauran** fixed interval pe |
| Kitni baar?   | **Once** after burst stops            | **Multiple times**, but limited rate   |
| Typical use   | Search, resize-end, double-click      | Scroll, resize-during, mousemove       |
| Behavior      | “Wait till quiet, then run”           | “Run at most once per N ms”            |

 [iocombats](https://iocombats.com/interview-questions/javascript/advanced-concepts/debouncing-and-throttling)

**Easy analogy:**

- **Debounce:** Kisi se baat karte waqt uski baat khatam hone ka wait karna, phir reply dena.  
- **Throttle:** Har 5 second mein ek baar reply dena, chahe wo kitna bhi bolta rahe. [dev](https://dev.to/sizan_mahmud0_e7c3fd0cb68/debouncing-vs-throttling-in-javascript-a-simple-story-based-guide-for-interview-success-1k7g)

***

## 4) Interview-style explanation (bolne ka style)

Agar interviewer pooche: **“Explain debouncing and throttling with implementation.”**

Tum bol sakte ho:

> Both debouncing and throttling are used to limit how often a function runs for high-frequency events.  
> Debouncing delays execution until there’s a pause in events. Every new call clears the previous timer and starts a new one, so the function runs only once after the last event. It’s useful for search inputs and resize-end logic.  
> Throttling ensures the function runs at most once per fixed interval. We track the last execution time and only call the function if enough time has passed. It’s useful for scroll, resize, and mousemove events. [iocombats](https://iocombats.com/interview-questions/javascript/advanced-concepts/debouncing-and-throttling)

Phir implementations bata sakte ho jo upar diye hain.

***

Agar chaho toh main next message mein:
- Debounce + throttle ka combined “cheat-sheet” code snippet bana ke de sakta hoon,  
- Ya 3–4 interview-style “which one to use: debounce or throttle?” scenarios with answers.