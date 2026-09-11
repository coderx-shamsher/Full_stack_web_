## Lecture 3: Scroll-Triggered Animations with ScrollTrigger (GSAP)

We’ll focus only on what **actually matters in real projects**:

1. What is ScrollTrigger and why use it  
2. How to include ScrollTrigger (CDN)  
3. Core concepts: trigger, start, end, scrub, pin, toggleActions  
4. Most important & most used properties (with clear examples)  
5. Common patterns: fade-in on scroll, parallax, pin sections, highlight sections  
6. Good vs bad patterns and performance tips  

All examples: vanilla HTML/CSS/JS + GSAP + ScrollTrigger via CDN.

***

## 1. What is ScrollTrigger?

**ScrollTrigger** is a GSAP plugin that ties animations to the scroll position.

Typical uses:

- Fade/slide elements in when they enter viewport
- Parallax effects (background moves slower than foreground)
- “Pin” a section while animating inside it
- Highlight nav items based on current section
- Build scroll-driven storytelling pages

Key idea:

- You define **when** an animation should start/stop relative to scroll.
- GSAP + ScrollTrigger handle the rest.

***

## 2. Including ScrollTrigger (CDN)

Update your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GSAP ScrollTrigger Basics</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, sans-serif;
      background: #0b1220;
      color: #e5e7eb;
    }

    section {
      min-height: 100vh;
      padding: 4rem 2rem;
      display: grid;
      place-items: center;
    }

    .box {
      width: 120px;
      height: 120px;
      background: #22d3ee;
      border-radius: 12px;
    }

    .section2 {
      background: #0f172a;
    }

    .section3 {
      background: #111827;
    }
  </style>
</head>
<body>
  <section class="section1">
    <div class="box box1"></div>
  </section>

  <section class="section2">
    <div class="box box2"></div>
  </section>

  <section class="section3">
    <div class="box box3"></div>
  </section>

  <!-- GSAP core -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <!-- ScrollTrigger plugin -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

Important:

- Load `gsap.min.js` **first**, then `ScrollTrigger.min.js`.
- In JS, register the plugin:

```js
gsap.registerPlugin(ScrollTrigger);
```

***

## 3. Core Concepts (What You Must Understand)

Every ScrollTrigger animation has a few key ideas:

1. **trigger** – which element’s scroll position controls the animation  
2. **start** – when the animation starts (relative to trigger & viewport)  
3. **end** – when the animation ends  
4. **scrub** – link animation progress directly to scroll (vs play once)  
5. **pin** – “freeze” an element in place while scrolling  
6. **toggleActions / onEnter / onLeave** – run code when entering/leaving view  

These are the **main properties you must learn**.

***

## 4. Most Important & Most Used ScrollTrigger Properties

### 4.1 `trigger`

Which element to watch.

```js
ScrollTrigger.create({
  trigger: ".box1",
  start: "top 80%",
  onEnter: () => {
    gsap.to(".box1", { scale: 1.2, rotation: 45, duration: 1 });
  },
});
```

- Here, `.box1` is the trigger.
- When `.box1` reaches `top 80%` of viewport, `onEnter` runs.

Common pattern:

- `trigger: ".section"` → animate things inside that section.

***

### 4.2 `start` and `end`

Define **when** something happens.

Syntax:

```text
"vertical-position reference-point"
```

Examples:

- `"top 80%"` → when top of trigger hits 80% down the viewport  
- `"bottom center"` → when bottom of trigger hits center of viewport  
- `"top top"` → when top of trigger hits top of viewport  
- `"center center"` → when center of trigger hits center of viewport  

You can also use:

- `"+=100"` → offset by 100px
- `"-=50"` → 50px earlier

Example:

```js
ScrollTrigger.create({
  trigger: ".box2",
  start: "top 70%",   // when top of .box2 reaches 70% of viewport height
  onEnter: () => {
    gsap.from(".box2", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  },
});
```

**Most common `start` values you’ll actually use:**

