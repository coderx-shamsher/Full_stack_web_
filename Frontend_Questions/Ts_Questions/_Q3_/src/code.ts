// ts special types 

// ----->  any 
//  typescript stop checking the value 
// means ham kisi bhi type ka data assign kr skte hain after using this keyword 
console.log();
let variable: any;

variable = "sham"
console.log(variable, " <--Value  Type ----> ", typeof variable);
variable = 300
console.log(variable, " <--Value  Type ----> ", typeof variable);

console.log();
function fnc(name: any) {
    // console.log(`Welcome any -> ${name}`);
    console.log(`Welcome any -> `, name);
}

fnc("test")
fnc(2222)
fnc({ print: "printing the value " })


// prefer to aviod any !! but kabhi specific case mein use krna bhi theek hai !!!

// ------------------------------------------------------------------

// ----> unknown
// "I don't know the type yet, so verify it before using it."

// we can create variable with unknown but hame use krne se pahle verify krna hoga kaise ? krna hai lets see

// 1 -> 
let name: unknown;

// -This is NOT allowed: 
// name.toUpperCase()


// type narrowing ->  means verification 

name = "law"
if (typeof name === "string") {
    console.log();
    console.log(name.toUpperCase());
}



name = {
    printvalue: "hello from coderx"
}
console.log();
if (typeof name === "object") {
    console.log(name);
}


// ----------------------------------------------------------------------------------

// ----> Never -> A value that can never occur.
// Most commonly, a function that never successfully returns.

// never moslty useful with discriminated unions


type status = "loading" | "success" | "error"

function neverfnc(value: never) {
    throw new Error("Unexpected value not handled")
}

