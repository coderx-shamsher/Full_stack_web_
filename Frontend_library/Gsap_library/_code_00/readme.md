## Lecture 1: Getting Started with GSAP (Vanilla HTML/CSS/JS)

We’ll cover:

1. What GSAP is and why use it  
2. How to include GSAP (with and without CDN)  
3. Basic concepts: `to`, `from`, `fromTo`, `timeline`  
4. Simple box animation examples (good vs bad patterns)  
5. Key things to keep in mind while using GSAP  

***

## 1. What is GSAP?

**GSAP (GreenSock Animation Platform)** is a high-performance JavaScript animation library.

Key points:

- Works in all modern browsers.
- Extremely fast and optimized.
- Great for:
  - Animating elements on page load
  - Scroll-based animations
  - Complex sequences and timelines
  - Interactive animations (hover, click, etc.)

Core ideas:

- You select DOM elements (like with `document.querySelector`).
- You tell GSAP **what properties to animate** and **for how long**.
- GSAP handles the interpolation (smooth change over time).

***

## 2. Including GSAP in Your Project

### 2.1 Using CDN (easiest for learning)

Create an `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GSAP Basics</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 2rem;
      background: #0f172a;
      color: #e2e8f0;
    }

    .box {
      width: 100px;
      height: 100px;
      background: #38bdf8;
      margin: 20px 0;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <h1>GSAP Basics</h1>
  <div class="box box1"></div>
  <div class="box box2"></div>
  <div class="box box3"></div>

  <!-- GSAP CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

Then create `script.js` next to it.

Key line:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

This loads GSAP globally as `gsap`.

***

### 2.2 Without CDN (npm / local file)

If you later use a bundler (Vite, Webpack, etc.):

```bash
npm install gsap
```

In your JS:

```js
import gsap from "gsap";
```

For now, with vanilla HTML/CSS/JS, **CDN is perfectly fine** and simpler.

***

## 3. Basic GSAP Concepts

### 3.1 `gsap.to()` – animate from current state to a target state

Syntax:

```js
gsap.to(target, vars);
```

- `target`: CSS selector, element, or array of elements.
- `vars`: object with properties like `x`, `y`, `opacity`, `duration`, `ease`, etc.

Example: move a box to the right and fade it out.

```js
// script.js
const box1 = document.querySelector(".box1");

gsap.to(box1, {
  x: 300,           // move 300px to the right
  opacity: 0.5,
  rotation: 45,
  duration: 1.5,
  ease: "power2.out",
});
```

This animates `.box1` from its current position to `x: 300`, with rotation and opacity change over 1.5 seconds.

***

### 3.2 `gsap.from()` – animate from a starting state to current state

Useful for “enter” animations.

```js
const box2 = document.querySelector(".box2");

gsap.from(box2, {
  x: -300,
  opacity: 0,
  duration: 1,
  ease: "back.out(1.7)",
});
```

Interpretation:

- Start at `x: -300`, `opacity: 0`
- Animate to the element’s current CSS position and full opacity.

So the box “flies in” from the left.

***

### 3.3 `gsap.fromTo()` – specify both start and end explicitly

Use when you want full control over start and end.

```js
const box3 = document.querySelector(".box3");

gsap.fromTo(
  box3,
  {
    x: -200,
    opacity: 0,
    scale: 0.5,
  },
  {
    x: 200,
    opacity: 1,
    scale: 1,
    duration: 2,
    ease: "elastic.out(1, 0.5)",
  }
);
```

Here:

- First object = **from** values
- Second object = **to** values

Box starts left, small, invisible → moves right, normal size, visible, with an elastic effect.

***

## 4. Timelines – sequencing animations

When you have multiple animations that need order/overlap, use a **timeline**.

```js
const tl = gsap.timeline();

tl
  .from(".box1", {
    x: -300,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  })
  .from(".box2", {
    x: -300,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  }, "-=0.6") // start 0.6s before previous ends
  .from(".box3", {
    x: -300,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  }, "-=0.6");
