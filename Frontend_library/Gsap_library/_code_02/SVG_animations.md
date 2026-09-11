## Lecture 6: Create Stunning SVG Animations with GSAP  
(Vanilla HTML/CSS/JS only – every property explained)

We’ll focus on what actually matters for real-world SVG + GSAP work:

1. Why animate SVG with GSAP  
2. Basic SVG setup and how GSAP sees SVG  
3. Core GSAP properties used for SVG  
4. Practical patterns:
   - Draw-on effect (stroke-dashoffset)
   - Icon animations
   - Logo reveal
   - Illustrated scene with staggered parts
5. Good vs bad patterns and performance tips  

All examples use plain HTML/CSS/JS + GSAP via CDN.

***

## 1. Why Animate SVG with GSAP?

SVG is ideal for animation because:

- It’s resolution-independent (sharp on all screens).
- You can target individual shapes/paths with CSS/JS.
- GSAP can animate:
  - Position: `x`, `y`
  - Transform: `scale`, `rotation`
  - Color: `fill`, `stroke`
  - Stroke drawing: `stroke-dasharray`, `stroke-dashoffset`
  - Opacity, filters, etc.

GSAP makes SVG animation:

- Smooth and performant
- Easy to sequence with timelines
- Easy to connect to scroll or interactions

***

## 2. Basic SVG Setup and How GSAP Sees SVG

### 2.1 Simple inline SVG

Inline SVG (directly in HTML) is best for animation:

```html
<svg
  width="200"
  height="200"
  viewBox="0 0 200 200"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle
    class="shape circle"
    cx="100"
    cy="100"
    r="60"
    fill="#22d3ee"
  />
  <rect
    class="shape rect"
    x="60"
    y="60"
    width="80"
    height="80"
    fill="#a78bfa"
    rx="12"
  />
</svg>
```

Key attributes:

- `viewBox="0 0 200 200"`  
  - Defines the coordinate system.
- `class="shape circle"` / `"shape rect"`  
  - Classes we can target with GSAP (`".shape"`, `".circle"`, `".rect"`).

GSAP treats SVG elements like normal DOM elements:

```js
gsap.to(".circle", { scale: 1.2, duration: 1 });
```

***

## 3. Core GSAP Properties Commonly Used for SVG

You’ll use these a lot:

- `x`, `y` – move element in SVG coordinates  
- `scale` – scale element  
- `rotation` – rotate around its center  
- `opacity` – fade in/out  
- `fill`, `stroke` – change colors  
- `strokeWidth` – change stroke thickness  
- `attr` – animate arbitrary SVG attributes (e.g. `r`, `width`, `d`)  
- `stroke-dasharray`, `stroke-dashoffset` – for draw-on line effects  

We’ll see each in context.

***

## 4. Pattern 1 – Basic Shape Animations

### 4.1 HTML: Simple SVG with shapes

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GSAP SVG Basics</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, sans-serif;
      background: #0b1220;
      color: #e5e7eb;
      display: grid;
      place-items: center;
      min-height: 100vh;
    }

    svg {
      width: 260px;
      height: 260px;
    }

    .shape {
      cursor: pointer;
    }
  </style>
</head>
<body>
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle
      class="shape circle"
      cx="100"
      cy="100"
      r="50"
      fill="#22d3ee"
    />
    <rect
      class="shape rect"
      x="70"
      y="70"
      width="60"
      height="60"
      fill="#a78bfa"
      rx="10"
    />
    <polygon
      class="shape triangle"
      points="100,40 130,90 70,90"
      fill="#f472b6"
    />
  </svg>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

### 4.2 JS: Animate SVG shapes

`script.js`:

```js
// 1. Register (optional if only using core GSAP)
// gsap.registerPlugin(...); // no extra plugin needed for basic SVG

// 2. Set initial state
gsap.set(".shape", {
  scale: 0.6,
  opacity: 0,
  rotation: -30,
});

// 3. Animate all shapes in with stagger
gsap.to(".shape", {
  scale: 1,
  opacity: 1,
  rotation: 0,
  duration: 0.9,
  ease: "back.out(1.7)",
  stagger: {
    amount: 0.5,
    from: "start",
  },
});
```

Explanation of properties:

- `gsap.set(".shape", { ... })`  
  - Sets initial state before animation:
    - `scale: 0.6` – smaller
    - `opacity: 0` – invisible
    - `rotation: -30` – rotated left
