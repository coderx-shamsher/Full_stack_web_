# what is Modules in Nodejs 
> *In Node.js, a module is a simple or complex functionality organized in a single or multiple JavaScript files that can be reused throughout your application. They are the essential building blocks of Node.js applications, operating much like software libraries in other programming environments. Every module has its own isolated context, meaning it does not pollute the global scope or clash with variables in other modules.*

## Types of Modules
-Node.js splits its modular architecture into three distinct categories:

### Core Modules
   - *These are pre-compiled modules built directly into the Node.js source code. They load automatically when the Node.js process starts and require no additional installation.*
   - fs: Interacts with the file system.
   - http: Spins up web servers and handles request/response streaming.
   - path: Resolves file and directory string paths safely across different operating systems.



### Local Modules
   - *These are custom modules created by you within your application. You group related utility functions, configurations, or business logic into individual files, then export them for other files to access.*

### Third-Party Modules
   - *These are packages written by external developers and downloaded via the NPM Registry. Popular examples include frameworks like express for API building, or database drivers like mongoose*

--- 
*** 

#### **Self-contained code unit**
- each file in node is treated as a separate module.
- variables, functions or objects defined in one file are not accessible in another file by default unless you explicitly export them.
- kisei bhi file js file ka koi bhi object, variable, function ham kisi bhi dusari file mein use nhi kr skte jab tak ham use export/import na kr lo. 

- nodejs uses the Commonjs module system (module.exports and require) to ensure the code in one file does not pollute or interfere with the global scope.
- this makes your code modular, maintainable, and easier to debug. 
- A module in nodejs represents a file containing code that is self-contained, reusable,encapsulated.
- Modules in nodejs are created by defining separate files for different functionalities. 

## export/import -> Commonjs 
- create a file with some code and export it. 
```js 
let testing = {
    hello : (name) =>{
        console.log(`Hello ${name}`)
    },
    arr : [0,3,4,5,6],
    username : "admin",  
    password : "admin022"   
}

// in commonsjs we use module.exports = yoursomething
module.exports = testing


```

- import or use this file code in another file 
```js 

const testing = require("./export");

// make sure ki module file ka path hame pass krna hota haif
console.log()
testing.hello("coderx")

console.log(testing.arr)
console.log()
console.log(testing.username)
console.log()

``` 
- NOTE jo bhi variable yan function yan koi object import krni hai to just uska name type kro to suggestion mein se select kro to auto require hojata hai.. its cool thing

---
***

## Named & aggregate exports in nodejs 
- phale hmne to ek he object koi  export/import kra kiya ho ager multiple objects or functions hon? 
```js

function add(x, y){
    console.log( x+y )
}

// in commonsjs we use module.exports = yoursomethink 
module.exports = testing
module.exports = add

// to kiya main ese bhi export kr skta hun ??
// NOTE ONE think -->  jab mein pahle testing export kra hai uske bad add ko, toh testing k bad mein add  ko export kra to testing ko add ne overwrite kr diya..  
// module.exports is a single object or value , when you ressign module.exports it completely replace whatever was previously assigned. 
```

- import it....

```js 

// muje kafi errors dekhne ko milte hain 

add(22,33)
// yeh code run nhi hoga jab tak pahla code comment nhi hoga or  hame dono ko use nhi kr skte.. 
```

- **NOTE**
 - use module.exports = {} 
 - or assign properties individually with module.exports.property.

- best way i choose -> 
```js
//  using the object exporting more than one 
module.exports = {testing,add}

```
- import 
```js
const {add , testing} = require('./export')
// import krte time name ka diyan rkhna nhi to errors ayeinge
// object destructuring 

// we can also do this 

const object = require('./export.js')

console.log()
// testing.hello("coderx")
// add(22,33)  

// other way without destructuring 
object.testing.hello("module")
object.add(1,3)


// ab main dono ko use kr skta hun,
```
---
***