```

What happens:

- `.box1` animates in.
- `.box2` starts before `.box1` finishes (overlap).
- `.box3` starts before `.box2` finishes.

This creates a smooth staggered entrance.

You can also use `stagger` instead of manual offsets:

```js
gsap.from(".box", {
  x: -300,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  stagger: 0.3, // 0.3s delay between each .box
});
```

This animates all `.box` elements one after another.

***

## 5. Complete Minimal Example (HTML + JS)

`index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GSAP Lecture 1</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 2rem;
      background: #0b1220;
      color: #e5e7eb;
    }

    .container {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 40px;
    }

    .box {
      width: 100px;
      height: 100px;
      background: #22d3ee;
      border-radius: 10px;
    }

    .box1 { background: #22d3ee; }
    .box2 { background: #a78bfa; }
    .box3 { background: #f472b6; }
  </style>
</head>
<body>
  <h1>GSAP Basics – Vanilla JS</h1>
  <p>Watch the boxes animate on load.</p>

  <div class="container">
    <div class="box box1"></div>
    <div class="box box2"></div>
    <div class="box box3"></div>
  </div>

  <!-- GSAP CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

`script.js`:

```js
// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  // 1. Simple to()
  gsap.to(".box1", {
    x: 200,
    rotation: 45,
    duration: 1.5,
    ease: "power2.out",
  });

  // 2. Simple from()
  gsap.from(".box2", {
    y: -150,
    opacity: 0,
    duration: 1.2,
    ease: "back.out(1.7)",
  });

  // 3. Timeline with fromTo()
  const tl = gsap.timeline({ delay: 0.5 });

  tl.fromTo(
    ".box3",
    {
      scale: 0.2,
      opacity: 0,
      rotation: -90,
    },
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 1.4,
      ease: "elastic.out(1, 0.6)",
    }
  );
});
```

Key points:

- We wrap everything in `DOMContentLoaded` so the DOM is ready before we query elements.
- We use selectors directly in GSAP (`".box1"`, `".box2"`, etc.).
- We use `delay` on timeline to avoid all animations starting at the exact same millisecond.

***

## 6. Good vs Bad Code Patterns (Vanilla JS + GSAP)

### Bad: Running animations before DOM is ready

```js
// BAD: might run before .box exists
const box = document.querySelector(".box");
gsap.from(box, { x: -200, opacity: 0 });
```

If this script runs in `<head>` before the element exists, `box` is `null` → error.

**Good:**

```js
document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector(".box");
  gsap.from(box, { x: -200, opacity: 0, duration: 1 });
});
```

Or put `<script>` at the end of `<body>` (as we did).

***

### Bad: Creating timelines inside scroll/resize handlers without control

```js
// BAD concept (don’t do this)
window.addEventListener("scroll", () => {
  const tl = gsap.timeline();
  tl.from(".box", { y: 100, opacity: 0 });
});
```

Problems:

- New timeline created on every scroll event → hundreds of timelines.
- Performance dies; animations fight each other.

**Good pattern (concept for now):**

- Create timeline once.
- Use GSAP’s **ScrollTrigger** plugin to tie animations to scroll (we’ll cover in a later lecture).

For now, just remember: **create timelines once, not inside frequent callbacks**.

***

### Bad: Animating layout-heavy properties unnecessarily

```js
// Not ideal for continuous animation
gsap.to(".box", {
  width: 300,
  height: 300,
  top: 200,
  left: 200,
  duration: 2,
});
```

Animating `width`, `height`, `top`, `left` forces layout recalculation → can be janky.

**Better:**

```js
gsap.to(".box", {
  x: 200,
  y: 200,
  scale: 1.5,
  opacity: 1,
  duration: 2,
  ease: "power2.out",
});
```

Use `transform`-based properties (`x`, `y`, `scale`, `rotation`, `opacity`) whenever possible.

***

## 7. Things to Keep in Mind While Using GSAP

1. **Load order matters**
   - GSAP script must load before your `script.js` that uses `gsap`.

2. **DOM readiness**
   - Either:
     - Put your `<script>` at the end of `<body>`, or
     - Wrap code in `DOMContentLoaded`.

3. **Use transform-based properties**
   - Prefer: `x`, `y`, `scale`, `rotation`, `opacity`.
   - Avoid animating `width`, `height`, `top`, `left` for motion.

4. **Name your timelines if things get complex**
   - Helps debugging:

   ```js
   const heroTl = gsap.timeline();
   ```

5. **Start simple**
   - First master `to`, `from`, simple timelines.
   - Then move to scroll, interactions, complex choreography.

***

## Your Turn

Try this:

1. Create `index.html` and `script.js` as above.
2. Run it in your browser.
3. Modify:
   - Colors of boxes
   - Distances (`x`, `y`)
   - Durations and eases (`"power1.out"`, `"bounce.out"`, etc.)

Next lecture, we can do:

- More advanced timeline patterns (labels, pauses, repeats)
- Click/hover-based animations
- Simple scroll-triggered animations with ScrollTrigger

Tell me what you want next:  
“Lecture 2: timelines deep dive” or “Lecture 2: interactions (click/hover) with GSAP” or “Lecture 2: scroll animations with ScrollTrigger”.