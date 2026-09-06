## JS Hoisting 
> *Hoisting refers to the behavior where JavaScript moves the declarations of variables, functions, and classes to the top of their scope during the compilation phase. This can sometimes lead to surprising results, especially when using var, let, const, or function expressions.*

![](./Hoisting.jpg)

- Hoisting applies to variable and function declarations.
- Initializations are not hoisted, they are only declarations.
- 'var' variables are hoisted with undefined, while 'let' and 'const' are hoisted but remain in the Temporal Dead Zone until initialized.

## Temporal Dead Zone in JavaScript
> *The Temporal Dead Zone refers to the period between the entering of a scope and the actual declaration of a variable using let or const. During this period, the variable is in an "uninitialized" state and accessing it will result in a ReferenceError.*
 - The TDZ starts from the beginning of the block until the variable is declared.
 - Variables declared with let and const are hoisted but not initialized.
 - Accessing the variable in the TDZ results in a ReferenceError.
 - var declarations do not have a TDZ and are initialized as undefined.

---
### *Hoisting = JS engine declarations ko “upar utha ke” pehle register kar leta hai, chahe aapne neeche likhi ho.*
```js 

console.log(x); // undefined
var x = 10;
```
*Engine internally aisa samajhta hai:*
```js
var x;          // creation phase: hoisted, value = undefined
console.log(x); // execution phase: prints undefined
x = 10;         // execution phase: assignment
```

- **var vs let/const in hoisting**
**var:**
- Hoisted + undefined se initialize.
- Pehle access karoge to error nahi, bas undefined milega.

**let, const:**
- Hoisted hote hain, par uninitialized rehte hain declaration line tak.
- Declaration se pehle access karoge → ReferenceError.

--- 

### *Temporal Dead Zone (TDZ) kya hai?*
*TDZ = wo time window jab:*
- Scope start ho chuka hai
- Par let/const ki declaration line abhi tak nahi aayi
- Is window mein variable exist karta hai, par use access nahi kar sakte.

```js 
console.log(a); // undefined
var a = 5;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;

console.log(x) // / ReferenceError: Cannot access 'x' before initialization
const x = 20

```

```text

block start
   ↓
TDZ begins (let/const exist but unusable)
   ↓
let x = 5;  ← declaration line
   ↓
TDZ ends, ab x use kar sakte ho

```
---

```js 

{
    // === START OF TEMPORAL DEAD ZONE ===
    // The engine knows 'mySnack' exists, but it cannot be accessed yet.

    console.log(mySnack); // ❌ Throws ReferenceError: Cannot access 'mySnack' before initialization

    // === END OF TEMPORAL DEAD ZONE ===

    let mySnack = "Apple"; // Variable is initialized here

    console.log(mySnack); //  Logs: "Apple"
}

```

```js 
// Structurally, console.log sits above the variable declaration
function printValue() {
    console.log(message); 
}

// 1. Enter scope, TDZ for 'message' starts
// 2. printValue(); // ❌ Running it here would throw a ReferenceError

let message = "Hello!"; // 3. TDZ for 'message' ends // jab variable ki value initilize hoti hai to TDZ end hojata hai 

printValue(); //  Logs: "Hello!" (Safe because it's called after initialization)

```

