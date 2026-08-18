// hoisting with var 

console.log(a)  // undefined 
var a = 10
// var hoisting lifts declarations, not initializations.

// console.log(x)  // ReferenceError: Cannot access 'x' before initialization
let x = 10

// console.log(z) // ReferenceError: Cannot access 'x' before initialization  
const z = 22 


// function decaration hoisting 

good()  //Note: The function declaration is hoisted, and the entire function definition is available before its position in the code.

function good(){
    console.log("this is a good function")
}


// function expression hoisting / arrow functions

// fnc()  // ReferenceError: Cannot access 'fnc' before initialization
const fnc = function () {
    console.log("this is function expression")
}

// testfn() // ReferenceError: Cannot access 'testfn' before initialization

const testfn = () =>{
    console.log("this is arrow function")
}



// TDZ , This prevents access to them before they are initialized.

// hoisting -> declaration bad mein krna access phale krna variables(var) , functions experssions and arrow functions etc, 
/** 
 *   var -> Hoisted and initialized to undefined, accessing before the line of declaration gives undefined (no errors)
 *   
 *   let and const -> hoisted but not initialized, between scope start and the declaration line is the temporal dead zone (TDZ), Accessing in tdz -> referenceError ReferenceError: Cannot access  before initialization
 * 
 */


console.log(tst)

tst = 22 

var tst 