function handl_api(status: status) {
    switch (status) {
        case "loading":
            return `Api => ${status}`;

        case "success":
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

function testfnc(name: string): void {
    console.log("This is test function with void ", name);
}

testfnc("admin")



// ---> undefined 

// let user : undefined ;

// means abhi eski value nhi hai but ham ese value pass kr skte hain bad mein 

type User = {
    name: string
}

function finduser(): User | undefined {

    let user: User = {
        name: "userone"
    }
    // ager ese uncomment kro and then return statement ko to hame undefined milega 

    //  return undefined
    return user
}

const user = finduser()

if (user) {
    console.log();
    console.log("Users founded -> ", user.name);
}
else {
    console.log();
    console.log("user not founded -> ");
    console.log(user);
}
// This is extremely common when something may not exist.


///  ------> Null
// There is intentionally no value. 

type UserTest = {
    Username: string
}


let usertest: UserTest | null = null

function getuser(user: UserTest) {

    if (!user) {
        return null
    } else {
        return `There is one User  => ${user.Username}`
    }

}

// if not passing anything
let result1 = getuser()
console.log(result1);

// if we create user and pass to the function 
usertest = {
    Username: "admin"
}
let result2 = getuser(usertest)
console.log(result2);


// object 

let objectval: object;

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
let valuex: unknown;

valuex = "hii its me"
console.log();
if (typeof valuex == "string") {
    console.log("value is string type");
}
// This is very useful when you want to derive a type from an existing value.


// in 
// you saw this with type narrowing 

type UsersObject = {
    username: string,
    permissions: string[]
}

let Admin: UsersObject = {
    username: "adminbob",
    permissions: ['r', 'w', 'x']
}
function checking(user: UsersObject) {
    if ("permissions" in user) {

        if (user.permissions[0] === 'r' && user.permissions.length == 1 ) {
            console.log("U have only the Read Permission => ",[ user.permissions.join("")]);
        }
        else if (user.permissions[0] === 'w' && user.permissions.length == 1 ) {
            console.log("U have only the Write Permission => ", [ user.permissions.join("")]);
        }
        else if (user.permissions[0] === 'x' && user.permissions.length == 1 ) {
            console.log("U have only the Execute Permission => ", [ user.permissions.join("")]);
        }
        else if (user.permissions[1] === 'r' && user.permissions[0] === 'w' && user.permissions.length == 2) {
            console.log("U have the Read & Write Permissions => ", [ user.permissions.join("")]);
        }
        else if (user.permissions[0] === 'r' && user.permissions[1] === 'x' && user.permissions.length == 2) {
            console.log("U have the Read & Execute Permissions => ",[ user.permissions.join("")] )
        }
        else if (user.permissions[0] === 'w' && user.permissions[1] === 'x' && user.permissions.length == 2 ) {
            console.log("U have the  Write & Execute Permissions => ",[ user.permissions.join("")] )
        }
        else if (user.permissions[0] === 'r' && user.permissions[1] === 'w' && user.permissions[2] === 'x' && user.permissions.length === 3) {
            console.log("U have the Read-Write-Execute Permissions => ", [user.permissions.join("")]);
        }

    } else {
        console.log("permissions requied !");
    }
}

// some try and error code !! 
let user11 : UsersObject = {username : "test", permissions:['r','w']}
if(user11.permissions[0] === 'r' && user11.permissions[1] === 'w'){
  console.log("its working ",user11.permissions.join(""));
}
console.log();

// console.log(Admin.permissions[0]);
// checking({ username: "test", permissions: ['r'] })
// checking({username : "test", permissions:['x']})
// checking({username : "test", permissions:['r','w']})
// checking({ username: "test", permissions: ['w', 'x'] })
// checking({username : "test", permissions:['r','w','x']})
checking({ username: "test", permissions: ['r','x','w'] }) // make sure give pass your persmission in order  
// checking({username : "test"})



// instanceof 
/// checking the somethink is instance of a class ? 

type errorType = {
    errname : string,
    errmessage : string
}

let error1 : errorType = { 
     errname : "type error",
     errmessage : "u have a type error on line 32 " 
}

let err2 = Object.create(error1)

// TODO -> complete this 

interface Customer {
   name : string
   age : number
}


function checker(value : unknown) {
    // return (typeof value === "object" && value !== null && "name" in value && "age" in value)
    if(typeof value === "object" && value !== null && "name" in value && "age" in value){
        return value 
    } 
}

function checker1(value : unknown) : value is Customer {
    return (typeof value === "object" && value !== null && "name" in value && "age" in value) // it return boolean 
}

console.log(checker({name:'vikul',age:23}))
console.log(checker1({name:'vikul',age:23}))  // If this function returns true, TypeScript can treat value as User.
console.log();

if(checker1({name:'vikul',age:23})){
    console.log("customer detail --> ");
    console.log({name:'vikul',age:23});
}
console.log();


/// ---------------------------------- 
// as Type Assertion 
// as tells Typescript 
// treat this value as this type 

const value2 : unknown = "hello"
// as string 
const message = value2 as string

console.log(message);
// ⚠️ as does not perform runtime validation.
// means ager hamne as use krte time mistake kri to kuch bhi ho skta hai 

// -> 

let numb : unknown;

numb = "secret"
const myvalue1  = numb as string
console.log(myvalue1.toUpperCase());

numb = 22
const myvalue  = numb as number
console.log(myvalue + 33);


numb = 22
const myvalue2  = numb as string
// console.log(myvalue2.toUpperCase());  // myvalue2.toUpperCase is not a function  like that kind of mistakes 

// doesn't magically convert 123 into a string.
// You're just telling TypeScript to trust you.





// -------------- 
// satisfies 

type Config ={ 
    mode : 'dark' | "light",
    fontSize : number
}

// we can do this 
const config1 : Config = {
    mode : "dark",
    fontSize : 14
}


/// But satisfies lets you validate the shape while preserving the more specific inferred type.


const config2 = {
    mode : "light",
    fontSize : 22

} satisfies Config;


/*

as
 ↓
"Trust me, this is Config."

satisfies
 ↓
"Check that this matches Config,
but keep the specific inferred information."

This is especially useful for configuration objects, route definitions, maps, etc.

*/


//// -----------------------------------------

// readonly 
// another important keyword 

type Testuserconfig = {
    username : string 
     readonly userid : string 
}


let userxconf : Testuserconfig = {
    username : "zafina",
    userid : "zaf1na00"
}

// now we can only read userid not do any changes 
// readonly prevents assignment through that property.
console.log();
console.log(userxconf.username);
console.log(userxconf.userid);

console.log("previous username -> ",userxconf.username,"\n changed username -> ",userxconf.username = "lili");
console.log("previous userid   -> ",userxconf.userid,"\n changed userid  -> ",userxconf.userid = "lili00");
// 
console.log("checkout the run time errors ??? ");

// Don't confuse these.

const user34 = {
  name: "Steve"
};

user34.name = "Alex"; // ✅

// const prevents reassigning the variable:

// user34 = {}; // ❌

// But it doesn't make the object's properties immutable.

// readonly does:
type User33 = {
  readonly name: string;
};

/// 

console.log();