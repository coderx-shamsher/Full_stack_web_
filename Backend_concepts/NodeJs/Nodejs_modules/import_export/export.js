let testing = {
    hello : (name) =>{
        console.log(`Hello ${name}`)
    },
    arr : [0,3,4,5,6],
    username : "admin",  
    password : "admin022"   
}

function add(x, y){
    console.log( x+y )
}

// in commonsjs we use module.exports = yoursomethink 
// to kiya main ese bhi export kr skta hun ??
// module.exports = testing
// module.exports = add   
// NOTE ONE think -->  jab mein pahle testing export kra hai uske bad add ko, toh testing k bad mein add  ko export kra to testing ko add ne overwrite kr diya..  
// module.exports is a single object or value , when you ressign module.exports it completely replace whatever was previously assigned. 

//  using the object exporting more than one 
module.exports = {testing,add}
