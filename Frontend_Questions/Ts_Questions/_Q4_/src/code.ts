console.log();
// union type -> 
// a union allows a variable to have more then one possible type. 

// we use the | operator 
console.log(" hello ");

let value: string | number

// if u do -> this 
value = "world"
console.log(value, "Type of =>", typeof value);

// and if we do this 
value = 433
console.log(value, "Type of =>", typeof value);

// this error boolean
value = true  // but ham yeh nhi kr skte keoki hamne union type mein nhi pass kiya | -> or operator mein , ager yeh nhi to yeh yehi union hai 
// Error because boolean isn't part of the union.

// we can also use with type 
// use type with = not with : 
// custom types with union 
type api = "success" | "errors" | "pending"

// assign to status
let status: api

status = "pending"

if (status === "pending") {
    console.log("status =>", status);
}
else if (status === "error") {
    console.log("status =>", status);

}
else if (status === "success") {
    console.log("status =>", status);

}



// union with functions parameters 

function printuser(username: string | number) {
    console.log(username, "Type of =>", typeof username);
}

// calling 
console.log();
printuser("codex")
console.log();
printuser(232)

// suppose you want to use a string-specific method : 
// like ager ham koi string specific operations krte hain to ham ager union mein string pass kri hai to vo operation run hoga but ager number value pass krdi to vo method jo string k liye hai vo  number value par run nhi hoga.. that's the problem here comes 

// ----> Type Narrowing 
// use unknown when we dont know what kind of value user pass in fnc 
function testing(value: unknown) {
    if (typeof value === "string") {
        console.log();
        console.log("Type =>", typeof value)
        console.log("operation =>", value);
        console.log("operation =>", value.toUpperCase());
    }
    if (typeof value === "number") {
        console.log();
        console.log("Type =>", typeof value)
        console.log("operation =>", value);
        console.log("operation =>", value * 2);

    }
}

testing("ping....")
testing(4)

// union of objects 

type Users = {
    name: string,
    permissions: string[]
}

type Customer = {
    name: string,
    orders: number
}

// union two types of object types 
type User = Users | Customer

// creating user

const user1: User = {
    name: "bob",
    permissions: ["read"]
}

const user2: User = {
    name: "nina",
    // permissions : ["read","write"],
    orders: 20
}

console.log(user1);
console.log(user2);


//The Problem With Normal Object Unions

function showusers(value: User) {
    // console.log(value.name);
    // console.log(value.permissions); // yeh property customers mein nhi hai esa error a raha hai 
}

showusers(user1)


/**
 * What is a Discriminated Union?
A discriminated union is basically:

A union of object types that share a common property whose value identifies which type you're dealing with.

just addd one more property in your both objects like role
*/

type Admins = {
    name: string,
    permissions: string[]
    role: string
}

type Customers = {
    name: string,
    orders: number,
    role: string
}

// union two types of object types 
type my_customers = Admins | Customers

let customer1: my_customers = {
    name: "steve",
    role: "admin",
    permissions: ['all admin']
}
let customer2: my_customers = {
    name: "natasha",
    role: "user",
    orders: 10
}

function checking(value: my_customers) {

    // type narrowing 
    if (value.role === "admin") {
        console.log("Admin Permissions => ", value.permissions);
    }

    if (value.role === "user") {
        console.log("User Orders => ", value.orders);
    }
}
console.log();
checking(customer1)
checking(customer2)



// api response 

type RequestapiResponse = | { status: "loading" } | { status: "success", data: _Users_ } | { status: "errors", error: string }

function reschecker(res : RequestapiResponse){
     
    if(res.status === "loading"){
        console.log("APi Loading data........");
    }
    if(res.status === "success"){
        console.log("Api response => ", res.status);
        console.log("Data => ", res.data);
    }
     if(res.status === "errors"){
        console.log("APi response ........",res.status);
        console.log("error name => ........",res.error);
    }
}


let response1  : RequestapiResponse = {
    status: "loading"
}

// type array of object 
type _Users_ = [
    {username: string, userid: string }
]


//
let data : _Users_ = [
    {username: "charlee", userid : "char001"},
    // {username: "maxy", userid : "max90"},
    // {username: "joy", userid : "joy45"},
]

let response2  : RequestapiResponse = {
    status: "success",
    data 
}

console.log("\n       response checking function is running              \n");
reschecker(response1)
reschecker(response2)

console.log();