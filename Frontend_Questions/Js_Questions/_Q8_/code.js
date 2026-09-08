// higher order functions -> vo functions jo kisi bhi function ko as argument le rahe hote hain , ya koi function return kr rahe hote hain , yan dono he mean take function as argument and return a function those are hof 

// function as argument called callback or callback function jo ki HoF mein argument k tranh pass hota hai 



// hof 

function userwelcome(name, message) {
    console.log(`Welcome ${name} ! You Have a Message !.. \n <----> ${message} `)
}

function exefnc(fnc, name, message) {
    userwelcome(name, message) // calling callback function 

}

exefnc(userwelcome, "nina", "Hi! nina are u free on this weekend ?")

// ager yeh syntax tora bhi complex lag raha hai let see better 

function hof(fnc) {
    fnc()
    // this function only execute the callback function 
}
function hello(name) {
    console.log("hello ", name, "you are executed from hof")
}

// step call the hof main fnc 
console.log()
hof(hello)  // now see k undefined show ho raha hai 




function execfnchof(fnc, arg) {

    fnc(arg);
}

function fnc(arg) {

    if (typeof arg === "string")
        console.log("U pass the string arguement => \n", arg, "Type => ", typeof arg)

    else if (typeof arg === "number")
        console.log("U pass the number arguement => \n", arg, "Type => ", typeof arg)

    else if (typeof arg === "object")
        console.log("U pass the object arguement => \n", arg, "Type of =>", typeof arg)

    else if (typeof arg === "boolean")
        console.log("U pass the boolean arguement => \n", arg, "Type of =>", typeof arg)

    else
        console.log("wrong type data ")



}
// 
console.log()
execfnchof(fnc, { name: 'testing', data: [12, 33, 5] })
execfnchof(fnc, "hello")




// hof with return a function 

function hoftest1(value, callback){
    
    return function (){
        console.log("HoF Function is running....")
        callback(value)
    }


}
// maine ek anonymous function pass kiya hai as callback function or yeh mostly mosly code bases mein hota hai yeh pattern
let result = hoftest1("lili",(value)=>{
    console.log("welcome ", value)
})
console.log()
console.log(result) // now if you get funciton anonymous means hame ek funciton return huya hai ! 
// now just result ko call kro console mat kro 

result()

// ---------

// built in hof -> map filter reduce 

// map 
// map mostly react based code mein use hota hai 

let testnum = [2,4,6,8]

function mycallback(arr){
  return arr * 2
}

let result1 = testnum.map(mycallback)

console.log(result1)

// this is the 1 way to use it 

let mapresult = testnum.map(function (arg){
   return arg + 4
})
console.log()
console.log(mapresult)


// map return a new array, yeh map array par use hota hai 


let object = {
    name : "tst"
}

// let mapresult1 = object.map((n)=>{
//     return n.name = "changed"
// })

// console.log(mapresult1) // map not work on objects 



/// filter 

let userobject = [
    {
      name : "nina",
      id : 22
    },
    {
      name : "steve",
      id : 23
    },
    {
      name : "nance",
      id : 24
    },
    {
      name : "mark",
      id : 20
    },
    {
      name : "marti",
      id : 21
    },
    {
      name : "preeti",
      id : 25
    },
]


function finduserbyid(userid,userobject){
    return  userobject.filter((user)=>{
        return user.id === userid
    })
}

let finduser = finduserbyid(25,userobject)
let finduserresult = finduser
console.log(finduserresult)


// this is my way to use or sky is the limit ham eneh kaise bhi use kr skte hain 

/// more examples -> settimeout, settimeinterval, reduce etc 

// simple differ !! 
// HOF => vo function jo kisi function ko as arguement leta hai 
// callback => vo function hai jo HOF mein pass hota hai 

// A higher-order function is a function that takes or returns other functions. A callback is the specific function that we pass into a higher-order function to be executed later. In other words, HOF is the container/manager, and the callback is the function it calls.