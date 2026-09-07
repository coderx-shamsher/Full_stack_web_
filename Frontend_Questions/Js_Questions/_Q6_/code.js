// this keyword values -> this ki value depends on how the function is called, not where it is written

// global scope -> this value ?
// console.log(this)      // {} this is the answers of this
// console.log(globalThis) // eski value hai global object jo ki browser console mein window hoti hai

// in browser this ki value     ->   window
// and global this ki value also -> window

// lets see in function

function testing_this() {
  console.log(this); // in simple function this ki value

  // in browser is -> window
  // in nodejs -> global object
}

// testing_this()

// this in arrow function

const test = () => {
  console.log(this);
};

// test()
// in arrow function this value in browser -> window
// in node this value ->  empty object

// ager mein es5 function k ander arrow function mein this ki value checkout krun to ?

function checkout() {
  const arrow = () => {
    console.log(this);
  };
  arrow();
}

// checkout()
// this ki value in browser -> window
// in node ->    global object


// in object methods (implicit binding)

let object = {
  value: "this is object",
  see() {
    console.log("This value -> \n", this); // this in object functions(methods) -> pointing to that object, us object ko he point krta hai jis object k method mein this ko access kiya gyiya hai

    console.log("object value -> \n", this.value); // this ki help se ham us object k sare he methods, variable, values etc access kr skte hain..
  },
};

// object.see()
// in object -> this point to that object jis mein vo hai , or this ki help se ham log us object k elements ko access kr skte hain..

// in nodejs -> this ki value -> object or same ham use object k variables ko access kr skte hain..

// ager main object method k es5 function k ander ek arrow fnc mein checkout krun to
const this_test = {
  value: "hello",
//   test_method: function () {
//     const _tt_ = () => {
//       console.log("this value -> ", this);
//       console.log("key  -> ", this.value);
//     };

//     _tt_();
//   },
  
  arrow_method1 : function () {
      const arrow = ()=>{
         console.log(this)  // now what is the value of this 
        //  console.log()
      }

      arrow()
  },
  arrow_method2 :  ()=>{
      const arrow = ()=>{
         console.log(this)  // now what is the value of this 
        //  console.log()
      }

      arrow()
  },
  arrow_method3 :  ()=>{
      function arrow (){
         console.log(this)  // now what is the value of this 
        //  console.log()
      }

      arrow()
  },

  _this : this


};
// this_test.test_method();
// note -> arrow function apne this ki value hamesa apne parent se leta hai
// in that case mere arrow function ka parent hai es5 function os usk this ki value hai object ! this is one case

// now maine ek arrow function mein ek arrow function create kiya hai aur now let see this ki value (rule for arrow function is this ki value hamesa parent se leta hai)

// browser this values -> 
// this_test.arrow_method1()  // in es5 function arrow fnc mein this ki value -> object 
// this_test.arrow_method2()  // in es6 arrow fnc k ander arrow fnc this ki value -> window 

// this_test.arrow_method3() // arrow fnc k ander es5 function this ki value hoti hai window in browser 

//// -> node js mein this ki value -> 
// arrow_method1 -> this value -> object ko point kr raha hai 
// arrow_method2 -> this value ->  empty object 
// arrow_method3 -> this value ->  global object  
// 


// console.log(this_test._this)




// object method in expression
const fnc = object.see; // now what is the value of the this
// fnc()  // this -> undefined browser mein ...

// in expression
// this value in browser -> window
// aur ham object k variables ki value access nhi kr pa rahe its -> undefined

// node - > this -> global object
// object variables ki value -> undefined mil rahi hai

// this in function constructor / new binding

function user(name) {
  this.name = name;
//   console.log(this)
}

const user1 = new user("admin");
// console.log(user1); 
// this ki value with function constructor with new keyword -> new object 
// Jab function ko new ke saath call karte ho, toh this → newly created object instance





// in class this ki value 

class testuser { 

    constructor(name){
        //   console.log(this)
          this.name = name
          console.log(this)

    }
}

// creating object using new keyword 
const tu1 = new testuser("coderx")
// now in class  constructor this ki value hai empty object , class name k sath 
// after setup values with this hame us constructor k set kiye gye variables k access milta hain hai , yeh jo empty object a raha that bs usmein values show ho rahi hai 


// Arrow functions (lexical this)

const obj = {
  name: 'Dave',
  regular() {
    console.log(this.name); // 'Dave'
  },
  arrow() {
    const fn = () => {
      console.log(this.name); // inherits this from arrow()
    };
    fn();
  }
};

obj.regular(); // 'Dave'
obj.arrow();   // 'Dave'

// Arrow functions ka apna this nahi hota.
// Wo this ko lexical scope se inherit karti hain (jahan define hui hain). 





// this in events listeners 
const element = document.querySelector(".testthis")



// with arrow function this ki value in event lister window hoti hai 
element.addEventListener("click",()=>{
    console.log(this)
})

// ager ham es5 function use kr rahe hain in event listener call back function to this ki value hai vo element jis par event laga huya hai 
document.querySelector("#h2").addEventListener("click",function(){
    console.log(this)
})



let box1 = document.querySelector(".box1").addEventListener("click",function(){
    console.log(this)
})
let box2 = document.querySelector(".box2").addEventListener("click",function(){
    console.log(this)
})
let box3 = document.querySelector(".box3").addEventListener("click",function(){
    console.log(this)
})
let box4 = document.querySelector(".box4").addEventListener("click",function(){
    console.log(this)
})


// now you can see har element get ho raha hai ager mein this ki value dekh raha hun in event listener.. 