- `"top 85%"` – fade in when element almost enters viewport  
- `"top 70%"` – a bit earlier  
- `"center 80%"` – when center of element is near bottom area  
- `"top top"` – for pinning / full-section control  

***

### 4.3 `scrub`

Links animation progress to scroll position.

Two main modes:

1. **Boolean**: `scrub: true`
   - Animation plays forward/backward as you scroll.
2. **Number**: `scrub: 1`
   - Adds 1s smoothing (easing) to scrub movement.

Example: rotate and move box as you scroll:

```js
gsap.to(".box3", {
  scrollTrigger: {
    trigger: ".box3",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 1, // smooth scrub
  },
  x: 300,
  rotation: 360,
  scale: 1.5,
});
```

Here:

- As you scroll from `start` to `end`, the box moves, rotates, scales.
- `scrub: 1` makes it feel smoother.

**Very common pattern:**

- Use `scrub: true` or `scrub: 1` for parallax / scroll-linked motion.

***

### 4.4 `pin`

“Pins” an element in place while scrolling, often used for section-based animations.

```js
gsap.to(".section2 .box2", {
  scrollTrigger: {
    trigger: ".section2",
    start: "top top",
    end: "+=1000", // pin for 1000px of scroll
    pin: true,
    scrub: 1,
  },
  rotation: 360,
  scale: 1.4,
});
```

What happens:

- When `.section2` top hits viewport top, it gets pinned.
- While user scrolls next 1000px, the box animates.
- After that, section unpins and normal scroll continues.

**Common use cases:**

- Pin a section while steps animate inside it.
- Pin a hero while content fades in over it.

***

### 4.5 `toggleActions` / `onEnter` / `onLeave`

For “play once” animations when entering/leaving view.

Example: animate in when element enters, animate out when it leaves:

```js
gsap.from(".box1", {
  y: 100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".box1",
    start: "top 85%",
    toggleActions: "play none none reverse",
    // onEnter: play
    // onLeave: nothing
    // onEnterBack: nothing
    // onLeaveBack: reverse
  },
});
```

`toggleActions` order:

1. `onEnter`
2. `onLeave`
3. `onEnterBack`
4. `onLeaveBack`

Common patterns:

- `"play none none none"` → play once when entering, never reverse.
- `"play pause resume reverse"` → more complex control.

Often easier: use callbacks:

```js
scrollTrigger: {
  trigger: ".box1",
  start: "top 85%",
  onEnter: () => {
    gsap.from(".box1", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  },
}
```

***

## 5. Essential Patterns (With Code)

### 5.1 Fade-in elements when they enter viewport (most common)

HTML:

```html
<section class="section1">
  <div class="box box1"></div>
</section>

<section class="section2">
  <div class="box box2"></div>
</section>

<section class="section3">
  <div class="box box3"></div>
</section>
```

JS:

```js
gsap.registerPlugin(ScrollTrigger);

// Set initial state
gsap.set(".box", { y: 80, opacity: 0 });

gsap.utils.toArray(".box").forEach((box) => {
  gsap.to(box, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: box,
      start: "top 85%", // when top of box hits 85% of viewport
      toggleActions: "play none none none",
    },
  });
});
```

Key points:

- `gsap.set` sets initial hidden state.
- `toArray` lets you loop over all `.box`.
- Each box animates once when it comes into view.

This is the **most used pattern** in real sites.

***

### 5.2 Staggered fade-in for multiple elements in a section

HTML:

```html
<section class="section2">
  <div class="box box2"></div>
  <div class="box box2"></div>
  <div class="box box2"></div>
</section>
```

JS:

```js
gsap.registerPlugin(ScrollTrigger);

const boxes2 = document.querySelectorAll(".section2 .box2");

gsap.set(boxes2, { y: 80, opacity: 0 });

gsap.to(boxes2, {
  y: 0,
  opacity: 1,
  duration: 0.9,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".section2",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});
```

Notes:

- Trigger is the **section**, not individual boxes.
- All boxes animate together with a stagger when section enters view.

