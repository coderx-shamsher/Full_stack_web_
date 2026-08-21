// fs module in nodejs 
// we using sync method of fs module


import fs, { appendFile, renameSync, unlinkSync } from 'fs'
import path from 'path'

// create file with writeFileSync() 
// 1) argument -> filename with extesion -> text.txt, code.js, test.json etc 
// 2) argument  -> file content , us file mein kiya likhna chaahte ho ?   "double quotes mein likho"
// 3) argument -> encodeing type

// const createfile = fs.writeFileSync("echo.sh","#!/bin/bash\necho 'hello this file is created by fs module'")

const createfile = fs.writeFileSync("fnc.sh","#!/bin/bash\necho 'this is function file in bash'")
// console.log(createfile)

// we can also use path module and join the path with filename
// let filename = "function.sh"
// const filewithpath = path.join(__dirname,filename)
// console.log(__dirname)
// main type module use kr raha hun to mere  yeh run nhi hoga.. 


// Readfilesync -> To read files 
// 1) filepath -> 
// 2) options -> these are optional

// let readfile = fs.readFileSync('./fnc.sh')
// console.log(readfile) /// file content buffer mein show hoga 
/// convert buffer into string with tostring() 
// console.log(readfile.toString())

// if we dont use utf-8 to hame string mein data parse krna hoga agr use krte hai to need nhi hai 
let readfile = fs.readFileSync('./fnc.sh',"utf-8")
// console.log(readfile) 




// append data in file using the 
// appendFilesync() method , ager file exist nhi krti hai to yeh method file create krdeta hai

let filename = "data.sh"
// const appendFiledata = fs.appendFileSync(filename,"#!/bin/sh")
// console.log(appendFiledata)
// file exist nhi hai to create hogi 

// let appendFiledata1 = fs.appendFileSync(filename,`\n echo "data appended first time" `)
// let appendFiledata2 = fs.appendFileSync(filename,`\n echo "this echo is 2nd time" `)
let appendFiledata3 = fs.appendFileSync(filename,`\necho "testing appending data" `)
// console.log(appendFiledata1)
// console.log(appendFiledata2)
// console.log(appendFiledata3)



// delete files (we using unlink, in os level delete nhi hota unlink hota hai)
// just give file path in this function
// const unlinkfile = unlinkSync('./echo.sh')
// console.log(unlinkfile)


// renamefiles 
// const renamefile = renameSync('./data.sh','test.sh')
// console.log(renamefile)

