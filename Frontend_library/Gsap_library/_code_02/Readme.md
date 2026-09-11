## Lecture 2: GSAP Timelines Deep Dive + Click/Hover Interactions (Vanilla JS)

We’ll cover:

1. Timeline basics recap  
2. Advanced timeline features  
   - Labels  
   - Relative positions (`"<"`, `">"`, `-=`, `+=`)  
   - Repeats, yoyo, callbacks  
3. Click and hover interactions with GSAP  
4. Good vs bad patterns for interactions  
5. Mini project: animated cards with click/hover  

All examples are vanilla HTML/CSS/JS + GSAP via CDN.

***

## 1. Timeline Basics Recap

Basic timeline:

```js
const tl = gsap.timeline();

tl
  .from(".box1", { x: -300, opacity: 0, duration: 1 })
  .from(".box2", { x: -300, opacity: 0, duration: 1 }, "-=0.6")
  .from(".box3", { x: -300, opacity: 0, duration: 1 }, "-=0.6");
```

Key ideas:

- Animations run one after another by default.
- Third argument controls **position** in timeline:
  - `"-=0.6"` → start 0.6s before previous ends (overlap).
  - `"+=0.5"` → start 0.5s after previous ends (gap).
  - Exact number (e.g. `2`) → start at 2s from timeline start.

***

## 2. Advanced Timeline Features

### 2.1 Labels – naming points in time

Labels let you jump to specific moments and organize complex sequences.

```js
const tl = gsap.timeline();

tl
  .from(".box1", {
    x: -300,
    opacity: 0,
    duration: 1,
  })
  .add("startBoxes") // label
  .from(".box2", {
    x: -300,
    opacity: 0,
    duration: 1,
  })
  .from(".box3", {
    x: -300,
    opacity: 0,
    duration: 1,
  }, "startBoxes"); // start at label
```

Here:

- `.add("startBoxes")` creates a label at that point.
- The last `.from()` starts at the `"startBoxes"` label, so `.box2` and `.box3` animate together.

You can also use:

```js
tl.from(".box4", { y: 100, opacity: 0 }, "startBoxes+=0.3");
```

→ start 0.3s after the `"startBoxes"` label.

***

### 2.2 Relative position shortcuts: `"<"`, `">"`

Newer GSAP syntax:

- `"<"` → align with **start** of previous animation.
- `">"` → align with **end** of previous animation.

Example:

```js
const tl = gsap.timeline();

tl
  .from(".box1", { x: -300, opacity: 0, duration: 1 })
  .from(".box2", { x: -300, opacity: 0, duration: 1 }, "<") // start together with box1
  .from(".box3", { x: -300, opacity: 0, duration: 1 }, ">"); // start after box2 ends
```

So:

- `.box1` and `.box2` start together.
- `.box3` starts after `.box2` ends.

You can still combine with offsets:

```js
.from(".box3", { ... }, "<+=0.4"); // 0.4s after start of previous
```

***

### 2.3 Repeats and yoyo

Make a timeline loop:

```js
const tl = gsap.timeline({
  repeat: -1,      // -1 = infinite, 2 = twice, etc.
  yoyo: true,      // play forward then backward
  repeatDelay: 0.5,
});

tl
  .to(".box1", { x: 200, duration: 1 })
  .to(".box2", { x: 200, duration: 1 }, "<")
  .to(".box1", { x: 0, duration: 1 })
  .to(".box2", { x: 0, duration: 1 }, "<");
```

- `repeat: -1` → infinite loop.
- `yoyo: true` → goes forward then backward automatically.
- Useful for idle animations (floating elements, breathing effects).

***

### 2.4 Callbacks: `onComplete`, `onStart`, `onUpdate`

Run your own code at specific moments.

```js
const tl = gsap.timeline({
  onComplete: () => {
    console.log("Timeline finished");
  },
  onStart: () => {
    console.log("Timeline started");
  },
});

tl.to(".box1", { x: 200, duration: 1 });
```

Per-animation callbacks:

```js
tl.to(
  ".box2",
  {
    x: 200,
    duration: 1,
    onComplete: () => {
      console.log("Box2 animation done");
    },
  },
  "<"
);
```

Useful for:

- Triggering other logic after animation
- Adding classes
- Logging / analytics

***

## 3. Click Interactions with GSAP

### 3.1 Basic click animation

HTML:

```html
<button id="animateBtn">Animate Boxes</button>

<div class="container">
  <div class="box box1"></div>
  <div class="box box2"></div>
  <div class="box box3"></div>
</div>
```

JS:

```js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#animateBtn");
  let tl = null;

  btn.addEventListener("click", () => {
    // Kill previous timeline if it exists (avoid overlaps)
    if (tl) tl.kill();

    tl = gsap.timeline();

    tl
      .from(".box1", {
        x: -300,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(".box2", {
        x: -300,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "<+=0.2")
      .from(".box3", {
        x: -300,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "<+=0.2");
  });
});
```

Key points:

- We store timeline in `tl` so we can `kill()` it before creating a new one.
- This prevents multiple timelines fighting if the user clicks many times.

***

### 3.2 Toggle animation on click (play/pause style)

Sometimes you want:

- First click → animate in
- Second click → animate out

```js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#toggleBtn");
  const boxes = document.querySelectorAll(".box");
  let isIn = false;
  let tl = null;

  // Initial state: hidden
  gsap.set(boxes, { x: -300, opacity: 0 });

  btn.addEventListener("click", () => {
    if (tl) tl.kill();

    tl = gsap.timeline();

    if (!isIn) {
      // Animate in
      tl.to(boxes, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
      isIn = true;
    } else {
      // Animate out
      tl.to(boxes, {
        x: -300,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.in",
      });
      isIn = false;
    }
  });
});
```

Here:

- `gsap.set()` sets initial state without animation.
- We toggle `isIn` flag to decide direction.

***

## 4. Hover Interactions with GSAP

### 4.1 Simple hover scale + color shift

HTML:

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Hover over this card.</p>
</div>
```

CSS (basic styling):

```css
.card {
  width: 220px;
  padding: 20px;
  background: #1e293b;
  color: #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s;
}

.card:hover {
  background: #334155;
}
```

JS (GSAP hover):

```js
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card");

  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.05,
      rotation: 2,
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});
```

Notes:

- We still use CSS `:hover` for background; GSAP for transform/rotation.
- Keep hover animations subtle and fast (0.2–0.4s).

***

### 4.2 Hover with timeline (multiple elements inside card)

HTML:

```html
<div class="card2">
  <div class="icon">★</div>
  <h3>Feature Card</h3>
  <p>Hover to see inner animations.</p>
</div>
```

CSS (simplified):

```css
.card2 {
  position: relative;
  width: 240px;
  padding: 24px;
  background: #0f172a;
  color: #e5e7eb;
  border-radius: 14px;
  cursor: pointer;
  overflow: hidden;
}

.card2 .icon {
  font-size: 28px;
  color: #60a5fa;
  margin-bottom: 10px;
}
```

JS:

```js
document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card2");
  const icon = card.querySelector(".icon");
  const title = card.querySelector("h3");
  const text = card.querySelector("p");

  let hoverTl = null;

  // Set initial state
  gsap.set([icon, title, text], { y: 10, opacity: 0.7 });

  card.addEventListener("mouseenter", () => {
    if (hoverTl) hoverTl.kill();

    hoverTl = gsap.timeline();

    hoverTl
      .to(card, {
        scale: 1.03,
        duration: 0.25,
        ease: "power2.out",
      })
      .to(
        [icon, title, text],
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.07,
          ease: "power2.out",
        },
        "<"
      );
  });

  card.addEventListener("mouseleave", () => {
    if (hoverTl) hoverTl.kill();

    hoverTl = gsap.timeline();

    hoverTl
      .to(card, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      })
      .to(
        [icon, title, text],
        {
          y: 10,
          opacity: 0.7,
          duration: 0.35,
          stagger: 0.07,
          ease: "power2.out",
        },
        "<"
      );
  });
});
```

Pattern to remember:

- On `mouseenter`: create timeline → animate in.
- On `mouseleave`: kill old timeline → create new one → animate back.
- Use `stagger` for inner elements.

***

## 5. Good vs Bad Patterns for Interactions

### Bad: Creating new animations without killing old ones

```js
// BAD
card.addEventListener("mouseenter", () => {
  gsap.to(card, { scale: 1.1, duration: 0.4 });
});
```

If user moves mouse in/out quickly, multiple tweens stack → weird behavior.

**Good:**

```js
let hoverTl = null;

card.addEventListener("mouseenter", () => {
  if (hoverTl) hoverTl.kill();
  hoverTl = gsap.timeline().to(card, { scale: 1.1, duration: 0.4 });
});
```

Or store the tween and `kill()` it.

***

### Bad: Heavy animations on every mousemove

```js
// BAD idea
document.addEventListener("mousemove", (e) => {
  gsap.to(".box", {
    x: e.clientX,
    y: e.clientY,
    duration: 0.5,
  });
});
```

This fires hundreds of times per second → performance issues.

For cursor-follow effects, use:

- Throttling / requestAnimationFrame
- Or GSAP’s `quickTo()` (advanced, later lecture)

For now: avoid heavy GSAP calls inside `mousemove` unless you know what you’re doing.

***

### Bad: Mixing too many responsibilities in one handler

```js
// Hard to maintain
btn.addEventListener("click", () => {
  // 50 lines of animation + data fetching + DOM manipulation
});
```

**Better:**

- Separate logic:

```js
function playIntro() {
  const tl = gsap.timeline();
  // animation only
  return tl;
}