- `gsap.to(".shape", { ... })`  
  - Animate to:
    - `scale: 1` – normal size
    - `opacity: 1` – fully visible
    - `rotation: 0` – no rotation
- `ease: "back.out(1.7)"`  
  - Slight overshoot then settle → playful feel.
- `stagger: { amount: 0.5, from: "start" }`  
  - Shapes animate one after another over 0.5s.

This is the basic pattern: set initial state → animate in with stagger + ease.

***

## 5. Pattern 2 – Draw-On Effect (Stroke Animation)

This is a classic SVG + GSAP effect: lines “draw” themselves.

### 5.1 Concept: stroke-dasharray + stroke-dashoffset

For a path:

- `stroke-dasharray` = length of dash + gap pattern.
- `stroke-dashoffset` = how far the pattern is shifted.

Trick:

1. Set `stroke-dasharray` to the path length.
2. Start with `stroke-dashoffset` = path length (so nothing is visible).
3. Animate `stroke-dashoffset` to 0 → line appears as if being drawn.

GSAP can do this smoothly.

### 5.2 HTML: SVG with a path

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GSAP SVG Draw-On</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, sans-serif;
      background: #0b1220;
      color: #e5e7eb;
      display: grid;
      place-items: center;
      min-height: 100vh;
    }

    svg {
      width: 300px;
      height: 300px;
    }

    .draw-path {
      fill: none;
      stroke: #60a5fa;
      stroke-width: 4;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  </style>
</head>
<body>
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <!-- Simple heart-like path -->
    <path
      class="draw-path"
      d="M100 160
         C 60 130, 40 100, 40 70
         C 40 40, 70 40, 100 70
         C 130 40, 160 40, 160 70
         C 160 100, 140 130, 100 160Z"
    />
  </svg>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

### 5.3 JS: Animate stroke-dashoffset

`script.js`:

```js
const path = document.querySelector(".draw-path");

// Get total length of the path
const length = path.getTotalLength();

// 1. Set initial state using GSAP
gsap.set(path, {
  strokeDasharray: length,
  strokeDashoffset: length,
  opacity: 0,
});

// 2. Animate: fade in + draw
gsap.to(path, {
  strokeDashoffset: 0,
  opacity: 1,
  duration: 2,
  ease: "power2.inOut",
});
```

Explanation:

- `path.getTotalLength()`  
  - Built-in SVG method that returns the path’s total length.
- `gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })`  
  - `strokeDasharray: length` → one dash equal to full length.
  - `strokeDashoffset: length` → dash is shifted so nothing shows.
- `gsap.to(path, { strokeDashoffset: 0, ... })`  
  - Animate offset to 0 → line “draws” from start to end.
- `opacity: 0 → 1`  
  - Fade in while drawing.
- `ease: "power2.inOut"`  
  - Smooth start and end.

This pattern is used for:

- Logo outlines
- Icons
- Illustrated lines/arrows

***

## 6. Pattern 3 – Animated Icon with Multiple Parts

Let’s animate an icon with several shapes (e.g., a simple “cloud + sun” icon).

### 6.1 HTML: Inline SVG icon

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GSAP SVG Icon</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, sans-serif;
      background: #0b1220;
      color: #e5e7eb;
      display: grid;
      place-items: center;
      min-height: 100vh;
    }

    svg {
      width: 220px;
      height: 220px;
    }

    .sun {
      fill: #fbbf24;
    }

    .cloud {
      fill: #e5e7eb;
    }
  </style>
</head>
<body>
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <!-- Sun -->
    <circle class="sun" cx="120" cy="80" r="25" />

    <!-- Sun rays (simple lines) -->
    <g class="rays">
      <line x1="120" y1="45" x2="120" y2="30" stroke="#fbbf24" stroke-width="4" />
      <line x1="155" y1="80" x2="170" y2="80" stroke="#fbbf24" stroke-width="4" />
      <line x1="120" y1="115" x2="120" y2="130" stroke="#fbbf24" stroke-width="4" />
      <line x1="85" y1="80" x2="70" y2="80" stroke="#fbbf24" stroke-width="4" />
    </g>

    <!-- Cloud -->
    <path
      class="cloud"
      d="M60 120
         C 60 100, 80 100, 80 120
         C 80 100, 110 100, 110 120
         C 110 140, 90 140, 90 120
         C 90 140, 60 140, 60 120Z"
    />
  </svg>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