***

### 5.3 Parallax effect (background moves slower)

HTML:

```html
<section class="parallax-section">
  <div class="bg"></div>
  <div class="content">
    <h1>Parallax Section</h1>
    <p>Scroll to see the background move slower.</p>
  </div>
</section>
```

CSS (simplified):

```css
.parallax-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: grid;
  place-items: center;
  color: #e5e7eb;
}

.parallax-section .bg {
  position: absolute;
  inset: -10%;
  background: radial-gradient(circle, #1e3a8a, #0b1220);
  z-index: 0;
}

.parallax-section .content {
  position: relative;
  z-index: 1;
  text-align: center;
}
```

JS:

```js
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector(".parallax-section");
const bg = section.querySelector(".bg");

gsap.to(bg, {
  y: 150, // move background down a bit as we scroll
  ease: "none",
  scrollTrigger: {
    trigger: section,
    start: "top bottom", // when top of section hits bottom of viewport
    end: "bottom top",   // when bottom of section hits top of viewport
    scrub: true,
  },
});
```

Key idea:

- Background moves slightly while section scrolls → parallax feel.
- `scrub: true` ties movement directly to scroll.

***

### 5.4 Pin a section and animate inside it

HTML:

```html
<section class="pinned-section">
  <div class="box pin-box"></div>
  <h2>Pinned Animation</h2>
</section>
```

CSS (basic):

```css
.pinned-section {
  height: 100vh;
  display: grid;
  place-items: center;
  background: #0f172a;
  color: #e5e7eb;
  position: relative;
}

.pin-box {
  width: 120px;
  height: 120px;
  background: #f472b6;
  border-radius: 12px;
  margin-bottom: 20px;
}
```

JS:

```js
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector(".pinned-section");
const box = section.querySelector(".pin-box");

gsap.fromTo(
  box,
  { scale: 0.4, rotation: -90, opacity: 0 },
  {
    scale: 1,
    rotation: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=1000", // pin for 1000px scroll
      pin: true,
      scrub: 1,
    },
  }
);
```

What happens:

- When `.pinned-section` top reaches viewport top, it pins.
- While you scroll 1000px, the box scales/rotates/fades in.
- Then section unpins.

This pattern is used a lot for:

- Feature walkthroughs
- Step-by-step explanations
- Story sections

***

### 5.5 Highlight nav based on current section (advanced but common)

HTML (simplified):

```html
<nav>
  <a href="#sec1" class="nav-link">Section 1</a>
  <a href="#sec2" class="nav-link">Section 2</a>
  <a href="#sec3" class="nav-link">Section 3</a>
</nav>

<section id="sec1" class="section1">...</section>
<section id="sec2" class="section2">...</section>
<section id="sec3" class="section3">...</section>
```

JS (concept):

```js
gsap.registerPlugin(ScrollTrigger);

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

sections.forEach((sec, i) => {
  ScrollTrigger.create({
    trigger: sec,
    start: "top 60%",
    end: "bottom 60%",
    onEnter: () => setActive(i),
    onEnterBack: () => setActive(i),
  });
});

function setActive(index) {
  navLinks.forEach((link) => link.classList.remove("active"));
  navLinks[index].classList.add("active");
}
```

You’d add CSS for `.active` style.

This is how many sites highlight the current section in the navbar.

***

## 6. Good vs Bad Patterns with ScrollTrigger

### Bad: Creating ScrollTriggers inside scroll handlers

```js
// BAD
window.addEventListener("scroll", () => {
  gsap.to(".box", {
    scrollTrigger: {
      trigger: ".box",
      start: "top 80%",
      onEnter: () => { /* ... */ },
    },
  });
});
```

Problems:

- New ScrollTrigger created on every scroll event.
- Performance dies; triggers multiply.

**Good:**

- Create ScrollTriggers **once**, usually in `DOMContentLoaded`.
- Let ScrollTrigger handle the scroll logic.

***

### Bad: Too many heavy animations at once

