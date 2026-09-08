// call ??
// call immediate call, individual arguements
// call invoke the function immediately with a given "this" value .
// call , function ko call(invoking) krte waqt he app set kr skte hain uski this ki value kiya hogyi... or yeh trurant call hota hai

function hellouser(value) {
  console.log();
  console.log(`welcome ! ${value}`, "\nThis value =>", this);
}

//calling helluser with call()
// 1) meine ek argument pass kiya hai jo ki maine ek name pass kiya hai, maine to koi bhi this ki value pass nhi ki? but mere function mein ek value parameter hai or than main this ki value print kr raha hun...
hellouser.call("maomao");
console.log();
hellouser.call(["this array", 333, 4.555], "maomao");
console.log();
hellouser.call("maomao", { name: "secret name" }); // in this example hamne dekha k pahli value jab bhi koi function call() method  k sath bind kr k call krna hai to ager hame us function ko arguments pass krne hai to make sure k ham this ki value k bath he pass kren

console.log();
hellouser.call({ name: "secret name" }, "maomao"); //

// call() mein hame comma-separated arguments pass krne hote hain , with this ki value also

//apply – immediate call, array of arguments
//Common use: jab arguments pehle se array / array-like (arguments, split result) mein hon.

function testuser(name, id, email) {
  if ((name === this.username && id === this.id) || email === this.email) {
    console.log(`
            UserID => ${this.id} \n
            UserName => ${this.username} \n
            Email =>  ${this.email}     \n
            This ki value => ${this}
         `);
  } else
    console.log(`
            This ki value =>
         `,this.username);
}

// this value
// let users = {
//   user1: { username: "admin", id: 201, email: "admin@gmail.com" },
//   user1: { username: "bob", id: 203, email: "bob@gmail.com" },
//   user1: { username: "admin", id: 201, email: "admin@gmail.com" },
//   user1: { username: "admin", id: 201, email: "admin@gmail.com" },
// };
let users = {
  username: "admin",
  id: 201,
  email: "admin@gmail.com",
  //   user1: { username: "bob", id: 203, email: "bob@gmail.com" },
  //   user1: { username: "admin", id: 201, email: "admin@gmail.com" },
  //   user1: { username: "admin", id: 201, email: "admin@gmail.com" },
};

console.log("\n apply method ---> ");
// testuser.apply(users); // without any [] -> arguments , meine just this ki value pass kri
// console.log();
// testuser.apply(["admin", 201, "admin@gmail.com"]); // now this ki value hai yeh array of arguments
console.log();
testuser.apply(users, ["admin", 201, "admin@gmail.com"]); // perfect call !
console.log()




/// bind – returns new function, this fixed
// Function turant execute nahi hoti.
// Ek naya function return hota hai jiska this permanently thisArg se lock ho jata hai.
// Baad mein jab us naye function ko call karte hain, toh this wahi rehta hai.
// Pehle arguments bhi “pre-fill” (partial application) ho sakte hain. wohotech
// Common use:
// Event handlers mein this fix rakhna.
// Callbacks jahan context lose ho sakta hai.
// Reusable functions with fixed context banana.



function greet(message){
    console.log(`Hello ${this.name} ! \n -> ${message} \n this ki value => ${this}`)
}

const person = {name : "cathrin"}

const boundFnc =greet.bind(person,"how are you girl !?") // perfect case 
// const boundFnc =greet.bind("how are you girl !?") 
// ek function return huya hai jise ham call krenge 
boundFnc() 


// method borrowing 

const  userobject = {
    username : "carol",
    methodGreet() {
        console.log(`Hi ! `, this.username ,`This ki value -> ${this}`)
    }
}


let usernew = { username : "admintest" } 
console.log()
console.log("method borrowing --> \n")
// call with userobject 
userobject.methodGreet.call(userobject)
console.log()
userobject.methodGreet.call(343)
console.log()
// call with new object 
userobject.methodGreet.call(usernew)
console.log()
userobject.methodGreet.call({username : "alisa"})

// this is method borrowing ... 