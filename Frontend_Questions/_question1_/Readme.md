# Question -> 
- **var VS let VS const differences?**

## what are they (yeh hai kiya or keo use krne hai)
- *First we need to understand k vaiables kiya hai*
**A Variables are the "names of data we stored in memory, variables are identifiers or that data we stored so that we can use it with the name of the variables", *We can use variables to store data*, ager hamein kisi value ko store krna hai tn ki bar bar use ho sake to hamm variables ka use krte hain**  

- *In js, we create variables using the "var, let, and const" keywords to store data in vairables*

> *JavaScript provides three ways to declare variables: var, let, and const, but they differ in scope, hoisting behaviour, and re-assignment rules.*
   - **var**: Declares variables with function or global scope and allows re-declaration and updates within the same scope.
   
   - **let**: Declares variables with block scope, allowing updates but not re-declaration within the same block.
   
   - **const**: Declares block-scoped variables that cannot be reassigned after their initial assignment. 


---
## Working with (var,let,const)

### 1) var (the old way)
- yeh 2015 se pahle ek he option js mein variables create krne ka, yeh kafi unexpected bugs in large apps.

- **How it works** 
```js 

// declaration
var name = "alex"
console.log(name)

// i -  re-declaration allowed in var 
// means same name variable allowed hai ! kiya yeh problem nhi hai !! kaise hai bad mein dekhte hain 
var name = "joe"
console.log(name)


// ii - updated allowed 
// ki hame variable value ko update kr skte hain
name = "max"
console.log(name)
// yeh problem nhi hai ok....! 
console.log()
```

- **var** : *yeh re-declaration and ressignment allow krta hai* 

### 2) let (modren way)
- *work same as the var, but var ki problems ko fix kiya hai let ne* 

```js

// **let** keyword 

// declare 
let num = 100 
console.log(num)
console.log()
// let not allowed re-declaration but let hame reassignment allow krta hai.. means values koi re-assign kr skte hain.. 

// let num = 200  // SyntaxError: Identifier 'num' has already been declared

num = 102020   // update bolo yan reassign allowed hai.. 
console.log(num) 


```

- *let mein ham reassign kr skte hain but re-declaration allowed nhi hai...* 

### 3) const (secure constant)
- *yeh ek constant variable create krne mein help krte hai jo ki immuatable hote hain.. its a const, ek bar variable ko value assign ho gyi to change nhi hogi !*

```js 

// **const** keyword 

// declare 
const osname = "window"
console.log(osname)
// osname = "arch"  // TypeError: Assignment to constant variable. keo ? re-assignment allowed nhi hai in const ...  yeh ek constant variable hai jiski value change nhi hogi.. 
console.log(osname)

// kiye re-declaration ? in const 
// const osname = "testing" // SyntaxError: Identifier 'osname' has already been declared. not allowed.. 
// console.log(osname)
```

---
*** 

## Scopes in (var, let, const)
- *In js **scope determines the visiblility and accessibility of variables** and functions in different parts of your code. It acts like a boundary, Helps prevent conflicts by restricting variable usage to specific areas.Improves code organization and readability*

### what is scope ?  
- *It is function-scoped or globally scoped, depending on where it's declared.* 

## *Global scope*
- *In JavaScript, global scope is the outermost **execution context** where variables, functions, and objects are declared outside of any function, block, or module.Any item living in the global scope is accessible from anywhere within your JavaScript program.*

> **Code**
```js

// this is global scope 

// var global scoped variable
var a = `hello ! global var`
console.log(a)

// let global scoped variable 
let name = "admin"

// const bhi same he global scoped ko ham use kr skte hain 

// main global scoped variable ko mere file main kisi bhi jagah access kr skta hun.. bs itna he.. 

// 1) in function using global scoped variable (var)

function testing(){
    console.log()
    console.log(a)
    a = "now this variable in function scoped"
    console.log(a)
    console.log()
}

testing()

// block scope {} -> using the global scoped variable (var)

if(10==10){
    console.log()
    console.log(a) // keoki maine global variable ko change kr diya hai keep in mind... 
    console.log()
    console.log(a,"this is block scope ... using global variable")
}

// global scope variable ko ham kisi bhi scope mein use krskte hain, jaruri nhi variables, functions, objects etc..

// yeh to that var keyword ka global variable 



// function based scope using the let global variable 
function testing01(){
    console.log()
    console.log("\n this is function scope using the let global variable..\n")
    console.log(name)
    name  = "arch user"
    console.log()
    console.log(name)
}
testing01() 

//  -> this the global scope code <- 
/// ---------------------------------------/// 

```

## *function and block scope (var, let, const)*

- *Variables declared inside a function are isolated to that specific function.Keywords: Variables created with var, let, or const inside a function are function-scoped.*

- *Introduced in ES6, block scope applies to code wrapped in curly braces {} (such as if statements, for loops, or standalone blocks).Keywords: Only variables declared with let and const obey block scope.Note: Variables declared with var ignore block boundaries and leak out to the surrounding function or global scope.*

> **Code**