### 6.2 JS: Animate icon parts with timeline

`script.js`:

```js
const sun = document.querySelector(".sun");
const rays = document.querySelectorAll(".rays line");
const cloud = document.querySelector(".cloud");

// 1. Initial state
gsap.set([sun, cloud], {
  scale: 0.6,
  opacity: 0,
});

gsap.set(rays, {
  scale: 0.6,
  opacity: 0,
  transformOrigin: "center",
});

// 2. Timeline
const tl = gsap.timeline({
  defaults: {
    duration: 0.8,
    ease: "power3.out",
  },
});

tl
  // Sun + cloud pop in
  .to([sun, cloud], {
    scale: 1,
    opacity: 1,
  }, "start")
  // Rays appear with stagger
  .to(
    rays,
    {
      scale: 1,
      opacity: 1,
      stagger: 0.1,
    },
    "start+=0.2"
  )
  // Gentle idle animation (continuous)
  .to(
    [sun, cloud],
    {
      y: -4,
      duration: 1.2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    },
    ">-=0.6"
  );
```

Explanation of new properties:

- `transformOrigin: "center"` (on rays)  
  - Ensures scaling happens around each line’s center.
- Timeline `defaults`  
  - All child tweens use `duration: 0.8`, `ease: "power3.out"` unless overridden.
- `"start"` label  
  - Both sun/cloud and rays start relative to this label.
- `stagger: 0.1` on rays  
  - Each ray appears one after another.
- Idle animation:
  - `y: -4` – move up slightly.
  - `yoyo: true` – go up then back down.
  - `repeat: -1` – infinite loop.
  - `ease: "sine.inOut"` – smooth wave-like motion.

Result:

- Icon pops in with staggered rays.
- Then gently floats up/down forever (idle animation).

This pattern is great for:

- Dashboard icons
- Feature illustrations
- Loading states

***

## 7. Pattern 4 – Simple Logo Reveal (Text + Shape)

Let’s animate a simple text + shape logo.