Animating 100 elements with complex tweens all at once on scroll can be heavy.

Better:

- Use `stagger` wisely.
- Keep durations and complexity reasonable.
- Test on low-end devices.

***

### Bad: Ignoring `toggleActions` / callbacks

If you don’t control when animations play, you can get:

- Animations replaying weirdly when scrolling up/down.
- Elements stuck in wrong state.

Always decide:

- Should it play once? → `toggleActions: "play none none none"`
- Should it reverse when scrolling back? → `"play none none reverse"` or custom callbacks.

***

## 7. Things to Keep in Mind (Checklist)

When using ScrollTrigger:

1. **Register plugin once:**

   ```js
   gsap.registerPlugin(ScrollTrigger);
   ```

2. **Create triggers once**, not inside frequent events.

3. **Use simple `start` values** unless you need precision:
   - `"top 85%"`, `"top 80%"`, `"center 80%"` cover 80% of cases.

4. **Decide: scrub vs play-once**
   - Scroll-linked motion → `scrub: true` or `scrub: 1`
   - Enter-once animations → `toggleActions` or `onEnter`

5. **Pin only when necessary**
   - Pinning adds complexity; use it for specific section-based effects.

6. **Test scroll up and down**
   - Ensure animations behave well in both directions.

***

## 8. Mini Example File (Put It All Together)

`index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GSAP ScrollTrigger Practice</title>
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, sans-serif;
      background: #0b1220;
      color: #e5e7eb;
    }

    section {
      min-height: 100vh;
      padding: 4rem 2rem;
      display: grid;
      place-items: center;
      gap: 40px;
    }

    .box {
      width: 120px;
      height: 120px;
      background: #22d3ee;
      border-radius: 12px;
    }

    .section2 {
      background: #0f172a;
    }

    .section3 {
      background: #111827;
    }

    .parallax-section {
      position: relative;
      height: 100vh;
      overflow: hidden;
      background: #0b1220;
    }

    .parallax-section .bg {
      position: absolute;
      inset: -10%;
      background: radial-gradient(circle, #1e3a8a, #0b1220);
      z-index: 0;
    }

    .parallax-section .content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding-top: 40vh;
    }
  </style>
</head>
<body>
  <section class="section1">
    <div class="box box1"></div>
  </section>

  <section class="section2">
    <div class="box box2"></div>
    <div class="box box2"></div>
    <div class="box box2"></div>
  </section>

  <section class="parallax-section">
    <div class="bg"></div>
    <div class="content">
      <h1>Parallax Section</h1>
      <p>Scroll to see background move slower.</p>
    </div>
  </section>

  <section class="section3">
    <div class="box box3"></div>
  </section>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

`script.js`:

```js
gsap.registerPlugin(ScrollTrigger);

// 1. Simple fade-in boxes on scroll
gsap.set(".box1, .box3", { y: 80, opacity: 0 });

gsap.to(".box1", {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".box1",
    start: "top 85%",
    toggleActions: "play none none none",
  },
});

gsap.to(".box3", {
  y: 0,
  opacity: 1,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".box3",
    start: "top 85%",
    toggleActions: "play none none none",
  },
});

// 2. Staggered boxes in section2
const boxes2 = document.querySelectorAll(".section2 .box2");
gsap.set(boxes2, { y: 80, opacity: 0 });

gsap.to(boxes2, {
  y: 0,
  opacity: 1,
  duration: 0.9,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".section2",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

// 3. Parallax background
const parallaxSection = document.querySelector(".parallax-section");
const bg = parallaxSection.querySelector(".bg");

gsap.to(bg, {
  y: 150,
  ease: "none",
  scrollTrigger: {
    trigger: parallaxSection,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
```

***

<!-- If you want, next lecture can be:

- “Lecture 4: Building a full landing page with GSAP + ScrollTrigger”  
- or “Lecture 4: Advanced ScrollTrigger (markers, refresh, batch, scrollerProxy)”  

Tell me which you prefer, or ask specific questions about any property above. -->