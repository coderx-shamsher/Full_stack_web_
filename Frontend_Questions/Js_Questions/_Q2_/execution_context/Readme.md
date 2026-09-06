# 1) Execution Context – “code run hone ka dabba”
> *Jab bhi JS koi code run karti hai, woh ek execution context banati hai. Ye ek tarah ka “dabba” hai jisme:*
- Variables/functions ki list hoti hai
- Scope ka pata hota hai (kaunse outer variables milenge)
- this ka value hota hai
- Code execute hone ka order hota hai

## Types:

- **Global Execution Context**: Poori file ke liye ek hi banta hai.
- **Function Execution Context**: Har function call pe naya banta hai.

 **Har execution context 2 phases mein chalta hai:** 
   ### a) Creation Phase (pehle setup)
   - *JS engine code ko upar se neeche scan karta hai, par execute nahi karta. Is phase mein:*

     - *var, let, const, function declarations ko register karta hai (memory allocate).*

     - *var → undefined se initialize.*

     - *let/const → exist karte hain par uninitialized (TDZ start).*

     - *Function declarations puri tarah ready ho jate hain (call kar sakte ho pehle line se).*

  ### b) Execution Phase (ab code chalta hai)
  *Ab line-by-line code execute hota hai : **Assignments (=) isi phase mein hoti hain.console.log, conditions, loops, sab kuch yahan run hota hai.***

---
---

