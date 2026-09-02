console.log();
console.log("hello");

let test : any ; 

test = "testing the any" 
console.log(test.toUpperCase());
console.log(); // 
test = 393
console.log(test);
// console.log(test.toUpperCase());  // this is the problem k ham ese he mistakes kr skte hain
/// everything is allowed , koi bhi fixed type nhi hai yeh ! 

const user : any = {
    name : "steven"
}

console.log();
console.log(user.name);
// console.log(user.age);
// console.log(user.address);
// console.log(user.address.city);



// unknown 
// i dont know what the value is. 

let value : unknown ;

value = []
// value.push("hello")
value = 223
console.log(value);
// So far it looks exactly like any.

value = "string"
// value.toUpperCase()
// console.log(value); // run to hoga but yeh runtime mein error show ho raha hai means code is not good 
// It says essentially:
// "I don't know whether value is a string, so prove it first."
console.log();

// so who to use unknown best practice -> type narrowing (type check then operation)


value = {}
console.log(typeof value);
if(typeof value === "object" ) {
    // i change the type 
    let value : object ;
    // assign key-value
        value = {
           name : "testing object"
        }
        // console -> 
       console.log(value);
  
}

console.log();



// one more examples  
value = "hello"
if(typeof value === "string"){
    console.log(`${value} unknown type`);
}



// type assertions 
// we can force an unknown value into a specific type : 

const testvalue : unknown = {name : "value"}
const text = testvalue as object 
console.log(text);
console.log(text.name);

// this works but be carfull youre telling ts  trust me this is a object
// if you wrong ? 

let Variable : unknown = 343;
let  txt = Variable as string ;
// console.log(txt.toLowerCase());
console.log(txt, typeof txt); // hamne typescript ko bola k trust me its string but yeh to ek number hai thats the problem ager ham acha code nhi lihen

// TypeScript may accept the assertion, but runtime can fail.
// So type assertion isn't validation.



// ----> important interview scenario 

// with any 
function testfn( value : any) {
    console.log(value.name);
}

testfn({name : "testing any within fn"})
testfn(2233)  // undefined 

// with unknown 

function testingfn (value : unknown){
    console.log(value.name);
}

testingfn({name : "unknown is tesing"}) // still run but not good practice ? 
testingfn('string') // undefined 



// good practice with unknown 
function testing(value : unknown){
    if(typeof value  === "object" && value !== null && "name" in value ){
            console.log(value.name);
    }
    else if (typeof value  === "object" && value !== null && "age" in value ){
        console.log(value.age);
    }
    else if (typeof value  === "string" ){
        console.log("\n string value --->");
      console.log(' ',typeof value,'\n ' , value);
    }
}
console.log();
// testing({name  : " good practice "})
testing({name : "testing"}) 
testing({age: 23}) 
testing("coder on line ") 



// another important differ is assignment 

let unknownvalue : unknown = "hola unknown type"
let valuetest : string = unknownvalue;

// console.log(valuetest); // run to hoga but its not allowed in ts 
// we need type narowing 
console.log();
if ( typeof unknownvalue === 'string') {
    let valuein_test = unknownvalue 
    console.log(valuein_test);
}




// with any its alllowed 
let anyvalue  :any = "hello any value"
let testany : string = anyvalue  // this allowed 
console.log(testany);
// Again, any bypasses the type system. make sure to use carefully 


// ------

/*
 *  When Should You Use unknown?
 *  
 * Use it when  -> You genuinely don't know the type yet and want TypeScript to force you to verify it.
 * 
 *  One-Line_rule -> any gives you freedom without safety. unknown gives you flexibility with safety.
*/





console.log();