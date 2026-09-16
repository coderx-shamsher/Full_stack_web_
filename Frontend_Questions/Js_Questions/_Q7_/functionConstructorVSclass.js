// objects in js

// creating object with object literals -> jo ki {} yeh brackets use krk ham ek object create krte hain

// object literal ->

const object = {
  name: "test",
  admin: true,
  uid: "test002",
  getname: function () {
    // we cannot use name without this.  in object methods
    console.log(this.name);
  },
};

// call or get full object
// console.log(object)
// console.log(object.uid)
// console.log(object.admin)
// console.log(object.getname())

// its simple to create and use

// this does not act as blue print ! yeh eska problem hai
// blue print means -> values change hoti hai but key structure or object ka key structure same rehta hai but ager hame koi aur object create krna hai to  hame copy paste krna hoga then values change !

// the concept of base blue print
// in old js ham ek function contructors ka use krte hain to create blue print

// -->
// PascalCasing -> for constructor functions , its a notation

// function User(Fullname, Age, Admin) {
//   this.fullname = Fullname;
//   this.age = Age;
//   this.admin = Admin;

//   this.getName = function () {
//     console.log("Username ->", this.fullname);
//   };
// }

// create new objects with new keywords
// const user1 = new User("admin mina", 23, true);
// const user2 = new User("lester", 34, false);

// console.log(user1);
// console.log(user2);
// console.log("\n");
// user1.getName();

// now code is more resuable and more short then object literals

// now with class with the es6
// ager hame blue print bana hai to function constructors ka use nhi krna hai in nowdays ham class ka use krte hain  
class User {
  constructor(Fullname, Age, Admin) {
    this.fullname = Fullname;
    this.age = Age;
    this.admin = Admin;
  
 }
  // this is how to declare methods in class
  getUserName() {
    console.log("Username => ", this.fullname);
  }
}


// create new object same like before
const user3 = new User("coderx",34,false)
console.log(user3)