```js 

// Function and block scope with (var, let and const )

function fnscope(){
     
    // function scope variables 
    var x = 20 
    let y = 39
    const z = 40
   
    // accessing function scoped 
    console.log(x)
    console.log(y)
    console.log(z) 
}
fnscope()
// now main inhe out of function scope access krne ki kosis krta hun lets see -> 

// console.log(x)
// // note muje y and z ki recomendation nhi mili
// console.log(y) 
// console.log(z) 

// muje var keyword vala variable bhi nhi mila keo ? keoki var hai -> global, and function scoped ! 
// function scoped mein us scope k bahar vo access nhi hoga uske ander he access hoga 

// yeh method hai variable security ka, k scope k bahar access allowed nhi hai (var,let,const) !


// --> block scope 
if (true){
    var block_var = "secret_var"
    let block_let = "secret_let"
    const block_const = "secret_const"
    console.log()
    console.log("accessing from inside the block scope")    
    console.log(block_let)
    console.log(block_const)
    console.log()
}

console.log("accessing outside the block scope")
console.log(block_var)
// console.log(block_let)  // error
// console.log(block_const) // error 

// -> var - block scope nhi hai 
// -> let,const dono he block scoped hai 

```


---
***

# Lexical scope in js 
- *Lexical scope in JavaScript means that variable accessibility is determined entirely by the physical location of the variable's declaration within the source code. Also known as static scope, it ensures that an inner function always has access to the variables declared in its outer (parent) environments.*

- *JavaScript determines these access boundaries at compile time (when the code is parsed), meaning a function's scope is locked in when you write it, not when or where you execute it.*

## How Lexical Scope Works
*When JavaScript looks for a variable inside a function, it follows a strict upward path called the Scope Chain:*
- It searches the current local/block scope.
- If not found, it moves up to the outer (parent) function's scope.
- It continues climbing sequentially until it reaches the global scope.
- If the variable is missing there, it throws a **ReferenceError**

> **Code**
```js 
// lexical scope in js

let global = "hello! lexical"; // comment and run

function testing() {
  //    let global = "hello from testing function" // uncomment and run
  let name = "linux";

  function abc() {
    // let global = "hello from abc function" //un comment and run

    function testfn() {
      console.log("\n calling from testfn --> \n");
      console.log(global);

      function deep() {
        console.log();
        console.log(name);
      }
      deep();
    }

    testfn();
  }
  abc();
}

testing();

// now  jaise hamne dekha ki yeh apne local(function scope)/block scope mein current ko find krta hai in that case mera variable hai global, to ager use global mee abc function mein nhi mila! to usne uske parent function ko call kra or uske scope mein find kra milgiya to uski value print krdi nhi ho fir se uppar ki taraf us function k bhi grandparent ko call kra aur uske scope mein find kra..
// bs yeh ese he work krta hai jis scope main hai ager usmein find krta hai nhi us parents k scopes mein... 


```
- *Lexical scope defines the accessibility of variables and functions depending on their location in the source code. Variables and functions have different levels of scope.*

  - **Global Scope**: Variables defined outside any function or block, accessible anywhere in the program.
  - **Local Scope**: Variables defined inside a function or block, accessible only within that specific function or block.
  - **Nested Scope**: Inner functions have access to variables in their parent functions.
  - **Block Scope**: Variables defined with let and const are limited to the block they are declared in, like loops or conditionals.


---

*Lexical scope (static scope) in JavaScript means: a function’s access to variables is decided by where the function is written in the source code, not by where it is called. This is fixed at “compile” time (when the engine parses your code), and it’s the foundation for scope chains and closures.* 
   - **Rule**: Inner functions can read variables from their outer (parent) lexical environments, but outer functions cannot see inner variables.
   - **Lexical** = “by location in source code”. The engine looks at the physical nesting of functions/blocks to decide which variables are visible

---

```js 

const x = 1;

function outer() {
  const x = 2;
  function inner() {
    console.log(x); // 2, because inner is lexically inside outer
  }
  inner();
}

outer();

```
*function apne “parents” (outer scope) ke variables wahi se leta hai jahan usko code mein likha gaya hai, na ki jahan se usko call kiya gaya hai.*

 - Aapne ek function inner ko outer function ke andar likha.

 - Toh inner hamesha outer ke variables dekh sakta hai, chahe aap inner ko kahin se bhi call karo.

 - Kyunki scope decide hota hai code ke location se (lexical), execution time se nahi.


```js 

const x = 1; // global

function outer() {
  const x = 2;

  function inner() {
    console.log(x); // yeh x kaunsa hai?
  }

  inner(); // call inside outer
}

outer();

```
**Yahan inner ka output 2 aata hai, kyunki:**
   - inner function likha gaya hai outer ke andar.
   - Isliye uska lexical scope outer ka scope hai.
   - Jab inner x dhundta hai, toh pehle apne scope mein dekhta hai, phir outer mein, wahan x = 2 milta hai.


## Function ko bahar se call karna
*Ab same inner ko bahar nikal ke call karte hain:*
```js
const x = 1; // global

function outer() {
  const x = 2;

  function inner() {
    console.log(x);
  }

  return inner; // return kar diya
}

const savedInner = outer(); // outer execute hua, inner return hua
savedInner(); // call global scope se
Output phir bhi 2 aayega, kyunki:
```
- inner likha gaya tha outer ke andar.
- Isliye uska lexical environment outer ka scope capture karta hai (closure).
- Call kahin se bhi ho (savedInner() global se), variable wahi milega jo definition time par decide hua tha.
- Agar scope “call location” se decide hota (dynamic scope), toh savedInner() global se call hone par x = 1 milna chahiye tha. Par JS aisa nahi karta; JS lexical/static scope use karta hai.



---
***


