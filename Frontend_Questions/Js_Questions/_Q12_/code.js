// shallow copy 
// Naye object/array mein sirf first level ke values copy hote hain.
// Agar kisi property ka value khud ek object/array hai, toh sirf uska reference copy hota hai, object nahi

// const { json } = require("express")


// spread operator 

const original = {
    name : "alex",
    address : {
        streatNo : 203,
        city : "laxy",
    }
}

// lets copy shallow copy 

const shallowcopy = {...original}

console.log()
console.log("original => ",original)
console.log("Shallow copy => ",shallowcopy)

// let change name first in shallowcopy 
shallowcopy.name = "changed username"
console.log("\n changed user in object -> ")
console.log("original => ",original.name)
console.log("Shallow copy => ",shallowcopy.name)

// its good , k shallow copy mein jo change kiya vo original object ko effect nhi krta.. 
console.log()

// but if , ham change krte hain address object ki property ko change krte hain 

shallowcopy.address.city = "hidden leaf"
shallowcopy.address.streatNo = 334
console.log("shallow copy change the nested object properties in object (original object ) -> ")
console.log("original => ",original.address)
console.log("Shallow copy => ",shallowcopy.address)

/**
 * original aur shallowCopy alag objects hain, lekin address same reference share kar rahe hain.
Isliye nested change dono ko affect karta hai
 */


// Deep copy - 
// Naya object/array aise banta hai ki poora structure recursively copy ho jaye.
// Koi bhi nested object/array original ke saath share nahi hota.

const originalobj = {
   name : "secret",
   permission : ["Read","Write","Execute"],
   address : {
     country : "land of wind",
     city : "hidden sand"
   }
}

const structurecopy = structuredClone(originalobj)

console.log('\n Deep copy ->')
console.log("original => ",originalobj)
console.log("Deep copy => ",structurecopy)
console.log()

// lets change array and object now 

structurecopy.permission[1] = "-"
structurecopy.permission[2] = "-"

structurecopy.address.country = "land of lighting"
structurecopy.address.city = "hidden cloud"

console.log('\n Deep copy ->')
console.log("original => ",originalobj)
console.log("Deep copy => ",structurecopy)


// old hack (not used so much)

const deepcopy = JSON.parse(JSON.stringify(originalobj))
console.log()
console.log('\n Deep copy ->')
console.log("original => ",originalobj)
console.log("original => ",deepcopy)

// let change it 
// es method mein koi suggestion nhi milegne 
deepcopy.address.country = "land of iron"
deepcopy.address.city = "samurai city"
console.log()
console.log("original => ",originalobj)
console.log("original => ",deepcopy)

console.log()