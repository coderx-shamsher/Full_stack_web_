// set unique values collection

const set1 = new Set()

set1.add(1)
set1.add(2)
set1.add(3) 
set1.add(3) 
set1.add(1) // duplicate, ignored 
set1.add("1") // different type, allowed 


console.log(set1)

console.log("value ->",set1.has(2)) // has method check krta hai ager value hai to true return krta hai 
console.log("size of set ->",set1.size) 
for (const value of set1) {
    console.log(value)
}

// array with duplicate values 
let array = ["coderx","admin","bob","max","jogan","coderx","max","admin"]
console.log("=> ",array)
const unique = [... new Set(array)]
console.log("unique value -> ",unique)


// weakset unique objects with weak references
const ws = new WeakSet();

const obj1 = { id: 1 };
const obj2 = { id: 2 };

ws.add(obj1);
ws.add(obj2);
ws.add(obj1); // duplicate, ignored

// 
console.log("Weak Set -> ")
console.log(ws.has(obj1)); // true
console.log(ws.has(obj2)); // true
