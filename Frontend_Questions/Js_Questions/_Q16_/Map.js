// Map is key-value pair where key can be any type (object, primitive, functions), it preserves insertion order 

// create a new object with new + Map() 
const Mapobject1 = new Map()

// set key-value with mapobject.set() 
Mapobject1.set("name","testadmin")

//using get() method ham values koi get kr skte hai get method mein keyname pass krna hai 
console.log(Mapobject1.get("name"))
console.log(Mapobject1)

Mapobject1.set(101,"admin01")
console.log(Mapobject1)

console.log(typeof Mapobject1)
console.log()

console.log(Mapobject1.size)


/// weakMap  -->> 
// object keyed map with weak references 

const weakmap = new WeakMap()

// weakmap.set("keyone","object1 in weakmap") // invalid value used for key in weak map 
// weakmap.set(key2nd,"object2 in weakmap")   // invalid value error 

// esmain object he as key use hoti hai 
const objkey1 = {id : 101}
const objkey2 = {id : 102}

// give key as object 
weakmap.set(objkey1," user id ")
weakmap.set(objkey2," username ")

// we cannot print simply as map ? !! 
console.log(weakmap)

// we need to use get 
console.log(weakmap.get(objkey1)) // give keyname and you get the value 

// esmein koi size, nhi hoi koi loop nhi hia koi keys,values yan entries nhi hai !! 

console.log(weakmap.has(objkey1))