### 7.1 HTML: SVG logo

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GSAP SVG Logo Reveal</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, sans-serif;
      background: #0b1220;
      color: #e5e7eb;
      display: grid;
      place-items: center;
      min-height: 100vh;
    }

    svg {
      width: 320px;
      height: 120px;
    }

    .logo-shape {
      fill: #2563eb;
    }

    .logo-text {
      fill: #e5e7eb;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg">
    <!-- Simple abstract shape -->
    <rect class="logo-shape" x="20" y="30" width="60" height="60" rx="14" />
    <!-- Logo text -->
    <text class="logo-text" x="100" y="72">
      YourBrand
    </text>
  </svg>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

### 7.2 JS: Logo reveal with timeline

`script.js`:

```js
const logoShape = document.querySelector(".logo-shape");
const logoText = document.querySelector(".logo-text");

// 1. Initial state
gsap.set([logoShape, logoText], {
  x: -40,
  opacity: 0,
});

// 2. Timeline
const logoTl = gsap.timeline({
  defaults: {
    duration: 1,
    ease: "power3.out",
  },
});

logoTl
  .to(logoShape, {
    x: 0,
    opacity: 1,
  })
  .to(
    logoText,
    {
      x: 0,
      opacity: 1,
    },
    "<+=0.2"
  );
```

Explanation:

- `x: -40`, `opacity: 0` → start left and hidden.
- Timeline:
  - Shape slides/fades in.
  - Text starts 0.2s after shape begins (`"<+=0.2"`).
- `defaults` sets duration/ease for both tweens.

You can enhance this with:

- Rotation on shape
- Draw-on effect for an underline
- Staggered letters (more advanced)

***

## 8. Pattern 5 – Illustrated Scene with Staggered Parts

Imagine a simple “scene” with multiple elements: sun, cloud, hills, etc.

### 8.1 HTML: Simple scene SVG

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GSAP SVG Scene</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, sans-serif;
      background: #0b1220;
      color: #e5e7eb;
      display: grid;
      place-items: center;
      min-height: 100vh;
    }

    svg {
      width: 400px;
      height: 260px;
    }

    .sky { fill: #0f172a; }
    .sun { fill: #fbbf24; }
    .hill { fill: #1e3a8a; }
    .cloud { fill: #e5e7eb; }
  </style>
</head>
<body>
  <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
    <!-- Sky -->
    <rect class="sky" x="0" y="0" width="400" height="260" />

    <!-- Sun -->
    <circle class="sun" cx="320" cy="60" r="25" />

    <!-- Hills -->
    <path class="hill" d="M0 200 Q100 150 200 200 T400 200 V260 H0 Z" />
    <path class="hill" d="M0 220 Q150 190 300 220 T400 220 V260 H0 Z" />

    <!-- Clouds -->
    <path class="cloud" d="M60 80 C60 65, 80 65, 80 80 C80 95, 60 95, 60 80Z" />
    <path class="cloud" d="M120 60 C120 45, 140 45, 140 60 C140 75, 120 75, 120 60Z" />
    <path class="cloud" d="M260 90 C260 75, 280 75, 280 90 C280 105, 260 105, 260 90Z" />
  </svg>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

### 8.2 JS: Animate scene elements with stagger

`script.js`:

```js
const sun = document.querySelector(".sun");
const hills = document.querySelectorAll(".hill");
const clouds = document.querySelectorAll(".cloud");

// 1. Initial state
gsap.set([sun, ...hills, ...clouds], {
  scale: 0.8,
  opacity: 0,
});

// 2. Timeline
const sceneTl = gsap.timeline({
  defaults: {
    duration: 1,
    ease: "power3.out",
  },
});

sceneTl
  // Sun + hills appear
  .to([sun, ...hills], {
    scale: 1,
    opacity: 1,
  }, "start")
  // Clouds with stagger
  .to(
    clouds,
    {
      scale: 1,
      opacity: 1,
      stagger: 0.15,
    },
    "start+=0.2"
  )
  // Idle floating for clouds
  .to(
    clouds,
    {
      x: 10,
      duration: 1.4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    },
    ">-=0.8"
  );
```

Explanation:

- `gsap.set` sets all elements smaller and hidden.
- Timeline:
  - Sun + hills fade/scale in together.
  - Clouds follow with stagger.
  - Clouds then float left/right infinitely (`x: 10`, `yoyo`, `repeat: -1`).

This pattern is perfect for:

- Landing page illustrations
- Hero graphics
- Onboarding visuals

***

## 9. Good vs Bad Patterns for SVG + GSAP

### Bad: Animating too many heavy properties

Avoid animating complex filters or very long paths with heavy strokes on low-end devices.

Better:

- Keep shapes reasonably simple.
- Use moderate `stroke-width`.
- Limit simultaneous heavy animations.

***

### Bad: Forgetting `transformOrigin` on scaled elements

```js
// Might rotate/scale around unexpected point
gsap.to(".ray", { scale: 1.2, rotation: 20 });
```

Better:

```js
gsap.to(".ray", {
  scale: 1.2,
  rotation: 20,
  transformOrigin: "center",
});
```

Especially for icons and repeated elements.

***

### Bad: Overusing infinite loops

Too many `repeat: -1` animations can be distracting and hurt performance.

Use infinite loops for:

- Subtle idle motion (floating, breathing)
- Small decorative elements

Not for every element in the scene.

***

## 10. Key Properties Recap (SVG-focused)

**GSAP transform/visual:**

- `x`, `y` – move
- `scale` – size
- `rotation` – rotate
- `opacity` – fade
- `transformOrigin` – pivot point for transform

**SVG-specific:**

- `fill`, `stroke` – colors
- `strokeWidth` – stroke thickness
- `attr` – animate attributes like `r`, `width`, `d`
- `strokeDasharray`, `strokeDashoffset` – draw-on effects

**Timeline & sequencing:**

- `gsap.timeline({ defaults: { duration, ease } })`
- `.to()`, `.from()`, `.fromTo()`
- `stagger`, labels (`"start"`), positions (`"<+=0.2"`)

**Infinite/idle:**

- `yoyo: true`
- `repeat: -1`
- `ease: "sine.inOut"` for smooth loops

***

## 11. How to Practice

1. Copy one of the examples (icon, draw-on path, or scene).
2. Open in browser.
3. Modify:
   - Colors (`fill`, `stroke`)
   - Durations and eases
   - Stagger amounts
   - Idle animation amplitudes (`x`, `y` values)

Next, you can:

- Combine SVG animations with ScrollTrigger (e.g., draw-on when section enters view).
- Build your own logo or illustration and animate it with these patterns.

If you want, next lecture can be:  
“Lecture 7: SVG + ScrollTrigger – draw-on and scene animations triggered by scroll” with full code.