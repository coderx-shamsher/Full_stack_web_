// in js everything is object ?? why ?? 


const u1 ={
    fname : "tester",
    method : function (){
        console.log(`welcome into objects !`)
    }
}
const u2 ={
    fname : "mia",
    method : function (){
        console.log(`welcome into objects !`)
    }
}

// now u see k hame ne value to change krdi but method same hai dono objects mein ! 
// now i mistake the dry -> donot repeat yourself ! 
// console.log(u1)
// u1.method()


// let see inheritance in objects 
// const inheritob = Object.create(u1)
// console.log("org object",u1)
// console.log("prototype object",inheritob)

// we can do this -> 
// ham jab fname access kr rahe hain to yeh fname hame inheritob k __proto__:u1.fname se mil raha hai means 

// hamra inheritob { __proto__:{}  //points to a object jo ki vo object hota hai jise use create kra gya hai mere case min u1 }
// mer inheritob  k ander koi bhi fname nhi hai to vo __proto__ mein check krega aur vo point kr raha hai u1 aur usmein hai to vo hame fname same print krega.. 

// console.log(inheritob.fname) 
// inheritob.method()


// we can change the u1 with inheritob 
// inheritob.__proto__.fname = "value is hacked "

// console.log(inheritob.fname)
// console.log("org -> ",u1.fname)



// prototype inheritance ! in objects 

const user = {
    username1 : {
       name : "jeena",
       role : "user",

    },  
    username2 : { 
        name : "joe",
         role : "user" 
    }

}

const admin ={
    username : "admin",
}

// can i use or access the user's properties inside admin  ? ese to nhi kr skte ! 
// kiya ham Object.create() ka use kre ?  but yeh to ek new object create krega ! 

// age main __proto__ : user  in admin ? let see 

admin.__proto__ = user
admin.role = "adminx"

// you can use admin.__proto__  aur admin object ko dekho uska [[prototype]] -> __proto__ -> user 


const hacked = {
    __proto__:admin
}

// this is prototype inheritance or prototype chaining 

// we do understant __proto__ but ese change nhi kra hai !!!!!! 


class Person {
    constructor (name){
        this.name = name

    }
    getname(){
        console.log("this is class name get method ! ",this.name)
    }
}


const p1 = new Person("sia")

const p2 = {
     name : "testing",
     __proto__ : Person.prototype
}


/*

p1 instanceof Person
true

p2 instanceof Person
true

p1.__proto__ = null // breaking the prototype chaining.... 

p2 instanceof Person   => true

p1 instanceof Person => false  (prototype chain is breaked ! )

*/