console.log("this is typescript");

let message: string = "hello its message"
console.log(message, typeof message);

//  interfaces vs type in ts 


interface user {
    name: string,
    age: number
}

type User = {
    name: string,
    age: number,
    email: string
}

// both represent a user, both can describe the shape of data. 

// If both can describe an object, why do we have both? ?? 


// An interface is mainly designed to describe the structure/contract of an object.

const user1: user = {
    name: "test",
    age: 20,
}

console.log(user1);

// --------

// type is more flexible 

// object first 
const user2: User = {
    name: "admin",
    age: 22,
    email: "admin@"
}
console.log(user2);

// it can also describe things that aren't just object shapes
// using unions 

type statusapi = "loading" | "success" | "error"; 

let status : statusapi ;


// status = "pending"  // i can only choose from those three 
console.log(status = "loading" )
// console.log(status = "pending" ) // so we cannot do that ?? yeah ...... 


// let try with interface 
// interface status  = "hello" | "world"   this is not allowed in interfaces 



// type can discrible primitive aliases 
type Userid = String
type  userage  = number

let id : Userid = "userx_2026"
let age : userage = 20
console.log();
console.log("user id -> ",id);
console.log("user age  -> ",age);

// You generally don't use an interface for this.


// type can describe tuples 
type greet = [String,String]

const hello : greet = ['hello','typescript']

console.log();
console.log(hello, typeof hello);


///  Type can describe functions
// This is another useful type use case.

// return type funciton 
type add = (a:number,b:number) => number 

const sum : add = (n,m) =>{
    return n + m
}

console.log("");
// calling a function 
console.log(sum(10,20));


// function without return type 
// function es5 declaration 
// this is on the way type declaration 
function greet(name : string) : void {
    console.log(`welcome ! ${name}`);
}
// ese  ham direct likhte hain not using type here only with es6 function expression 

//calling function
greet("acoder")


