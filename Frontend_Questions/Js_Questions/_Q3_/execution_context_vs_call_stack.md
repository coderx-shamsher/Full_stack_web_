Chalo confusion clear karte hain: **Main Execution Context** aur **Call Stack** alag-alag cheezein hain, par related hain. [linkedin](https://www.linkedin.com/posts/gaurav-patel-engineer_interviews-javascript-eventloop-activity-7394549350451855360-UACk)

***

## 1) Execution Context kya hai?

**Execution Context** = ek “package” jisme JS engine ko pata hota hai:

- Kaunse variables available hain  
- Scope chain kya hai  
- `this` ka value kya hai  
- Code kaise execute karna hai  

Har baar jab code run hota hai, ek execution context banta hai. 

Types:

1. **Global Execution Context (GEC)**  
   - Poori file ke liye **sirf ek** banta hai.  
   - Isko hi log kabhi-kabhi **“main execution context”** bol dete hain. 
   - Isme:
     - Global variables (`var`, `let`, `const` at top level)
     - Global functions
     - `window` (browser) ya `globalThis`

2. **Function Execution Context (FEC)**  
   - Har function call pe **naya** banta hai. 
   - Isme:
     - Local variables (`arguments`, params, `let`, `const`, `var` inside function)
     - Us function ka scope chain
     - Us function ka `this`

3. **Eval / Module contexts** (advanced, interviews mein kam)  

Toh:  
**“Main execution context” = Global Execution Context** (jo sabse pehle banta hai, jisme puri script chalti hai). 

***

## 2) Call Stack kya hai?

**Call Stack** = ek **stack data structure** jo track karta hai:  
“Abhi kaunse execution contexts active hain, kaunsa function chal raha hai, kisne kisne call kiya?” [linkedin](https://www.linkedin.com/posts/gaurav-patel-engineer_interviews-javascript-eventloop-activity-7394549350451855360-UACk)

Rules:

- JS single-threaded hai → ek time pe **sirf ek execution context** actively run kar raha hota hai (jo stack ke top pe hai). [linkedin](https://www.linkedin.com/posts/gaurav-patel-engineer_interviews-javascript-eventloop-activity-7394549350451855360-UACk)
- Jab function call hota hai:
  - Naya **function execution context** banta hai  
  - Uska frame **call stack ke top** pe push hota hai  
- Jab function return karta hai:
  - Uska execution context khatam  
  - Uska frame **pop** ho jata hai  
- Jab sab functions return ho jate hain, toh stack mein sirf **global execution context** bachta hai.  
- End mein, jab script finish hoti hai, toh global context bhi pop ho jata hai → stack empty. [linkedin](https://www.linkedin.com/posts/gaurav-patel-engineer_interviews-javascript-eventloop-activity-7394549350451855360-UACk)

***

## 3) Dono ka relation: simple picture

Socho:

- **Execution Context** = ek “dabba” jisme ek particular code-run ka saara info hai (variables, scope, `this`). 
- **Call Stack** = in dabbon ka **stack** (ek ke upar ek), jo batata hai kaunsa dabba abhi chal raha hai. [linkedin](https://www.linkedin.com/posts/gaurav-patel-engineer_interviews-javascript-eventloop-activity-7394549350451855360-UACk)

Flow:

1. Script load hoti hai  
   → **Global Execution Context** banta hai  
   → Call stack: `[ GEC ]`

2. Global code mein koi function call hota hai, jaise `a()`  
   → **Function Execution Context for `a`** banta hai  
   → Call stack: `[ GEC, FEC(a) ]`

3. `a()` ke andar `b()` call hota hai  
   → **FEC(b)** banta hai  
   → Call stack: `[ GEC, FEC(a), FEC(b) ]`

4. `b()` return karta hai  
   → FEC(b) pop  
   → Call stack: `[ GEC, FEC(a) ]`

5. `a()` return karta hai  
   → FEC(a) pop  
   → Call stack: `[ GEC ]`

6. Script end  
   → GEC pop  
   → Call stack: `[]` (empty) [linkedin](https://www.linkedin.com/posts/gaurav-patel-engineer_interviews-javascript-eventloop-activity-7394549350451855360-UACk)

Toh:

- **Main execution context** = ek specific execution context (global wala).  
- **Call stack** = saare active execution contexts ka order (stack).  

“Main execution context” ek **dabba** hai, “call stack” un dabbon ki **line** hai. [linkedin](https://www.linkedin.com/posts/gaurav-patel-engineer_interviews-javascript-eventloop-activity-7394549350451855360-UACk)

***

## 4) Example code ke saath

```js
const x = 10; // global

function a() {
  const y = 20;
  b();
}

function b() {
  const z = 30;
  console.log(x, y, z);
}

a();
```

Step-by-step:

1. Script load → **GEC** banta hai  
   - `x`, `a`, `b` register (hoisting + creation phase)  
   - Call stack: `[ GEC ]`

2. Global code `a()` call karta hai  
   - **FEC(a)** banta hai (`y`, `a` ka scope, `this`)  
   - Call stack: `[ GEC, FEC(a) ]`

3. `a()` ke andar `b()` call  
   - **FEC(b)** banta hai (`z`, `b` ka scope)  
   - Call stack: `[ GEC, FEC(a), FEC(b) ]`

4. `b()` execute → `console.log(x, y, z)`  
   - `z` → FEC(b) se  
   - `y` → FEC(a) se (scope chain)  
   - `x` → GEC se  

5. `b()` return → FEC(b) pop  
   - Call stack: `[ GEC, FEC(a) ]`

6. `a()` return → FEC(a) pop  
   - Call stack: `[ GEC ]`

7. Script end → GEC pop → stack empty. [linkedin](https://www.linkedin.com/posts/gaurav-patel-engineer_interviews-javascript-eventloop-activity-7394549350451855360-UACk)

***

## 5) Interview-style short answers

Agar interviewer pooche:

**Q: What is Global Execution Context?**  
A: Wo pehla execution context jo script load hote hi banta hai; isme global variables, functions, aur `window`/`globalThis` hote hain. Poori file ke liye sirf ek hota hai. 

**Q: What is Call Stack?**  
A: Ek LIFO stack jo active execution contexts ko track karta hai. Top pe jo context hai, wahi abhi execute ho raha hota hai. [linkedin](https://www.linkedin.com/posts/gaurav-patel-engineer_interviews-javascript-eventloop-activity-7394549350451855360-UACk)

**Q: Difference between Execution Context and Call Stack?**  
- Execution Context: ek single run ka info (variables, scope, `this`).  
- Call Stack: saare active execution contexts ka stack (order). [linkedin](https://www.linkedin.com/posts/gaurav-patel-engineer_interviews-javascript-eventloop-activity-7394549350451855360-UACk)

Agar chaho toh main next message mein ek chhota diagram-style text flow bana ke de sakta hoon jo tum notes mein copy-paste kar sako.