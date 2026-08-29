## Closures – “function apne outer variables yaad rakhta hai”
*Closure = ek function + uske outer scope ke variables ka “package”.*

**Matlab:**
- *Jab tum ek function ke andar dusra function likhte ho, toh inner function outer function ke variables ko yaad rakhta hai, bhale hi outer function finish ho chuka ho*


```js 

function createGreetMessage(greeting) {
  // The outer function scope
  return function(name) {
    // The inner function scope
    console.log(`${greeting}, ${name}!`); 
  };
}

// createGreetMessage runs and finishes execution here
const sayHello = createGreetMessage("Hello"); 

// sayHello still remembers the 'greeting' variable!
sayHello("Alice"); // Output: Hello, Alice!

```

- **Data Encapsulation** *(Private Variables)You can use closures to shield variables from global scope manipulation.*

```js
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: function() { count++; return count; },
    decrement: function() { count--; return count; }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
// count is inaccessible directly from the outside (counter.count is undefined)

```

```js 
function makeCounter() {
  let count = 0; // outer variable

  return function () { // inner function
    count++;
    return count;
  };
}

const counter = makeCounter(); // outer function finish
counter(); // 1
counter(); // 2

```

**Yahan:**
- makeCounter call hua, count = 0 bana, phir return hua inner function.
- makeCounter finish ho gaya, lekin count mara nahi, kyunki inner function usko close over kar raha hai (closure).

--- 

**Real-life analogy**
*Socho:*
- Outer function = ek dabba jisme ek notebook (count) rakha hai.

- Inner function = ek chhota robot jo us dabbe ke andar rehta hai aur notebook padh/likh sakta hai.

- Dabba bahar se band ho gaya (outer function return), par robot ke paas notebook ka access abhi bhi hai.

---
