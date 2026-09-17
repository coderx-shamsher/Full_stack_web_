Bilkul! 🔥 Chalo tumhare Three.js cube render karne wale code ko ekdum beginner-friendly way mein samajhte hain. Main pehle overall picture samjhaunga, phir har line ka breakdown, aur last mein animation kaise chal rahi hai woh samjhenge.

# 🎮 Hum kya bana rahe hain?

Hum browser ke andar ek 3D cube bana rahe hain jo rotate karega.

Socho tum ek 3D movie set bana rahe ho:

![The Basics to Using Three.js: Build a Cube | by Adam Shappy | Medium](https://images.openai.com/static-rsc-4/qcf91dB_TSU53QHVj57nOIS8GfzyYbx3EKEePm9agSxozUC8HbMBuOp8WHbZCUUDjQ2bTuYHv_1lvX-iZxro1dDHpG83lMwcXir2g4RQ_EEQIwEPEk-4b2XXsqtDQS-B0MdvQdpUQ9CIMCczdRej_taGRQJVlgJsrQ4X5HBZht0?purpose=inline)

## Three.js = 3D movie set

Scene mein objects honge, camera unhe dekhega, aur renderer unhe screen par draw karega.

#### 🎬 Scene

3D world / container

Jahan cube rakha hai.

#### 📷 Camera

Viewpoint

Jahan se hum cube ko dekh rahe hain.

#### 🧊 Mesh

Visible 3D object

Hamara actual cube.

#### 🖥️ Renderer

Drawing machine

3D world ko canvas par render karta hai.

> Simple formula: Scene + Camera + Mesh + Renderer → 3D object screen par

# 1. Scene — Hamari 3D duniya

### Tumhara code

JavaScript

```
// scene
const scene = new THREE.Scene();
```

### Technical meaning

`THREE.Scene()` ek scene object create karta hai. Ye ek 3D world/container hota hai jisme hum objects, lights, cameras, groups, etc. add kar sakte hain.

### Easy explanation

Socho tumne ek empty room banaya.

Abhi room khaali hai. Isme na cube hai, na light, na koi aur object.

JavaScript

```
const scene = new THREE.Scene();
```

Matlab:

> "Three.js, mere liye ek 3D duniya bana do."

### Scene ke andar kya aa sakta hai?

```
Scene
 ├── Cube
 ├── Sphere
 ├── Light
 ├── Another object
 └── ...
```

### Important point

Scene khud screen par kuch draw nahi karti. Ye sirf objects ko organize/store karti hai.

# 2. Camera — Hum cube ko kahan se dekh rahe hain?

### Tumhara code

JavaScript

```
// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
```

Ye part initially thoda confusing lagta hai, but isko simple karte hain.

## Camera kya hota hai?

Camera decide karta hai:

* Hum 3D world ka kaunsa part dekhenge?

* Objects kitne bade ya chhote dikhenge?

* Perspective kaisa hoga?

Socho ek real camera hai jo room mein rakha hai. Room mein cube hai, lekin camera jis direction mein dekhega, screen par wahi view aayega.

## `PerspectiveCamera` kya hai?

JavaScript

```
new THREE.PerspectiveCamera(...)
```

Three.js mein camera ke different types hote hain. `PerspectiveCamera` real-life camera jaisa behave karta hai.

### Real-life example

Door ki taraf dekho:

* Paas ki cheez badi dikhti hai.

* Door ki cheez chhoti dikhti hai.

* Parallel lines distance par converge karti hui lag sakti hain.

Is effect ko perspective kehte hain.

![Adding a Custom Star-Field Background with three.js | by Kuntal Das | Nerd For Tech | Medium](https://images.openai.com/static-rsc-4/L6iKIEDK4YXwdtzmXnkDQwHl3Yegv4Iw-e1PFuQbOQWNDDGzvUg-WKYUl-MRP7lDRbyZYWeqxbomptMDn-IXlReF5zfkYDRy1LWyqJz8KvyEfexFJS_m-RiItagQymcvdcmlN_TKzYpa6ZxfjKYnrDP5N-V3xt07UGVenE2uvvE?purpose=inline)

## Ab 4 arguments ko samjho

JavaScript

```
const camera = new THREE.PerspectiveCamera(
  75,                              // 1. FOV
  window.innerWidth / window.innerHeight, // 2. Aspect ratio
  0.1,                             // 3. Near
  1000,                            // 4. Far
);
```

### 1️⃣ `75` → Field of View (FOV)

FOV = camera kitna wide area dekh sakta hai.

JavaScript

```
75
```

Yahan FOV 75 degrees hai.

Socho:

* Low FOV → narrow view, zoomed-in feel.

* High FOV → wide view, zyada area visible.

Low FOV

Narrower view

High FOV

Wider view

> Note: FOV generally vertical field of view hota hai in Three.js `PerspectiveCamera`.

### 2️⃣ Aspect ratio → Screen ka width / height

JavaScript

```
window.innerWidth / window.innerHeight
```

Agar browser:

* Width = `1200`

* Height = `800`

To:

JavaScript

```
1200 / 800 = 1.5
```

Matlab aspect ratio = 1.5

### Easy explanation

Aspect ratio camera ko batata hai:

> "Meri screen kitni wide aur kitni tall hai?"

Agar aspect ratio galat ho, to cube stretch ya squish ho sakta hai.

### 3️⃣ `0.1` → Near clipping plane

JavaScript

```
0.1
```

Camera ke bahut paas ki objects ko render nahi kiya jayega agar woh near plane ke andar hain.

### Easy explanation

Camera ke saamne ek invisible boundary hai:

> "Is distance se pehle wali cheezein mat dikhao."

### 4️⃣ `1000` → Far clipping plane

JavaScript

```
1000
```

Camera maximum kitni distance tak objects ko render karega.

### Easy explanation

Camera bolta hai:

> "Mujhe 1000 units tak ki cheezein dikhao. Uske baad ki cheezein ignore karo."

### Visual summary

```
Camera
  📷
   |
   |  Near = 0.1
   |       |------------------------------|
   |       Near                         Far = 1000
   |             Objects in this range
   |
```

### Important

Near aur far rendering limits hain. Ye camera ka actual physical position nahi hain.

# 3. Geometry — Cube ka shape / structure

### Tumhara code

JavaScript

```
const geometry = new THREE.BoxGeometry(1, 1, 1);
```

## Geometry kya hoti hai?

Geometry defines the shape and structure of a 3D object.

Easy words mein:

> Geometry batati hai ki object ka shape kaisa hoga.

### Examples

|
Geometry

|

Shape

|
| --- | --- |
|

`BoxGeometry`

|

Cube / Box

|
|

`SphereGeometry`

|

Ball

|
|

`PlaneGeometry`

|

Flat rectangle

|
|

`CylinderGeometry`

|

Cylinder

|
|

`ConeGeometry`

|

Cone

|
|

`TorusGeometry`

|

Donut

|

## `BoxGeometry(1, 1, 1)` ka meaning

JavaScript

```
const geometry = new THREE.BoxGeometry(1, 1, 1);
```

Isme 3 values hain:

JavaScript

```
BoxGeometry(width, height, depth)
```

So:

JavaScript

```
BoxGeometry(1, 1, 1)
```

Matlab:

* Width = `1`

* Height = `1`

* Depth = `1`

Yaani ek 1 × 1 × 1 cube.

![Solid Geometry](https://images.openai.com/static-rsc-4/JNlsV2Y-pexb2GlUX1XB1rvQ8Ap810eObDzVVvD4pfnaZ11E067k71vCogcSZCCfJg_listRGy4ZWg07ZTp4mUcbDL3ZlfC3qvH_a9YyQ5FRyZ4czT5v2n_T3CarycvsF8srERl-3g2HV2r48rr-s55iHoVhVHZ9JKXwnODyvPk?purpose=inline)

### Easy example

JavaScript

```
const cubeGeometry = new THREE.BoxGeometry(2, 3, 1);
```

Matlab:

```
Width  = 2
Height = 3
Depth  = 1
```

Ye cube nahi, ek rectangular box jaisa dikhega.

# 4. Material — Cube ka surface / appearance

### Tumhara code

JavaScript

```
const material = new THREE.MeshBasicMaterial({
  color: "lightblue"
});
```

## Material kya hota hai?

Material defines how the surface of a mesh appears.

Easy words:

> Material batata hai object ki surface ka look kaisa hoga.

Geometry ne shape diya:

> "Main cube hoon."

Material bolta hai:

> "Main light blue color ka hoon."

## `MeshBasicMaterial` kya hai?

JavaScript

```
new THREE.MeshBasicMaterial(...)
```

Ye ek basic material hai jo color render kar sakta hai.

### Important point ⭐

`MeshBasicMaterial` ko lights ki zaroorat nahi hoti.

Matlab agar tum scene mein light add nahi karoge, tab bhi cube visible ho sakta hai.

JavaScript

```
const material = new THREE.MeshBasicMaterial({
  color: "lightblue"
});
```

### Easy example

Socho tumne ek toy cube liya aur uspar light-blue paint kar diya.

* Geometry = toy cube ka shape

* Material = uska paint/surface

## Material ke kuch examples

JavaScript

```
const material = new THREE.MeshBasicMaterial({
  color: "lightblue"
});
```

### Dusra material: `MeshStandardMaterial`

JavaScript

```
const material = new THREE.MeshStandardMaterial({
  color: "lightblue"
});
```

Isme lighting ka effect hota hai, aur realistic appearance ke liye lights ki zaroorat hoti hai.

Abhi ke liye yaad rakho:

|
Material

|

Light required?

|

Use

|
| --- | --- | --- |
|

`MeshBasicMaterial`

|

❌ No

|

Simple color, unlit objects

|
|

`MeshStandardMaterial`

|

✅ Yes

|

More realistic lighting

|
|

`MeshPhongMaterial`

|

✅ Yes

|

Shiny/specular effects

|

# 5. Mesh — Geometry + Material = Actual Object

### Tumhara code

JavaScript

```
// mesh with created with geometry and material
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
```

Ye Three.js ka bahut important concept hai.

## Mesh kya hota hai?

Mesh is a renderable 3D object made from geometry and material.

Easy words:

> Geometry + Material ko combine karke hum ek actual visible 3D object banate hain. Us object ko Mesh kehte hain.

### Formula

Geometry

Shape

*

-

Material

Appearance

## 🧊 Mesh

Actual 3D object

### Tumhare code ka meaning

JavaScript

```
const cube = new THREE.Mesh(geometry, material);
```

Matlab:

> "Three.js, is box shape ko is light-blue material ke saath combine karke ek cube object bana do."

## `scene.add(cube)`

JavaScript

```
scene.add(cube);
```

Ye line cube ko scene ke andar add karti hai.

### Easy explanation

Tumne cube bana liya, lekin woh abhi tumhari 3D duniya mein placed nahi hai.

```
Geometry + Material
        ↓
      Mesh
        ↓
   scene.add(cube)
        ↓
Cube scene ka part ban gaya
```

### Important ⭐

Agar tum cube create karoge but scene mein add nahi karoge:

JavaScript

```
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube); ❌
```

To renderer ko cube scene ke andar nahi milega, aur cube render nahi hoga.

# 6. Camera Position — Camera ko peeche le jaana

### Tumhara code

JavaScript

```
camera.position.z = 5;
```

Ye line bahut important hai.

## Three.js ka 3D coordinate system

Three.js mein generally 3 axes hote hain:

![三木的创意空间 - 3D交互体验展示](https://images.openai.com/static-rsc-4/PlsU2oVOAs_VpW8jsss6sOu43gtjpuItgzImNZuedmgXfVn1GaZ7_6gFuNfeGJIezfXl68CAYXr_9PNGc-fQnVdRLbthDd_0X-YXM_NTUSwsjYTdwPTU69S1CVAb8AlPDxvhlKhP0p9RFWUUKOzryI_uLc2n4A0xMB7DiMo6HEs?purpose=inline)

|
Axis

|

Direction

|
| --- | --- |
|

X

|

Left ↔ Right

|
|

Y

|

Down ↕ Up

|
|

Z

|

Depth / Forward ↔ Backward

|

### Default camera direction

Three.js ka default `PerspectiveCamera` normally origin `(0, 0, 0)` ki taraf negative Z direction mein dekhta hai.

Aur hamara cube default mein origin par hota hai:

```
Cube position = (0, 0, 0)
```

Camera bhi initially origin par hota hai:

```
Camera position = (0, 0, 0)
```

Agar camera aur cube same position par hon, to problem hogi.

## `camera.position.z = 5`

JavaScript

```
camera.position.z = 5;
```

Matlab camera ko positive Z direction mein 5 units move kar do.

```
Positive Z
    ↑
Camera at z = 5
    |
    |
Cube at z = 0
```

Camera cube se peeche chala gaya, isliye cube uske view mein aa gaya.

### Easy analogy

Socho cube ek table par rakha hai aur tum uske bilkul andar khade ho. Tumhe cube sahi se nahi dikhega.

Ab tum 5 steps peeche chale gaye:

> "Ab cube ko clearly dekh sakta hoon."

Note: Camera ko move karna aur camera ko rotate karna alag cheezein hain.

# 7. Canvas — Jahan rendering dikhegi

### Tumhara code

JavaScript

```
const canvas = document.querySelector("#Canvas");
```

## Canvas kya hai?

HTML mein `<canvas>` ek drawing surface hota hai.

Example:

HTML

```
<canvas id="Canvas"></canvas>
```

### Easy explanation

Socho renderer ek artist hai, aur canvas uska paper/screen hai.

```
Three.js Renderer
       ↓
    Canvas
       ↓
Browser screen
```

### `document.querySelector("#Canvas")`

Ye JavaScript ka DOM method hai.

Matlab:

> "HTML document mein jis element ki id `Canvas` hai, usko select karo."

Agar HTML mein:

HTML

```
<canvas id="Canvas"></canvas>
```

To:

JavaScript

```
const canvas = document.querySelector("#Canvas");
```

Us canvas element ko JavaScript mein store kar dega.

### Common mistake

HTML:

HTML

```
<canvas id="canvas"></canvas>
```

JS:

JavaScript

```
document.querySelector("#Canvas");
```

Ye mismatch hai. IDs case-sensitive hoti hain.

# 8. Renderer — 3D world ko screen par draw karna

### Tumhara code

JavaScript

```
// in renderer mein hamara canvas set kr rahe hain.. in webglrenderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
```

## Renderer kya hota hai?

Renderer takes the scene and camera, processes the 3D data, and draws the resulting image onto the canvas.

Easy words:

> Renderer woh machine hai jo tumhari 3D duniya ko 2D screen image mein convert karke draw karti hai.

### Real-life analogy

* Scene = movie set

* Camera = movie camera

* Mesh = actor/object

* Renderer = camera footage ko screen par display karne wala system

## `new THREE.WebGLRenderer({ canvas })`

JavaScript

```
const renderer = new THREE.WebGLRenderer({ canvas });
```

### `WebGLRenderer` kya hai?

Three.js ka renderer jo browser ke WebGL technology ka use karke 3D graphics draw karta hai.

### `{ canvas }` kya kar raha hai?

Tumne pehle HTML canvas select kiya:

JavaScript

```
const canvas = document.querySelector("#Canvas");
```

Ab us canvas ko renderer ko de diya:

JavaScript

```
const renderer = new THREE.WebGLRenderer({ canvas });
```

Matlab:

> "Renderer, isi canvas par graphics draw karna."

### Alternative way

Agar tum canvas khud provide nahi karte:

JavaScript

```
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
```

Three.js apna canvas create kar deta hai.

Lekin tumhare code mein already HTML canvas hai, isliye `{ canvas }` use kiya hai.

## `renderer.setSize(...)`

JavaScript

```
renderer.setSize(window.innerWidth, window.innerHeight);
```

Ye renderer ka output size set karta hai.

Agar browser window:

```
Width  = 1200
Height = 800
```

To:

JavaScript

```
renderer.setSize(1200, 800);
```

### Easy explanation

> "Renderer, tumhara drawing area browser ki width aur height ke according set karo."

### Important distinction

`setSize()` renderer ke drawing buffer / output size ko set karta hai. CSS se canvas ka visual size alag control ho sakta hai.

Abhi basic learning mein itna yaad rakho:

> Canvas = surface, Renderer = drawing system, setSize = output dimensions.

# 9. `animate()` — Animation ka engine

Ab hum code ke sabse interesting part par aa gaye. 🔥

### Tumhara code

JavaScript

```
function animate(time) {
  window.requestAnimationFrame(animate)
  renderer.render(scene, camera);
  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;
}

animate()
```

Isko ek-ek line samajhte hain.

## Pehle: `requestAnimationFrame()` kya hai?

### Technical definition

`requestAnimationFrame(callback)` browser API hai jo browser ko request karta hai ki next screen repaint se pehle callback function execute kare.

### Easy explanation

Socho browser ek flipbook animation bana raha hai.

Har frame mein:

1. Cube ki position/rotation update hoti hai.

2. Scene render hoti hai.

3. Next frame ke liye browser callback chalata hai.

   Frame 1 → Update → Render
   Frame 2 → Update → Render
   Frame 3 → Update → Render
   Frame 4 → Update → Render
   ...

Isi continuous process se animation smooth dikhti hai.

## `function animate(time)`

JavaScript

```
function animate(time) {
```

Yahan `animate` ek function hai.

`time` kya hai?

Jab `requestAnimationFrame()` callback ko call karta hai, browser ek timestamp pass karta hai.

Ye timestamp generally page load/navigation ke reference se milliseconds mein hota hai.

Example:

```
time = 0 ms
time = 16 ms
time = 33 ms
time = 50 ms
...
```

Exact values fixed nahi hoti; browser ke frame timing par depend karti hain.

### Important

Tum jab manually likhte ho:

JavaScript

```
animate()
```

To tumne `time` argument nahi diya, isliye first call mein:

JavaScript

```
time === undefined
```

Hoga.

Lekin first call ke andar `requestAnimationFrame(animate)` schedule ho jata hai. Uske baad browser callback ko timestamp ke saath call karega.

# 10. `window.requestAnimationFrame(animate)`

### Tumhara code

JavaScript

```
window.requestAnimationFrame(animate)
```

Iska meaning:

> "Browser, next repaint se pehle `animate` function ko dobara call karna."

### Behind the scenes

```
animate()
   |
   | requestAnimationFrame(animate)
   ↓
Browser waits for next repaint
   ↓
animate(time)
   |
   | requestAnimationFrame(animate)
   ↓
Browser waits for next repaint
   ↓
animate(time)
   |
   ...
```

### Ye loop kaise ban gaya?

Kyuki function khud ko dobara schedule kar raha hai.

Isko recursive animation loop keh sakte hain.

> Important: `requestAnimationFrame()` khud automatically infinite loop nahi chalata. Tum callback ke andar usko dobara call karte ho, tab continuous loop banta hai.

# 11. `renderer.render(scene, camera)` — Actual rendering

### Tumhara code

JavaScript

```
renderer.render(scene, camera);
```

Ye line actual scene ko screen par draw karti hai.

### Technical meaning

Renderer scene ke objects ko camera ke viewpoint se render karta hai.

### Easy meaning

> "Renderer, camera ke view se scene ki picture banao aur canvas par dikhao."

### Is line ke bina?

Agar tum ye line hata do:

JavaScript

```
// renderer.render(scene, camera);
```

To cube create hoga, scene mein add bhi hoga, but screen par draw nahi hoga.

### Rendering flow

```
Scene
  +
Camera
  ↓
renderer.render(scene, camera)
  ↓
Canvas par image
```

### Important ⭐

Create karna ≠ Render karna

JavaScript

```
const cube = new THREE.Mesh(...); // Object create
scene.add(cube);                  // Scene mein add
renderer.render(scene, camera);   // Screen par draw
```

# 12. Cube rotation — `rotation.x` aur `rotation.y`

### Tumhara code

JavaScript

```
cube.rotation.x = time / 2000;
cube.rotation.y = time / 1000;
```

Ye lines cube ko rotate kar rahi hain.

## Rotation kya hoti hai?

3D object ko kisi axis ke around ghumana.

Three.js mein:

JavaScript

```
cube.rotation.x
cube.rotation.y
cube.rotation.z
```

### Axes

|
Property

|

Rotation around

|
| --- | --- |
|

`rotation.x`

|

X-axis

|
|

`rotation.y`

|

Y-axis

|
|

`rotation.z`

|

Z-axis

|

![Axes of Rotation - Cook & Katz (1999) \*](https://images.openai.com/static-rsc-4/2WAoAbVtrv6FAAxCIx-9Ziq0PWQn9vdFwPcnVuOt3LDRBlTL5hKhOdw2XeE5tHTmsgz9OadMYE-DHa_QCQsqw0MhO0F2tYWyJydB4LV4NjqqPmdrY92mT0tqIT95IbpNsnqh_BcofrFXzqJdf7kMd3hFPcx4kPQc0CXHZjAnqO8?purpose=inline)

## `cube.rotation.x = time / 2000`

JavaScript

```
cube.rotation.x = time / 2000;
```

Matlab:

> "Time badhne ke saath cube ka X rotation angle badhao."

Example:

|
Time

|

X rotation

|
| --- | --- |
|

`0 ms`

|

`0`

|
|

`1000 ms`

|

`0.5`

|
|

`2000 ms`

|

`1`

|
|

`4000 ms`

|

`2`

|

### Y rotation

JavaScript

```
cube.rotation.y = time / 1000;
```

|
Time

|

Y rotation

|
| --- | --- |
|

`0 ms`

|

`0`

|
|

`1000 ms`

|

`1`

|
|

`2000 ms`

|

`2`

|
|

`3000 ms`

|

`3`

|

Isliye Y-axis rotation X-axis se 2 times faster change ho rahi hai.

## Important: Rotation radians mein hoti hai

Three.js mein rotation values generally radians mein hoti hain, degrees mein nahi.

### Basic
