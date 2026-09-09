// generator in javascipt -> 

// function* → generator function declaration.
// yield → execution pause karta hai aur ek value return karta hai. 
// gen.next() → next value nikalne ke liye call karte hain. 

// yield = “abhi ke liye ruk jao, ye value do, aur jab next next() call ho tab se continue karo.

// function* functionname() {} 
function* userGetter(){
    yield "coderx" 
    yield "codery"
    yield "admin"
    yield "user0x"
    yield "user0b111"
    yield "dev0p" 
}


// calling generator fnc 
const Uget = userGetter() 


console.log()
// note hame ek object milta hai generator function se 
console.log("user 1 =>",Uget.next())
console.log("user 2 =>",Uget.next().value)
console.log("user 3 =>",Uget.next())
console.log("user 4 =>",Uget.next())
console.log("user 5 =>",Uget.next())
console.log("user 6 =>",Uget.next())
console.log("user 6 =>",Uget.next()) // done true mean ab koi bhi value baki nhi hai 



// infinite sequence example 
function* infiniteNumbers() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const nums = infiniteNumbers();

console.log(nums.next().value); // 0
console.log(nums.next().value); // 1
console.log(nums.next().value); // 2
// ... can go on forever just do nums.next() -> again -> again forever


function* userids (username) {
  
    let numbers = 0;
    let special = ["!","@","$","#","^","_","-","|"]

    // parseInt(Math.random() * special.length)
    
    while(true){
       
        let specialchar = special[parseInt(Math.random() * special.length)] 

        yield username + numbers ++ + "" + specialchar + "" + numbers ++ + "" + specialchar + numbers ++ 

    }
    
}

// pass the username of your into userids generator function -> 

let userids10 = userids("coderx")
let userids11 = userids("admin")
// calling userids10 with next
console.log(userids11.next())
// calling userids10 with next
console.log(userids11.next())

// yeh infinite hai means ham bas usename pass krenge or next call krenge or ham ek unique userid create kr skte hain.... ! best usecase i understand of generator fnc !! 

console.log()

// Using for...of with generators
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const n of range(1, 5)) {
  console.log(n); // 1,2,3,4,5
}

// for...of internally next() call karta hai jab tak done: true na ho jaye

console.log()

// ---->> Two-way communication (next(value))
// next() mein value pass karke yield expression ko resume kar sakte hain

function* echo() {
  const a = yield 'first';
  const b = yield 'second: ' + a;
//   return 'final: ' + b;
  const c = yield 'third: ' + b;
  return yield "final : " + c
}

const g = echo();

console.log(g.next());          // { value: 'first', done: false }
console.log(g.next('hello'));   // { value: 'second: hello', done: false }
console.log(g.next('world'));   // { value: 'final: world', done: true }

// here is my testing values 
console.log(g.next('echo hello'));   // 
console.log(g.next('last value'));   // 



// yield delegation to another generator 

// without yield* 

function* first3values(){
    yield 1
    yield 2
    yield 3

}

function* restvalues(){
    yield first3values() // generator object milega
    // inner generator ko as a value yield karo
    yield 4
    yield 5
    yield 6
    yield 7
}


// 
console.log("\n without (yield*) inner outer function =>")
console.log([...restvalues()])
// but hame 123 keo nhi mila hame baki rest values he mili hain ? 




// with yield* 
function* with_yeild_first3values(){
    yield 1
    yield 2
    yield 3

}

function* with_yield_restvalues(){
    yield* with_yeild_first3values()  // "Inner generator, tumhare saare yielded values ko outer generator ke through pass karo."
    // now hame first3values function k values bhi milenge 
    yield 4
    yield 5
    yield 6
    yield 7
}

console.log()
console.log("\n with (yield*) inner outer function =>")
console.log([...with_yield_restvalues()])