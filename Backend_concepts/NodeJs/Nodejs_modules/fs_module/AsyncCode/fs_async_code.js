// fs async operations _> CRUD operations 

import fs, { lchown } from 'fs'
// import fs from 'fs/promises'

// writeFile(path, data, options, callbackfn) -> create a file 


// fs.writeFile('./for.sh','echo "hello this is async method"','utf-8', (err)=>{
//    if(!err) console.log("File is Created..")
//     else  console.log("Error -> ", err)
// })


// folder create krne k liye 
// fs.mkdir('./sh',(err)=>{
//     if(!err) console.log("folder is created")
//     else console.log("Error : \n",err)
// })


// move files 
// to move file
// fs.rename('./test.sh','./sh/test.sh',(error)=>{
//     if(error){
//         console.log(error)
//     }else{
//         console.log("files moved ....")
//     }
//})


// to read file content
// first way 
// fs.readFile("./sh/test.sh",(err,data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data.toString())
//     }
// })

// 2nd way 
// fs.readFile("./code.sh",'utf8',(err,data)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)
//     }
// })


// append data in file 
// fs.appendFile('./sh/test.sh','\n echo "updated data"',(err)=>{
//     if(err){
//         console.log(err)
//     }
// })


// fs.unlink('./for.sh',(err)=>{
//     if(err) console.log(err)
//         console.log("file was unlinked....")
// })