## Deep Copy vs Shallow Copy – simple & interview-ready

**Short professional answer (20–30 sec):**

> A **shallow copy** duplicates only the **top-level properties** of an object or array. Nested objects and arrays are still **shared by reference**, so changes to nested data affect both original and copy.  
> A **deep copy** recursively duplicates **every level**, so the new structure shares **no references** with the original; changes in one do not affect the other.  
> In JavaScript, spread (`{...obj}`) and `Object.assign` create shallow copies, while `structuredClone()` (modern) or `JSON.parse(JSON.stringify(obj))` (with limitations) can be used for deep copies. [skillveris](https://www.skillveris.com/interview-questions/web-development/shallow-vs-deep-copy)

***

## 1) Shallow Copy – kya hota hai?

**Definition:**  
Naye object/array mein sirf **first level** ke values copy hote hain.  
Agar kisi property ka value khud ek object/array hai, toh sirf uska **reference** copy hota hai, object nahi. [skillveris](https://www.skillveris.com/interview-questions/web-development/shallow-vs-deep-copy)

**Common ways:**

```js
// 1) Spread operator
const obj2 = { ...obj1 };
const arr2 = [...arr1];

// 2) Object.assign
const obj2 = Object.assign({}, obj1);

// 3) Array slice
const arr2 = arr1.slice();
```

**Example:**

```js
const original = {
  name: 'Alice',
  address: { city: 'Amritsar', pin: 143001 }
};

const shallowCopy = { ...original };

shallowCopy.address.city = 'Delhi';

console.log(original.address.city); // 'Delhi' (change reflected!)
console.log(shallowCopy.address.city); // 'Delhi'
```

- `original` aur `shallowCopy` alag objects hain, lekin `address` **same reference** share kar rahe hain.  
- Isliye nested change dono ko affect karta hai. [skillveris](https://www.skillveris.com/interview-questions/web-development/shallow-vs-deep-copy)

***

## 2) Deep Copy – kya hota hai?

**Definition:**  
Naya object/array aise banta hai ki **poora structure recursively copy** ho jaye.  
Koi bhi nested object/array original ke saath **share nahi** hota. [skillveris](https://www.skillveris.com/interview-questions/web-development/shallow-vs-deep-copy)

**Modern way: `structuredClone()`**

```js
const original = {
  name: 'Alice',
  address: { city: 'Amritsar', pin: 143001 },
  joined: new Date(),
  tags: new Set(['dev', 'js'])
};

const deepCopy = structuredClone(original);

deepCopy.address.city = 'Delhi';
deepCopy.tags.add('ts');

console.log(original.address.city); // 'Amritsar' (unchanged)
console.log(original.tags); // Set {'dev', 'js'}
```

- `structuredClone()` nested objects, arrays, `Date`, `Map`, `Set`, `RegExp`, circular references sab sahi se copy karta hai. [skillveris](https://www.skillveris.com/interview-questions/web-development/shallow-vs-deep-copy)

**Old hack (limited): `JSON.parse(JSON.stringify())`**

```js
const deepCopy = JSON.parse(JSON.stringify(original));
```

**Limitations:**

- `Date` → string ban jata hai.  
- `Map`, `Set`, `RegExp` → plain object ya lose ho jate hain.  
- `undefined`, `function`, `symbol` → drop ho jate hain.  
- Circular references → error throw karta hai. [dev](https://dev.to/vivian-voss/the-deep-clone-you-never-had-to-install-3fa4)

Isliye interview mein bolna chahiye:  
> “For deep copy, prefer `structuredClone()`; `JSON.parse(JSON.stringify())` only for simple, JSON-safe data.” [linkedin](https://www.linkedin.com/posts/gabriele-ferreri_javascript-webdev-performance-activity-7429887420411768832-oVkZ)

***

## 3) Visual comparison

**Shallow copy:**

```text
original:  { name, address: { city, pin } }
                ↓ (reference shared)
shallow:   { name, address: ────────┘ }
```

**Deep copy:**

```text
original:  { name, address: { city, pin } }

deep:      { name, address: { city, pin } }
           (completely separate in memory)
```



***

## 4) When to use what?

- **Shallow copy** jab:
  - Data mostly primitives ho.
  - Nested objects intentionally share rakhne hon (ya tumhe pata ho ki nested change nahi honge). [skillveris](https://www.skillveris.com/interview-questions/web-development/shallow-vs-deep-copy)

- **Deep copy** jab:
  - Nested data ko independently modify karna ho.
  - Immutable patterns, state management (Redux, etc.), caching, etc. [skillveris](https://www.skillveris.com/interview-questions/web-development/shallow-vs-deep-copy)

***

## 5) Interview-ready explanation (bolne ka style)

Agar interviewer pooche: **“Difference between shallow copy and deep copy?”**

Tum bol sakte ho:

> A shallow copy duplicates only the top-level properties of an object or array. If a property is itself an object or array, only its reference is copied, so nested changes affect both original and copy.  
> A deep copy recursively duplicates every level, so the new structure shares no references with the original; changes in one do not affect the other.  
> In JavaScript, spread and `Object.assign` create shallow copies. For deep copies, we can use `structuredClone()` in modern environments, or `JSON.parse(JSON.stringify())` with the caveat that it loses functions, Dates, Maps, Sets, and fails on circular references. [skillveris](https://www.skillveris.com/interview-questions/web-development/shallow-vs-deep-copy)

Agar chaho toh main next message mein ek chhota “cheat-sheet” code snippet de sakta hoon jisme shallow vs deep copy ke saare common patterns ek saath ho, jo tum notes mein copy-paste kar sako.