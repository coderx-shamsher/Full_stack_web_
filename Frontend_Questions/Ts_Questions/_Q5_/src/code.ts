// type Narrowing & Type Guard 

// A type guard is a condition/function that tells TypeScript:
console.log();


// let value: string | number;

// use type 
type ValueType = string | number


/*

You've already seen built-in type guards:

typeof
instanceof
in
Array.isArray()

*/

// also give types on the way 
function printValue(value : ValueType) {
  if (typeof value === "string") {
    // typeof value === "string" is acting as a type guard.
    console.log(value.toUpperCase());
  }

  if (typeof value === "number") {
    console.log(value.toFixed(4));
  }
}

printValue("hello")
printValue(34)


function process(value: string | string[]) {

  if (Array.isArray(value)) {
    console.log(value.length);
  } else {
    console.log(value.toUpperCase());
  }

}

process(['hello',"world","python","javascript"])
process("javascript")


// Custom Type Guards 


type User = {
  name: string;
  age: number;
};


function isUser(value: unknown): value is User {

  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "age" in value
  );

}

function process1(value: unknown) {

  if (isUser(value)) {
    console.log("\n user response =>");
    console.log("Username =>",value.name);
    console.log("Age => ",value.age);
  }else{

    console.log("user not a object => (",value,") type is => ",typeof value);
  }

}

process1({name: "testing",age:34})
process1("master")

// If this function returns true, treat value as a User.


/// generic function
function identy<T>(value: T) : T {
    return value
}
//Here T is a placeholder for a type.


// let result1 = identy("hello its me")
let result1 = identy(true)

if(typeof result1 === "string"){
    console.log("Uppercase operation => ",result1.toUpperCase());
}
else if(typeof result1 === "boolean"){
    console.log("NOT operation after =>",result1);
    console.log("NOT operation after =>",!result1);
}


console.log();