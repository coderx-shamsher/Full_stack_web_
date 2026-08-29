// **var** keyword 

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

// **let** keyword 

// declare 
let num = 100 
console.log(num)
console.log()
// let not allowed re-declaration but let hame reassignment allow krta hai.. means values koi re-assign kr skte hain.. 

// let num = 200  // SyntaxError: Identifier 'num' has already been declared

num = 102020   // update bolo yan reassign allowed hai.. 
console.log(num) 


// **const** keyword 

// declare 
const osname = "window"
console.log(osname)
// osname = "arch"  // TypeError: Assignment to constant variable. keo ? re-assignment allowed nhi hai in const ...  yeh ek constant variable hai jiski value change nhi hogi.. 
console.log(osname)

// kiye re-declaration ? in const 
// const osname = "testing" // SyntaxError: Identifier 'osname' has already been declared. not allowed.. 
// console.log(osname)


// let talk about const arrays 
const arr = [3,6,9]
console.log(arr)
arr.push(180)
console.log(arr)

// array bhi ek reference ko point krta hai aur vo value ko ! 
// ager hamein array k reference ko change kr rahe hain to hame change nhi kr skte let see 

// arr = ["hello","kritika"]
// console.log(arr)  // TypeError: Assignment to constant variable. keo keoki reference change ho raha hai jo ki allowed nhi hai const mein 

/// -> "const makes the variable binding non-reassignable. For arrays and objects, the variable stores a reference to the object, so we cannot assign a new array to that variable, but we can still mutate the existing array through methods like push, pop, or splice."
// array ko ham or explore krte hain.....!!! 



// declration differ ! 

var a ; 
let x  ; 
const text;  //SyntaxError: Missing initializer in const declaration why? this error ? keoki const mein hamein immediately value assign krni hoti hai... 
// let and var main ham values bad mein assign kr skte hain its ok....! 


