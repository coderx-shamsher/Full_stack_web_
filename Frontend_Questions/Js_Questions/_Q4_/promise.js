// creating a promise

// let testPromise = new Promise((resloved,rejected)=>{

//     let server_status = "Running"

//     if(server_status === "Running"){
//         resloved("Server is Running Smoothly!")
//     }else{
//         rejected("server is down !")
//     }

// })

// // consuming the promise
// testPromise.then((message)=>{
//     console.log("Success : ",message)  // this line un if promise resolved
// })
// .catch((err)=>{
//     console.log("Error : ",err) // this line runs if promise rejected
// })
// .finally(()=>{
//     console.log("Operation complete") // this line run no matter what
// })

// mostly ham then-catch ka use krte hain..

// api request with fetch handling with promsie

// let datafetch = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//          console.log("APi request data is ->")
//          fetch("https://jsonplaceholder.typicode.com/users/5")
//         .then((res)=>res.json())
//         .then((data)=>resolve(data))
//         .catch((err)=>console.log(err)
//     )
//     }, 2000);
// })

// datafetch
// .then((data)=>{
//     console.log(data)
// })
// .catch((err)=>{
//     console.log("Error : ",err)
// })

// try-catch with fetch() promise handling
// try {
//     fetch("https://jsonplaceholder.typicode.com/users")
//     .then((res)=>res.json())
//     .then((data)=>console.log(data))
//     .catch((err)=>console.log(err))
// } catch (error) {
//     console.log("Error of fetch api : ", error)
// }

// let basicP = new Promise((resolve,rejected)=>{

//     let status = "stop"

//     if(status === "running"){
//         setTimeout(() => {
//             resolve("data processing is done...")
//         }, 2000);
//     }else{
//       setTimeout(() => {
//           rejected(new Error("kuch issues hain ....."))
//       }, 2000);
//     }

// })

// basicP.then((result)=>{
//     console.log("success : ",result)
//     return "step 1 is done now...."
// })
// .then((result)=>{
//       console.log("success : ",result)
//     return "step 2 is done now...."
// })
// .then((result)=>{
//     console.log("success : ",result)
//     return "step 3 is done now...."
// })
// .then((result)=>{
//     console.log("success : ",result) // give me the step 3 result here
// })
// .catch((error)=>{
//     console.log("Error",error)
// })

// basicP → pehla promise.
// basicP.then(...) → naya promise return karta hai.

// har .then() ek new promise kaise banata hai?
// const p1 = new Promise((resolve)=>{
//     setTimeout(() => {
//         // returing value 10 as resolved
//         resolve(10)
//     }, 2000);
// })

// // now p1 ki value console krte hain or sath he new promise mein new value return krte hain
// const p2 = p1.then((result)=>{
//     console.log("Result of p1 : ", result)

//     // returing new value
//     return result = 20
// })

// // now mere p2 ne ek new promise return kra hai use handle krte hain
// // maine p3 ek aur new promise create krta hun jisemein p2 ki resolved value console krunga or p3 ek new promise return krega
// const p3 = p2.then((result)=>{
//    console.log("Result of p2 : ", result)

//    return result = 30
// })

// // now main es chain ko end krta hun with console the value  p3 promise value
// p3.then((result)=>{
//     console.log("Result of p3 : ", result)
//     console.log("this is the last promise in chain")
// })

/**
 *  Yahan:

p1 → original promise (resolve hota hai 10 se).
p2 = p1.then(...) → naya promise jo resolve hoga 20 se.
p3 = p2.then(...) → aur naya promise jo resolve hoga 25 se.
Har .then() ek naya promise return karta hai, isliye hum p1 → p2 → p3 chain bana pa rahe hai
 */

function testingpromises() {
  let testp = Promise.resolve("hello promise ");

  testp
    .then((value) => {
      console.log(value);
      // aur main ager next promise k liye value return na krun to
      // implicitly undefined return hota hai
    })
    .then((value) => {
      console.log(value); // undefined value
    })
    .then((value) => {
      console.log(value);
    });
}

// testingpromises()

// Agar .then() se promise return karein

function thenpromisereturn() {
  const p1 = Promise.resolve("hello");

  const p2 = p1.then((value) => {
    setTimeout(() => {
      console.log("p1 : ", value);
    }, 2000);

    // return new promise
    return new Promise((resolve) => {
      setTimeout(() => {
        // new promise value
        resolve("promise !");
      }, 3000);
    });
  });

  // now p2 ko handle kro with then
  // NOTE ->  ager muje or chaining kri hai to main kr skta hun
  //   p2.then((value) => {
  //     console.log("p2 : ", value);
  //   });

  //  let p3 =  p2.then((value) => {
  //     console.log("p2 : ", value);
  //     return value = "this is p3!"

  //   });
  //   p3.then((value)=>{
  //   console.log("p3 : ", value);
  //   })

  let p3 = p2.then((value) => {
    console.log("p2 : ", value);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("this is p3!");
      }, 3000);
    });
  });
  let p4 = p3.then((value) => {
    console.log("p3 : ", value);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("p4! this is last value ");
      }, 4000);
    });
  });

  // last promise value handling with then
  // note ager main p4 ko handle na krun to kiya hoga?  to tume p4 ki value nhi milegi

  // ager main kr lu to muje value console par milegi
  p4.then((value) => {
    console.log("p4 :", value);
  });

  // this is the end of then promise chaning
}

// thenpromisereturn();
/**
 * Yahan:

p1 → hello se resolve.

p1.then(...) ke andar hum naya promise return kar rahe hain.

p2 us naye promise ko “wait” karta hai, phir resolve hota hai promise ! se.

p2.then(...) ke andar hum naya promise return kar rahe hain.

p3 us naye promise ko “wait” karta hai, phir resolve hota hai this is p3 ! se.

Isi wajah se hum async operations ko chain kar sakte hain:
fetch → json → process → save sab .then() chain mein
 */

// .catch() bhi naya promise return karta hai

function catchpromise() {

  Promise.reject(new Error('kuch gadbad'))
  .catch((err) => {
    console.log('error pakda gaya:', err.message);
    return value =  'default value'; // error handle karke normal value return
  })
  .then((value) => {
    console.log('ab sab theek:', value); // 'default value'
  });
}
/**

Promise.reject(...) → rejected promise.

  .catch(...) → error handle karta hai aur naya (fulfilled) promise return karta hai ('default value' se).
   
   Uske baad .then() chain normal tarike se chalti hai.

   * 
 */

catchpromise()

/**

### Simple analogy

Har .then() / .catch() = ek naya dabba (naya promise) jo agle step ke liye value taiyar karta hai.
Tum ek dabbe se dusre dabbe tak value pass karte jaate ho → yahi chain hai

 */