btn.addEventListener("click", () => {
  playIntro().then(() => {
    // maybe do something after
  });
});
```

Even in vanilla JS, keep animation logic modular.

***

## 6. Mini Project: Animated Feature Cards

Let’s combine timelines + hover + click.

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GSAP Lecture 2 – Mini Project</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 2rem;
      background: #0b1220;
      color: #e5e7eb;
    }

    h1 {
      margin-bottom: 1.5rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 24px;
      max-width: 900px;
    }

    .card {
      position: relative;
      padding: 24px;
      background: #111827;
      border-radius: 14px;
      cursor: pointer;
      overflow: hidden;
      border: 1px solid #1f2937;
    }

    .card h3 {
      margin: 12px 0 6px;
      font-size: 18px;
    }

    .card p {
      margin: 0;
      font-size: 14px;
      color: #9ca3af;
    }

    .card .icon {
      font-size: 28px;
      color: #60a5fa;
    }

    .card .badge {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 12px;
      padding: 4px 8px;
      background: #1e3a8a;
      color: #bfdbfe;
      border-radius: 999px;
      opacity: 0;
      transform: translateY(-6px);
    }
  </style>
</head>
<body>
  <h1>Animated Feature Cards</h1>

  <div class="grid">
    <div class="card">
      <div class="icon">⚡</div>
      <h3>Fast</h3>
      <p>Optimized animations.</p>
      <div class="badge">New</div>
    </div>

    <div class="card">
      <div class="icon">🎨</div>
      <h3>Beautiful</h3>
      <p>Smooth micro-interactions.</p>
      <div class="badge">New</div>
    </div>

    <div class="card">
      <div class="icon">🧠</div>
      <h3>Smart</h3>
      <p>Clean animation patterns.</p>
      <div class="badge">New</div>
    </div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

### JS (`script.js`)

```js
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  // Initial state: badges hidden (already set via CSS transform + opacity)
  gsap.set(".badge", { y: -6, opacity: 0 });

  cards.forEach((card) => {
    const badge = card.querySelector(".badge");
    const icon = card.querySelector(".icon");
    const title = card.querySelector("h3");
    const text = card.querySelector("p");

    let hoverTl = null;

    // Set inner elements initial state
    gsap.set([icon, title, text], { y: 8, opacity: 0.8 });

    card.addEventListener("mouseenter", () => {
      if (hoverTl) hoverTl.kill();

      hoverTl = gsap.timeline();

      hoverTl
        .to(card, {
          scale: 1.03,
          duration: 0.25,
          ease: "power2.out",
        })
        .to(
          [icon, title, text],
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.07,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          badge,
          {
            y: 0,
            opacity: 1,
            duration: 0.25,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );
    });

    card.addEventListener("mouseleave", () => {
      if (hoverTl) hoverTl.kill();

      hoverTl = gsap.timeline();

      hoverTl
        .to(card, {
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
        })
        .to(
          [icon, title, text],
          {
            y: 8,
            opacity: 0.8,
            duration: 0.35,
            stagger: 0.07,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          badge,
          {
            y: -6,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
          },
          "<"
        );
    });

    // Optional: click to "activate" card with a small pulse
    card.addEventListener("click", () => {
      gsap.fromTo(
        card,
        { scale: 1 },
        {
          scale: 0.97,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        }
      );
    });
  });
});
```

What this teaches:

- Per-card hover timelines.
- Staggered inner animations.
- Small click “pulse” using `fromTo` + `yoyo` + `repeat`.

***

## Key Takeaways for Timelines + Interactions

- Use timelines to **sequence** and **overlap** animations cleanly.
- Use **labels** and relative positions (`"<"`, `">"`, `"+="`, `"-="`) to control timing precisely.
- For interactions:
  - Store timelines/tweens in variables.
  - `kill()` old ones before creating new ones.
  - Keep hover/click animations short and subtle.
- Always animate `transform` and `opacity` where possible.

***

<!-- Tell me what you want for Lecture 3:

- “Lecture 3: Scroll-triggered animations with ScrollTrigger”  
- or “Lecture 3: Stagger, randomization, and advanced easing”  
- or “Lecture 3: Building a small landing page with GSAP”. -->