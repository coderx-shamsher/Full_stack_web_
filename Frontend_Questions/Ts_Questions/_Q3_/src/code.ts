// ts special types 

// ----->  any 
//  typescript stop checking the value 
// means ham kisi bhi type ka data assign kr skte hain after using this keyword 
console.log();
let variable : any ;

variable = "sham"
console.log(variable, " <--Value  Type ----> ", typeof variable);
variable = 300 
console.log(variable, " <--Value  Type ----> ", typeof variable);

console.log();
function fnc(name : any){
    // console.log(`Welcome any -> ${name}`);
    console.log(`Welcome any -> `,name);
}

fnc("test")
fnc(2222)
fnc({print:"printing the value "})


// prefer to aviod any !! but kabhi specific case mein use krna bhi theek hai !!!

// ------------------------------------------------------------------

// ----> unknown
// "I don't know the type yet, so verify it before using it."

// we can create variable with unknown but hame use krne se pahle verify krna hoga kaise ? krna hai lets see

// 1 -> 
let name : unknown ;

// -This is NOT allowed: 
// name.toUpperCase()


// type narrowing ->  means verification 

name = "law"
if( typeof name === "string"){
    console.log();
    console.log(name.toUpperCase());
}



name = {
    printvalue : "hello from coderx"
}
console.log();
if(typeof name === "object"){
    console.log(name);
}


// ----------------------------------------------------------------------------------

// ----> Never -> A value that can never occur.
// Most commonly, a function that never successfully returns.

// never moslty useful with discriminated unions


type status = "loading" | "success" | "error"

function neverfnc(value : never) {
    throw new Error("Unexpected value not handled")
}

function handl_api(status : status){
    switch (status) {
        case "loading":
            return `Api => ${status}`;
        
        case "success" : 
            return `Api => ${status}`;

        case "error": 
            return `Api => ${status}`;
        default:
           return neverfnc(status);
    }
}


console.log(handl_api("error"));
// console.log(handl_api("data not found"));  // ham ager hamare union values k elava koi or value pass krnte hain error milega 

/// ---------------------------------------------------------------------------------

//  ----> void 
/// void means this function doesn't return a useful value  

function testfnc(name : string):void {
    console.log("This is test function with void ",name);
}

testfnc("admin")



// ---> undefined 

// let user : undefined ;

// means abhi eski value nhi hai but ham ese value pass kr skte hain bad mein 

type User = {
     name : string
}

function finduser() : User | undefined  {
     
     let user : User = {
        name : "userone"
     }
     // ager ese uncomment kro and then return statement ko to hame undefined milega 
     
    //  return undefined
     return user
} 

const user = finduser()

if(user){
    console.log();
    console.log("Users founded -> ",user.name);
}
else{
    console.log();
    console.log("user not founded -> ");
    console.log(user);
}
// This is extremely common when something may not exist.


///  ------> Null
// There is intentionally no value. 

type UserTest = {
    Username : string
}


let usertest : UserTest | null = null

function getuser(user : UserTest){
     
    if(!user){
        return null
    }else{
        return `There is one User  => ${user.Username}`
    }

}

// if not passing anything
let result1 = getuser() 
console.log(result1);

// if we create user and pass to the function 
usertest = {
    Username : "admin"
} 
let result2 = getuser(usertest) 
console.log(result2);


// object 

let objectval : object;

objectval = {} 
console.log(objectval, typeof objectval);
objectval = []  // this is also a object 
console.log(objectval, typeof objectval);

objectval = 123
console.log(objectval); // console but running errors 

//  {} — Don't Confuse This With "Empty Object"
console.log();
let value = {};
console.log(value);
value = 123
console.log(value);

// So don't use {} when you mean "an object with no properties."


// keyof its not type if type operator 


/// typeof -> the type checker 
let valuex : unknown ;

valuex = "hii its me"
console.log();
if(typeof valuex == "string"){
    console.log("value is string type");
}

console.log();