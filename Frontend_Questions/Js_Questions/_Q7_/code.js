// this is a constructor function
function user(name) {
  this.name = name;
}

let user1 = new user("mia");

// console.log(user1, typeof user1)

// user.prototype.hellouser = () =>{
//     console.log(`Hi ! your are ${this.name}`)
// }

user.prototype.hellouser = function () {
  console.log(`Hi ! your are ${this.name}`);
};

//
user1.hellouser();

// --> very important note -> to on browser and then checkout user1 use print kro on console to hame user object k neche ek [[prototyp]] object milta hai, ager use open krte ho to ham vo function milega jo hamne prototype mein set kra hai
// yeh method basically space / memory save krne ka ek way hai we can share memmory with prototype object jismein ham koi bhi function object array etc rakh skte hain lets test one by one

/// let set a object
user.prototype.detail = {
  users: {
    user1: {
      username: "adam",
      role: "user",
    },
    user2: {
      username: "martha",
      role: "user",
    },
    user3: {
      username: "marteen",
      role: "user",
    },
    user4: {
      username: "bablona",
      role: "admin",
    },
  },
  showusers: function () {
    // testing the value of this 
    // console.log(this.users) 

    // printing the alll users 
    for (const key in this.users) {
        if (!Object.hasOwn(this.users, key)) continue;
        const element = this.users[key];
        console.log(element)
    }
  },
};


let useradmin = new user("admin0x")


// array add kro 

user.prototype.numbers = [33,36,3,6,9,63,93,39,96,69]


// NOTE that yeh array uper create kiye user1 and useradmin k pass bhi available hoga 

// -----------------------------------------------------------------------------------------

// object.create()  direct inheritance 
const parent = {
    name : "parent",
    method : function (){
         console.log("hello its a parent function")
    }
}

// lets create a child object from parent object using the object.create method 

let child = Object.create(parent)

// mere child object main koi bhi name yan method nhi hai keoki yeh ek new object hai right ? 

console.log(child)
// let go to browser -> inside child checkout prototype 

// aur we can see k parent ke sari properties child ne inherite kr liy hai, sometimes its needed but sometimes its not 


// ------------------------ 

// prototype within class 

class school {
    constructor(studentname,classname){
        this.stuName = studentname
        this.clName = classname
    }
    // 
    show(){
        console.log(`Hi you are in ${this.clName} ? \n your name is ${this.stuName} right !! welcome `)
    }
}

// now ham koi bhi prototype set nhi kr rahe to let se k hamare objects jo bhi es class se create hote hain unke pass prototype mein koi method yan kuch hai ? 

let stu1 = new school("max",'10th')

// let see in browser ok 

stu1.show() 
// right ! checkout in browser and u see k hame prototype mein pahel se he show method mil raha hai jabki hame koi bhi prototype nhi set kra 

// --> class bhi under the hood -> ese he kr rahi hoti hai 
// school.prototype.show = function () {
//         console.log(`Hi you are in ${this.clName} ? \n your name is ${this.stuName} right !! welcome `)
// }


