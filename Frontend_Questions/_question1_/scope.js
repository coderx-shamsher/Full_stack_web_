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