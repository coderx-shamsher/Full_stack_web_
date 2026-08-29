function namefn(name){

    if(typeof name === "string"){
    
        return function (message){
              console.log(`${name} ! ${message}`)
        } 

    }
    else{
        return `error type not matched...`
    }


}

// first way to call 
// namefn("admin")("you have to checkout the server logs")


// 2nd way to run 
let testing = namefn("coderx")
testing("you have to fix ui in home page")


// eska kiya concept hai 
// 1) jab bhi function call hojata hai to vo terminate ho jana hai stack se, hat jata ha eska matlab k jo bhi variables objects etc honge vo bhi uski function k sath end ho jayega, to es function main esa kiya hai hamne pahle namefn ko call kra ! uska variable hame uke call hone k bad, bhi use kr skte hain yahi hai closure functions, means k inner function outer function ka variable yadd rkhta hai aur use bhi kr skta hai.. 

 