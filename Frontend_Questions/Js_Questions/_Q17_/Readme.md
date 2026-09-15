## Event Bubbling and Capturing – simple & interview-ready

**Short professional answer (25–35 sec):**

> When an event (like a click) happens on a nested element, the browser doesn’t just notify that element – it propagates the event through the DOM in **three phases**: **capturing**, **target**, and **bubbling**.  
> - **Capturing phase**: event travels **top → down** from `window`/`document` to the target’s parent.  
> - **Target phase**: event is on the actual element where it occurred.  
> - **Bubbling phase**: event travels **bottom → up** from the target back to `window`.  
> By default, `addEventListener` attaches handlers to the **bubbling phase**. If you pass `{ capture: true }` (or `true` as the third argument), the handler runs in the **capturing phase** instead.  
> `event.target` is always the element where the event originally happened; `event.currentTarget` is the element whose handler is currently running. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

***

## 1) Three phases of event propagation

Jab kisi nested element pe click hota hai, event dispatch **3 phases** mein hota hai: [singhteekam](https://www.singhteekam.in/blogs/javascriptseries47eventbubblingandcapturing)

1. **Capturing phase (top → down)**  
   - `window` → `document` → `<html>` → `<body>` → … → target ke parent tak.  
   - Is phase mein wo handlers chalte hain jo `{ capture: true }` ke saath register hain. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

2. **Target phase**  
   - Event actual target element pe pahunchta hai.  
   - Dono types ke handlers (capture aur bubble) target pe execute ho sakte hain (order depends on registration). [singhteekam](https://www.singhteekam.in/blogs/javascriptseries47eventbubblingandcapturing)

3. **Bubbling phase (bottom → up)**  
   - Target se wapas upar tak: parent → grandparent → … → `window`.  
   - By default, `addEventListener` yahi phase use karta hai. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

***

## 2) Simple example – bubbling vs capturing

HTML:

```html
<div id="grandparent">
  <div id="parent">
    <button id="child">Click me</button>
  </div>
</div>
```

JS:

```js
const gp = document.getElementById('grandparent');
const p = document.getElementById('parent');
const c = document.getElementById('child');

// Bubbling handlers (default)
gp.addEventListener('click', () => console.log('GP bubble'));
p.addEventListener('click', () => console.log('P bubble'));
c.addEventListener('click', () => console.log('C bubble'));

// Capturing handlers
gp.addEventListener('click', () => console.log('GP capture'), { capture: true });
p.addEventListener('click', () => console.log('P capture'), { capture: true });
c.addEventListener('click', () => console.log('C capture'), { capture: true });
```

Agar tum `<button id="child">` pe click karo, approximate order:

1. `GP capture`
2. `P capture`
3. `C capture`
4. `C bubble`
5. `P bubble`
6. `GP bubble`

- Capturing: top → down (grandparent → parent → child).  
- Target: child.  
- Bubbling: bottom → up (child → parent → grandparent). [singhteekam](https://www.singhteekam.in/blogs/javascriptseries47eventbubblingandcapturing)

***

## 3) `addEventListener` aur `capture` option

Syntax:

```js
element.addEventListener('click', handler, options);
// options can be:
// - boolean: true → capture, false → bubble (default)
// - object: { capture: true/false, once: true/false, passive: true/false }
```

Examples:

```js
// Bubbling (default)
elem.addEventListener('click', handler); 
// same as: { capture: false }

// Capturing
elem.addEventListener('click', handler, { capture: true });
// or: elem.addEventListener('click', handler, true);
```

- By default, handlers **bubbling phase** mein attach hote hain.  
- `{ capture: true }` dene se handler **capturing phase** mein attach hota hai. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

***

## 4) `event.target` vs `event.currentTarget`

- **`event.target`**:  
  - Hamesha wo element jahan event **actually hua** (jahan user ne click kiya).  
  - Propagation ke dauran change nahi hota. [singhteekam](https://www.singhteekam.in/blogs/javascriptseries47eventbubblingandcapturing)

- **`event.currentTarget`**:  
  - Wo element jiska handler **abhi execute** ho raha hai.  
  - Bubbling/capturing ke dauran har handler ke liye alag hota hai. [singhteekam](https://www.singhteekam.in/blogs/javascriptseries47eventbubblingandcapturing)

Example:

```js
p.addEventListener('click', (e) => {
  console.log('target:', e.target.id);         // 'child' (button)
  console.log('currentTarget:', e.currentTarget.id); // 'parent'
});
```

- Click child pe hua, par handler parent pe hai.  
- `target` = child, `currentTarget` = parent. [singhteekam](https://www.singhteekam.in/blogs/javascriptseries47eventbubblingandcapturing)

***

## 5) `stopPropagation()` and `stopImmediatePropagation()`

- **`e.stopPropagation()`**:  
  - Event ko aage propagate hone se rokta hai (na capturing mein aage down, na bubbling mein aage up).  
  - Baaki ancestors ke handlers nahi chalenge, lekin same element ke baaki handlers (same phase) chal sakte hain. [skillveris](https://www.skillveris.com/interview-questions/web-development/event-bubbling-vs-capturing)

- **`e.stopImmediatePropagation()`**:  
  - `stopPropagation()` + same element ke **baaki handlers** (same phase) bhi nahi chalenge. [skillveris](https://www.skillveris.com/interview-questions/web-development/event-bubbling-vs-capturing)

Example:

```js
c.addEventListener('click', (e) => {
  console.log('C bubble 1');
  e.stopPropagation(); // aage parent, grandparent ke bubble handlers nahi chalenge
});

c.addEventListener('click', () => {
  console.log('C bubble 2'); // ye chalega (same element, same phase, but after)
});

p.addEventListener('click', () => {
  console.log('P bubble'); // ye nahi chalega
});
```

***

## 6) Why does this matter? (interview angle)

- **Event delegation** bubbling pe depend karta hai (parent pe listener, child events bubble hoke aate hain). [skillveris](https://www.skillveris.com/interview-questions/web-development/event-bubbling-vs-capturing)
- Capturing ka use kam hota hai, par kabhi-kabhi:
  - Global behavior (analytics, logging) pehle capture karna ho.
  - Kisi library ko user handlers se pehle run karwana ho. [skillveris](https://www.skillveris.com/interview-questions/web-development/event-bubbling-vs-capturing)
- `target` vs `currentTarget` samajhna zaroori hai jab:
  - Delegation use ho.
  - Multiple nested handlers hon. [singhteekam](https://www.singhteekam.in/blogs/javascriptseries47eventbubblingandcapturing)

***

## 7) Interview-ready explanation (bolne ka style)

Agar interviewer pooche: **“Explain event bubbling and capturing.”**

Tum bol sakte ho:

> When an event occurs on a nested element, the browser propagates it in three phases: capturing, target, and bubbling.  
> In the capturing phase, the event travels from the top (`window`/`document`) down to the target’s parent. In the target phase, it’s on the actual element. In the bubbling phase, it travels back up from the target to the top.  
> By default, `addEventListener` attaches handlers to the bubbling phase. If we pass `{ capture: true }`, the handler runs in the capturing phase instead.  
> `event.target` is always the element where the event originally happened, while `event.currentTarget` is the element whose handler is currently executing. This model enables patterns like event delegation and controlled event handling. [developer.mozilla](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

Agar chaho toh main next message mein ek chhota “bubbling vs capturing” diagram-style text flow de sakta hoon jo tum notes mein copy-paste kar sako.