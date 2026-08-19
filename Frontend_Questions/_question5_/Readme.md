## Difference between `==` and `===` in JavaScript

**Short professional answer:**

> `==` is the **loose equality** operator: it compares two values after performing **type coercion** (converting one or both operands to a common type).  
> `===` is the **strict equality** operator: it compares both **value and type** without any type coercion.  
> In practice, we almost always prefer `===` to avoid unexpected bugs caused by implicit type conversion. [toolmingo](https://toolmingo.com/blog/javascript-interview-questions)

***

## Key differences

- `==` (loose equality):
  - Converts types if they are different, then compares.
  - Can give surprising results.  
  Examples:
  ```js
  5 == '5'        // true  (string '5' → number 5)
  0 == false      // true  (false → 0)
  '' == 0         // true  ('' → 0)
  null == undefined // true (special rule)
  ```

- `===` (strict equality):
  - No type conversion; if types differ, result is `false`.
  - Safer and more predictable.  
  Examples:
  ```js
  5 === '5'       // false (number vs string)
  0 === false     // false (number vs boolean)
  '' === 0        // false (string vs number)
  null === undefined // false (different types)
  ```

***

## Interview-style explanation

If interviewer asks: **“Difference between `==` and `===`?”**

You can say:

> `==` does type coercion before comparison, so values of different types can be considered equal. `===` checks both type and value, so different types are always not equal. Because coercion rules are complex and error-prone, best practice is to use `===` unless you explicitly need `==` behavior (for example, checking `null == undefined`). 

Agar chaho toh main 5–6 tricky `==` vs `===` output questions bhi de sakta hoon jo interviews mein common hain.