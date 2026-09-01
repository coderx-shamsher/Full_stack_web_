"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("this is typescript");
let message = "hello its message";
console.log(message, typeof message);
// both represent a user, both can describe the shape of data. 
// If both can describe an object, why do we have both? ?? 
// An interface is mainly designed to describe the structure/contract of an object.
const user1 = {
    name: "test",
    age: 20,
};
console.log(user1);
// --------
// type is more flexible 
// object first 
const user2 = {
    name: "admin",
    age: 22,
    email: "admin@"
};
console.log(user2);
let status;
// status = "pending"  // i can only choose from those three 
console.log(status = "loading");
let id = "userx_2026";
let age = 20;
console.log();
console.log("user id -> ", id);
console.log("user age  -> ", age);
const hello = ['hello', 'typescript'];
console.log();
console.log(hello, typeof hello);
const sum = (n, m) => {
    return n + m;
};
console.log("");
// calling a function 
console.log(sum(10, 20));
// function without return type 
// function es5 declaration 
// this is on the way type declaration 
function greet(name) {
    console.log(`welcome ! ${name}`);
}
// ese  ham direct likhte hain not using type here only with es6 function expression 
//calling function
greet("acoder");
//# sourceMappingURL=code.js.map